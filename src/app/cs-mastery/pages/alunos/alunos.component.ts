import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { AlunosListComponent } from './alunos-list/alunos-list.component';
import { AlunoImportComponent } from "./aluno-import/aluno-import.component";


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
    private route: ActivatedRoute
  ){ }

  newAluno() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
