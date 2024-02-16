import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { catchError, Observable, of } from 'rxjs';

import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../../../shared/components/error-dialog/error-dialog.component';
import { CategoriaPipe } from '../../../../shared/pipes/categoria.pipe';
import { Aluno } from '../../../model/aluno';
import { AlunosService } from '../../../services/alunos.service';

@Component({
  selector: 'app-alunos-list',
  templateUrl: './alunos-list.component.html',
  styleUrl: './alunos-list.component.scss',
  standalone: true,
  imports: [AppMaterialModule, CategoriaPipe, NgxMaskDirective],
})
export class AlunosListComponent implements OnInit {

  public alunos$: Observable<Aluno[]> | null = null;

  readonly displayedColumns: string[] = ['nome', 'email', 'telefone', 'data_entrada', 'actions'];

  constructor(
    private alunosService: AlunosService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    ) {
      this.refresh();
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

  onDelete(aluno: Aluno) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.alunosService.delete(aluno.id)
        .subscribe(() => {
          this.openSnackBar('Aluno removido com sucesso!', 'Fechar');
          this.refresh();
        },
        () => this.onError('Erro ao tentar remover o aluno.')
        );
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' });
  }

  refresh() {
    this.alunos$ = this.alunosService.listaAlunos()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar');
        return of([])
      })
    );
  }

}
