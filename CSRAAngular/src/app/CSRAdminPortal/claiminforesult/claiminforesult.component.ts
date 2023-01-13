import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { Router } from "@angular/router";
import {ActivatedRoute} from '@angular/router'
import { DataService } from '../services/data.service';
import { ClaimResult } from 'src/app/models/claiminfo';
import { AppConstants } from 'src/app/app.constants';
import { Common } from 'src/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';



@Component({
  selector: 'app-claiminforesult',
  templateUrl: './claiminforesult.component.html',
  styleUrls: ['./claiminforesult.component.scss']
})
export class ClaiminforesultComponent implements OnInit {
  public records:boolean = false;
  public norecords:boolean = false;
  Claim: string;
  SocialSecurty: string;
  FirstName: string;
  LastName: string;
  Address: string;
  City: string;
  State: string;
  Check: string;
  Status: string;
  DOB: string;
  Policy: string;
  PolicyName: string;
  claimSearchDetail:any;
  inIsExact :number;
  ClaimResults: ClaimResult[];
  ClaimResultDetail:any;
  ClaimResultDetailFinal: Array<ClaimResult> = [];
  desserts = this.ClaimResultDetailFinal;  
  sortedData = this.ClaimResultDetailFinal;  
  params: string;

  hideSSN:boolean = false;
  hideAddress:boolean = false;
  hideCity:boolean = false;
  hideState:boolean = false;
  hideCheckno:boolean = false;
  hideStatus:boolean = false;
  hideDOB:boolean = false;
  hidePolicyno:boolean = false;
  hidePolicyname:boolean = false;


  //sortedData: ClaimResultDetailFinal;
  //constructor() { }
  constructor(private router: Router,private _data : DataService,
    private route:ActivatedRoute,
    private common: Common,
    private ngxService: NgxUiLoaderService)
{
this.ngxService.start();
this.params = this.route.snapshot.queryParams['search'];
this.Claim = this.params.split('|')[0];
this.SocialSecurty = this.params.split('|')[1];
this.FirstName = this.params.split('|')[2];
this.LastName = this.params.split('|')[3];
this.Address = this.params.split('|')[4];
this.City = this.params.split('|')[5];
this.State = this.params.split('|')[6];
this.Check = this.params.split('|')[7];
this.Status = this.params.split('|')[8];
this.DOB = this.params.split('|')[9];
this.Policy = this.params.split('|')[10];
this.PolicyName = this.params.split('|')[11];
if(this.common.decrypt(this.params.split('|')[12]) == "true")
  this.inIsExact = 1;
else if(this.common.decrypt(this.params.split('|')[12]) == "false")
  this.inIsExact = 0;

// this.Claim = this.route.snapshot.queryParams['Claim'];
// this.SocialSecurty = this.route.snapshot.queryParams['SocialSecurity'];
// this.FirstName = this.route.snapshot.queryParams['FirstName'];
// this.LastName = this.route.snapshot.queryParams['LastName'];
// this.Address = this.route.snapshot.queryParams['Address'];
// this.City = this.route.snapshot.queryParams['City'];
// this.State = this.route.snapshot.queryParams['State'];
// this.Check = this.route.snapshot.queryParams['Check'];
// this.Status = this.route.snapshot.queryParams['Status'];
// this.DOB = this.route.snapshot.queryParams['DOB'];
// this.Policy = this.route.snapshot.queryParams['Policy'];
// this.PolicyName = this.route.snapshot.queryParams['PolicyName'];
// // if(this.route.snapshot.queryParams['isExactMatch'])
// //  this.inIsExact = 0;
// // else
// //  this.inIsExact = 1;
// if(this.route.snapshot.queryParams['isExactMatch'] == "true")
//  this.inIsExact = 1;
//  if(this.route.snapshot.queryParams['isExactMatch'] == "false")
//  this.inIsExact = 0;

let url = AppConstants.SERVICE_URL + 'ClaimInformation/GetClaimList?ClaimNumber='+this.Claim+
'&SSN='+ this.SocialSecurty + '&Fname='+this.FirstName + '&Lname='+this.LastName + 
'&Address='+this.Address + '&City='+this.City + '&StateCode='+this.State + 
'&CheckNumber='+this.Check + '&Status='+this.Status + '&DOB='+ this.DOB +
'&PolicyNumber='+this.Policy + '&PolicyName='+this.PolicyName + '&inIsExact=' + this.inIsExact;
this._data.GetService(url).subscribe(claimSearchResult => { this.bindClaimSearchDetails(claimSearchResult)});
this.desserts = this.ClaimResultDetailFinal;  
this.sortedData = this.ClaimResultDetailFinal;
}


  ngOnInit() {
  }

  selectClaim(claim)
  {    
    let claimNo = claim.trim() != null ? this.common.encrypt(claim.trim()) : '';
    let url = 'claimdetails';
    this.router.navigateByUrl(url + '?Claim=' + claimNo);
  }

