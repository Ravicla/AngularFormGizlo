import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string = 'http://localhost:8080/formulario/api/users/';
  constructor(private httpClient: HttpClient) {
  }

  create(pUser: User): Promise<any> {  
    return lastValueFrom(this.httpClient.post<User>(this.baseUrl+'save', pUser))
  }

  getAll(): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl+'all'}`))

  }

  getById(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}${pId}`))
  }

  update(pUser: User): Promise<any> {
    return lastValueFrom(this.httpClient.put<any>(`${this.baseUrl+'update'}`, pUser))
  }

  delete(pId: number): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl+'delete/'}${pId}`))
  }
}
