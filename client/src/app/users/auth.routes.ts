import { Routes,CanActivate } from "@angular/router";
import {AuthGuard} from "./auth.guard";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";
import {ProfileComponent} from "./profile/profile.component";
import {PopulartrendsComponent} from "../populartrends/populartrends.component";
// import { LogoutComponent } from "./logout.component";

export const AUTH_ROUTES: Routes = [
    // { path: '', redirectTo: 'signup', pathMatch: 'full' },
    {path: 'popular-trends',canActivate:[AuthGuard], component: PopulartrendsComponent},
    {path: 'profile',canActivate:[AuthGuard], component: ProfileComponent},
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent }
    // ,
    // { path: 'logout', component: LogoutComponent }
];
