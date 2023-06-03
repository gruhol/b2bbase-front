import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './modules/registration/registration.component';
import { FullpageComponent } from './layouts/fullpage/fullpage.component';

const routes: Routes = [
  {
    path:'', component: FullpageComponent, children: [
      {path: 'registration', title: 'Rejestracja użytkownika', component: RegistrationComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
