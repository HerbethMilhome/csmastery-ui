import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AtendenteResolver } from '../../guards/atendente.resolver';
import { AtendenteFormComponent } from './atendente-form/atendente-form.component';
import { AtendentesComponent } from './atendentes.component';

const routes: Routes = [
  { path: '', component: AtendentesComponent},
  { path: 'new', component: AtendenteFormComponent, resolve: {atendente: AtendenteResolver}},
  { path: 'edit/:id', component: AtendenteFormComponent, resolve: {atendente: AtendenteResolver}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtendenteRoutingModule { }
