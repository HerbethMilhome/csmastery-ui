import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { delay, Observable, of } from 'rxjs';

import { Aluno } from '../../../model/aluno';
import { AlunosService } from '../../../services/alunos.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoResolver  {

  constructor(private service: AlunosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Aluno> {
    if (route.params && route.params['id']) {
      return this.service.getById(route.params['id']);
    }

    return of({ id: '', nome: '', email: '', cpf: '', telefone: '', nome_socio: '', email_socio: '',
              telefone_socio: '', status_financeiro: '', nota_acompanhamento: '', satisfacao: '',
              data_entrada: Date, data_criacao: Date, data_renovacao: Date, data_ultimo_contrato: Date,
              data_ultimo_acompanhamento: Date, data_proximo_contato: Date, vigencia_contrato: 0,
              ultima_resposta: 0, mentoria: 0, ciclo_matricula: 0, renovado: 0, removido: 0,
              endereco: {
                id: '',
                logradouro: '',
                numero: '',
                complemento: '',
                bairro: '',
                cidade: '',
                estado: '',
                cep: ''
              },
              atendente: {
                id: '',
                nome: '',
                email: '',
                telefone: '',
                alunos: []
              }, }).pipe(delay(0));

  }
}
