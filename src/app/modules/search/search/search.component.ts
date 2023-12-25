import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  keyword: string = '';

  constructor(
    private activatedRouter: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.keyword = this.activatedRouter.snapshot.params['keyword'];
  }



}
