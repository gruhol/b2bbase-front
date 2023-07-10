import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { JwtService } from "../service/jwt.service";
import { Injectable } from "@angular/core";

@Injectable()
export class RoleUserAuthorizeGuard implements CanActivate {

    private hasRole?: Boolean = false;

    constructor(
        private jwtService: JwtService,
        private router: Router
        ) {
            this.jwtService.hasRole("ROLE_USER").subscribe(aaa => this.hasRole = aaa);
        }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        console.log(this.hasRole)

        if (!this.jwtService.isLoggedIn()) {
            this.router.navigate(["/login"]);
        }

        if (!this.hasRole) {
            this.router.navigate(["/login"]); 
        }
        return true;
    }
}