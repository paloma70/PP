import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './registro.component.html'
})
export class RegistroComponent {
  nombre = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.register({ nombre: this.nombre, email: this.email, password: this.password }).subscribe({
      next: () => { alert('Registro correcto'); this.router.navigate(['/login']); },
      error: (err) => alert(err.error?.msg || 'Error en registro')
    });
  }
}
