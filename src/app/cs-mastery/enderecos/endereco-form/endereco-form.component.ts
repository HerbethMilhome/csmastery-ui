import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { FormValidations } from '../../../shared/form-validation';

@Component({
  selector: 'app-endereco-form',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './endereco-form.component.html',
  styleUrl: './endereco-form.component.scss'
})
export class EnderecoFormComponent implements OnInit {

  @Input() formEndereco!: FormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder
  ){
    this.formEndereco = this.formBuilder.group({
      id: [''],
      logradouro: ['', [Validators.required, Validators.maxLength(255)]],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cep: ['', [Validators.required, FormValidations.cepValidator]]
    });
  }

  ngOnInit(): void {
     this.formEndereco = this.formBuilder.group({
      id: [''],
      logradouro: ['', [Validators.required, Validators.maxLength(255)]],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cep: ['', [Validators.required]]
    });
  }

  getErrorMesasge(campo: string) {
    const field = this.formEndereco.get(campo);

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

    return 'Campo Invalido';
  }

}
