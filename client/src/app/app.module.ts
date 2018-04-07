import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from "@angular/router";
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users/users.component';
import { HomeComponent } from './home/home.component';
import {HeaderComponent} from "./header/header.component";

const appRoutes: Routes=[

  {path: 'profile', component: UsersComponent},
  {path: 'home-page', component: HomeComponent},
  //{path: '', redirectTo: '/profile',pathMatch: 'full'},


];



// const appRoutes: Routes = [
//   {
//     path: 'books',
//     component: BookComponent,
//     data: { title: 'Book List' }
//   },
//   { path: '',
//     redirectTo: '/books',
//     pathMatch: 'full'
//   }
// ];
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes
      , { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
