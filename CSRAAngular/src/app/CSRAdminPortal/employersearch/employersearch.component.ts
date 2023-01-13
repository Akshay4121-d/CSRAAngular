/***********************************************************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 27 DEC 2018, Thursday
 * Decription :  employer search screen where user can search with Userid or federal id or policy number or company name
 ***********************************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Common } from 'src/common';

@Component({
  selector: 'app-employersearch',
  templateUrl: './employersearch.component.html',
  styleUrls: ['./employersearch.component.scss']
})
export class EmployersearchComponent implements OnInit {
  Userid: string = '';
  Federalid: string = '';
  Policyno: string = '';
  CompanyName: string = '';
  error: boolean = false;

  constructor(private router: Router, private common: Common) { }

  ngOnInit() {
  }

  //navigate to employerresult and get employers
  getPolicyholderBySearch() {
    let userId = this.Userid.trim() != null ? this.common.encrypt(this.Userid.trim()) : '';
    let federalid = this.Federalid.trim() != null ? this.common.encrypt(this.Federalid.trim()) : '';
    let policyno = this.Policyno.trim() != null ? this.common.encrypt(this.Policyno.trim()) : '';
    let companyname = this.CompanyName.trim() != null ? this.common.encrypt(this.CompanyName.trim()) : '';
    if (userId != '' || federalid != '' || policyno != '' || companyname != '') {
      this.error = false;
      sessionStorage.setItem("ssnUserId", userId.trim());
      sessionStorage.setItem("ssnFederalId", federalid.trim());
      sessionStorage.setItem("ssnPolicyNo", policyno.trim());
      sessionStorage.setItem("ssnCompanyName", companyname.trim());
      let url = '/employerresult?U=' + encodeURIComponent(userId.trim()) + '&F=' + encodeURIComponent(federalid.trim()) + '&P=' + encodeURIComponent(policyno.trim()) + '&C=' + encodeURIComponent(companyname);
      this.router.navigateByUrl(url);
    }
    else
      this.error = true;
  }


  //default button
  searchInput() {
    if (this.Userid.trim() == '' && this.Federalid.trim() == '' && this.Policyno.trim() == '' && this.CompanyName.trim() == '')
      this.error = true;
    else
      document.getElementById("Search").click();
  }
}
