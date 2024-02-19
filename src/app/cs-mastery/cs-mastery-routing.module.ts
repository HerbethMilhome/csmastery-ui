import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlunoFormComponent } from './pages/alunos/aluno-form/aluno-form.component';
import { AlunosComponent } from './pages/alunos/alunos.component';
import { AlunoResolver } from './pages/alunos/guards/aluno.resolver';
import { AtendenteResolver } from './pages/alunos/guards/atendente.resolver';
import { AtendenteFormComponent } from './pages/atendentes/atendente-form/atendente-form.component';

const routes: Routes = [
  { path: '', component: AlunosComponent},
  { path: 'new', component: AlunoFormComponent, resolve: {aluno: AlunoResolver}},
  { path: 'edit/:id', component: AlunoFormComponent, resolve: {aluno: AlunoResolver}},
  // { path: 'atendentes', component: AlunoFormComponent},
  // { path: 'atendentes/new', component: AtendenteFormComponent, resolve: {atendente: AtendenteResolver}},
  // { path: 'atendentes/edit/:id', component: AtendenteFormComponent, resolve: {atendente: AtendenteResolver}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsMasteryRoutingModule { }
