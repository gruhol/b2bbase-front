import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './modules/registration/registration.component';
import { FullpageComponent } from './layouts/fullpage/fullpage.component';
import { LoggedComponent } from './modules/logged/logged.component';
import { RoleUserAuthorizeGuard } from './modules/common/guard/RoleUserAuthorizeGuard';
import { LoginComponent } from './modules/login/login.component';
import { RegisteredComponent } from './modules/registered/registered.component';
import { LinkveryficationComponent } from './modules/linkveryfication/linkveryfication.component';
import { RememberPasswordComponent } from './modules/remember-password/remember-password.component';
import { SendPasswordComponent } from './modules/send-password/send-password.component';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
