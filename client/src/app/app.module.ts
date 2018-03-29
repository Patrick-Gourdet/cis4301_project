import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from "@angular/router";
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users/users.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes=[
  {path: '', component: UsersComponent},
 //  {path: '/', component: HomeComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
