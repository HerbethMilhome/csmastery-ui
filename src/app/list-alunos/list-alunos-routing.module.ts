import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListAlunosComponent } from './list-alunos/list-alunos.component';

const routes: Routes = [
  { path: '', component: ListAlunosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListAlunosRoutingModule { }
