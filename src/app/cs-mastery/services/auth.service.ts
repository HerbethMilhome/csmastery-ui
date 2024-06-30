import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AuthUser } from '../model/auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = 'api/auth';

  showMenu = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient
  ) { }

  login(login: AuthUser): Observable<string> {

    return this.http.post<string>(`${this.API}/login`, login).pipe(
      map(response => {
        console.log('Resposta do serviço de login:', response);
        let token = JSON.parse(JSON.stringify(response)).token
        if (token) {
          this.showMenu.emit(true);
        } else {
          this.showMenu.emit(false);
        }

        return response;
      }), (error) => {
        console.error('Erro ao fazer login:', error);
        this.showMenu.emit(false);
        return error;
      }
    );
  }

  logout() {
    this.showMenu.emit(false);
  }

}
