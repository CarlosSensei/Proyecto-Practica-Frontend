import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(user: string, password: string) {

    return this.http.post<string>('/api/auth/login', {user, password});
  }

  saveToken(token: string): void {

    sessionStorage.setItem('token', token);
  }

  logout(): void {

    sessionStorage.removeItem('token');
  }

  isLogged(): boolean {

    return !!sessionStorage.getItem('token');
  }

  constructor(private http: HttpClient) {}
}