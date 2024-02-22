import { Routes } from '@angular/router';
import { DashboardComponent } from './cs-mastery/pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  { path: 'alunos', loadChildren: () => import('./cs-mastery/cs-mastery.module').then(m => m.CsMasteryModule)},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'atendentes', loadChildren: () => import('./cs-mastery/pages/atendentes/atendentes.module').then(m => m.AtendentesModule)},
  { path: 'situacao-financeira', loadChildren: () => import('./cs-mastery/pages/situacao-financeira/situacao-financeira.module').then(m => m.SituacaoFinanceiraModule)},
];
