import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../shared/shared.module';
import { ListAlunosRoutingModule } from './list-alunos-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListAlunosRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ListAlunosModule { }
