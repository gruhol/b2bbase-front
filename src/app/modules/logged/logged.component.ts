import { Component } from '@angular/core';
import { JwtService } from '../common/service/jwt.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss']
})
export class LoggedComponent {

  roles!: Array<String>;

  constructor(private jwtService: JwtService) {}

  ngOnInit(): void {
    this.roles = this.jwtService.getRole();
  }
}
