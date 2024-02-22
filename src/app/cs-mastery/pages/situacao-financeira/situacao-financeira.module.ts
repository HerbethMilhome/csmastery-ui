import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';
import { SituacaoFinanceiraRoutingModule } from './situacao-financeira-routing.module';

@NgModule({
  declarations: [  ],
  imports: [
    CommonModule,
    SituacaoFinanceiraRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})

export class SituacaoFinanceiraModule { }
