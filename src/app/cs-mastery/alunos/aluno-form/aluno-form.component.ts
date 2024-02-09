import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { Aluno } from '../../model/aluno';
import { AlunosService } from '../../services/alunos.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.scss',
  standalone: true,
  imports: [AppMaterialModule,ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNativeDateAdapter(), provideNgxMask(), { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }]
})
export class AlunoFormComponent implements OnInit{

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  requiredFormControl = new FormControl('', [Validators.required]);

  readonly form: FormGroup;
  isMentoria: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AlunosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: [''],
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
      mentoria: [0],
      ciclo_matricula: [null],
      renovado: [0]
    });
   }

  ngOnInit(): void {
    const aluno: Aluno = this.route.snapshot.data['aluno'];
    this.form.patchValue({
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email,
      telefone: aluno.telefone,
      nome_socio: aluno.nome_socio,
      email_socio: aluno.email_socio,
      telefone_socio: aluno.telefone_socio,
      responsavel: aluno.responsavel,
      data_entrada: aluno.data_entrada,
      mentoria: aluno.mentoria
    });
    if(this.form.value.mentoria) {
      this.isMentoria = true;
    }
  }

  onSubmit() {
    if(this.form.value.id) {
      this.service.updade(this.form.value)
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
    } else {
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

  checkMentoria() {
    const mentoria = this.form.get('mentoria');
    this.isMentoria = mentoria?.value;
    if (this.isMentoria) {
      this.form.get('mentoria')?.setValue(1);
    } else {
      this.form.get('mentoria')?.setValue(0);
      this.form.get('nome_socio')?.setValue('');
      this.form.get('email_socio')?.setValue('');
      this.form.get('telefone_socio')?.setValue('');
    }
  }

}

