import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatMenuPanel } from '@angular/material/menu';
import { Router } from '@angular/router';
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

  keyword!: FormControl;
  searchForm!: FormGroup;

  constructor(
    private jwtService: JwtService,
    private editUserService: EditUserService,
    private loginStatusService: LoginStatusService,
    private formBuilder: FormBuilder,
    private router: Router,
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

    this.createSearchFormControls();
    this.createSearchForm();
  }

  createSearchForm() {
    this.searchForm = this.formBuilder.group({
      keyword: this.keyword
    })
  }

  createSearchFormControls() {
    this.keyword = new FormControl('', [Validators.required]);
  }

  search() {
    let keyword;
    if (this.searchForm.valid) {
      keyword = this.searchForm.get('keyword')?.value;
    }
    this.searchForm.clearValidators();
    this.router.navigate(["/search/" + keyword]);
  }
}
