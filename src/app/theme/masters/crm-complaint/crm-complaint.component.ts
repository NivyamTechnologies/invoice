import { Component, OnInit } from '@angular/core';
import { ApicallService } from '../../apicall.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Current } from '../../Common';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-crm-complaint',
  templateUrl: './crm-complaint.component.html',
  styleUrls: ['./crm-complaint.component.scss']
})
export class CrmComplaintComponent implements OnInit {
 
  constructor(private api : ApicallService, private route : Router, private activatedRoute : ActivatedRoute,private httpClient:HttpClient) {
    this.activatedRoute.params.subscribe(param=>{
      if(param['customer_id'] != "" && param['customer_id'] != undefined)
      {
        
        this.title = "Edit Customer"
        this.type = "EditCustomer"
        
        this.entry =param['entry']
        if(param['entry']=='complaint'){
          
          this.getcrmccoplaint(param['customer_id'])
        }
        else{
          this.getcrmcustomer(param['customer_id'])
        }
        this.getitem()
        this.api.getimg(param['customer_id']).subscribe(res => {
          if(res['res']!='false'){
            for(let i in res['res']){ 
              this.filelist.push(i)
            }
            this.path= 'http://'+this.api.serIP+'/Client/'+param['customer_id']+'/'
          }

          
              })
      }
    })
   }


  ngOnInit() {
  }
  uploadForm = new FormGroup ({
    file1: new FormControl()
});
filedata:any;
path=''
fileEvent(e){
    this.filedata=e.target.files[0];
    console.log(e);
}
onSubmit() {
    let formdata = new FormData();
    console.log(this.uploadForm)
    formdata.append("filename",this.filedata);
 if(this.filedata.type=='video/mp4'){
  if(this.filedata.size>9842688){
    alert('Video size should not exceed 10MB.');
    return;
  }

 }else{
  if(this.filedata.size>499909){
    alert("Imaze size shoould not exceed 500 Kb.");
    return;
  }
 }
    this.api.saveimg(this.model.complaint_id,formdata).subscribe(res => {

    })
    alert("File uploaded");
    location.reload();
}


  title="Customer"
  type= "NewSchool"
  entry=''
  filelist=[]
  expirydate='3'
  dataColumns:any;
  dataRows:any
  item=[]
  closecaseval=false
  current = new Current()
  model = {
    "complaint_id" : 10,
    "customer_id" : '',
    "name":'',
    "CreateDate" : '',
    "remarks" : '',
    "mobile_no" : '',
    "status" : 'Open',
    "type" : 'Complaint',
    "address":'',
    "alt_mobile_no":'',
    "email":'',
    "city":'',
    "area":'',
    "happycode":'',
    "Brand":'',
    "SerialNo":'',
    "Model":'',
    "PinCode":'',
    "Product":''
  }

  getcrmcustomer(customer_id)
  {
    let qry = "Select * from customer where customer_id = "+customer_id
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{
      console.log(data)
    this.model = data ['data'][0]
    this.model['complaint_id']= Math.floor(Math.random() * 9000000000) + 1000000000;
    let date = new Date().toISOString().split('T')[0]
    this.model['CreateDate'] = date
    this.model['type'] = 'Complaint'
    this.model['status'] = 'Open'
     
    })
  }

  getcrmccoplaint(id){
    let qry = "Select * from  complaint left join customer on complaint.customer_id =customer.customer_id where complaint_id = "+id
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{
      console.log(data)
    this.model = data ['data'][0]
    let date = new Date().toISOString().split('T')[0]
    this.model['CreateDate'] = date
     
    })
  }
  getitem(){
    let qry = "Select * from item where Itemcode ='crmparts'";
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{
      console.log(data)
    this.item = data ['data']
    
    })
  }

  submit()

  {

    let currentDate = new Date();
    let yyyy = currentDate.getFullYear();
    let mm = currentDate.getMonth()+1;
    let dd = currentDate.getDate();
    let  currentDate1= yyyy + '-' + mm + '-' + (dd);


        if(this.entry=='customer'){
          this.api.saveMasterDefinition("crmcomplaint",{complaint : [this.model]}).subscribe(()=>{
            alert("complaint saved")
            this.route.navigateByUrl('/forms/CrmComplaintBrowser')
          },err=>{
            alert("Error while saving customer")
          })
        }
        else{

          let updateQry = this.current.generateUpdateQuery(
            [this.model],
            ["complaint_id","name","OutSerialNo","mobile_no","alt_mobile_no","city","address","area","Model","Brand","SerialNo","PinCode","email"],
            ["complaint_id"],
            "",
            " complaint"
            )
          
            this.api.Post("/users/executeSelectStatement",{Query : updateQry}).subscribe(()=>{
              alert("Complain saved")
              this.route.navigateByUrl('/forms/CrmComplaintBrowser')
            },(err)=>{
              console.log(err)
              alert("Error while updating customer detail")
            })
        }

        let qry = `insert into service (CustomerId,ServiceDate) values ('${this.model['customer_id']}',
        DATE_ADD('${currentDate1}', INTERVAL ${this.model['expirydate']} DAY)) ;`
        this.api.Get("/total/execMultipleQuery",["Query="+qry]).subscribe(data=>{
          
        
        })

      
    
        

  }

  addMonths(numOfMonths, date = new Date()) {
    date.setMonth(date.getMonth() + (numOfMonths/30));
  
    return date;
  }

  viewhistory(id){
    let qry = "Select * from  complaint  where customer_id = "+this.model['customer_id']
    this.api.Post("/users/executeSelectStatement",{Query : qry}).subscribe(data=>{
      this.dataColumns = [
        {"name" : "complaint Id", "prop" : "complaint_id"},
        {"name" : "Call Type", "prop" : "type"},
        {"name" : "Create Date", "prop" : "CreateDate"},
        {"name" : "Close Date", "prop" : "CreateDate"},
        {"name" : "status", "prop" : "status"},
        {"name" : "Product", "prop" : "Product"}
    ]
      this.dataRows = data['data']
      this.dataRows = [...this.dataRows]
     
    })

  }

}

