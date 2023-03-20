import { Injectable } from '@angular/core';
import {LogInDTO} from "../models/LogInDTO";
import {BehaviorSubject, map, Observable, of, tap} from "rxjs";
import {User} from "../models/User";
import {HttpClient, HttpResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Login} from "../models/Login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  public success: boolean = false;
  userWithToken!: User;

  get token() {
    return localStorage.getItem('user_auth');
  }

  constructor(private http: HttpClient, private router: Router) {
    console.log(this.userSubject);
    if(localStorage.getItem('user_auth') !== undefined && localStorage.getItem('user_auth') !== null) {
      console.log("hi");
      this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user_auth') || '{}'));
      console.log(this.userSubject);
      this.user = this.userSubject.asObservable();
      // this.checkUser();
      this.user.subscribe(u => console.log(u));
    }
  }

  login(login: Login): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(environment.apiUrl + `/person`, login, { headers, observe: 'response' })
        .pipe(tap((res: HttpResponse<any>) => {
          //const token = this.extractToken(res);
          const token = res.headers.get('Authorization');
          console.log('Authorization token:', token);
          if (token != null || token != undefined) {
            const tokenExpDate = new Date().getTime() + 3600 * 1000; // Set expiration date to 1 hour from now
            const tokenData = { token, expiresAt: tokenExpDate };
            localStorage.setItem('user_auth', JSON.stringify(tokenData));
            this.userWithToken = this.getUser(token);
          }
        }));
  }

  private getUser(token: string): User {
    return JSON.parse(atob(token.split('.')[1])) as User;
  }

  isLoggedIn(): Observable<boolean> {
    if(localStorage.getItem('user_auth') !== undefined && localStorage.getItem('user_auth') !== null) {
      return of(true);
    } else {
      return of(false);
    }
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    localStorage.removeItem('expires_at');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
