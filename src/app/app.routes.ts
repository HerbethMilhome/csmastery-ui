import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'alunos'},
  { path: 'alunos', loadChildren: () => import('./cs-mastery/cs-mastery.module').then(m => m.CsMasteryModule)}
];
