import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  register(data: { nombre?: string, email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.API}/register`, data);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.API}/login`, credentials).pipe(
      tap(res => { if (res?.token) localStorage.setItem('token', res.token); })
    );
  }

  logout() { localStorage.removeItem('token'); }
  isLoggedIn(): boolean { return !!localStorage.getItem('token'); }
}
