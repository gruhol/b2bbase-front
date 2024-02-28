import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewpageService } from './viewpage.service';
import { Title } from '@angular/platform-browser';
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
    private titleService: Title
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

      },
      error: () => this.notFound = true
    })
  }


}
