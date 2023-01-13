import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Common } from 'src/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PolicyResult } from 'src/app/models/policyinfo';
import { AppConstants } from 'src/app/app.constants';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-policyinforesult',
  templateUrl: './policyinforesult.component.html',
  styleUrls: ['./policyinforesult.component.scss']
})
export class PolicyinforesultComponent implements OnInit {

  //params: string;
  public records: boolean = false;
  public norecords: boolean = false;
  PolicyNo: string;
  PolicyName: string;
  FederalNo: string;
  BrokerNo: string;
  Status: string;
  Address: string;
  City: string;
  State: string;
  inIsExact: number;

  hideBrokerno: boolean = false;
  hideStatus: boolean = false;
  hideAddress: boolean = false;
  hideCity: boolean = false;
  hideState: boolean = false;

  PolicyResultDetail: any;
  PolicyResultDetailFinal: Array<PolicyResult> = [];
  desserts = this.PolicyResultDetailFinal;
  sortedData = this.PolicyResultDetailFinal;

  constructor(private router: Router, private _data: DataService,
    private route: ActivatedRoute, private common: Common, private ngxService: NgxUiLoaderService) {
    this.ngxService.start();

    //Get List
    this.GetPolicyList(this.route.snapshot.queryParams['search']);
  }

  ngOnInit() {
  }

  //Get Policy List
  GetPolicyList(params: string) {
    if (this.isNotNull(params)) {

      this.PolicyNo = params.split('|')[0];
      this.PolicyName = params.split('|')[1];
      this.FederalNo = params.split('|')[2];
      this.BrokerNo = params.split('|')[3];
      this.Status = params.split('|')[4];
      this.Address = params.split('|')[5];
      this.City = params.split('|')[6];
      this.State = params.split('|')[7];

      if (this.common.decrypt(params.split('|')[8]) == "true")
        this.inIsExact = 1;
      else if (this.common.decrypt(params.split('|')[8]) == "false")
        this.inIsExact = 0;

      let url = AppConstants.SERVICE_URL + 'PolicyInformation/GetPolicyList?PolicyNo=' + this.PolicyNo +
        '&Pname=' + this.PolicyName + '&FederalId=' + this.FederalNo + '&BrokerNo=' + this.BrokerNo +
        '&Status=' + this.Status + '&Address=' + this.Address + '&City=' + this.City + '&StateCode=' + this.State +
        '&inIsExact=' + this.inIsExact;
      this._data.GetService(url).subscribe(policySearchResult => { this.bindPolicySearchDetails(policySearchResult) });
      this.desserts = this.PolicyResultDetailFinal;
      this.sortedData = this.PolicyResultDetailFinal;
    }
  }

  //Bind searched result list
  bindPolicySearchDetails(policySearchResult: any) {
    //console.log(policySearchResult);
    this.PolicyResultDetail = [];
    this.PolicyResultDetail = policySearchResult;
    if (this.PolicyResultDetail != null) {
      let BrokerNo = this.isNotNull(sessionStorage.getItem("ssBrokerno")) ? sessionStorage.getItem("ssBrokerno") : '';
      let ddlStatus = this.isNotNull(sessionStorage.getItem("ssStatus")) ? sessionStorage.getItem("ssStatus") : '';
      let Address = this.isNotNull(sessionStorage.getItem("ssAdd")) ? sessionStorage.getItem("ssAdd") : '';
      let City = this.isNotNull(sessionStorage.getItem("ssCity")) ? sessionStorage.getItem("ssCity") : '';
      let ddlState = this.isNotNull(sessionStorage.getItem("ssState")) ? sessionStorage.getItem("ssState") : '';

      this.hideBrokerno = BrokerNo != '' ? true : false;
      this.hideStatus = ddlStatus != '' ? true : false;
      this.hideAddress = Address != '' ? true : false;
      this.hideCity = City != '' ? true : false;
      this.hideState = ddlState != '' ? true : false;

      this.records = true;
      this.norecords = false;
      for (var i = 0; i < this.PolicyResultDetail.length; i++) {
        let o = new PolicyResult();
        o.Policyno = this.PolicyResultDetail[i].policynumber;
        o.Policyname = this.PolicyResultDetail[i].policyname;
        o.FederalId = this.PolicyResultDetail[i].federalid;
        o.BrokerNo = BrokerNo != '' ? this.PolicyResultDetail[i].brokerno : false;
        o.Status = ddlStatus != '' ? this.PolicyResultDetail[i].status : 'isHidden';
        o.Address = Address != '' ? this.PolicyResultDetail[i].address : false;
        o.City = City != '' ? this.PolicyResultDetail[i].city : false;
        o.State = ddlState != '' ? this.PolicyResultDetail[i].statecode : false;
        this.PolicyResultDetailFinal.push(o);
      }
      this.desserts = this.PolicyResultDetailFinal;
      this.sortedData = this.PolicyResultDetailFinal;
      this.ngxService.stop();
    }
    else {
      this.records = false;
      this.norecords = true;
      this.ngxService.stop();
    }
  }

  //When user select a policy it'll redirect to the policydetail screen
  selectPolicy(PolicyNo:string)
  {    
    let PolicyNumber = PolicyNo.trim() != null ? this.common.encrypt(PolicyNo.trim()) : '';
    let url = 'policydetails';
    this.router.navigateByUrl(url + '?pno=' + PolicyNumber);
  }

  //Sorting on Grid
  sortData(sort: Sort) {
    this.ngxService.start();
    const data = this.desserts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Policyno': return compare(a.Policyno, b.Policyno, isAsc);
        case 'Policyname': return compare(a.Policyname, b.Policyname, isAsc);
        case 'FederalId': return compare(a.FederalId, b.FederalId, isAsc);
        case 'BrokerNo': return compare(a.BrokerNo, b.BrokerNo, isAsc);
        case 'Status': return compare(a.Status, b.Status, isAsc);
        case 'Address': return compare(a.Address, b.Address, isAsc);
        case 'City': return compare(a.City, b.City, isAsc);
        case 'State': return compare(a.State, b.State, isAsc);
        default: return 0;
      }
    });
    this.ngxService.stop();
  }
  
  //Return back to the search via button
  returnSearch() {
    let url = '/policyinfosearch?p=return';
    this.router.navigateByUrl(url);
  }

  //check if value is blank or null
  isNotNull(value: any) {
    if (!value || value == "undefined")
      return false;
    else {
      if (value.toString().trim() == '')
        return false;
      else
        return true;
    }
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
