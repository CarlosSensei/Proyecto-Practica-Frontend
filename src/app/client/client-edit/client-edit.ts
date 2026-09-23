import { Component, OnInit, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client-service/client.service';
import { Client } from '../model/client';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { error } from 'console';

@Component({
    selector: 'app-client-edit',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
    templateUrl: './client-edit.html',
    styleUrl: './client-edit.scss'
})
export class ClientEditComponent implements OnInit {
    protected readonly dialogRef = inject(MatDialogRef<ClientEditComponent>);
    protected readonly data = inject(MAT_DIALOG_DATA);
    protected readonly clientService = inject(ClientService);

    protected readonly id = signal<number>(0);
    protected readonly name = signal<string>('');
    protected errorMessage = signal<string>('');

    ngOnInit(): void {
        this.loadFormData();
    }

    loadFormData(): void {
        const client = this.data.client;

        this.id.set(client?.id ?? null);
        this.name.set(client?.name ?? null);
    }

    onSave() {
        const client: Client = {
            id: this.id() ?? 0,
            name: this.name() ?? ''
        };

        if(!client.name) {
            this.errorMessage.set("Client name is required.");
            return;
        }

        this.clientService.saveClient(client).subscribe({
            next: () => {
                this.dialogRef.close(true);
            },
            error: (error) => {
                this.errorMessage.set(error.error);
            }
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}
