
import { environment } from './../environments/environment';
import { GroupModel } from './models/group-model';
import { PostModel } from './models/post-model';
import { UserModel } from './models/user-model';
import { TokenModel } from './models/token-model';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams, HttpRequest, HttpResponse, JsonpClientBackend } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  model: UserModel = {
    id: null,
    userName: "natan",
    password: "oijoj",
    email: "hoijo@gmial",
    createdAt: Date.now(),
    roles: [
      {
        id: 2,
        name: "ROLE_USER"
      }
    ]
  }

  encodeToken(token: TokenModel): HttpHeaders {
    console.log("in encode token method");
    console.log(token.accessToken);
    return new HttpHeaders().append('Authorization', `owner ${token.accessToken}`).append("Content-Type", "application/json");
  }

  initiateLogin(user: UserModel): Observable<TokenModel> {
    console.log("in initiate login")
    console.log(user);
    return this.http.post<TokenModel>(`${this.apiServerUrl}/login`, ``, {
      headers: new HttpHeaders().append('Content-Type', 'x-www-form-urlencoded').append('username', user.userName).append('password', user.password).append('email', user.email).append('isNew', "no")
    })
  }

  initiateSignIn(user: UserModel): Observable<TokenModel> {
    console.log("in initiate signin")
    return this.http.post<TokenModel>(`${this.apiServerUrl}/login`, '', {
      headers: new HttpHeaders().append('Content-Type', 'x-www-form-urlencoded').append('username', user.userName).append('password', user.password).append('email', user.email).append('isNew', "yes")
    })
  }

  getUser(token: TokenModel, id: number): Observable<UserModel> {
    console.log("in get user method");
    return this.http.post<UserModel>(`${this.apiServerUrl}/user`, id, {
      headers: this.encodeToken(token)
    });
  }

  getUsers(token: TokenModel): Observable<UserModel[]> {
    console.log("in get users method");
    let prepared: TokenModel = { accessToken: "", refreshToken: "" };
    let baseString: string = "owner ";
    console.log(baseString.concat(prepared.accessToken))
    prepared.accessToken = baseString.concat(token.accessToken);
    console.log();
    return this.http.post<UserModel[]>(`${this.apiServerUrl}/users`, '', {
      headers: new HttpHeaders().append('Authorization', token.accessToken).append('Content-Type', 'x-www-form-urlencoded')
    });
  }


  getGroup(token: TokenModel, id: number): Observable<GroupModel> {
    console.log("in get group method");
    return this.http.post<GroupModel>(`${this.apiServerUrl}/group`, id, {
      headers: this.encodeToken(token)
    });
  }
  getGroups(token: TokenModel): Observable<GroupModel[]> {
    console.log("in get groups method");
    return this.http.post<GroupModel[]>(`${this.apiServerUrl}/groups`, '', {
      headers: this.encodeToken(token)
    });
  }

}
