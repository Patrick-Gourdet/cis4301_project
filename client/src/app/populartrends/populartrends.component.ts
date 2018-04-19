import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-populartrends',
  templateUrl: './populartrends.component.html',
  styleUrls: ['./populartrends.component.css']
})
export class PopulartrendsComponent implements OnInit {
projects: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  getProjects(){
    this.http.get('api/kickstarter-projects').subscribe(data => {
      this.projects = data;
    })
  }
}
