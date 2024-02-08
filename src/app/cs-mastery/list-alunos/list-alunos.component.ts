import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { CategoriaPipe } from '../../shared/pipes/categoria.pipe';
import { Aluno } from '../model/aluno';
import { AlunosService } from './../services/alunos.service';


@Component({
  selector: 'app-list-alunos',
  templateUrl: './list-alunos.component.html',
  styleUrl: './list-alunos.component.scss',
  standalone: true,
  imports: [AppMaterialModule, CategoriaPipe],
})
export class ListAlunosComponent implements OnInit {

  public alunos$: Observable<Aluno[]>;

  readonly displayedColumns: string[] = ['nome', 'email', 'cpf', 'telefone', 'actions'];

  constructor(
    private alunosService: AlunosService,
    private dialog: MatDialog,
    ) {
    this.alunos$ = alunosService.listaAlunos()
    .pipe(
      catchError(error => {
        this.onError('Erroa ao carregar');
        return of([])
      })
    );
  }

  ngOnInit(): void {

  }

  onError(errorMensagem: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMensagem
    });
  }

}
