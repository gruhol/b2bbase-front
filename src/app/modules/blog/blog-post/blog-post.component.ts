import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { commonValues } from 'src/app/shared/common-values';
import { BlogService } from '../blog.service';
import { DOCUMENT } from '@angular/common';
import { BlogCategory } from '../dto/BlogCategory';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit {

  slug: string = '';
  title: string = '';
  content: string = '';
  messageError: string = "";
  notFound: boolean = false;
  addDate!: Date;
  editDate!: Date;
  fistName: string = '';
  lastName: string = '';
  category!: BlogCategory;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: BlogService,
    private titleService: Title,
    private meta: Meta,
    private _renderer2: Renderer2, 
        @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.slug = params.get('slug') || ''; // Get slug from paramMap
      this.getPage(); // Call getPage() whenever slug changes
    });
  }

  getPage() {
    this.service.getBlogPost(this.slug).subscribe({
      next: response => {
        this.title = response.title;
        this.content = response.content;
        this.slug = response.content;
        this.addDate = response.addDate;
        this.editDate = response.editDate;
        this.fistName = response.author.firstName;
        this.lastName = response.author.lastName;
        this.category = response.category;

        this.titleService.setTitle( response.title + " - " + commonValues.userSite);
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(`<!doctype html><body>${this.content}`, 'text/html').body.textContent;
        this.meta.updateTag({ name: 'description', content: decodedString!.substring(0, 170) });

        let script = this._renderer2.createElement('script');
        let personName = this.fistName + " " + this.lastName;
        script.type = `application/ld+json`;
        script.text = `
            {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": ${JSON.stringify(this.title)},
                "datePublished": ${JSON.stringify(this.addDate)},
                "dateModified": ${JSON.stringify(this.editDate)},
                "author": [{
                    "@type": "Person",
                    "name": ${JSON.stringify(personName)}
                }]
            }
        `;
        this._renderer2.appendChild(this._document.body, script);

      },
      error: () => this.notFound = true
    })
  }

}
