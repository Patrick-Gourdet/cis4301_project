import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  user  = {USER_ID: '',PASSWORD: '',DOB: '',COUNTRY: '',FNAME: '',LNAME: ''};
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  addUser(){
    this.user.FNAME = this.fname, this.user.LNAME = this.lname, this.user.PASSWORD = this.password
    ,this.user.USER_ID = this.userid,this.user.COUNTRY = this.country, this.user.DOB = this.dob;
    console.log(typeof JSON.stringify(this.user) + "THIS IS TYPE");
    this.http.post('api/add-profile', this.user)
      .subscribe(res => {
          this.message = res;
          console.log(this.message);
          this.router.navigate(['home']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
