import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import {
  ConfirmationDialogComponent,
} from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../../../shared/components/error-dialog/error-dialog.component';
import { Atendente } from '../../../model/atendente';
import { AtendenteService } from '../../../services/atendente.service';

@Component({
  selector: 'app-atendente-list',
  templateUrl: './atendente-list.component.html',
  styleUrl: './atendente-list.component.scss',
  standalone: true,
  imports: [AppMaterialModule]
})
export class AtendenteListComponent {

  public atendentes$: Observable<Atendente[]> | null = null;

  readonly displayedColumns: string[] = ['nome', 'email', 'telefone', 'actions'];

  constructor(
    private service: AtendenteService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    ) {
      this.refresh();
  }

  onError(errorMensagem: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMensagem
    });
  }

  onEdit(atendente: Atendente) {
    this.router.navigate(['edit', atendente.id], {relativeTo: this.route});
  }

  onDelete(atendente: Atendente) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.delete(atendente.id)
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
    this.atendentes$ = this.service.listaAtendentes()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar');
        return of([])
      })
    );
  }


}
