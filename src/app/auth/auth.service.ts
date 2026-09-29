import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(user: string, password: string) {

    return this.http.post('http://localhost:8080/auth/login', { user, password }, {responseType: 'text'});
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

}