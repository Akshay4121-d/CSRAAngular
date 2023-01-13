import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
//import { debug } from "console";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { AppConstants } from "src/app/app.constants";
import { Common } from "src/common";
import { DataService } from "../services/data.service";
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
    selector: 'app-postingnotice',
    templateUrl: './postingnotice.component.html',
    styleUrls: ['./postingnotice.component.css']
  })
  export class PostingNoticeComponent implements OnInit {
    result: boolean;
    PolicyNo:string;
    BrokerID:string;
  data: any;
  norecords: boolean;
  l_PolicyNo: string;
  l_BrokerID: string;
  PolicyName:string;
  PolicyEDate:any;
  Address:string;
  PolicyActive:string;
  PolicyName1: any;
  AgencyName: any;
  EDate: any;
  ID_Contact: number;
  Language:string= "English";
  Language1:string= "English";
  PolicyDetails: any;
    //ReceipientDetails: any = [];
    constructor(private router: Router, private _data: DataService,private common: Common,
      private route: ActivatedRoute, private ngxService: NgxUiLoaderService,) {
        // this.ngxService.start();
      
    }
    ngOnInit(): void {

      this.route.params.forEach((params: Params) => {
        
        this.PolicyNo = this.route.snapshot.queryParams['pno'];
        this.l_PolicyNo = this.isNotNull(this.PolicyNo) ? this.common.decrypt(this.PolicyNo.toString()) : ''; 
        this.BrokerID = this.route.snapshot.queryParams['brokerId'];
        this.l_BrokerID = this.isNotNull(this.BrokerID) ? this.common.decrypt(this.BrokerID.toString()) : ''; 
        console.log(this.BrokerID);
        console.log(this.common.decrypt(this.BrokerID));  
        console.log("Dec PNO:: "+this.l_PolicyNo);
        console.log("PolicyNo:"+this.PolicyNo);
      });
    this.PostingNotice();
    }
   
    PostingNotice(){

    let url=AppConstants.SERVICE_URL +"PolicyInformation/GeneratePostingNotice?PolicyNo="+this.PolicyNo+"&BrokerID="+this.BrokerID;
    this._data.GetService(url).subscribe((validationMsg => { this.forSuccess(validationMsg)}));
    
  }
    //requestType=Download
    exportToPdfDownload() {  
      debugger;
      this.ngxService.start();
      let url = AppConstants.SERVICE_URL + "PolicyInformation/DownloadPostingNoticePDF?PolicyNo="+this.PolicyNo+"&ContactID="+this.common.encrypt(this.ID_Contact.toString())+"&Language="+this.common.encrypt(this.Language1)+"&Type="+this.common.encrypt("Download");
        window.open(url, "_blank");
        this.ngxService.stop();  
    }
    
    //requestType=ClickHere
    exportToPdfClickhere() {
        
      let url = AppConstants.SERVICE_URL + "PolicyInformation/DownloadPostingNoticePDF?PolicyNo="+this.PolicyNo+"&ContactID="+this.common.encrypt(this.ID_Contact.toString())+"&Language="+this.common.encrypt(this.Language)+"&Type="+this.common.encrypt("Clickhere");
      window.open(url, "_blank");
      this.ngxService.stop();
    }

    
  LanguageBind(evt:any){    
    console.log(evt);
    this.Language=evt;
  }
  LanguageBind1(evt:any){    
    console.log(evt);
    this.Language1=evt;
  }
  forSuccess(validationMsg:any)
  {    
    
    console.log(this.Language);
    if (validationMsg != "") {
      
      console.log(validationMsg);
      this.PolicyName=validationMsg.Table[0].AgencyName;
      //this.PolicyName1=validationMsg.Table[1].AgencyName;
      this.EDate=validationMsg.Table[0].Date_Effective;
      this.Address=validationMsg.Table1[0].ADDRESS;
      this.PolicyActive=validationMsg.Table[0].PolicyActive;
      this.AgencyName=validationMsg.Table1[0].AgencyName;
      this.norecords=false;
     this.ID_Contact = validationMsg.Table1[0].ID_Contact;
     this.PolicyDetails=validationMsg.Table1;   
    }
    else {
      this.norecords=true;
    }
}
  //Check if null or not
  isNotNull(value: any) {
    if (!value)
      return false;
    else {
      if (value.toString().trim() == '')
        return false;
      else
        return true;
    }
  }
}
  