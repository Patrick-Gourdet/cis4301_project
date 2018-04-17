import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {User} from "../user.model";

import { AuthService } from "./../auth.service";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user_id: '';
  password: '';

  message: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  signIn() {


    const user = {USER_ID:this.user_id,PASSWORD: this.password};
    console.log(this.user_id);
    this.authService.signin(user)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          this.router.navigateByUrl('/auth/profile');
        },
        error => console.error(error)
      );
  }
}
