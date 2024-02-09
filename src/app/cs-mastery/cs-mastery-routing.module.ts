import { resolve } from 'node:path';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlunoFormComponent } from './alunos/aluno-form/aluno-form.component';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunoResolver } from './alunos/guards/aluno.resolver';

const routes: Routes = [
  { path: '', component: AlunosComponent},
  { path: 'new', component: AlunoFormComponent, resolve: {aluno: AlunoResolver}},
  { path: 'edit/:id', component: AlunoFormComponent, resolve: {aluno: AlunoResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsMasteryRoutingModule { }
