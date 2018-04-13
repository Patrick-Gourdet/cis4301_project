import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from "@angular/router";
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users/users.component';
import { HomeComponent } from './home/home.component';
import {HeaderComponent} from "./header/header.component";
import { SigninComponent } from './users/signin/signin.component';
import { SignupComponent } from './users/signup/signup.component';
import { PopulartrendsComponent } from './populartrends/populartrends.component';
import { HttpModule } from '@angular/http';
// import { ProfileComponent } from './profile/profile.component';
import { HelpComponent } from './help/help.component';
import { AuthenticationComponent } from "./users/authentication.component";
import { AuthService } from "./users/auth.service";
import { AUTH_ROUTES } from "./users/auth.routes";
const appRoutes: Routes=[

  {path: 'home', component: HomeComponent},

  // {path: 'signin', component: SigninComponent},
  // {path: 'signup', component: SignupComponent},
  {path: 'popular-trends', component: PopulartrendsComponent},
  // {path: 'profile', component: ProfileComponent},
  {path: 'help', component: HelpComponent},
  { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
  {path: '', redirectTo: '/home',pathMatch: 'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    AuthenticationComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    PopulartrendsComponent,
    // ProfileComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes
      , { useHash: true })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
