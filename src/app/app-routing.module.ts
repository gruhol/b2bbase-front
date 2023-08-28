import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './modules/user/registration/registration.component';
import { FullpageComponent } from './layouts/fullpage/fullpage.component';
import { LoggedComponent } from './modules/logged/logged.component';
import { RoleUserAuthorizeGuard } from './modules/common/guard/RoleUserAuthorizeGuard';
import { LoginComponent } from './modules/user/login/login.component';
import { RegisteredComponent } from './modules/user/registered/registered.component';
import { LinkveryficationComponent } from './modules/user/linkveryfication/linkveryfication.component';
import { RememberPasswordComponent } from './modules/user/remember-password/remember-password.component';
import { SendPasswordComponent } from './modules/user/send-password/send-password.component';
import { EditUserComponent } from './modules/user/edit-user/edit-user.component';
import { AddCompanyComponent } from './modules/company/add-company/add-company.component';

const routes: Routes = [
  {
    path:'', component: FullpageComponent, children: [
      {path: 'registration', title: 'Rejestracja użytkownika', component: RegistrationComponent},
      {path: 'login', title: 'Rejestracja użytkownika', component: LoginComponent},
      {path: 'registered', title: 'Rejestracja zakończona', component: RegisteredComponent},
      {path: 'logged', title: 'Zalogowany!', component: LoggedComponent, canActivate: [RoleUserAuthorizeGuard]},
      {path: 'verify/:token', title: 'Weryfikacja adresu email!', component: LinkveryficationComponent},
      {path: 'remember-password', title: 'Przypomnienie hasła', component: RememberPasswordComponent},
      {path: 'send-password/:token', title: 'Weryfikacja adresu email', component: SendPasswordComponent},
      {path: 'edit-user', title: 'Edycja użytkownika', component: EditUserComponent, canActivate: [RoleUserAuthorizeGuard]},
      {path: 'add-company', title: 'Dodawanie nowej firmy', component: AddCompanyComponent, canActivate: [RoleUserAuthorizeGuard]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
