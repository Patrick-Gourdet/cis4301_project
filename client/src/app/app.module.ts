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

const appRoutes: Routes=[

  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home',pathMatch: 'full'},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},

]
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent
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
