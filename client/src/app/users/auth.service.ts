import { Injectable } from "@angular/core";
import { Http, Headers, Response,HttpModule } from "@angular/http";
import {Router} from "@angular/router";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "./user.model";

@Injectable()
export class AuthService {
    constructor(private router:Router, private http: Http) {}

    signup(User1) {
        const body = JSON.stringify(User1);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    signin(User1:{}) {
        const body = JSON.stringify(User1);
        console.log(User1)
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/api/profile-signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    logout() {
        localStorage.clear();

      this.router.navigate(['/']);
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}
