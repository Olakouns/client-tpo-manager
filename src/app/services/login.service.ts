import {Inject, inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserData} from "../payload/user-data";
import {TPOData} from "../models/tpodata";
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {ApiResponse} from "../payload/api-response";
import {isPlatformBrowser} from "@angular/common";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpclient: HttpClient = inject(HttpClient);

  constructor(@Inject(PLATFORM_ID) private platformId: any, private router: Router) {
  }

  login(loginInfo: any): Observable<ApiResponse> {
    return this.httpclient.post<UserData>(`${environment.BASE_LOGIN_URL}/login`, loginInfo).pipe(map((response: any) => {      
      localStorage.setItem("token", JSON.stringify(response));
      return response;
    }));
  }

  isAuth() {
    if (!isPlatformBrowser(this.platformId)) return false;
    const token: UserData = JSON.parse(localStorage.getItem("token")!);
    if (token == null) {
      return false;
    }
    try {
      if (token.expiryToken <= new Date().getTime() - 86400000) {
        this.logout();
        return false;
      }
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  logout(admin = false) {
    localStorage.clear();
    this.router.navigateByUrl("").then();

  }

  getAccessToken() {
    if (!this.isAuth()) {
      return null;
    }
    const token: UserData = JSON.parse(localStorage.getItem("token")!);
    return token.token;
  }
}
