import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SituacaoFinanceiraComponent } from './situacao-financeira.component';

const routes: Routes = [
  { path: '', component: SituacaoFinanceiraComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SituacaoFinanceiraRoutingModule { }
