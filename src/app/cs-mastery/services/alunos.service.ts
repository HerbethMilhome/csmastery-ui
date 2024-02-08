import { Injectable } from '@angular/core';
import { Aluno } from '../model/aluno';
import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs';

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
      tap(a => console.log(a))
    );
  }

  save(aluno: Aluno) {
    console.log(aluno);
    return this.http.post<Aluno>(this.API, aluno).pipe(first());
  }

}
