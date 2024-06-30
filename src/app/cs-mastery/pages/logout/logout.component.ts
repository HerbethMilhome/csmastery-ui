import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('userLogin', '');
    localStorage.setItem('role', '');
    localStorage.setItem('menu', '');
    this.router.navigate(['/root']);

    this.authService.logout();
  }

}
