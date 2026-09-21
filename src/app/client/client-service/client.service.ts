import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Client } from '../model/client';

interface ClientResponse {
  id: number;
  name?: string;
  Name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  protected readonly http = inject(HttpClient);

  private baseUrl = 'http://localhost:8080/client';

  getClients(): Observable<Client[]> {
    return this.http.get<ClientResponse[]>(this.baseUrl).pipe(
      map(clients => clients.map(client => ({
        id: client.id,
        name: client.name ?? client.Name ?? ''
      })))
    );
  }

  saveClient(client: Client): Observable<Client> {
  const { id } = client;
  const url = id ? `${this.baseUrl}/${id}` : this.baseUrl;

  return this.http.put<Client>(url, client);
}

  deleteClient(idClient : number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idClient}`);
  } 

}
