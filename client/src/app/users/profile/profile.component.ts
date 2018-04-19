import { Component, OnInit } from '@angular/core';
import {User} from "../user.model";
import {Observable} from "rxjs/Rx";
import {Headers, Response,Http} from "@angular/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fname: string;
  lname: string;
  userid: string;
  password: string;
  country: string;
  message: any;

  user = new User('', '', '', '', '');

  constructor(private http:Http) { }

  ngOnInit() {
    this.user.USER_ID = localStorage.getItem('user_id');
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch('api/user-profile',this.user, {headers: headers}).subscribe(
        data => {

          this.message = data.json();
          console.log(typeof(data.text()));

        },
        error => console.error(error)
      );
  }

}
