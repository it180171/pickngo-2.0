import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, take} from 'rxjs';
import {AuthService} from "../services/auth.service";
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router, private jwtHelper: JwtHelperService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn().pipe(
        take(1),
        map((isLoggedIn: boolean) => {
          if (!isLoggedIn) {
            this.router.navigate(['login']);
            return false;
          } else {
            const token = localStorage.getItem('user_auth');
            const decodedToken = JSON.parse(atob(token!!.split('.')[1]));
            const roles = decodedToken.roles;
            // Check if the user has the required roles to access the route
            if (next.data && next.data['roles']) {
              console.log(next.data);
              const requiredRoles = next.data['roles'];
              const intersection = requiredRoles.filter((role: any) => roles.includes(role));
              if (intersection.length === 0) {
                this.router.navigate(['/']);
                console.log("hahaha");
                return false;
              }
            }
            return true;
          }
        })
    );
  }
}

