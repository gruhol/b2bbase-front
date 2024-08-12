import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkveryficationService } from './linkveryfication.service';
import { JwtService } from '../../common/service/jwt.service';
import { LoginStatusService } from '../../common/service/login-status.service';

@Component({
  selector: 'app-linkveryfication',
  templateUrl: './linkveryfication.component.html',
  styleUrls: ['./linkveryfication.component.scss']
})
export class LinkveryficationComponent implements OnInit {

  public tokenStatus: boolean = true;

  constructor(
    private router: ActivatedRoute,
    private linkveryfication: LinkveryficationService,
    private jwtService: JwtService,
    private loginStatusService: LoginStatusService
  ) {}
  
  ngOnInit(): void {
    let token = this.router.snapshot.params['token'];
    // this.linkveryfication.checktoken(token)
    //   .subscribe(result => {
    //     if (result.verified === true) {
    //       this.tokenStatus = true;
    //       this.jwtService.setToken(result.token);
    //       this.loginStatusService.setLoginStatus(true);
    //       console.log(this.tokenStatus);
    //       console.log(this.jwtService.getToken());
    //     } else {
    //       this.tokenStatus = false;
    //     }
    //   })
  }


}
