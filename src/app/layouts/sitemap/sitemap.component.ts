import { Component } from '@angular/core';
import { SitemapService } from './sitemap.service';

@Component({
  selector: 'app-sitemap',
  template: ``
})
export class SitemapComponent {
  constructor(private siteMapService: SitemapService) { }

  downloadXml() {
    this.siteMapService.downloadXml().subscribe(data => {
      const xmlBlob = new Blob([data], { type: 'application/xml' });
      const url = window.URL.createObjectURL(xmlBlob);
      window.open(url);
    });
  }

  ngOnInit(): void {
    this.downloadXml();
  }

  
}
