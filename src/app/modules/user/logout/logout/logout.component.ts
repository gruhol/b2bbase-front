import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/modules/common/service/jwt.service';
import { LoginStatusService } from 'src/app/modules/common/service/login-status.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit{

  constructor(
    private jwtService: JwtService,
    private loginStatusService: LoginStatusService,) {

  }
  ngOnInit(): void {
    this.jwtService.deleteToken();
    this.loginStatusService.setLoginStatus(true);
  }
}
