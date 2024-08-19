import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserProfile } from '../../../cs-mastery/model/user-profile';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { AuthService } from './../../../cs-mastery/services/auth.service';

export type MenuItem = {
  icon?: string;
  label : string;
  route?: string;
  role: UserProfile;
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

  constructor(
    private authService: AuthService){
  }

  ngOnInit(): void {
    this.userLogin  = localStorage.getItem('userLogin');
    this.perfil  = localStorage.getItem('role');
  }

  menuItem = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',
      role: 'CS'
    },
    {
      icon: 'assignment',
      label: 'Cadastro',
      role: 'CS',
      children: [
        {
          label: 'Alunos',
          route: 'alunos',
          role: 'CS'
        },
        {
          label: 'Atendente - CS',
          route: 'atendentes',
          role: 'ADMIN'
        },
        {
          label: 'Situação Financeira',
          route: 'situacao-financeira',
          role: 'CS'
        }
      ]
    },
    {
      icon: 'analytics',
      label: 'Analitico',
      route: 'analitico',
      role: 'CS'
    },
    {
      icon: 'exit_to_app',
      label: 'Sair',
      route: 'logout',
      role: 'ALUNO'
    },
  ]);

  profilePicSize = computed(() => this.sidenavCollapsed() ? '32' : '100');

  public hasAccess(role: UserProfile): boolean {
    if(role){
      return this.authService.hasRole(role);
    }
    return false;
  }
}
