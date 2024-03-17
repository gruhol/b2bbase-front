import { Component } from '@angular/core';
import { SitemapService } from './sitemap.service';

@Component({
  selector: 'app-sitemap',
  template: ``
})
export class SitemapComponent {
  constructor(private siteMapService: SitemapService) { }

  ngOnInit(): void {
    this.downloadXML();
  }

  downloadXML() {
    fetch('api/sitemap.xml')
    .then(response => response.text())
    .then(xmlData => {
        const element = document.createElement('a');
        const file = new Blob([xmlData], {type: 'application/xml'});
        element.href = URL.createObjectURL(file);
        element.download = 'sitemap.xml';
        document.body.appendChild(element);
        element.click();
    })
    .catch(error => console.error('Błąd pobierania pliku XML:', error));
  }
}
