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
import { EditCompanyComponent } from './modules/company/edit-company/edit-company.component';
import { CompanyPanelComponent } from './layouts/company-panel/company-panel.component';
import { BranchComponent } from './modules/branch/branch/branch.component';
import { EditBranchComponent } from './modules/branch/edit-branch/edit-branch.component';
import { AddBranchComponent } from './modules/branch/add-branch/add-branch.component';
import { AdditionalDataCompanyComponent } from './modules/company/additional-data-company/additional-data-company.component';
import { SocialLinkComponent } from './modules/social-link/social-link/social-link.component';
import { AddSocialLinkComponent } from './modules/social-link/add-social-link/add-social-link.component';
import { EditSocialLinkComponent } from './modules/social-link/edit-social-link/edit-social-link.component';
import { CompaniesCatalogComponent } from './modules/catalog/companies-catalog/companies-catalog.component';
import { CompanyCatalogComponent } from './modules/catalog/company-catalog/company-catalog.component';
import { LogoutComponent } from './modules/user/logout/logout/logout.component';
import { UserPanelComponent } from './modules/user/user-panel/user-panel.component';
import { HomePageComponent } from './modules/catalog/home-page/home-page.component';
import { SearchComponent } from './modules/search/search/search.component';
import { ViewpageComponent } from './modules/catalog/viewpage/viewpage.component';
import { AddedCompanyComponent } from './modules/company/added-company/added-company/added-company.component';
import { BlogPostListComponent } from './modules/blog/blog-post-list/blog-post-list.component';
import { BlogPostComponent } from './modules/blog/blog-post/blog-post.component';
import { BlogCategoryComponent } from './modules/blog/blog-category/blog-category.component';
import { HtmlPageComponent } from './modules/catalog/html-page/html-page.component';

const routes: Routes = [
  {
    path:'', component: FullpageComponent, children: [
      {path: '', title: 'Twoje centrum sprzedaży b2b - B2BPoint.pl', component: HomePageComponent},
      {path: 'registration', title: 'Rejestracja użytkownika', component: RegistrationComponent},
      {path: 'login', title: 'Rejestracja użytkownika', component: LoginComponent},
      {path: 'registered', title: 'Rejestracja zakończona', component: RegisteredComponent},
      {path: 'logged', title: 'Zalogowany!', component: LoggedComponent, canActivate: [RoleUserAuthorizeGuard]},
      {path: 'verify/:token', title: 'Weryfikacja adresu email!', component: LinkveryficationComponent},
      {path: 'remember-password', title: 'Przypomnienie hasła', component: RememberPasswordComponent},
      {path: 'send-password/:token', title: 'Weryfikacja adresu email', component: SendPasswordComponent},
      {path: 'edit-user', title: 'Edycja użytkownika', component: EditUserComponent, canActivate: [RoleUserAuthorizeGuard]},
      {path: 'add-company', title: 'Dodawanie nowej firmy', component: AddCompanyComponent, canActivate: [RoleUserAuthorizeGuard]},
      {path: 'added-company', title: 'Dodano firmę', component: AddedCompanyComponent},
      {path: 'catalog', title: 'Hurtownie', component: CompaniesCatalogComponent},
      {path: 'company/:slug', title: 'Hurtownia', component: CompanyCatalogComponent},
      {path: 'logout', title: 'Wylogowano', component: LogoutComponent},
      {path: 'user-panel', title: 'Panel użytkownika', component: UserPanelComponent, canActivate: [RoleUserAuthorizeGuard]},
      {path: 'search/:keyword', title: 'Wyszukiwarka', component: SearchComponent},
      {path: 'page/:slug', title: 'Strona statyczna', component: ViewpageComponent},
      {path: 'blog', title: "Blog", component: BlogPostListComponent},
      {path: 'blog/:slug', title: "Blog", component: BlogPostComponent},
      {path: 'blog/category/:slug', title: "Blog - Kategoria", component: BlogCategoryComponent},
      {path: 'pl/:slug', title: "Html Page", component: HtmlPageComponent}
    ]
  },
  {
    path:'', component: CompanyPanelComponent, children: [
      {path: 'edit-company', title: 'Edytuj dane firmy', component: EditCompanyComponent, canActivate: [RoleUserAuthorizeGuard]},
      {path: 'branch', title: 'Oddziały firmy', component: BranchComponent, canActivate: [RoleUserAuthorizeGuard]},
      {path: 'edit-branch/:id', title: 'Edytuj Oddziały firmy', component: EditBranchComponent, canActivate: [RoleUserAuthorizeGuard]},
      {path: 'add-branch', title: 'Dodaj Oddziały firmy', component: AddBranchComponent, canActivate: [RoleUserAuthorizeGuard]},
      {path: 'additional-data', title: 'Dodaj Oddziały firmy', component: AdditionalDataCompanyComponent, canActivate: [RoleUserAuthorizeGuard]},
      {path: 'social-link', title: 'Linki do social link', component: SocialLinkComponent, canActivate: [RoleUserAuthorizeGuard]},
      {path: 'edit-social-link/:id', title: 'Edytuj social link', component: EditSocialLinkComponent, canActivate: [RoleUserAuthorizeGuard]},
      {path: 'add-social-link', title: 'Add social link', component: AddSocialLinkComponent, canActivate: [RoleUserAuthorizeGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
