import { Component, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule]
})
export class LoginComponent {

  @Output() loginValid = true;
  readonly form!: FormGroup;
  private readonly returnUrl: string;
  private _destroySub$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private formBuilder: UntypedFormBuilder,
  ) {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  public ngOnInit(): void {

    this.form.patchValue({
      login: '',
      senha: ''
    });

    if (localStorage) {
      localStorage.setItem('token', '');
      localStorage.setItem('userLogin', '');
      localStorage.setItem('role', '');
    }

  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  public login(): void {
    this.authService.login(this.form.value).subscribe({
      next: data => {
        console.log(data);
        const token = JSON.parse(JSON.stringify(data)).token;
        const user = JSON.parse(JSON.stringify(data)).user;
        const role = JSON.parse(JSON.stringify(data)).role;

        console.log('Token - ', token);
        console.log('User - ', user);
        console.log('Role - ', role);

        localStorage.setItem('token', token);
        localStorage.setItem('userLogin', user);
        localStorage.setItem('role', role);

        this.loginValid = true;
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        console.log(error);
        this.loginValid = false;

        localStorage.setItem('token', '');
        localStorage.setItem('userLogin', '');
        localStorage.setItem('role', '');
      }
    });
  }

}
