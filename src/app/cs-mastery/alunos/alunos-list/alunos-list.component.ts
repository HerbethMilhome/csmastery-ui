import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CategoriaPipe } from '../../../shared/pipes/categoria.pipe';
import { Aluno } from '../../model/aluno';
import { AlunosService } from '../../services/alunos.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-alunos-list',
  templateUrl: './alunos-list.component.html',
  styleUrl: './alunos-list.component.scss',
  standalone: true,
  imports: [AppMaterialModule, CategoriaPipe],
})
export class AlunosListComponent implements OnInit {

  public alunos$: Observable<Aluno[]>;

  readonly displayedColumns: string[] = ['nome', 'email', 'telefone', 'data_entrada', 'actions'];

  constructor(
    private alunosService: AlunosService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.alunos$ = alunosService.listaAlunos()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar');
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

  onEdit(aluno: Aluno) {
    this.router.navigate(['edit', aluno.id], {relativeTo: this.route});
  }

  onDelete() {

  }

}
