import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { States } from 'src/app/models/policyinfo';
import { Common } from 'src/common';

@Component({
  selector: 'app-policyinfosearch',
  templateUrl: './policyinfosearch.component.html',
  styleUrls: ['./policyinfosearch.component.scss']
})
export class PolicyinfosearchComponent implements OnInit {

  p: string = '';//postback
  AllState: States[];
  StatesDetailFinal: Array<States> = [];
  allgood: boolean = true;
  //#region "Screen Fields"
  Policyno: string = '';
  PolicyName: string = '';
  Federalid: string = '';
  Brokerno: string = '';
  ddlStatus: string = '';
  Address: string = '';
  City: string = '';
  ddlState: string = '';
  CheckBoxvalue: boolean = true;
  error: boolean = false;
  errorForMainFields: boolean = false;
  BrokernoInvalid: boolean = false;
  dynamicBorder: string = '';
  dynamicBorderBroker: string = '';
  //#endregion

  constructor(private router: Router, private _data: DataService, private ngxService: NgxUiLoaderService, private common: Common,
    private route: ActivatedRoute) {
    this.p = this.route.snapshot.queryParams['p'];
    if (this.p == "return") {
      let l_Policyno = this.isNotNull(sessionStorage.getItem("ssPolicyno")) ? sessionStorage.getItem("ssPolicyno") : '';
      let l_PolicyName = this.isNotNull(sessionStorage.getItem("ssPolicyName")) ? sessionStorage.getItem("ssPolicyName") : '';
      let l_Federalid = this.isNotNull(sessionStorage.getItem("ssFederalid")) ? sessionStorage.getItem("ssFederalid") : '';
      let l_Brokerno = this.isNotNull(sessionStorage.getItem("ssBrokerno")) ? sessionStorage.getItem("ssBrokerno") : '';
      let l_Status = this.isNotNull(sessionStorage.getItem("ssStatus")) ? sessionStorage.getItem("ssStatus") : '';
      let l_Address = this.isNotNull(sessionStorage.getItem("ssAdd")) ? sessionStorage.getItem("ssAdd") : '';
      let l_City = this.isNotNull(sessionStorage.getItem("ssCity")) ? sessionStorage.getItem("ssCity") : '';
      let l_State = this.isNotNull(sessionStorage.getItem("ssState")) ? sessionStorage.getItem("ssState") : '';
      let l_isExact = this.isNotNull(sessionStorage.getItem("ssIsExact")) ? sessionStorage.getItem("ssIsExact") : "true";

      if (l_Policyno != '' || l_PolicyName != '' || l_Federalid != '' || l_Brokerno != '' ||
      l_Status != '' || l_Address != '' || l_City != '' || l_State != '') {
        this.Policyno = l_Policyno;
        this.PolicyName = l_PolicyName;
        this.Federalid = l_Federalid;
        this.Brokerno = l_Brokerno;
        switch(l_Status){
          case "":  this.ddlStatus = "";break;
          case "0": this.ddlStatus = "0";break;
          case "A": this.ddlStatus = "A";break;
          case "D": this.ddlStatus = "D";break;
          case "P": this.ddlStatus = "P";break;
      }
        this.Address = l_Address;
        this.City = l_City;
        this.CheckBoxvalue = l_isExact=="true" ? true : false;
        this.getStates(l_State);
      }
    }
  }

  ngOnInit() {
    this.getStates('first');
  }

