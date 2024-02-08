import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { AlunosService } from '../services/alunos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import e from 'express';
import { Location } from '@angular/common';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrl: './aluno-form.component.scss',
  standalone: true,
  imports: [AppMaterialModule,ReactiveFormsModule],
})
export class AlunoFormComponent implements OnInit{

  form = this.formBuilder.group({
    nome: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    status_financeiro: ['']
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: AlunosService,
    private snackBar: MatSnackBar,
    private location: Location,
  ) {
    // this.form = this.formBuilder.group({
    //   nome: [''],
    //   email: [''],
    //   cpf: [''],
    //   telefone: [''],
    //   status_financeiro: ['']
    // });
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
}

