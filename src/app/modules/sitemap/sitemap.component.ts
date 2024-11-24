import { Component, OnInit } from '@angular/core';
import { SitemapService } from './sitemap.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sitemap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sitemap.component.html',
  styleUrl: './sitemap.component.scss'
})
export class SitemapComponent  implements OnInit {
  xmlContent: any;

  constructor(private sitemapService: SitemapService) {}

  ngOnInit() {
    this.sitemapService.getSitemap().subscribe((data: string) => {
      this.parseXML(data);
    });
  }

  parseXML(data: string) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'application/xml');
  
    // Jeśli XML zawiera przestrzeń nazw, użyj getElementsByTagNameNS
    const urls = xml.getElementsByTagNameNS('http://www.sitemaps.org/schemas/sitemap/0.9', 'url');
  
    // Wyświetl liczbę elementów <url>
    console.log('Found <url> elements with namespace:', urls.length);
  
    // Konwertuj NodeList na tablicę
    this.xmlContent = Array.from(urls);
  }
}