  bindClaimSearchDetails(claimSearchResult: any) {
    this.ClaimResultDetail=[];
    this.ClaimResultDetail=claimSearchResult;
     if (this.ClaimResultDetail != null) {

      //var Claim = this.isNotNull(sessionStorage.getItem("ssClaimNo")) ? sessionStorage.getItem("ssClaimNo") : '';
      var SocialSecurty = this.isNotNull(sessionStorage.getItem("ssSSN")) ? sessionStorage.getItem("ssSSN") : '';
      //var FirstName = this.isNotNull(sessionStorage.getItem("ssFname")) ? sessionStorage.getItem("ssFname") : '';
      //var LastName = this.isNotNull(sessionStorage.getItem("ssLname")) ? sessionStorage.getItem("ssLname") : '';
      var Address = this.isNotNull(sessionStorage.getItem("ssAdd")) ? sessionStorage.getItem("ssAdd") : '';
      var City = this.isNotNull(sessionStorage.getItem("ssCity")) ? sessionStorage.getItem("ssCity") : '';
      var ddlState = this.isNotNull(sessionStorage.getItem("ssState")) ? sessionStorage.getItem("ssState") : '';
      var Check = this.isNotNull(sessionStorage.getItem("ssCheck")) ? sessionStorage.getItem("ssCheck") : '';
      var ddlStatus = this.isNotNull(sessionStorage.getItem("ssStatus")) ? sessionStorage.getItem("ssStatus") : '';
      var selectedDOB = this.isNotNull(sessionStorage.getItem("ssDOB")) ? sessionStorage.getItem("ssDOB") : '';
      var Policy = this.isNotNull(sessionStorage.getItem("ssPolicyNo")) ? sessionStorage.getItem("ssPolicyNo") : '';
      var PolicyName = this.isNotNull(sessionStorage.getItem("ssPolicyName")) ? sessionStorage.getItem("ssPolicyName") : '';


      this.hideSSN = SocialSecurty != '' ? true : false;
      this.hideAddress =  Address != '' ?  true : false;
      this.hideCity =  City != '' ? true : false; 
      this.hideState = ddlState != '' ? true : false;
      this.hideCheckno = Check != '' ? true : false;
      this.hideStatus = ddlStatus != '' ?  true : false;
      this.hideDOB = selectedDOB != '' ? true : false;
      this.hidePolicyno = Policy != '' ? true : false;
      this.hidePolicyname = PolicyName != '' ?  true : false;


      this.records = true;
       this.norecords = false;       
       for (var i = 0; i < this.ClaimResultDetail.length; i++) {
        let o = new ClaimResult();
        o.Claim= this.ClaimResultDetail[i].claimno;
        o.FirstName= this.ClaimResultDetail[i].fname;
        o.LastName = this.ClaimResultDetail[i].lname;
        o.SSN = SocialSecurty != '' ? this.ClaimResultDetail[i].ssn : false;
        o.Address =  Address != '' ?  this.ClaimResultDetail[i].address : false;
        o.City =  City != '' ? this.ClaimResultDetail[i].city : false;
        o.State = ddlState != '' ? this.ClaimResultDetail[i].statecode : false;
        o.Checkno = Check != '' ?  this.ClaimResultDetail[i].checkno : false;
        o.Status = ddlStatus != '' ? ((this.ClaimResultDetail[i].status == 'I' || this.ClaimResultDetail[i].term_date != null) ? 'Terminated' : 'Active' ) : 'isHidden';
        o.DOB = selectedDOB != '' ? this.ClaimResultDetail[i].dob : false;
        o.Policyno = Policy != '' ? this.ClaimResultDetail[i].polno : false;
        o.Policyname = PolicyName != '' ? this.ClaimResultDetail[i].polname : false;
        this.ClaimResultDetailFinal.push(o);
       }
       this.desserts = this.ClaimResultDetailFinal;  
       this.sortedData = this.ClaimResultDetailFinal;
       this.ngxService.stop(); 
     }
     else
     {
       this.records = false;
       this.norecords = true;
       this.ngxService.stop();
     }
   }

   sortData(sort: Sort) {
    const data = this.desserts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Claim': return compare(a.Claim, b.Claim, isAsc);
        case 'FirstName': return compare(a.FirstName, b.FirstName, isAsc);
        case 'LastName': return compare(a.LastName, b.LastName, isAsc);
        case 'SSN': return compare(a.SSN, b.SSN, isAsc);
        case 'City': return compare(a.City, b.City, isAsc);
        case 'Address': return compare(a.Address, b.Address, isAsc);
        case 'State': return compare(a.State, b.State, isAsc);
        case 'Checkno': return compare(a.Checkno, b.Checkno, isAsc);
        case 'Status': return compare(a.Status, b.Status, isAsc);
        case 'DOB': return compare(a.DOB, b.DOB, isAsc);
        case 'Policyno': return compare(a.Policyno, b.Policyno, isAsc);
        case 'Policyname': return compare(a.Policyname, b.Policyname, isAsc);
        default: return 0;
      }
    });
    
  }

  isNotNull(value:any) {
    if(!value || value=="undefined")
      return false;
    else{
      if(value.toString().trim() == '')
        return false;
      else
        return true;}
  }

  returnSearch(){
    let url = '/claiminfosearch?p=return' ;
      this.router.navigateByUrl(url);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


