import { Routes } from '@angular/router';
import { DashboardComponent } from './cs-mastery/pages/dashboard/dashboard.component';
import { AtendentesComponent } from './cs-mastery/pages/atendentes/atendentes.component';
import { AtendenteFormComponent } from './cs-mastery/pages/atendentes/atendente-form/atendente-form.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  { path: 'alunos', loadChildren: () => import('./cs-mastery/cs-mastery.module').then(m => m.CsMasteryModule)},
  { path: 'dashboard', component: DashboardComponent},
  // { path: 'atendentes', component: AtendentesComponent},
  // { path: 'atendentes/new', component: AtendenteFormComponent},
  // { path: 'atendentes/edit/:id', component: AtendenteFormComponent},

  { path: 'atendentes', loadChildren: () => import('./cs-mastery/pages/atendentes/atendentes.module').then(m => m.AtendentesModule)},
];
