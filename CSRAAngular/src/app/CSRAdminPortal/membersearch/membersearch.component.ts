/*****************************************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 28 DEC 2018, Friday
 * Decription :  member search screen where user can search members by Email-id or Claim No. or Last Name.
 *****************************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Common } from 'src/common';

@Component({
  selector: 'app-membersearch',
  templateUrl: './membersearch.component.html',
  styleUrls: ['./membersearch.component.scss']
})
export class MembersearchComponent implements OnInit {
  EmailID: string = '';
  ClaimNumber: string = '';
  LastName: string = '';
  error: boolean = false;
  InvalidEmail: boolean = false;
  constructor(private router: Router, private common: Common) { }

  ngOnInit() {
  }

  //navigate to memberresult and get members
  getClaimBySearch() {
    let emailId = this.EmailID.trim() != null ? this.common.encrypt(this.EmailID.trim()) : '';
    let ClaimNo = this.ClaimNumber.trim() != null ? this.common.encrypt(this.ClaimNumber.trim()) : '';
    let Lname = this.LastName.trim() != null ? this.common.encrypt(this.LastName.trim()) : '';
    if (emailId != '' || ClaimNo != '' || Lname != '') {
      this.error = false;
      sessionStorage.setItem("ssnMemberEmail", emailId.trim());
      sessionStorage.setItem("ssnClaimNumber", ClaimNo.trim());
      sessionStorage.setItem("ssnLastname", Lname.trim());
      let url = '/memberresult?U=' + encodeURIComponent(emailId.trim()) + '&C=' + encodeURIComponent(ClaimNo.trim()) + '&L=' + encodeURIComponent(Lname.trim());
      this.router.navigateByUrl(url);
    }
    else
      this.error = true;
  }

  //default button
  searchInput() {
    var patternEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    


      if (this.EmailID.trim() == '' && this.ClaimNumber.trim() == '' && this.LastName.trim() == '')
        this.error = true;
      else if (patternEmail.test(this.EmailID) == false && this.EmailID.trim() != '') {
        if (patternEmail.test(this.EmailID) == false && this.EmailID.trim() != '')
          this.InvalidEmail = true;
      }
      else
        document.getElementById("Search").click();
  }

  OnKeyPress(event) {
    if (event.keyCode == 8) {
      this.InvalidEmail = false;
    }
  }

}
