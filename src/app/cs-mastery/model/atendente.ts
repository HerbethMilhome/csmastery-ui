import { Aluno } from "./aluno";

export interface Atendente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  alunos: Aluno[];
}
