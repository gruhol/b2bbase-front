import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'paymentstatus'
})

export class PaymentStatusPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
        case 'NOTPAID':
          return "Nieopłacone";
        case 'PAID':
          return "Zapłacono";
        default:
          return "Brak danych";
      }
  }
}