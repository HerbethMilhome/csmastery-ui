import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AtendenteRoutingModule } from './atendente-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AtendenteRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AtendentesModule { }
