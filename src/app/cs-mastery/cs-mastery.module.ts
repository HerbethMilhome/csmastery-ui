import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CsMasteryRoutingModule } from './cs-mastery-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CsMasteryRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CsMasteryModule { }
