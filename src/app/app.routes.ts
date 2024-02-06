import { ListAlunosComponent } from './list-alunos/list-alunos/list-alunos.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'alunos'},
  { path: 'alunos', loadChildren: () => import('./list-alunos/list-alunos.module').then(m => m.ListAlunosModule)}
];
