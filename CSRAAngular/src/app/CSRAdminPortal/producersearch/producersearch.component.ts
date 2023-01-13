/************************************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 18 DEC 2018, Tuesday
 * Decription :  producer search screen where user can search with producer number like xxxx-xxxx
 ***********************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Common } from 'src/common';

@Component({
  selector: 'app-producersearch',
  templateUrl: './producersearch.component.html',
  styleUrls: ['./producersearch.component.scss']
})
export class ProducersearchComponent implements OnInit {
  BrokerNumber: string = '';
  EmailID: string = '';
  ssnProducerNumber: string;
  ssnProducerEmail: string;
  error: boolean = false;
  InvalidEmail: boolean = false;
  constructor(private router: Router, private common: Common) { }
  invalidBNo: boolean = false;

  ngOnInit() {
  }

  //To encrypt and navigate to producer search results
  getProducerByNumber() {
    let emailId = this.EmailID.trim() != null ? this.common.encrypt(this.EmailID.trim()) : '';
    let BrokerNo = this.BrokerNumber.trim() != null ? this.common.encrypt(this.BrokerNumber.trim()) : '';
    if (emailId != '' || BrokerNo != '') {
      this.error = false;
      sessionStorage.setItem("ssnProducerEmail", emailId.trim());
      sessionStorage.setItem("ssnProducerNumber", BrokerNo.trim());
      let url = '/producerresult?E=' + encodeURIComponent(emailId.trim()) + '&P=' + encodeURIComponent(BrokerNo.trim());
      this.router.navigateByUrl(url);
    }
    else
      this.error = true;
  }

  //default button
  searchInput() {

    var patternEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var patternBrokerNo = /^\d{4}-\d{4}/;

    // if(patternEmail.test(this.EmailID) == true || this.BrokerNumber.trim() != '')
    //   document.getElementById("Search").click();

    if (this.BrokerNumber.trim() == '' && this.EmailID.trim() == '')
      this.error = true;
    
    else if ((patternEmail.test(this.EmailID) == false && this.EmailID.trim() != '') || (patternBrokerNo.test(this.BrokerNumber) == false && this.BrokerNumber.trim() != '')) {
      if (patternEmail.test(this.EmailID) == false && this.EmailID.trim() != '')
        this.InvalidEmail = true;
      if (patternBrokerNo.test(this.BrokerNumber) == false && this.BrokerNumber.trim() != '')
        this.invalidBNo = true;
    }
    else {
      this.getProducerByNumber();
    }
  }

  OnKeyPress(event, ctrl) {
    if (event.keyCode == 8) {
      if (ctrl == 'Email')
        this.InvalidEmail = false;
      else
        this.invalidBNo = false;
    }
  }
}
