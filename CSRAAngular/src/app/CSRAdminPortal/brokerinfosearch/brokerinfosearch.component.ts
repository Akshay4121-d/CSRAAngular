/**************************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 23 OCT 2019, Wednesday
 * Decription :  Screen to search broker by broker#, name, federal ID, PhoneNo.
 **************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Common } from 'src/common';

@Component({
  selector: 'app-brokerinfosearch',
  templateUrl: './brokerinfosearch.component.html',
  styleUrls: ['./brokerinfosearch.component.scss']
})
export class BrokerinfosearchComponent implements OnInit {

  BrokerNumber: string = '';
  Userid: string = '';
  Federalid: string = '';
  BrokerName: string = '';
  Phno: string = '';
  Policyno: string = '';
  CompanyName: string = '';
  error: boolean = false;
  invalidBNo: boolean = false;
  invalidPhno: boolean = false;

  constructor(private router: Router, private common: Common) { }

  ngOnInit() {
  }

  //navigate to employerresult and get employers
  getBrokerInfoBySearch() {
    if (this.BrokerNumber.trim() == '' && this.Federalid.trim() == '' && this.BrokerName.trim() == '' && this.Phno.trim() == '')
      this.error = true;
    else
    {
      var inputTest = true;
      var patternBrokerNo = /^\d{4}-\d{4}/;
      var patternPhno= /^\d{3}-\d{3}-\d{4}/;
      if (patternBrokerNo.test(this.BrokerNumber) == false && this.BrokerNumber.trim() != ''){
        this.invalidBNo = true;
        inputTest = false;
      }
      if(patternPhno.test(this.Phno) == false && this.Phno.trim() != ''){
        this.invalidPhno = true;
        inputTest = false;
      }
      if(inputTest)
      {
        let brokerno = this.BrokerNumber.trim() != null ? this.common.encrypt(this.BrokerNumber.trim()) : '';
        let federalid = this.Federalid.trim() != null ? this.common.encrypt(this.Federalid.trim()) : '';
        let brokername = this.BrokerName.trim() != null ? this.common.encrypt(this.BrokerName.trim()) : '';
        let phno = this.Phno.trim() != null ? this.common.encrypt(this.Phno.trim()) : '';
        this.error = false;
        sessionStorage.setItem("ssnBrokerNo", brokerno.trim());
        sessionStorage.setItem("ssnFederalId", federalid.trim());
        sessionStorage.setItem("ssnBrokerName", brokername.trim());
        sessionStorage.setItem("ssnPhone", phno.trim());
        let url = '/brokerinforesult?B=' + encodeURIComponent(brokerno.trim()) + '&F=' + encodeURIComponent(federalid.trim()) + '&N=' + encodeURIComponent(brokername.trim()) + '&P=' + encodeURIComponent(phno);
        sessionStorage.setItem("ssnBrokerSearchUrl", url.trim());
        this.router.navigateByUrl(url);
      }
    }
  }

  OnKeyPress(event, ctrl) {
    this.error = false;
    if (ctrl == 'Bkrno')
        this.invalidBNo = false;
    else if(ctrl == 'Phno')
        this.invalidPhno = false;
  }
  
}
