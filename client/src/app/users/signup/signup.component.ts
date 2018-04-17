import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import {User} from "../user.model";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  fname: string;
  lname: string;
  userid: string;
  password: string;
  dob: string;
  country: string;
  message: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  addUser(){
    const user = new User(this.userid, this.password, this.country, this.fname, this.lname);

    this.http.post('api/add-profile', user)
      .subscribe(res => {
          this.message = res;
          console.log(this.message);
          this.router.navigate(['auth/profile']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
