import { Injectable } from '@angular/core';
import { User, UserDTO } from '../models/user';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) { }

  populate(): Observable<string> {
    return this.http.post('/api/admin/populate', null, { responseType: 'text' });
  }
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/admin/users');
  }

  getUser(userId: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`/api/user/${userId}`);
  }
}
