import { Routes } from '@angular/router';
import { DashboardComponent } from './cs-mastery/pages/dashboard/dashboard.component';
import { LoginComponent } from './cs-mastery/pages/login/login.component';
import { LogoutComponent } from './cs-mastery/pages/logout/logout.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'root', component: AppComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'alunos', loadChildren: () => import('./cs-mastery/cs-mastery.module').then(m => m.CsMasteryModule)},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'atendentes', loadChildren: () => import('./cs-mastery/pages/atendentes/atendentes.module').then(m => m.AtendentesModule)},
  { path: 'situacao-financeira', loadChildren: () => import('./cs-mastery/pages/situacao-financeira/situacao-financeira.module').then(m => m.SituacaoFinanceiraModule)},
];
