import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewpageService } from './viewpage.service';
import { Meta, Title } from '@angular/platform-browser';
import { commonValues } from 'src/app/shared/common-values';

@Component({
  selector: 'app-viewpage',
  templateUrl: './viewpage.component.html',
  styleUrls: ['./viewpage.component.scss']
})
export class ViewpageComponent implements OnInit {

  slug: string = '';
  title: string = '';
  content: string = '';
  messageError: string = "";
  notFound: boolean = false;
  editDate!: Date;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ViewpageService,
    private titleService: Title,
    private meta: Meta,
  ) {

    this.activatedRoute.params.subscribe(params => {
      this.slug = params['slug'];
    });
  }

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    this.service.getPage(this.slug).subscribe({
      next: response => {
        this.title = response.title;
        this.content = response.content;
        this.slug = response.content;
        this.editDate = response.editDate;

        this.titleService.setTitle( response.title + " - " + commonValues.userSite);
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(`<!doctype html><body>${this.content}`, 'text/html').body.textContent;
        this.meta.updateTag({ name: 'description', content: decodedString!.substring(0, 170) });

      },
      error: () => this.notFound = true
    })
  }


}
