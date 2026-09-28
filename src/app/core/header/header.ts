import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../auth/auth.service';
import { LoginComponent } from '../../auth/login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule, 
        MatToolbarModule,
        MatButtonModule
    ],
    templateUrl: './header.html',
    styleUrl: './header.scss'
})
export class Header {
    constructor(public authService: AuthService, private dialog: MatDialog) {}

    login(): void {

        this.dialog.open(LoginComponent);
    }

    logout(): void {

        this.authService.logout();
    }

}
