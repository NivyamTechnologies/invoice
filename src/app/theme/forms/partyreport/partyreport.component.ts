import { Component, OnInit,ViewChild } from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ApicallService} from '../../apicall.service'

@Component({
  selector: 'app-partyreport',
  templateUrl: './partyreport.component.html',
  styleUrls: ['./partyreport.component.scss']
})
export class PartyreportComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private tData:ApicallService) { 
    
  }
  mydata =[];

  ngOnInit() {
   
    this.sql1('select * from party').subscribe(res=>{
      
    this.mydata=Object.values(res)[0];
    
    console.log(this.mydata);
    })
  }
  sql1(data){
    let tbody = new URLSearchParams();
    tbody.set('ProfileId', this.tData.ProfileId);
    let mbody = {'Query':data}
    debugger
    return this.tData.localsqlser(tbody,mbody)
  }

}