import { Component, OnInit } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';
import { JwtService } from 'src/app/modules/common/service/jwt.service';
import { LoginStatusService } from 'src/app/modules/common/service/login-status.service';
import { EditUserService } from 'src/app/modules/user/edit-user/edit-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logged: boolean = false;
  menu!: MatMenuPanel<any>|null;
  username: string = 'Niezalogowany';

  constructor(
    private jwtService: JwtService,
    private editUserService: EditUserService,
    private loginStatusService: LoginStatusService,
  ) {}
  
  ngOnInit(): void {
    this.logged = this.jwtService.isLoggedIn();

    this.editUserService.getUser()
    .subscribe({
      next: user => {
        this.username = user.username;
      },
      error: user => {
        this.username = 'Niezalogowany';
      }
    });

    this.loginStatusService.getLoginStatus().subscribe((status: boolean) => {
      if (status) {
        this.ngOnInit();
      }
    });
  }
}
