import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppMaterialModule } from './shared/app-material/app-material.module';
import { CustomSidenavComponent } from './shared/components/custom-sidenav/custom-sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppMaterialModule, CustomSidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

}
