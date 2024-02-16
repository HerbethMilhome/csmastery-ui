import { Component, Input, computed, signal } from '@angular/core';

import { AppMaterialModule } from '../../app-material/app-material.module';
import {  RouterModule } from '@angular/router';

export type MenuItem = {
  icon?: string;
  label : string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [AppMaterialModule, RouterModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent {

  sidenavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sidenavCollapsed.set(val);
  }

  menuItem = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard'
    },
    {
      icon: 'assignment',
      label: 'Cadastro',
      children: [
        {
          label: 'Alunos',
          route: 'alunos'
        },
        {
          label: 'Atendente - CS',
          route: 'atendentes'
        },
        {
          label: 'Situação Financeira',
          route: 'situacao-financeira'
        }
      ]
    },
    {
      icon: 'analytics',
      label: 'Analitico',
      route: 'analitico'
    },
    {
      icon: 'exit_to_app',
      label: 'Sair',
      route: 'sair'
    },
  ]);

  profilePicSize = computed(() => this.sidenavCollapsed() ? '32' : '100');

}
