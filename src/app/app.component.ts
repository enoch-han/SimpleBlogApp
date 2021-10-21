import { UserServicesService } from './user-services.service';
import { TokenModel } from './models/token-model';
import { Component, OnInit } from '@angular/core';
import { UserModel } from './models/user-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SimpleBlogApp';
  public token: TokenModel = { accessToken: "", refreshToken: "" };
  users: any;
  constructor(private userService: UserServicesService) { }
  async ngOnInit() {
    // this.token = await this.getTokens(this.model);
    // console.log("in on init mehtod");
    // console.log(this.token);
    // console.log(this.getUsers(await this.getTokens(this.model)));
  }

  model: UserModel = {
    id: null,
    userName: "henock",
    password: "1234",
    email: "henock@gmail.com",
    createdAt: Date.now(),
    roles: [
      {
        id: 2,
        name: "ROLE_USER"
      }
    ]
  }

  public async getTokens(user: UserModel): Promise<TokenModel> {
    console.log("in get tokens method")
    return new Promise((resolve, reject) => {
      this.userService.initiateLogin(user).subscribe(
        (response: TokenModel) => {
          console.log("response is token model type")
          console.log(this.token);
          resolve(response);
        }, (error: HttpErrorResponse) => {
          alert(error.message)
          reject("unable to get tokens")
        }
      )
    })
  }

  public getUsers(toke: TokenModel): void {
    console.log("in get users method app component");
    this.userService.getUsers(this.token).subscribe(
      (response: UserModel[]) => {
        this.users = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


}
