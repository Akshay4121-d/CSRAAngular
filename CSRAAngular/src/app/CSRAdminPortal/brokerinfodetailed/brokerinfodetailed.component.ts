/***********************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 25 OCT 2019, Thursday
 * Decription :  Broker Information in detail
 ***********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Common } from 'src/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BrokerInfo } from 'src/app/models/brokerinfo';
import { AppConstants } from 'src/app/app.constants';
import { formatDate } from '@angular/common';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-brokerinfodetailed',
  templateUrl: './brokerinfodetailed.component.html',
  styleUrls: ['./brokerinfodetailed.component.scss']
})
export class BrokerinfodetailedComponent implements OnInit {
  public bind: boolean = false;
  public dvCancelWarning: boolean = false;
  public showPolicyCancellation: boolean = false;
  public showRecentSubmission: boolean = false;


  public CancelCount_Label: string;
  public CancelCount_Label_Popup: string;
  public SubmissionCount_Label: string;
  public SubmissionCount_Label_Popup: string;
  policyCancellationCount: number;

  //public PolCount_Active: number;
  //public PolCount_Term: number;
  public PolCount_Due: number;

  ID_Broker: number;
  BrokerNumber: string;
  PolicyNumber: string;
  urlBrokerNumber: string;

  EmailID: string;
  loginInfo: string;
  EpayLoginInfo: string;
  Brokers: BrokerInfo[];
  BrokerDetails: any;
  BrokerDetails_copy: Array<BrokerInfo> = [];
  public BrokerInfos: BrokerInfo[];
  BrokerDetailFinal: Array<BrokerInfo> = [];
  CancellationFinal: Array<BrokerInfo> = [];
  RecentSubFinal: Array<BrokerInfo> = [];
  noNewBusinessSub: boolean = true;
  PrintDBL120: string = '';
  bISGA: boolean = true;

  //constructor call : getBrokerDetails method and store param(ID_Broker) from URL
  constructor(private _data: DataService,
    private route: ActivatedRoute,
    private common: Common,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private exportAsService: ExportAsService
    ) {
    //this.ID_Broker = this.route.snapshot.params['ID_Broker'];
    this.urlBrokerNumber = this.route.snapshot.params['Broker_Number'];
    sessionStorage.setItem("ssnBroker_Id", '');
    if (this.urlBrokerNumber != null) {
      this.ngxService.start();
      this.getIdBroker();
      //this.getBrokerDetails();
    }
  }

  ngOnInit() {
  }

  getIdBroker() {
    let url = AppConstants.SERVICE_URL + "Producer/GetId_Broker?BrokerNumber=" + this.urlBrokerNumber
    this._data.GetService(url).subscribe(BrokerInfos => {
      this.bindIdBroker(BrokerInfos);
    });
  }
  bindIdBroker(BrokerId: any) {
    if (BrokerId != 0) {
      this.ID_Broker = BrokerId;
      sessionStorage.setItem("ssnBroker_Id", this.ID_Broker.toString());
      this.getBrokerDetails();
    }
    else
      this.bind = false;
  }


  // //GET
  // //Get details of clicked producer
  // getBrokerDetails(ID_Broker: number) {
  //   let url = AppConstants.SERVICE_URL + "Producer/GetMoreInformationById_Broker?Id_Broker=" + ID_Broker
  //   this._data.GetService(url).subscribe(BrokerInfos => {
  //     this.bindBrokerDetail(BrokerInfos);
  //   });
  // }
  //GET
  //Get details of clicked producer
  getBrokerDetails() {
    let url = AppConstants.SERVICE_URL + "Producer/GetMoreInformationByBrokerNumber?BrokerNumber=" + this.urlBrokerNumber
    this._data.GetService(url).subscribe(BrokerInfos => {
      this.bindBrokerDetail(BrokerInfos);
    });
  }

  bindBrokerDetail(BrokerDetails: any) {   
    this.BrokerDetails = BrokerDetails;
    //this.EpayLoginInfo = this.common.encrypt(this.loginInfo);
    if (this.BrokerDetails != null) {
      this.bind = true;
      let o = new BrokerInfo();
      o.BrokerNumber = this.common.decrypt(this.urlBrokerNumber);
      this.BrokerNumber = o.BrokerNumber.trim();
//---Start---Below Code Added by Ravi for CO 3918 on 29-May-2020 ---------------------------------
      if(this.BrokerNumber.substring(0,4)!="0000" && this.BrokerNumber.substring(9,5)==="0001"){       
        this.bISGA = true;
      }
      else{
      this.bISGA = false;
      }
//--End----Below Code Added by Ravi for CO 3918 on 29-May-2020 --------------------------------- 


      o.BrokerName = BrokerDetails[0].brokername;
      o.Address = BrokerDetails[0].address;
      o.City = BrokerDetails[0].city;
      o.State = BrokerDetails[0].state;
      o.Zipcode = BrokerDetails[0].zipcode;
      o.PhoneNumber = BrokerDetails[0].phone;
      o.Fax = BrokerDetails[0].faxnumber;
      if (BrokerDetails[0].email != null) {
        o.Email = "xxxxxx" + this.BrokerDetails[0].email.substring(this.BrokerDetails[0].email.indexOf("@"));
      }
      o.Fein = BrokerDetails[0].taxid;
      if (BrokerDetails[0].broker_effdate != null)
        o.EffDate = formatDate(BrokerDetails[0].broker_effdate, 'MM/dd/yyyy', 'en');
      else
        o.EffDate = null;
      if (BrokerDetails[0].broker_termdate != null)
        o.TermDate = formatDate(BrokerDetails[0].broker_termdate, 'MM/dd/yyyy', 'en');
      else
        o.TermDate = null;
      o.PolCount_Active = BrokerDetails[0].active_pcount;
      o.PolCount_Term = BrokerDetails[0].term_pcount;
      // o.BrokerNumber = this.common.decrypt(this.urlBrokerNumber);
      // this.BrokerNumber = o.BrokerNumber.trim();
      // o.BrokerName = BrokerDetails[0].Name;
      // o.Address = BrokerDetails[0].Address;
      // o.City = BrokerDetails[0].City;
      // o.State = BrokerDetails[0].StateCode;
      // o.Zipcode = BrokerDetails[0].Zip;
      // o.PhoneNumber = BrokerDetails[0].Telephone;
      // o.Fax = BrokerDetails[0].Fax;
      // o.Email = BrokerDetails[0].Email;
      // o.Fein = BrokerDetails[0].TaxID;
      // o.EffDate = formatDate(BrokerDetails[0].Date_LicenseEffective, 'MM/dd/yyyy', 'en');
      // o.TermDate = formatDate(BrokerDetails[0].Date_LicenseExp, 'MM/dd/yyyy', 'en');
      //o.PolCount_Active = BrokerDetails[0].Total_ActivePolicies;
      //o.PolCount_Term = BrokerDetails[0].Total_TermPolicies;
      //o.PolCount_Due
      this.BrokerDetailFinal.push(o);
      if (this.BrokerNumber != '0000-0000') {
        this.GetPolicyCancellationByBrokerNo(o.BrokerNumber.trim());
        this.GetDBLAPPRecentSubmissionByBrokerNo(o.BrokerNumber.trim());
      }
      else
        this.ngxService.stop();
      //this.AllowDBLAppSubmission(o.BrokerNumber.trim());
    }
    else
      this.bind = false;
    //setTimeout(() => { this.ngxService.stop(); });
  }

  //GET
  //DBL/PFL BaseLine policy cancellation warning
  GetPolicyCancellationByBrokerNo(BrokerNo: string) {   
    let url = AppConstants.SERVICE_URL + "Producer/GetPolicyCancellationByBrokerNo?ProducerNumber=" + BrokerNo
    this._data.GetService(url).subscribe(BrokerInfos => {
      this.bindPolicyCancellation(BrokerInfos);
    });
  }
  bindPolicyCancellation(BrokerDetails: any) {
    this.BrokerDetails = BrokerDetails;
    this.loginInfo = "B|" + this.ID_Broker + "|" + this.BrokerNumber + "|";
    var i = 0;
    //this.PolCount_Active = 0;
    //this.PolCount_Term = 0 ;
    this.PolCount_Due = 0;
    if (this.BrokerDetails != null) {
      this.showPolicyCancellation = true;
      for (i; i < this.BrokerDetails.length; i++) {
        let o = new BrokerInfo();
        o.PolCancel_Count = i + 1;
        // o.eff = formatDate(BrokerDetails[i].eff, 'MM/dd/yyyy', 'en');    
       
        if (BrokerDetails[i].renewal_date != null || BrokerDetails[i].renewal_date != undefined)
        o.renewal_date = formatDate(BrokerDetails[i].renewal_date, 'MM/dd/yyyy', 'en');
      else
        o.renewal_date = null;


        if (BrokerDetails[i].termi_datee != null || BrokerDetails[i].termi_datee != undefined)
          o.termi_datee = formatDate(BrokerDetails[i].termi_datee, 'MM/dd/yyyy', 'en');
        else
          o.termi_datee = null;
        o.pono1 = BrokerDetails[i].pono1;
        this.PolicyNumber = o.pono1;
        o.ptelno = BrokerDetails[i].ptelno;
        o.pname = BrokerDetails[i].pname;
        o.pname1 = BrokerDetails[i].pname1;
        o.bill_mode = BrokerDetails[i].bill_mode;
        o.termcode = BrokerDetails[i].termcode;
        o.SEVERITY = BrokerDetails[i].severity;
        o.broker = BrokerDetails[i].broker;
        // if(o.SEVERITY == 1)
        //   this.PolCount_Term = this.PolCount_Term + 1;
        if (o.SEVERITY == 2)
          this.PolCount_Due = this.PolCount_Due + 1;
        // else if(o.SEVERITY ==3)
        //   this.PolCount_Active = this.PolCount_Active + 1;
        if (o.SEVERITY != 1 && o.SEVERITY != 2 && o.SEVERITY != 3)
          o.SEVERITY = 0;
        o.pzip = BrokerDetails[i].pzip;
       
        o.count_num = BrokerDetails[i].count_num;
        o.Dayslefttoreinstate = BrokerDetails[i].dayslefttoreinstate;
        o.SEVERITYPFL = BrokerDetails[i].severitypfl;
        if (o.SEVERITYPFL != 1 && o.SEVERITYPFL != 2 && o.SEVERITYPFL != 3)
          o.SEVERITYPFL = 0;
        o.paymentURL = AppConstants.UserEpayURL + "/DBLReconciliation/onlinepaymentvalidation.aspx?pno=" + this.common.encrypt(o.pono1.trim()) + "&zip=" + this.common.encrypt(o.pzip.trim()) + "&login=" + this.common.encrypt(this.loginInfo);
        this.CancellationFinal.push(o);
      }
      this.ngxService.stop();
      if (this.BrokerDetails.length > 5)
        this.CancelCount_Label = "5 of " + this.BrokerDetails.length;
      else
        this.CancelCount_Label = this.BrokerDetails.length + " of " + this.BrokerDetails.length;

      this.CancelCount_Label_Popup = this.BrokerDetails.length + " of " + this.BrokerDetails.length;
    }
    else {
      this.CancelCount_Label = "0 of 0";
      this.showPolicyCancellation = false;
      this.ngxService.stop();
    }
    //setTimeout(() => { this.ngxService.stop(); });
  }

  //GET
  //DBL/PFL BaseLine recent application submissions
  GetDBLAPPRecentSubmissionByBrokerNo(BrokerNo: string) {
    let url = AppConstants.SERVICE_URL + "Producer/GetDBLAPPRecentSubmissionByBrokerNo?ProducerNumber=" + BrokerNo
    this._data.GetService(url).subscribe(BrokerInfos => {
      this.bindRecentSubmission(BrokerInfos);
      //this.ngxService.stop();
    });
  }
  bindRecentSubmission(BrokerDetails: any) {
    this.BrokerDetails = BrokerDetails;
    if (this.BrokerDetails != null) {
      this.noNewBusinessSub = false;
      this.showRecentSubmission = true;
      this.policyCancellationCount = this.BrokerDetails.length;
      let obj = new BrokerInfo();
      //this.AllowDBLAppSubmission(this.BrokerNumber, obj);
      for (var i = 0; i < this.BrokerDetails.length; i++) {
        let o = new BrokerInfo();
        o.PolCancel_Count = i + 1;
        o.RowNumber = BrokerDetails[i].RowNumber;
        o.OLAPPNO = BrokerDetails[i].OLAPPNO;
        o.SUBMITTEDBY = BrokerDetails[i].SUBMITTEDBY;
        if (BrokerDetails[i].DATESUBMITTED != null && BrokerDetails[i].DATESUBMITTED != undefined)
          o.DATESUBMITTED = formatDate(BrokerDetails[i].DATESUBMITTED, 'MM/dd/yyyy', 'en');
        o.STATUS = BrokerDetails[i].STATUS;
        o.POLNO = BrokerDetails[i].POLNO;
        if (BrokerDetails[i].EFFDT != null && BrokerDetails[i].EFFDT != undefined)
          o.EFFDT = formatDate(BrokerDetails[i].EFFDT, 'MM/dd/yyyy', 'en');
        o.POLNAME1 = BrokerDetails[i].POLNAME1;
        o.POLNAME2 = BrokerDetails[i].POLNAME2;
        o.FEDIDNUM = BrokerDetails[i].FEDIDNUM;
        o.appbkrno = BrokerDetails[i].appbkrno;
        o.DisplayPrintDb120 = BrokerDetails[i].DisplayPrintDb120;
        o.printDB1201URL = '';
        o.PrintDB120Link = '';
        if (o.DisplayPrintDb120 != null) {
          if (o.DisplayPrintDb120 == "1") {
            o.printDB1201URL = AppConstants.UserURL + "policyholder/duplicatedb1201.aspx?PolicyNo=" + this.common.encrypt(o.POLNO.trim());
            o.PrintDB120Link = 'Print DB120.1';
          }
        }
        this.RecentSubFinal.push(o);
      }
      this.ngxService.stop();
      if (this.BrokerDetails.length > 5)
        this.SubmissionCount_Label = "5 of " + this.BrokerDetails.length;
      else
        this.SubmissionCount_Label = this.BrokerDetails.length + " of " + this.BrokerDetails.length;

      this.SubmissionCount_Label_Popup = this.BrokerDetails.length + " of " + this.BrokerDetails.length;
    }
    else {
      this.noNewBusinessSub = true;
      this.SubmissionCount_Label = "0 of 0";
      this.showRecentSubmission = false;
    }
  }

  //GET
  //Allow Broker to DBL submissions
  // AllowDBLAppSubmission(BrokerNo: string, BrokerInfo: BrokerInfo) {
  //   let url = AppConstants.SERVICE_URL + "Producer/AllowDBLAppSubmission?ProducerNumber=" + BrokerNo
  //   this._data.GetService(url).subscribe(res => {
  //     if (res == true)
  //       BrokerInfo.allowBrokerSubmission = true;
  //     else
  //       BrokerInfo.allowBrokerSubmission = false;

  //   });
  // }

  //Close detailed information of Broker
  CloseDetails() {
    // sessionStorage.setItem("ssnBrokerNo", brokerno.trim());
    // sessionStorage.setItem("ssnFederalId", federalid.trim());
    // sessionStorage.setItem("ssnBrokerName", brokername.trim());
    // sessionStorage.setItem("ssnPhone", phno.trim());
    let url = '/brokerinforesult?B=' + encodeURIComponent(sessionStorage.getItem("ssnBrokerNo")) + '&F=' + encodeURIComponent(sessionStorage.getItem("ssnFederalId")) + '&N=' + encodeURIComponent(sessionStorage.getItem("ssnBrokerName")) + '&P=' + encodeURIComponent(sessionStorage.getItem("ssnPhone"));

    //let url1 = encodeURIComponent(sessionStorage.getItem("ssnBrokerSearchUrl"))
    this.router.navigateByUrl(url);
  }

  export() {
    let url = AppConstants.SERVICE_URL + "Producer/ExportExcelRecentAppSubmission?ProducerNumber=" + this.BrokerNumber
    this._data.GetService(url).subscribe(res => {
      this.ngxService.stop();
    });
  }

  exportToExcel(clickId: string) {
    this.ngxService.start();
    let url = AppConstants.SERVICE_URL + "Producer/ExportToExcel?P=" + this.common.encrypt((this.BrokerNumber).trim()) + "&CallId=" + this.common.encrypt((clickId).trim());
    window.open(url, "_blank");
    this.ngxService.stop();
  }

  exportToPdf(clickId: string) {  
    let url = AppConstants.SERVICE_URL + "Producer/ExportToPdf?P=" + this.common.encrypt((this.BrokerNumber).trim()) + "&CallId=" + this.common.encrypt((clickId).trim());
    window.open(url, "_blank");
    this.ngxService.stop();
  }

}
