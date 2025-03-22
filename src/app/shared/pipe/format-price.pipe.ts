import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice',
  standalone: true
})
export class FormatPricePipe implements PipeTransform {

  transform(value: number): string {
    return value.toFixed(2) + ' zł';
  }

}
