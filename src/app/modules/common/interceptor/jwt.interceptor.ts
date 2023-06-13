import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JwtService } from "../service/jwt.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor  {

    constructor(private jwtService: JwtService) {}

    intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.jwtService.getToken();
        if (token) {
            req = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + token)
            })
        }
        return next.handle(req);
    }
}