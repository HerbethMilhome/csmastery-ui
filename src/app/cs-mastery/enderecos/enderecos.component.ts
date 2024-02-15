import { Component, Input } from '@angular/core';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { EnderecoFormComponent } from './endereco-form/endereco-form.component';
import { AbstractControlOptions, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-enderecos',
  standalone: true,
  imports: [AppMaterialModule, EnderecoFormComponent],
  templateUrl: './enderecos.component.html',
  styleUrl: './enderecos.component.scss'
})
export class EnderecosComponent {

  // @Input() formEndereco: AbstractControlOptions;

  // constructor(
  //   private formBuilder: UntypedFormBuilder
  // ){
  //   this.formEndereco = this.formBuilder.group({
  //     id: [''],
  //     logradouro: ['', [Validators.required, Validators.maxLength(255)]],
  //     numero: [''],
  //     complemento: [''],
  //     bairro: [''],
  //     cidade: ['', [Validators.required]],
  //     estado: ['', [Validators.required]],
  //     cep: ['', [Validators.required]]
  //   });
  // }

}
