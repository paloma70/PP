import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfumes',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './perfumes.component.html'
})
export class PerfumesComponent implements OnInit {
  perfumes: any[] = [];
  constructor(private http: HttpClient, public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.http.get<any[]>('http://localhost:3000/api/perfumes').subscribe(data => this.perfumes = data);
  }

  eliminar(id: string) {
    if (!confirm('¿Eliminar?')) return;
    this.http.delete(`http://localhost:3000/api/perfumes/${id}`).subscribe(() => this.load());
  }

  editar(id: string) { this.router.navigate(['/editar', id]); }
  crear() { this.router.navigate(['/crear']); }
}
