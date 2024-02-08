import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { AlunosService } from '../../services/alunos.service';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.scss',
  standalone: true,
  imports: [AppMaterialModule,ReactiveFormsModule],
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }]
})
export class AlunoFormComponent implements OnInit{

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  requiredFormControl = new FormControl('', [Validators.required]);

  form = this.formBuilder.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    nome_socio: [''],
    email_socio: [''],
    telefone_socio: [''],
    status_financeiro: [''],
    nota_acompanhamento: [''],
    satisfacao: [''],
    responsavel: [''],
    data_entrada: [null],
    data_criacao: [null],
    data_renovacao: [null],
    data_ultimo_contrato: [null],
    data_ultimo_acompanhamento: [null],
    data_proximo_contato: [null],
    vigencia_contrato: [null],
    ultima_resposta: [null],
    mentoria: [null],
    ciclo_matricula: [null],
    renovado: [null]
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AlunosService,
    private snackBar: MatSnackBar,
    private location: Location,
  ) {

   }

  ngOnInit(): void {
    this.form.value.nome = null;

  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(
        data => {
          console.log(data),
          this.openSnackBar(
            'Aluno cadastrado com sucess!.',
            'Fechar'
            );
            this.onCancel();
        },
        error => {
          console.log(error.error.message);
          let mensagem = error.error.message.split('Detalhe: ')[1]?.split(']')[0];
          this.openSnackBar(
            'Erro ao salvar. Motivo: ' + mensagem,
            'Fechar'
            );
        }
      );
  }

  onCancel() {
    this.location.back();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 5000 });
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

}

