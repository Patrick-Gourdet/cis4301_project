import {Component, EventEmitter, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GoogleChartComponent} from '../google-chart/google-chart.component';
@Component({
  selector: 'app-populartrends',
  templateUrl: './populartrends.component.html',
  styleUrls: ['./populartrends.component.css']
})
export class PopulartrendsComponent implements OnInit {
projects: any;
percent: any;
time:any;
sfc:any;
cat:any;
total = false;
public pie_ChartData:any;
public pie_ChartOptions:any;
public line_ChartData:any;
public line_ChartOptions:any;
public line_ChartDataSFC:any;
public line_ChartOptionsSFC:any;
public bar_ChartData:any;
public bar_ChartOptions:any
show = false;
showLine = false;
showLineSFC = false;
showBar=false;
piecharCreated = new EventEmitter<{chartOptions1,chartType,chartData1,ele}>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  getProjects(){
    this.http.get('api/kickstarter-projects').subscribe(data => {
      this.projects = data;
    })
    this.total = true;
  }
  getPercents(){
    this.http.get('api/SFC').subscribe(data=>{
      this.percent = data;
    })

  }
  getTimeLine(){
    this.http.get('api/time').subscribe(data=>{
      this.time = data;
    })
  }
  getTimeLineSFC(){
    this.http.get('api/sfc-time').subscribe(data=>{
      this.sfc = data;
    })
  }
  getTopCat(){
    this.http.get('api/cat-income').subscribe(data=>{
      this.cat = data;
    })
  }
  showBarChart(){
    this.bar_ChartData = [
      ['Category', 'Funding',],
      [this.cat[0][0], this.cat[0][1]],
      [this.cat[1][0], this.cat[1][1]],
      [this.cat[2][0], this.cat[2][1]],
      [this.cat[3][0], this.cat[3][1]],
      [this.cat[4][0], this.cat[4][1]],
      [this.cat[5][0], this.cat[5][1]],
      [this.cat[6][0], this.cat[6][1]],
      [this.cat[7][0], this.cat[7][1]],
      [this.cat[8][0], this.cat[8][1]],
      [this.cat[9][0], this.cat[9][1]],
      [this.cat[10][0], this.cat[10][1]],
      [this.cat[11][0], this.cat[11][1]],
      [this.cat[12][0], this.cat[12][1]],
      [this.cat[13][0], this.cat[13][1]],
      [this.cat[14][0], this.cat[14][1]]
    ];
    this.bar_ChartOptions ={
      title: 'Population of Largest U.S. Cities',
      width: 600,
      height: 400,
      hAxis: {
        title: 'Hiest Funded by Category',

        minValue: 0
      },
      vAxis: {
        title: 'Funding'
      }
    };
    this.showBar=true;
  }
  showLineGraphTime(){
    this.line_ChartDataSFC =[
      ['Year', 'Projects Failed','Projects Succeded', 'Projects Canceled'],
      ['2009',  this.sfc[0][0],this.sfc[0][7], this.sfc[0][14]],
      ['2010',  this.sfc[0][1], this.sfc[0][8],this.sfc[0][15]],
      ['2011',  this.sfc[0][2], this.sfc[0][9],this.sfc[0][16]],
      ['2012',  this.sfc[0][3], this.sfc[0][10],this.sfc[0][17]],
      ['2013',  this.sfc[0][4], this.sfc[0][11],this.sfc[0][18]],
      ['2014',  this.sfc[0][5], this.sfc[0][12],this.sfc[0][19]],
      ['2015',  this.sfc[0][6], this.sfc[0][13],this.sfc[0][20]],
    ];
    this.line_ChartOptionsSFC  = {
      title: 'Projects Over Time',
      width: 600,
      height: 400
    };
    this.showLineSFC = true;
  }
  showLineGraph(){
  this.line_ChartData =[
    ['Year', 'Projects Started'],
    ['2009',  this.time[0][0]],
    ['2010',  this.time[0][1]],
    ['2011',  this.time[0][2]],
    ['2012',  this.time[0][3]],
    ['2013',  this.time[0][4]],
    ['2014',  this.time[0][5]],
    ['2015',  this.time[0][6]]

  ];
    this.line_ChartOptions  = {
      title: 'Projects Over Time',
      width: 600,
      height: 400
    };
    this.showLine = true;
  }

  showGraph(){
    this.pie_ChartData = [
      ['Task', 'Hours per Day'],
      ['Success',     (this.percent[0][0]*100)],
      ['Failed',      (this.percent[0][1]*100)],
      ['Canceled',    (this.percent[0][2]*100)]];
    this.pie_ChartOptions  = {
      title: 'Over all comparison',
      width: 400,
      height: 400
    };
   this.show = true;
  }
}
