import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ListAlunosComponent } from '../list-alunos/list-alunos.component';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss',
  standalone: true,
  imports: [AppMaterialModule,ListAlunosComponent],
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
