import { Component, OnInit, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../client-service/client.service';
import { Client } from '../model/client';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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

    protected readonly id = signal<number | null>(null);
    protected readonly name = signal<string | null>(null);

    ngOnInit(): void {
        this.loadFormData();
    }

    loadFormData(): void {
        const client = this.data.client;

        this.id.set(client?.id ?? null);
        this.name.set(client?.name ?? null);
    }

    onSave() {
        const id = this.id();
        const name = this.name();

        if(!name) {
            return;
        }

        const client = { id, name } as Client;
        this.clientService.saveClient(client).subscribe(() => {
            this.dialogRef.close(true);
        });
    }

    onClose() {
        this.dialogRef.close();
    }
}
