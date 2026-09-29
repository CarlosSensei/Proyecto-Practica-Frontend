import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  login(): void {

    this.authService.login(this.user, this.password).subscribe({

        next: (token) => {

          this.authService.saveToken(token);

          this.dialogRef.close();

          window.location.reload();
        },

        error: () => {

          this.errorMessage = 'Login as Basic User';

          this.dialogRef.close();
        }
      });
  }

  onClose() {
    
    this.dialogRef.close(false);
  }

}