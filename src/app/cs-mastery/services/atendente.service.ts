import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';
import { Atendente } from '../model/atendente';

@Injectable({
  providedIn: 'root'
})
export class AtendenteService {

  private readonly API = 'api/atendente';

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

  save(atendente: Atendente) {
    return this.http.post<Atendente>(this.API, atendente).pipe(first());
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
