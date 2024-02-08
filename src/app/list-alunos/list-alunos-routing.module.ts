import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListAlunosComponent } from './list-alunos/list-alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';

const routes: Routes = [
  { path: '', component: ListAlunosComponent},
  { path: 'new', component: AlunoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListAlunosRoutingModule { }
