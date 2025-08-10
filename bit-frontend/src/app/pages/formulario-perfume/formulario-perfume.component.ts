import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-perfume',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './formulario-perfume.component.html'
})
export class FormularioPerfumeComponent implements OnInit {
  perfume: any = { nombre: '', marca: '', precio: 0, descripcion: '' };
  esEdicion = false;
  id: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.esEdicion = true;
      this.http.get<any>(`http://localhost:3000/api/perfumes/${this.id}`).subscribe(data => this.perfume = data);
    }
  }

  guardar() {
    if (this.esEdicion) {
      this.http.put(`http://localhost:3000/api/perfumes/${this.id}`, this.perfume).subscribe(() => this.router.navigate(['/']));
    } else {
      this.http.post('http://localhost:3000/api/perfumes', this.perfume).subscribe(() => this.router.navigate(['/']));
    }
  }
}
