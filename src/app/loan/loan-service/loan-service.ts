import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Loan } from '../model/Loan';
import { PaginatedData } from '../../core/page/PaginatedData';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
    constructor() { }

    protected readonly http = inject(HttpClient);
    private baseUrl = 'http://localhost:8080/loan';

    getLoans(search: any): Observable<PaginatedData<Loan>> {
        return this.http.post<PaginatedData<Loan>>(this.baseUrl, search);
    }

    saveLoan(loan: Loan): Observable<Loan> {
        if (loan.id) {
            return this.http.put<Loan>(`${this.baseUrl}/${loan.id}`, loan);
        }

        return this.http.put<Loan>(this.baseUrl, loan);
    }
    
    deleteLoan(loanId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${loanId}`);
    }
}