import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { AlunosListComponent } from './alunos-list/alunos-list.component';
import { AlunoImportComponent } from "./aluno-import/aluno-import.component";
import { MatDialog } from '@angular/material/dialog';
import { ImportAlunoDialogComponent } from './aluno-import/import-aluno-dialog/import-aluno-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss',
  standalone: true,
  imports: [AppMaterialModule, AlunosListComponent, AlunoImportComponent],
})
export class AlunosComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ){ }

  newAluno() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onImport() {
    const dialogRef = this.dialog.open(ImportAlunoDialogComponent, {
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {

      if(result) {
        this.openSnackBar('Alunos importados com sucesso!', 'Fechar');
      }

    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' });
  }

}
