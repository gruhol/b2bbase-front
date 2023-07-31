import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SendPasswordService } from './send-password.service';

@Component({
  selector: 'app-send-password',
  templateUrl: './send-password.component.html',
  styleUrls: ['./send-password.component.scss']
})
export class SendPasswordComponent {

  public tokenStatus!: boolean;

  constructor(
    private router: ActivatedRoute,
    private sentPasswordService: SendPasswordService
  ) {}
  
  ngOnInit(): void {
    let token = this.router.snapshot.params['token'];
    this.sentPasswordService.checktoken(token)
      .subscribe(result => {
        if (result === true) {
          this.tokenStatus = true;
        } else {
          this.tokenStatus = false;
        }
      })
  }
}
