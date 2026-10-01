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
import { AuthService } from '../../auth/auth.service';
import { Pageable } from '../../core/page/Pageable';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-client-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        CommonModule,
        MatPaginatorModule
    ],
    templateUrl: './client-list.page.html',
    styleUrl: './client-list.page.scss'
})
export class ClientListPage implements OnInit {

    dataSource = new MatTableDataSource<Client>();
    displayedColumns: string[] = ['id', 'name', 'action'];

    pageNumber = 0;
    pageSize = 5;
    totalElements = 0;

    constructor(
        private clientService: ClientService,
        private dialog: MatDialog,
        public authService: AuthService
    ) {}

    ngOnInit(): void {
        this.loadPage();
    }

    loadPage(event?: PageEvent) {
        
        const pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [{ property: 'id', direction: 'ASC'}]
        };

        if (event != null) {
            pageable.pageSize = event.pageSize;
            pageable.pageNumber = event.pageIndex;
        }
            
        //this.authorService.getAllAuthors().subscribe((data) => { this.dataSource.data = data; });
        
        this.clientService.getClients(pageable).subscribe((data) => {

            this.dataSource.data = data.content;

            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
        });
    
    }


    /** 
    private loadData(): void {
        const pageable: Pageable = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [{
                property: 'id',
                direction: 'ASC'
            }]
        }
        
        this.clientService.getClients(pageable).subscribe((data) => {
            this.dataSource.data = data.content;
            this.totalElements = data.totalElements;
        });
    }*/

    createClient(): void {
        const dialogRef = this.dialog.open(ClientEditComponent, {
            data: { client: {} as Client }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadPage();
            }
        });
    }

    editClient(client: Client) {
        const dialogRef = this.dialog.open(ClientEditComponent, {
            data: { client }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadPage();
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
                    this.loadPage();
                });
            }
        });
    }

}
