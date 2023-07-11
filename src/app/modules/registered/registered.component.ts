import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.scss']
})
export class RegisteredComponent implements OnInit {
  
  private checker!: string | null;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.checker = this.activatedRouter.snapshot.paramMap.get('registration')
    if (this.checker != 'yes') this.router.navigate(["/"])
  }

}
