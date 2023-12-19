import { Component, OnInit } from '@angular/core';
import { UserPanelService } from './user-panel.service';
import { CompanyToEditDto } from 'src/app/modules/company/add-company/dto/CompanyToEditDto';
import { EditUserService } from '../../edit-user/edit-user.service';
import { User } from '../../edit-user/dto/user';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit{

  company!: CompanyToEditDto | undefined;
  user!:  User | undefined;

  constructor(
    private userPanelService: UserPanelService,
    private editUserService: EditUserService,
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getCompany();
  }

  getUser() {
    this.editUserService.getUser()
    .subscribe({
      next: user => {
        this.user = user;
      },
      error:  error => {
        this.user = undefined;
      }
    });
  }

  getCompany() {
    this.userPanelService.getCompany()
      .subscribe({
        next: product => { 
          this.company = product;
        },
        error:  () => {
          this.company = undefined;
        }
    });
  }

  private mapFormValues(companyDto: CompanyToEditDto): void {
    if (companyDto !== undefined) {
      if (this.company === undefined) {
        this.company = {} as CompanyToEditDto;
      }
      this.company.name = companyDto.name ?? this.company.name;
      this.company.type = companyDto.type ?? this.company.type;
      this.company.legalForm = companyDto.legalForm ?? this.company.legalForm;
      this.company.nip = companyDto.nip ?? this.company.nip;
      this.company.regon = companyDto.regon ?? this.company.regon;
      this.company.krs = companyDto.krs ?? this.company.krs;
      this.company.email = companyDto.email ?? this.company.email;
      this.company.phone = companyDto.phone ?? this.company.phone;
      this.company.wwwSite = companyDto.wwwSite ?? this.company.wwwSite;
      this.company.wwwStore = companyDto.wwwStore ?? this.company.wwwStore;
      this.company.ediCooperation = companyDto.ediCooperation ?? this.company.ediCooperation;
      this.company.apiCooperation = companyDto.apiCooperation ?? this.company.apiCooperation;
      this.company.productFileCooperation = companyDto.productFileCooperation ?? this.company.productFileCooperation;
    }
  }

  getType(type: string): string {
    if (type === 'CUSTOMER') return "Klient hurtowy"
    if (type === 'WHOLESALER') return "Hurtownia"
    if (type === 'BOTH') return "Klient hurtowy oraz hurtownia"
    return '';
  }
}
