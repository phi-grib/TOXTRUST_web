import { Pipe, PipeTransform } from '@angular/core';

@Pipe({

  name: 'capitalize',
  standalone:true
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value; // Manejo de valor nulo o vacío
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

}