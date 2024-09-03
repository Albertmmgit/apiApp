import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IusersList } from '../interfaces/iusers-list.interface';
import { first, firstValueFrom } from 'rxjs';
import { Iuser } from '../interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = "https://peticiones.online/api/users/"
  private http = inject(HttpClient)

  getAll(page: number): Promise<IusersList> {
    return firstValueFrom(this.http.get<IusersList>(`${this.baseUrl}?page=${page}`))
  }

  getById(id: string): Promise<Iuser> {
    return firstValueFrom(this.http.get<Iuser>(`${this.baseUrl}${id}`))
  }

  insert(body: Iuser): Promise<IusersList> {
    return firstValueFrom(this.http.post<IusersList>(this.baseUrl, body))
  }

  update(body: Iuser): Promise<Iuser> {
  let id = body._id
  return firstValueFrom(this.http.put<Iuser>(`${this.baseUrl}${id}`, body))
  }

  delete(id: string): Promise<Iuser> {
    return firstValueFrom(this.http.delete<Iuser>(`${this.baseUrl}${id}`))
  }

  getPages(): Promise<IusersList> {
    return firstValueFrom(this.http.get<IusersList>(this.baseUrl))
  }

  

  constructor() { }
}
