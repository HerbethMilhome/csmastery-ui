import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { delay, Observable, of } from 'rxjs';

import { SituacaoFinanceiraService } from '../services/situacao-financeira.service';
import { SituacaoFinanceira } from '../model/situacao-financeira';

@Injectable({
  providedIn: 'root'
})
export class SituacaoFinanceiraResolver  {

  constructor(private service: SituacaoFinanceiraService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SituacaoFinanceira> {
    if (route.params && route.params['id']) {
      return this.service.getById(route.params['id']);
    }

    return of({ id: '', nome: '', descricao: '', cor: '' }).pipe(delay(0));

  }
}
