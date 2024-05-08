import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkveryficationService } from './linkveryfication.service';

@Component({
  selector: 'app-linkveryfication',
  templateUrl: './linkveryfication.component.html',
  styleUrls: ['./linkveryfication.component.scss']
})
export class LinkveryficationComponent implements OnInit {

  public tokenStatus!: boolean;

  constructor(
    private router: ActivatedRoute,
    private linkveryfication: LinkveryficationService
  ) {}
  
  ngOnInit(): void {
    let token = this.router.snapshot.params['token'];
    // this.linkveryfication.checktoken(token)
    //   .subscribe(result => {
    //     if (result === true) {
    //       this.tokenStatus = true;
    //     } else {
    //       this.tokenStatus = false;
    //     }
    //   })
    this.tokenStatus = true;
  }


}
