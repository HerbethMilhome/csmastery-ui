import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { SituacaoFinanceira } from '../model/situacao-financeira';

@Injectable({
  providedIn: 'root'
})
export class SituacaoFinanceiraService {

  private readonly API = 'api/situacao-financeira';

  constructor(
    private http: HttpClient
  ) { }

  listaSituacoes() {
    return this.http.get<SituacaoFinanceira[]>(this.API)
    .pipe(
      first(),
      tap()
    );
  }

  save(situacao: SituacaoFinanceira) {
    return this.http.post<SituacaoFinanceira>(this.API, situacao).pipe(first());
  }

  updade(situacao: SituacaoFinanceira) {
    return this.http.put<SituacaoFinanceira>(this.API, situacao).pipe(first());
  }

  getById(id: string) {
    return this.http.get<SituacaoFinanceira>(`${this.API}/${id}`).pipe(first());
  }

  delete(id: string) {
    return this.http.delete<SituacaoFinanceira>(`${this.API}/delete/${id}`).pipe(first());
  }

}
