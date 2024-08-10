import { Aluno } from "./aluno";

export interface AlunoPage {
  alunos: Aluno[];
  totalElements: number;
  totalPages: number;
}
