import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from "@angular/router";
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users/users.component';
import { HomeComponent } from './home/home.component';
import {HeaderComponent} from "./header/header.component";
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PopulartrendsComponent } from './populartrends/populartrends.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpComponent } from './help/help.component';

const appRoutes: Routes=[

  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home',pathMatch: 'full'},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'popular-trends', component: PopulartrendsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'help', component: HelpComponent},

]
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    PopulartrendsComponent,
    ProfileComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
