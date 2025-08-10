import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfumeService {
  private API_URL = 'http://localhost:3000/api/perfumes'; // Verifica que sea tu endpoint real

  constructor(private http: HttpClient) {}

  obtenerPerfumes(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }
}
