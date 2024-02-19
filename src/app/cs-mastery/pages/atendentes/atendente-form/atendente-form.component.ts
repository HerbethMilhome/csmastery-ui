import { Aluno } from './../../../model/aluno';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { Atendente } from '../../../model/atendente';
import { AtendenteService } from '../../../services/atendente.service';

@Component({
  selector: 'app-atendente-form',
  templateUrl: './atendente-form.component.html',
  styleUrl: './atendente-form.component.scss',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule, NgxMaskDirective]
})
export class AtendenteFormComponent {

  readonly form!: FormGroup;
  public alunos: Aluno[] = [];
  readonly displayedColumns: string[] = ['nome', 'email', 'telefone'];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AtendenteService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const atend: Atendente = this.route.snapshot.data['atendente'];
    if (atend) {
      this.form.patchValue({
        id: atend.id,
        nome: atend.nome,
        email: atend.email,
        telefone: atend.telefone
      });

      this.alunos = atend.alunos;
    }
  }

  onSubmit() {
    if(this.form.value.id) {
      this.service.updade(this.form.value)
      .subscribe(
        data => {
          this.openSnackBar(
            'Atendente cadastrado com sucesso!.',
            'Fechar'
            );
            this.onCancel();
        },
        error => {
          let mensagem = error.error.message.split('Detalhe: ')[1]?.split(']')[0];
          this.openSnackBar(
            'Erro ao salvar. Motivo: ' + mensagem,
            'Fechar'
            );
        }
      );
    } else {
      this.service.save(this.form.value)
      .subscribe(
        data => {
          this.openSnackBar(
            'Atendente cadastrado com sucesso!.',
            'Fechar'
            );
            this.onCancel();
        },
        error => {
          let mensagem = error.error.message.split('Detalhe: ')[1]?.split(']')[0];
          this.openSnackBar(
            'Erro ao salvar. Motivo: ' + mensagem,
            'Fechar'
            );
        }
      );
    }
  }

  onCancel() {
    this.location.back();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 5000 });
  }

  getErrorMesasge(campo: string) {
    const field = this.form.get(campo);

    if (field?.hasError('required')) {
      return 'Campo obrigatório'
    }

    if (field?.hasError('minlength')) {
      const minino = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return 'Necessário pelo menos ' + minino + ' caracteres.'
    }

    if (field?.hasError('maxlength')) {
      const minino = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return 'Tamanho máximo excedido de ' + minino + ' caracteres.'
    }

    if (field?.hasError('email')) {
      return 'E-mail inválido'
    }

    return 'Campo Invalido';
  }

}
