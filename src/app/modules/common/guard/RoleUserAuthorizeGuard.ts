import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { JwtService } from "../service/jwt.service";
import { Injectable, OnInit } from "@angular/core";

@Injectable()
export class RoleUserAuthorizeGuard implements CanActivate {

    private readonly role: string = "ROLE_USER";

    constructor(
        private jwtService: JwtService,
        private router: Router
        ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        if (!this.jwtService.isLoggedIn()) {
            this.router.navigate(["/login"]);
        }

        if (this.checkRole()) {
            return true; 
        } else {
            return false;
        }
    }

    private checkRole() {
        return this.jwtService.hasRole(this.role)
            .subscribe(hasRole => {
                if (hasRole) {
                    return true;
                } else {
                    this.router.navigate(["/login"]);
                    return false;
                }
            });
    }
}