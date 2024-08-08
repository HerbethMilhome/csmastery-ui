export enum FieldEnum {
  nome = 1,
  telefone = 2,
  email = 3
}

export function getFieldById(id: number): string {
  return FieldEnum[id];
}
