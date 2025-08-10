import { Routes } from '@angular/router';
import { PerfumesComponent } from './pages/perfumes/perfumes.component';
import { FormularioPerfumeComponent } from './pages/formulario-perfume/formulario-perfume.component';

export const routes: Routes = [
  { path: '', component: PerfumesComponent },
  { path: 'nuevo', component: FormularioPerfumeComponent },
  { path: '**', redirectTo: '' }
];
