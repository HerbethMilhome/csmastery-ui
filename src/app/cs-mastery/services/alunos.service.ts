import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';

import { Aluno } from '../model/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private readonly API = 'api/aluno';

  constructor(
    private http: HttpClient
  ) { }

  listaAlunos() {
    return this.http.get<Aluno[]>(this.API)
    .pipe(
      first(),
      tap()
    );
  }

  save(aluno: Aluno) {
    return this.http.post<Aluno>(this.API, aluno).pipe(first());
  }

  updade(aluno: Aluno) {
    return this.http.put<Aluno>(this.API, aluno).pipe(first());
  }

  getById(id: string) {
    return this.http.get<Aluno>(`${this.API}/${id}`).pipe(first());
  }

  delete(id: string) {
    return this.http.delete<Aluno>(`${this.API}/delete/${id}`).pipe(first());
  }

  saveAlunoImport(listaAluno: Aluno[]) {
    const url = `${this.API}/import`;
    return this.http.post<Aluno[]>(url, listaAluno).pipe(first());
  }

}
