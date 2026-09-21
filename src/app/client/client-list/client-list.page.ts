import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from '../model/client';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClientService } from '../client-service/client.service';
import { MatDialog } from '@angular/material/dialog';
import { ClientEditComponent } from '../client-edit/client-edit';
import { DialogConfirmation } from '../../core/dialog-confirmation/dialog-confirmation';

@Component({
    selector: 'app-client-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        CommonModule
    ],
    templateUrl: './client-list.page.html',
    styleUrl: './client-list.page.scss'
})
export class ClientListPage implements OnInit {

    dataSource = new MatTableDataSource<Client>();
    displayedColumns: string[] = ['id', 'name', 'action'];

    constructor(
        private clientService: ClientService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadData();
    }

    private loadData(): void {
    this.clientService.getClients().subscribe(clients => {
        console.log('Clientes recibidos:', clients.map(c => c.id));
        this.dataSource.data = clients;
    });
}

    createClient(): void {
        const dialogRef = this.dialog.open(ClientEditComponent, {
            data: { client: {} as Client }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadData();
            }
        });
    }

    editClient(client: Client) {
        const dialogRef = this.dialog.open(ClientEditComponent, {
            data: { client }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadData();
            }
        });
    }

    deleteClient(client: Client) {
        const dialogRef = this.dialog.open(DialogConfirmation, {
            data: { title: "Eliminar cliente", description: `¿Está seguro de eliminar el cliente ${client.name}?` }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.clientService.deleteClient(client.id).subscribe(() => {
                    this.loadData();
                });
            }
        });
    }

}
