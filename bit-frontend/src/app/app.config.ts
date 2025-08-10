import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { PerfumesComponent } from './pages/perfumes/perfumes.component';
import { FormularioPerfumeComponent } from './pages/formulario-perfume/formulario-perfume.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

import { authGuard } from './guards/auth.guard';
import { AuthInterceptor } from './services/auth.interceptor';

const routes: Routes = [
  { path: '', component: PerfumesComponent },
  { path: 'crear', component: FormularioPerfumeComponent, canActivate: [authGuard] },
  { path: 'editar/:id', component: FormularioPerfumeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};
