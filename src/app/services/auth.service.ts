import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from './data.service';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { UserRegister } from '../models/auth/user-register';
import { UserLogin } from '../models/auth/user-login';
import { ApiService } from './api.service';
import { UserInfo } from '../models/user-info';

const authUserDataCookieKey = 'authTokenCookieKey';

class UserData
{
  public tokenResponse: string;
  public userInfo: UserInfo;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private userData = new UserData();

  constructor(private dataService: DataService, private cookieService: CookieService, 
              private http: HttpClient, private api: ApiService)
  {
    if (this.cookieService.check(authUserDataCookieKey))
    {
      const cookieData = this.cookieService.get(authUserDataCookieKey);
      if (cookieData.length > 0)
      {
        this.userData = JSON.parse(cookieData);
      }
    }
  }

  public getFakeUser()
  {
    return this.http.get('http://www.mocky.io/v2/5c979f272f000057009f2e67')
  }

  public get userInfo() {
    return this.userData.userInfo;
  }

  public register(registerData: UserRegister)
  {
    const url = this.api.baseUrl + 'users/register';
    return this.http.post(url, registerData, { observe: 'response' });
  }

  public signIn(credentials: UserLogin, callback)
  {
    const url = 'https://localhost:8443/oauth/token';

    let body = `username=${credentials.username}&password=${credentials.password}&grant_type=password`;
    
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('authorization', 'Basic c3VydmV5LWNsaWVudDpzdXJ2ZXktc2VjcmV0');
    headers = headers.append('content-type', 'application/x-www-form-urlencoded');
    
    console.log(headers);

    this.http.post(url, body, {  headers: headers, observe: 'response' }).subscribe( (response) => {
      this.userData.tokenResponse = (response as any).body.access_token;
      this.loadUserInfo();
      callback();
    });
  }

  public loadUserInfo() {
    const url = this.api.baseUrl + `users/access-token/${this.userData.tokenResponse}`;

    this.http.get<UserInfo>(url).subscribe((userInfo: UserInfo) => {
      this.userData.userInfo = userInfo;
      this.cookieService.set(authUserDataCookieKey, JSON.stringify(this.userData));
    });
  }

  public signOut()
  {
    this.cookieService.set(authUserDataCookieKey, '');
    this.userData = new UserData();
  }

  public get authorizationHeaderValue(): string
  {
    if (this.userData.tokenResponse === null)
    {
      return null;
    }
    return this.userData.tokenResponse;
  }

  public get isUserLoggedIn(): boolean
  {
    return false;
  }
}
