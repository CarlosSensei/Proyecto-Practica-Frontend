import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanService } from '../loan-service/loan-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Loan } from '../model/Loan';
import { Client } from '../../client/model/client';
import { Game } from '../../game/model/Game';
import { GameService } from '../../game/game-service/game-service';
import { ClientService } from '../../client/client-service/client.service';

@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  selector: 'app-loan-edit',
  standalone: true,
  styleUrl: './loan-edit.scss',
  templateUrl: './loan-edit.html',
})
export class LoanEdit implements OnInit {

  protected readonly loanService = inject(LoanService);
  protected readonly dialogRef = inject(MatDialogRef<LoanEdit>);
  protected readonly data = inject(MAT_DIALOG_DATA);
  protected readonly clientService = inject(ClientService);
  protected readonly gameService = inject(GameService);

  protected readonly id = signal<number>(this.data.loanId);
  protected readonly selectedGameId = signal<number>(0);
  protected readonly selectedClientId = signal<number>(0);
  protected readonly gameName = signal<string>('');
  protected readonly clientName = signal<string>('');
  protected readonly loanDate = signal<Date | null>(null);
  protected readonly returnDate = signal<Date | null>(null);
  protected errorMessage = signal<string>('');

  clients: Client[] = [];
  games: Game[] = [];


  loadFormData(initialData: Loan | null): void {
    this.id.set(initialData?.id ?? 0);
    this.gameName.set(initialData?.game.title ?? '');
    this.clientName.set((initialData?.client as any)?.name ?? '');
    this.selectedGameId.set(initialData?.game?.id ?? 0);
    this.selectedClientId.set(initialData?.client?.id ?? 0);
    this.loanDate.set(initialData?.loanDate ? new Date(initialData.loanDate) : null);
    this.returnDate.set(initialData?.returnDate ? new Date(initialData.returnDate) : null);
  }

  ngOnInit(): void {
    this.loadFormData(this.data.loan ?? null);

    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });

    this.gameService.getGames().subscribe(data => {
      this.games = data;
    });

  }

  onSave(): void {

    this.errorMessage.set('');

    const loan: Loan = {
      id: this.id(),
      game: { id: this.selectedGameId(), title: this.gameName(), age: 0, category: { id: 0, name: '' }, author: { id: 0, name: '', nationality: '' } },
      client: { id: this.selectedClientId(), name: this.clientName() },
      loanDate: this.loanDate()?.toISOString().split('T')[0] ?? '',
      returnDate: this.returnDate()?.toISOString().split('T')[0] ?? ''
    };

    if (!this.selectedGameId() ||
      !this.selectedClientId() ||
      !this.loanDate() ||
      !this.returnDate()) {
        
        this.errorMessage.set('All fields are required.');
        return;
    }

    this.loanService.saveLoan(loan).subscribe({
      next: (savedLoan) => {;
        this.dialogRef.close(savedLoan);
      },
      error: (error) => {
        this.errorMessage.set(error.error);
      }
    });
  }

  onClose(): void {
    this.dialogRef.close(false);
  }



}
