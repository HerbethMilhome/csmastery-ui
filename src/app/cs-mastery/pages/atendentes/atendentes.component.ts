import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { AtendenteListComponent } from './atendente-list/atendente-list.component';

@Component({
  selector: 'app-atendentes',
  templateUrl: './atendentes.component.html',
  styleUrl: './atendentes.component.scss',
  standalone: true,
  imports: [AppMaterialModule, AtendenteListComponent]
})
export class AtendentesComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ){ }

  newAtendente() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
