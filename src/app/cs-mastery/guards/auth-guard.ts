import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      // O usuário está autenticado, permita o acesso
      return true;
    } else {
      // O usuário não está autenticado, redirecione para a página de login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
