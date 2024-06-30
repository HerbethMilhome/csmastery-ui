import { ChangeDetectorRef, Component, computed, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from './cs-mastery/services/auth.service';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { CustomSidenavComponent } from './shared/components/custom-sidenav/custom-sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppMaterialModule, CustomSidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  mostraMenu: boolean = false;
  userLogin: string | null = '';
  perfil: string | null = '';

  hideMenu = new BehaviorSubject<boolean>(false);

  constructor(
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.authService.showMenu.subscribe(
      exibir => {
        this.mostraMenu = exibir;
        localStorage.setItem('menu', this.mostraMenu.toString());
      }
    );

    let token = localStorage.getItem('token');
    this.userLogin = localStorage.getItem('userLogin');
    this.perfil = localStorage.getItem('role');

    if (token) {
      this.hideMenu.next(true);
    } else {
      this.hideMenu.next(false);
    }

    this.hideMenu.subscribe(novoValor => {
      this.mostraMenu = novoValor;
    });

    this.cd.detectChanges();
    this.router.navigate(['/login']);

  }

}
