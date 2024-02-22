import { Data } from '@angular/router';

import { Atendente } from './atendente';
import { Endereco } from './endereco';
import { SituacaoFinanceira } from './situacao-financeira';

export interface Aluno {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  nome_socio: string;
  email_socio: string;
  telefone_socio: string;
  nota_acompanhamento: string;
  satisfacao: string;
  data_entrada: Data;
  data_criacao: Data;
  data_renovacao: Data;
  data_ultimo_contrato: Data;
  data_ultimo_acompanhamento: Data;
  data_proximo_contato: Data;
  vigencia_contrato: number;
  ultima_resposta: number;
  mentoria: number;
  ciclo_matricula: number;
  renovado: number;
  removido: number;
  endereco?: Endereco;
  atendente: Atendente;
  situacao_financeira: SituacaoFinanceira;
}
