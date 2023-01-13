import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { States } from 'src/app/models/policyinfo';
import { Common } from 'src/common';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-duplicatepolicy',
  templateUrl: './duplicatepolicy.component.html',
  styleUrls: ['./duplicatepolicy.component.css']
})
export class DuplicatepolicyComponent implements OnInit {


  p: string = '';//postback
  AllState: States[];
  StatesDetailFinal: Array<States> = [];
  allgood: boolean = true;
  //#region "Screen Fields"
  public norecords: boolean = false;
  Policyno: string = '';
  ZipCode: number ;
  error: boolean = false;
  errorForMainFields: boolean = false;
  BrokernoInvalid: boolean = false;
  dynamicBorder: string = '';
  dynamicBorderBroker: string = '';
  l_message:string='';
  //#endregion

  constructor(private router: Router, private _data: DataService, private ngxService: NgxUiLoaderService, private common: Common,
    private route: ActivatedRoute) {
    this.p = this.route.snapshot.queryParams['p'];
    if (this.p == "return") {
      let l_Policyno = this.isNotNull(sessionStorage.getItem("ssPolicyno")) ? sessionStorage.getItem("ssPolicyno") : '';
      let l_ZipCode = this.isNotNull(sessionStorage.getItem("ssZipCode")) ? sessionStorage.getItem("ssZipCode") : '';
      
      // if (l_Policyno != '' || l_ZipCode != '') {
      //   this.Policyno = l_Policyno;
      //   this.ZipCode = l_ZipCode;
      // }
    }
  }

  ngOnInit(): void {
  }

  //Get policies by search criteria
  validatePolicyInfoBySearch() {
    this.error = false;
    this.errorForMainFields = false;
    this.BrokernoInvalid = false;
    this.dynamicBorder = "";
    this.dynamicBorderBroker = "";
    this.allgood = true;

    let l_Policyno = this.isNotNull(this.Policyno) ? this.common.encrypt(this.Policyno.trim()) : '';
    let l_ZipCode = this.isNotNull(this.ZipCode) ? this.common.encrypt(this.ZipCode.toString()) : '';
    let l_requestType = this.common.encrypt('duplicatepolicy');

    sessionStorage.setItem("ssPolicyno", this.Policyno);
    sessionStorage.setItem("ssZipCode", this.ZipCode.toString());
        
    if (l_Policyno != '' || l_ZipCode != '') {
      if (l_Policyno == '' && l_ZipCode == '') {
        this.dynamicBorder = "redBorder";
        this.errorForMainFields = true;
        this.allgood = false;
      }
      if (this.allgood) {
        let url = AppConstants.SERVICE_URL + 'PolicyInformation/ValidateDuplicatePolicy?PolicyNo=' + l_Policyno +
        '&ZipCode=' + l_ZipCode + '&requestType=' + l_requestType;
        this._data.GetService(url).subscribe(validationMsg => { this.forSuccess(validationMsg.toString())});       
      }
    }
    else {
      this.error = true;
    }
  }

  forSuccess(validationMsg:string)
  {    
    if (validationMsg == "Success") {
      this.norecords=false;
      let l_Policyno = this.isNotNull(this.Policyno) ? this.common.encrypt(this.Policyno.trim()) : '';
      // let url = '/policyinfosearch?search=' + encodeURIComponent(l_Policyno.trim()) + '%7C' + encodeURIComponent(l_ZipCode.trim());
       let url = '/duplicatepolicycontact?pno='+ encodeURIComponent(l_Policyno.trim());
      
      //let url = '/duplicatepolicycontact'+ '/' + this.Policyno +'/'+this.ZipCode;
      this.router.navigateByUrl(url);
    }
    else {
      this.norecords=true;
      this.l_message=validationMsg;
    }
}
  //To clear the on screen fields
  clearPolicyInfo() {
    this.Policyno = '';
    this.ZipCode = null;
    this.errorForMainFields = false;
    this.dynamicBorder = "";
    this.dynamicBorderBroker = "";
    this.error = false;
    this.BrokernoInvalid = false;
    this.norecords=false;
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