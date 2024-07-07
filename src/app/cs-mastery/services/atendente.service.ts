import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, first, map, of, tap } from 'rxjs';

import { Atendente } from '../model/atendente';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AtendenteService {

  private readonly API = '/api/atendente';

  constructor(
    private http: HttpClient
  ) { }

  listaAtendentes() {
    return this.http.get<Atendente[]>(this.API)
    .pipe(
      first(),
      tap()
    );
  }

  save(atendente: Atendente): Observable<Atendente>  {
    return this.http.post<Atendente>(this.API, atendente).pipe(first());
    // return this.http.post<Atendente>(this.API, atendente).pipe(
    //   map(response => {
    //     return response;
    //   }), catchError (error => {
    //     console.error('Erro ao salvar o atendente: ', error);
    //     // Retorne um Observable vazio ou um valor default
    //     return of(null as unknown as Atendente);
    //   })
    // );
  }

  updade(atendente: Atendente) {
    return this.http.put<Atendente>(this.API, atendente).pipe(first());
  }

  getById(id: string) {
    return this.http.get<Atendente>(`${this.API}/${id}`).pipe(first());
  }

  delete(id: string) {
    return this.http.delete<Atendente>(`${this.API}/delete/${id}`).pipe(first());
  }

}
