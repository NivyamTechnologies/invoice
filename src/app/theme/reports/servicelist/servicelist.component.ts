import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.scss']
})
export class ServicelistComponent implements OnInit {

  constructor(private api : ApicallService) { }

  ngOnInit() {
    this.getReport()
  }

  dataRows = []
  dataColumns = []
  from = new Date().toISOString().split('T')[0]
  to = new Date().toISOString().split('T')[0]
  getReport()
  {
    this.api.Post("/total/getBrowser",{Condition : ""},["EntityName=ServiceReport","Type=Report","Dropdown=DateRange","From="+this.from,"To="+this.to]).subscribe(data=>{
      // this.dataRows = data['data']
      console.log("browserdata",data)
      this.dataColumns = data['Columns']
      this.dataRows = data['Data']['data']
      this.dataRows = [...this.dataRows]
    })
  }

  exportToExcel()
  {
      this.api.exportToExcel(this.dataRows,"ServiceList")
  }
}

