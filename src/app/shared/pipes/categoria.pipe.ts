import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoria',
  standalone: true
})
export class CategoriaPipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'Herbeth': return 'code';
      case 'herbeth 2': return 'computer';
    }
    return 'home';
  }

}
