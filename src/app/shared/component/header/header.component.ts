import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatMenuPanel } from '@angular/material/menu';
import { Router } from '@angular/router';
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
    private editUserService: EditUserService,
    private loginStatusService: LoginStatusService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    if (!this.searchForm) {
      this.createSearchFormControls();
      this.createSearchForm();
    }
  }
  
  ngOnInit(): void {
    this.loadUserData();

    this.loginStatusService.getLoginStatus().subscribe((status: boolean) => {
      if (status) {
        this.loadUserData();
        this.logged = true;
      } else {
        this.username = 'Niezalogowany';
        this.logged = false;
      }
    });
  }

  loadUserData() {
    this.editUserService.getUser()
    .subscribe({
      next: user => {
        this.username = user.username;
        this.logged = true;
      },
      error: user => {
        this.username = 'Niezalogowany';
        this.logged = false;
      }
    });
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
    this.searchForm.reset();
  }
}
