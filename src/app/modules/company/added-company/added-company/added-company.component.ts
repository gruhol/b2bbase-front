import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-added-company',
  standalone: true,
  imports: [],
  templateUrl: './added-company.component.html',
  styleUrl: './added-company.component.scss'
})
export class AddedCompanyComponent {
  private checker!: string | null;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) {}
  
  ngOnInit() {
    this.checker = this.activatedRouter.snapshot.paramMap.get('added')
    if (this.checker != 'yes') this.router.navigate(["/"])
  }
}
