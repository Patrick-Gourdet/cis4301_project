import { Routes } from "@angular/router";

import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import {ProfileComponent} from "./profile/profile.component";
import {PopulartrendsComponent} from "../populartrends/populartrends.component";
// import { LogoutComponent } from "./logout.component";

export const AUTH_ROUTES: Routes = [
    // { path: '', redirectTo: 'signup', pathMatch: 'full' },
    {path: 'popular-trends', component: PopulartrendsComponent},
    {path: 'profile', component: ProfileComponent},
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent }
    // ,
    // { path: 'logout', component: LogoutComponent }
];
