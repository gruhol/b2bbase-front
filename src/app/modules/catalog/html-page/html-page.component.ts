import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HtmlPageService } from './html-page.service';
import { commonValues } from 'src/app/shared/common-values';

@Component({
  selector: 'app-html-page',
  templateUrl: './html-page.component.html',
  styleUrl: './html-page.component.scss'
})
export class HtmlPageComponent {

  slug: string = '';
  title: string = '';
  content: string = '';
  messageError: string = "";
  notFound: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: HtmlPageService,
    private titleService: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.slug = params.get('slug') || ''; // Get slug from paramMap
      this.getPage(); // Call getPage() whenever slug changes
    });
  }

  getPage() {
    this.service.getPage(this.slug).subscribe({
      next: response => {
        this.title = response.title;
        this.content = response.content;

        this.titleService.setTitle( response.title + " - " + commonValues.userSite);
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(`<!doctype html><body>${this.content}`, 'text/html').body.textContent;
        this.meta.updateTag({ name: 'description', content: decodedString!.substring(0, 170) });

      },
      error: () => this.notFound = true
    })
  }

}
