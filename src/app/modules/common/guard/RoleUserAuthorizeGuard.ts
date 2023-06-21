import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { JwtService } from "../service/jwt.service";
import { Injectable } from "@angular/core";

@Injectable()
export class RoleUserAuthorizeGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private router: Router
        ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        if (!this.jwtService.isLoggedIn()) {
            this.router.navigate(["/login"]);
        }

        this.jwtService.hasRole("ROLE_USER").subscribe(boolen => {
            if (!boolen) this.router.navigate(["/login"]); 
        })
        return true;
    }
}