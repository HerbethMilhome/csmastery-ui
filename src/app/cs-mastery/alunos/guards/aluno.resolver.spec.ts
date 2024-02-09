import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { alunoResolver } from './aluno.resolver';

describe('alunoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => alunoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
