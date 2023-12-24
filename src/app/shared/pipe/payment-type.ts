import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'paymenttype'
})

export class PaymentTypePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
        case 'BANK_TRANSFER':
          return "Przelew bankowy";
        default:
          return "Brak danych";
      }
  }
}