import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AppConstants } from "src/app/app.constants";
import { Common } from "src/common";
import { DataService } from "../services/data.service";

@Component({
    selector: 'app-generateCertificate',
    templateUrl: './generateCertificate.component.html',
    styleUrls: ['./generateCertificate.component.css']
  })
  export class GenerateCertificateComponent implements OnInit {
    result: boolean;
    PolicyNo:string;
    BrokerID:string="2";
  data: any;
  norecords: boolean;
  l_PolicyNo: string;
  l_BrokerID: string;
  PolicyName:string;
  PolicyEDate:string;
  Address:string;
  PolicyActive:string;
  PolicyName1: any;
  Address1: any;
  AdditionalID: any;
  ID_Contact: string;
  ID_Policy: any;
  PolicyDetails: any;
    //ReceipientDetails: any = [];
    constructor(private router: Router, private _data: DataService,private common: Common,
      private route: ActivatedRoute) {
      
      
    }
    ngOnInit(): void {

      this.route.params.forEach((params: Params) => {
        
        this.PolicyNo = this.route.snapshot.queryParams['pno'];
        this.l_PolicyNo = this.isNotNull(this.PolicyNo) ? this.common.decrypt(this.PolicyNo.toString()) : ''; 
        this.BrokerID = this.route.snapshot.queryParams['brokerId'];
        this.l_BrokerID = this.isNotNull(this.BrokerID) ? this.common.decrypt(this.BrokerID.toString()) : ''; 
        console.log("PolicyEnc:"+this.PolicyNo);
        console.log("BrokerEnc"+this.BrokerID);


    })
    this.GenerateCertificateOfInsurance();
    }
    GenerateCertificateOfInsurance()
    {
    let url=AppConstants.SERVICE_URL +"PolicyInformation/GenerateCertificateOfInsurance?PolicyNo="+this.PolicyNo+"&BrokerID="+this.BrokerID;
    console.log(this.BrokerID);
    this._data.GetService(url).subscribe((validationMsg => { this.forSuccess(validationMsg)}));
  }
  
  exportToPdf(clickId: string){  

    let url = AppConstants.SERVICE_URL + "PolicyInformation/DownloadCertificateOfInsurancePDF?PolicyID=" + this.common.encrypt(this.ID_Policy).trim() +"&ContactID="+this.common.encrypt(this.ID_Contact)+ "&AdditionalID=" +this.common.encrypt(this.AdditionalID)+ "&DbType="+ this.common.encrypt((clickId).trim());
    window.open(url, "_blank");
    // this.ngxService.stop();
  }
  forSuccess(validationMsg:any)
  {    

    if (validationMsg != "") {
      debugger;
      console.log(validationMsg);
      this.PolicyName=validationMsg.Table[0].AgencyName;
      //this.PolicyName1=validationMsg.Table[1].AgencyName;
      this.PolicyEDate=validationMsg.Table[0].Date_Effective;
      this.Address=validationMsg.Table[0].Address;
      this.Address1=validationMsg.Table1[0].ADDRESS;
      this.PolicyActive=validationMsg.Table[0].PolicyActive;
      this.AdditionalID=validationMsg.Table1[0].ID_Additional;
      this.ID_Contact = validationMsg.Table1[0].ID_Contact;
      this.ID_Policy=validationMsg.Table1[0].Id_Policy;
      this.PolicyDetails=validationMsg.Table1;
      console.log()
      this.norecords=false;

      let l_PolicyNo = this.isNotNull(this.PolicyNo) ? this.common.encrypt(this.PolicyNo.trim()) : '';
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
  