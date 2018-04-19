import {Component, OnInit} from '@angular/core';
import {AuthService} from "../users/auth.service"
import {Router} from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {

  }
  loggedIn(){
    let value = this.authService.isLoggedIn();
    return value;
  }
  logOut(){
    this.router.navigate(['/']);
    this.authService.logout();

  }



}
