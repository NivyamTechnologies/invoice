import { Component, OnInit } from '@angular/core';
import {ApicallService} from '../../apicall.service'
// import {PartyRoutingModule} from './party-routing.module'
@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {

  constructor(private tData:ApicallService) { }
  myvar:any = {PartyId: null,
  PartyName:null,
  PartyCost:null,
  Address:null


  }

  ngOnInit() {
  }

  ready(){
    debugger
        let rd = true
         
         
          if(rd){
            this.tData.saveparty(this.myvar,this.myvar.PartyId).subscribe(res=>{
             alert("Party Saved");
    
            })
          }
        }

}
