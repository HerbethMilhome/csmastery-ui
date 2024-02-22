import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { SituacaoFinanceira } from '../../model/situacao-financeira';
import { SituacaoFinanceiraService } from '../../services/situacao-financeira.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-situacao-financeira',
  templateUrl: './situacao-financeira.component.html',
  styleUrl: './situacao-financeira.component.scss',
  standalone: true,
  imports: [AppMaterialModule, ReactiveFormsModule, ColorPickerModule],
})

export class SituacaoFinanceiraComponent implements OnInit {

  readonly form!: FormGroup;
  readonly displayedColumns: string[] = ['nome', 'descricao', 'cor', 'acoes'];

  public situacoesList$: Observable<SituacaoFinanceira[]> | null = null;

  color: string = '';
  colorIndex = 0;
  logs: Array<Array<any>> = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: SituacaoFinanceiraService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descricao: [''],
      cor: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const situacao: SituacaoFinanceira = this.route.snapshot.data['situacao-financeira'];
    if (situacao) {
      this.form.patchValue({
        id: situacao.id,
        nome: situacao.nome,
        descricao: situacao.descricao,
        cor: situacao.cor
      });
    }
    this.refresh();
  }

  chageColor() {
    this.form.get('cor')?.setValue(this.color);
  }

  onSubmit() {
    if(this.form.value.id) {
      this.service.updade(this.form.value)
      .subscribe(
        data => {
          this.openSnackBar(
            'Situação Financeira cadastrado com sucesso!.',
            'Fechar'
            );
          this.refresh();
          this.cleanFiels();
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
            'Situação Financeira cadastrado com sucesso!.',
            'Fechar'
            );
          this.refresh();
          this.cleanFiels();
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

  onEdit(situacao: SituacaoFinanceira) {
    console.log(situacao);
    this.form.get('id')?.setValue(situacao.id);
    this.form.get('nome')?.setValue(situacao.nome);
    this.form.get('descricao')?.setValue(situacao.descricao);
    this.form.get('cor')?.setValue(situacao.cor);
    this.color = situacao.cor;
  }

  onDelete(atendente: SituacaoFinanceira) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.service.delete(atendente.id)
        .subscribe(() => {
          this.openSnackBar('Situação Financeira removido com sucesso!', 'Fechar');
          this.refresh();
        },
        () => this.onError('Erro ao tentar remover o aluno.')
        );
      }
    });
  }

  refresh() {
    this.situacoesList$ = this.service.listaSituacoes()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar');
        return of([] as SituacaoFinanceira[])
      })
    );
    this.color = '';
  }

  cleanFiels() {
    this.form.get('id')?.setValue(null);
    this.form.get('nome')?.setValue(null);
    this.form.get('descricao')?.setValue(null);
    this.form.get('cor')?.setValue(null);
  }

  onError(errorMensagem: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMensagem
    });
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

    return 'Campo Invalido';
  }
}
