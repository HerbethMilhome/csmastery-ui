import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppMaterialModule } from '../../app-material/app-material.module';

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
export class CustomSidenavComponent implements OnInit {

  sidenavCollapsed = signal(false);

  @Input() set collapsed(val: boolean) {
    this.sidenavCollapsed.set(val);
  }

  @Input() userLogin: string | null = '';

  @Input() perfil: string | null = '';

  ngOnInit(): void {
    this.userLogin  = localStorage.getItem('userLogin');
    this.perfil  = localStorage.getItem('role');
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
      route: 'logout'
    },
  ]);

  profilePicSize = computed(() => this.sidenavCollapsed() ? '32' : '100');

}
