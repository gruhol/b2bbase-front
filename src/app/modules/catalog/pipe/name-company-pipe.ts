import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'legalform'
})

export class NameCompanyPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
        case 'JDG':
          return "Działalność jednoosobowa";
        case 'SC':
          return "Spółka cywilna";
        case 'SJ':
          return "Spółka jawna";
        case 'SP':
          return "Spółka partnerska";
        case 'SK':
          return "Spółka komandytowa";
        case 'SKA':
          return "Spółka komandytowo-akcyjna";
        case 'ZOO':
          return "Spółka z ograniczoną odpowiedzialnością";
        case 'PSA':
          return "Prosta spółka akcyjna";
        case 'SA':
          return "Spółka akcyjna";
        default:
          return "Brak danych";
      }
  }
}