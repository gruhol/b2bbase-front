import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-linkveryfication',
  templateUrl: './linkveryfication.component.html',
  styleUrls: ['./linkveryfication.component.scss']
})
export class LinkveryficationComponent implements OnInit {

  public token!: string;

  constructor(
    private router: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.token = this.router.snapshot.params['token'];
  }


}
