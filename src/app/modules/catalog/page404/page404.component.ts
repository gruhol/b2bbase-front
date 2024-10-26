import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.scss'
})
export class Page404Component implements OnInit {

  slug: string | null = '';

  constructor(
    private activatedRouter: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.slug = this.activatedRouter.snapshot.paramMap.get('url')
    console.log(this.slug)
  }

}

