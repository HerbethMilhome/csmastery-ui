import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { AtendenteService } from '../../../services/atendente.service';
import { Atendente } from '../../../model/atendente';

@Injectable({
  providedIn: 'root'
})
export class AtendenteResolver  {

  constructor(private service: AtendenteService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Atendente> {
    if (route.params && route.params['id']) {
      return this.service.getById(route.params['id']);
    }

    return of({ id: '', nome: '', email: '', telefone: '', alunos: [] }).pipe(delay(0));

  }
}
