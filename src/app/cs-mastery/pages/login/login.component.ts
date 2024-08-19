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
  mensagem: string = '';

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
    this.mensagem = '';
    this.form.patchValue({
      login: '',
      senha: ''
    });

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', '');
      localStorage.setItem('userLogin', '');
      localStorage.setItem('role', '');
    } else {
      console.error('localStorage is not available.');
    }

  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  public login(): void {
    this.authService.login(this.form.value).subscribe({
      next: data => {
        //console.log(data);
        const token = data.token;
        if (typeof localStorage !== 'undefined') {
          if (token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userLogin', data.login);
            localStorage.setItem('role', data.role);
            localStorage.setItem('type', data.type);

            this.loginValid = true;
            this.router.navigate(['/dashboard']);
          } else {
            this.mensagem = 'Usuário ou senha inválidos.'
          }
        }

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
