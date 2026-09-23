import { Component, OnInit, signal } from '@angular/core';
import { LoanService } from '../loan-service/loan-service';
import { Loan } from '../model/Loan';
import { LoanEdit } from '../loan-edit/loan-edit';
import { Client } from '../../client/model/client';
import { ClientService } from '../../client/client-service/client.service';
import { Game } from '../../game/model/Game';
import { GameService } from '../../game/game-service/game-service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Pageable } from '../../core/page/Pageable';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  selector: 'app-loan-list',
  styleUrl: './loan-list.page.scss',
  templateUrl: './loan-list.page.html',
})
export class LoanListPage implements OnInit {

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource =  new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'clientId', 'gameId', 'loanDate', 'returnDate', 'actions'];

  clients = signal<Client[]>([]);
  filterTitle: string = '';
  filterClient?: Client;

  games = signal<Game[]>([]);
  filterGame?: Game;

  filterDate = signal<Date | null>(null);

  constructor(private loanService: LoanService, private clientService: ClientService, private gameService: GameService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.LoadPage();
    this.clientService.getClients().subscribe(data => {
      this.clients.set(data);
    });

    this.gameService.getGames().subscribe(data => {
      this.games.set(data);
    });
  }

  LoadPage(event?: PageEvent) {
    const pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{ property: 'id', direction: 'ASC' }]
    };

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    const search = {
      gameId: this.filterGame?.id, 
      clientId: this.filterClient?.id,
      loanDate: this.filterDate() ? this.filterDate()!.toISOString().split('T')[0]: null,
      pageable: pageable  
    };


    this.loanService.getLoans(search).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  onSearch(): void {
    this.pageNumber = 0;
    this.LoadPage();
  }

  onCleanFilter(): void {
    this.filterGame = undefined;
    this.filterClient = undefined;
    this.filterDate.set(null);
    this.pageNumber = 0;
    this.LoadPage();
  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanEdit, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  editLoan(loan: Loan) {
    const dialogRef = this.dialog.open(LoanEdit, {
      data: { loan: loan },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmation, {
      data: {
        title: 'Eliminar préstamo',
        description: `Seguro que quieres eliminar el préstamo con ID ${loan.id}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe(() => {
          this.ngOnInit();
        });
      }
    });

  }
}