  //Get policies by search criteria
  getPolicyInfoBySearch() {
    this.error = false;
    this.errorForMainFields = false;
    this.BrokernoInvalid = false;
    this.dynamicBorder = "";
    this.dynamicBorderBroker = "";
    this.allgood = true;

    let l_Policyno = this.isNotNull(this.Policyno) ? this.common.encrypt(this.Policyno.trim()) : '';
    let l_PolicyName = this.isNotNull(this.PolicyName) ? this.common.encrypt(this.PolicyName.trim()) : '';
    let l_Federalid = this.isNotNull(this.Federalid) ? this.common.encrypt(this.Federalid.trim()) : '';
    let l_Brokerno = this.isNotNull(this.Brokerno) ? this.common.encrypt(this.Brokerno.trim()) : '';
    let l_Status = this.isNotNull(this.ddlStatus) ? this.common.encrypt(this.ddlStatus.trim()) : '';
    let l_Address = this.isNotNull(this.Address) ? this.common.encrypt(this.Address.trim()) : '';
    let l_City = this.isNotNull(this.City) ? this.common.encrypt(this.City.trim()) : '';
    let l_State = this.isNotNull(this.ddlState) ? this.common.encrypt(this.ddlState.trim()) : '';

    sessionStorage.setItem("ssPolicyno", this.Policyno);
    sessionStorage.setItem("ssPolicyName", this.PolicyName);
    sessionStorage.setItem("ssFederalid", this.Federalid);
    sessionStorage.setItem("ssBrokerno", this.Brokerno);
    sessionStorage.setItem("ssStatus", this.ddlStatus);
    sessionStorage.setItem("ssAdd", this.Address);
    sessionStorage.setItem("ssCity", this.City);
    sessionStorage.setItem("ssState", this.ddlState);
    sessionStorage.setItem("ssIsExact", this.CheckBoxvalue == false ? "false" : "true");

    if (l_Policyno != '' || l_PolicyName != '' || l_Federalid != '' || l_Brokerno != '' ||
      l_Status != '' || l_Address != '' || l_City != '' || l_State != '') {
      // this.error = false;
      // this.errorForMainFields = false;
      // this.BrokernoInvalid = false;
      var patternBrokerNo = /^\d{4}-\d{4}/;
      if (l_Policyno == '' && l_PolicyName == '' && l_Federalid == '') {
        this.dynamicBorder = "redBorder";
        this.errorForMainFields = true;
        this.allgood = false;
      }
      if (patternBrokerNo.test(this.Brokerno) == false && this.isNotNull(this.Brokerno)) {
        this.BrokernoInvalid = true;
        this.dynamicBorderBroker = "redBorder";
        this.allgood = false;
      }
      if (this.allgood) {
        let exact = this.CheckBoxvalue == false ? this.common.encrypt("false") : this.common.encrypt("true");
        let url = '/policyinforesult?search=' + encodeURIComponent(l_Policyno.trim()) + '%7C' + encodeURIComponent(l_PolicyName.trim()) + '%7C' + encodeURIComponent(l_Federalid.trim()) + '%7C' + encodeURIComponent(l_Brokerno.trim()) + '%7C' + encodeURIComponent(l_Status.trim()) + '%7C' + encodeURIComponent(l_Address.trim()) + '%7C' + encodeURIComponent(l_City.trim()) + '%7C' + encodeURIComponent(l_State.trim()) + '%7C' + exact;
        this.router.navigateByUrl(url);
      }
    }
    else {
      this.error = true;
    }
  }

  //#region "Populate State"
  getStates(call: string) {
    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetAllStates";
    this._data.GetService(url).subscribe(lstStates => { this.bindState(lstStates, call) });
  }

  bindState(lstStates: any, call: string) {
    this.AllState = lstStates;
    if (this.AllState != null) {
      for (var i = 0; i < this.AllState.length; i++) {
        let o = new States();
        o.statecode = lstStates[i].statecode;
        this.StatesDetailFinal.push(o);
      }
      if (call != 'first')
        this.ddlState = call;
    }
  }
  //#endregion

  //To clear the on screen fields
  clearPolicyInfo() {
    this.CheckBoxvalue = true;
    this.Policyno = '';
    this.PolicyName = '';
    this.Federalid = '';
    this.Brokerno = '';
    this.ddlStatus = '';
    this.Address = '';
    this.City = '';
    this.ddlState = '';
    this.errorForMainFields = false;
    this.dynamicBorder = "";
    this.dynamicBorderBroker = "";
    this.error = false;
    this.BrokernoInvalid = false;

  }

  //CheckBox
  onCheckBoxClick() {
    this.CheckBoxvalue = !this.CheckBoxvalue;
    if (this.CheckBoxvalue) {
      this.CheckBoxvalue = true;
    }
    else {
      this.CheckBoxvalue = false;
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

  onKeydown(event: any) {
    if (event.target.value.trim() != '') {
      if (event.srcElement.name != 'Brokerno') {
        this.dynamicBorder = "clearBorder";
        this.errorForMainFields = false;
      }
      if (event.srcElement.name == 'Brokerno') {
        this.dynamicBorderBroker = "clearBorder";
        this.BrokernoInvalid = false;
      }
    }
  }

  // OnKeyPress(event, ctrl) {
  //   if (event.keyCode == 8) {
  //     if (ctrl == 'Email')
  //       this.InvalidEmail = false;
  //     else
  //       this.invalidBNo = false;
  //   }
  //}

}
