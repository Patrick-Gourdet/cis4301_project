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
import { ProfileComponent } from './users/profile/profile.component';
import { HelpComponent } from './help/help.component';
import { AuthService } from "./users/auth.service";
import { AUTH_ROUTES } from "./users/auth.routes";
import { FooterComponent } from './footer/footer.component';
import {AuthGuard} from "./users/auth.guard";

const appRoutes: Routes=[

  {path: 'home', component: HomeComponent},
  {path: 'help', component: HelpComponent},
  { path: 'auth', children: AUTH_ROUTES },
  {path: '', redirectTo: '/home',pathMatch: 'full'}
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
    HelpComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes
      , { useHash: true,onSameUrlNavigation: 'reload' })
  ],
  providers: [AuthGuard, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
