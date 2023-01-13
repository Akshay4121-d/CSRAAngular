import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import { DataService } from 'src/app/CSRAdminPortal/services/data.service';
import { Router } from "@angular/router";
import { UserPermission } from 'src/app/models/user-permission'
import { Common } from 'src/common'
declare var $: any;

declare function getCurentFileName(): any;
@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {
  UserName: any;
  showMenu: boolean;
  accessflag: any;
  UserPermissionsData: UserPermission[];
  UserPermissions: UserPermission[] = [];
  blnCIS: boolean = false; blnPIS: boolean = false; blnSUA: boolean = false; blnCSI: boolean = false;
  isHomeAccess: boolean = false;
  constructor(private _data: DataService, private router: Router, private common: Common) {
    



    if (sessionStorage.getItem('UserName') == "undefined" || sessionStorage.getItem('UserName') == null) {
      let url = AppConstants.SERVICE_URL + "common/GetUserName"
      this._data.GetService(url).subscribe(data => this.setUser(data));
      // 
    }
    else {
      this.UserName = this.common.decrypt(sessionStorage.getItem('UserName'));
    }
    // if(this.UserName == "undefined")
    // this.UserName = "";

    //this._data.CallMethod();
  }
  setUser(uName_CSRid: any) {
    var UserNameandCSRId = uName_CSRid;
    var uName = UserNameandCSRId.split(",")[0];
    var Id_CSR = UserNameandCSRId.split(",")[1];
    sessionStorage.setItem('UserName', this.common.encrypt(uName));
    sessionStorage.setItem('id_CSR', Id_CSR);
    this.UserName = uName;
  }

  ngOnInit() {
    this.checkAccess();
  }
  //This will redirect to "Claim Information Search Screen"
  GoToClaimInfoSearch() {
    //window.open(AppConstants.IntranetSiteURL + "csrcallutilities/claiminformationsearch.aspx?p=1.1.8.12", "_blank");
  }

  //This will redirect to "Policy Information Search Screen"
  GoToPolicyInfoSearch() {
    window.open(AppConstants.IntranetSiteURL + "csrcallutilities/PolicyInformationSearch.aspx?p=1.1.8.13", "_blank");
  }

  //Hide the menu from home screen.
  setMenuDisplay() {
    if (getCurentFileName() == "home" || getCurentFileName() == "invalid-access")
      return false;
    else
      return true;
  }

  closeNav(){
    $('.sidenav').css("width", 0);
  }
  
  homeClick(){
    this.closeNav();
    this.router.navigate(['/home']);
  }

  checkAccess1(role: string) {
    let url = AppConstants.SERVICE_URL + "common/CheckUserAccess?role=" + role;
    this._data.GetService(url).subscribe(isAccess => { this.accessflag = isAccess });
    return this.accessflag;

  }
  checkAccess() {
    if (this.common.decrypt(sessionStorage.getItem('isAccess')) == 'true') {
      this.isHomeAccess = true;
    }

    let url = AppConstants.SERVICE_URL + "common/GetAccessMenus";
    this._data.GetService(url).subscribe(UserPermissionsData => this.Assignpermission(UserPermissionsData));
    return this.accessflag;
  }
  clickCall(requestType: string) {
    if (requestType.toUpperCase() == "Claim Information Search".toUpperCase()) {
      //window.open(AppConstants.IntranetSiteURL + "csrcallutilities/claiminformationsearch.aspx?p=1.1.8.12", "_blank");
      this.router.navigate(['/claiminfosearch']);
    }
    if (requestType.toUpperCase() == "Policy Information Search".toUpperCase()) {
      this.router.navigate(['/policyinfosearch']);
      // window.open(AppConstants.IntranetSiteURL + "csrcallutilities/PolicyInformationSearch.aspx?p=1.1.8.13", "_blank");
    }
    if (requestType.toUpperCase() == "Broker Information Search".toUpperCase()) {
      this.router.navigate(['/brokerinfosearch']);
    }
    if (requestType.toUpperCase() == "Online Account Management".toUpperCase()) {
      this.router.navigate(['/selectuser']);
    }
    if (requestType.toUpperCase() == "Commission Statement Information".toUpperCase()) {
      window.open("assets/Documents/How%20to%20Find%20Commission%20Statements.pdf", "_blank");
    }
    if(requestType.toUpperCase() == "Call Log".toUpperCase()){
      window.open(AppConstants.IntranetSiteURL + "calllog/calllog.aspx", "_blank");
    }
    if(requestType.toUpperCase() == "Policy Amendment Report".toUpperCase()){
      window.open(AppConstants.ReportServerURL + "Report/PolicyAmendmentReport&rs:Command=Render", "_blank");
    }
    if(requestType.toUpperCase() == "Policy Amendment Entry".toUpperCase()){
      window.open(AppConstants.UserURL + "broker/csrpolicyredirect.aspx?request=amendmententry&IntranetCSRUser=" + this.common.encrypt(this.UserName), "_blank");
    }
    if(requestType.toUpperCase() == "Policy Amendment Search".toUpperCase()){
      window.open(AppConstants.UserURL + "broker/csrpolicyredirect.aspx?request=amendmentsearch&IntranetCSRUser=" + this.common.encrypt(this.UserName), "_blank");
    }
    if(requestType.toUpperCase() == "FICA Remittance Service".toUpperCase()){
      window.open(AppConstants.ReportServerURL + "Underwriting/FICA Remittance Service&rs:Command=Render", "_blank");
    }
    if(requestType.toUpperCase() == "W-2 Prep Service".toUpperCase()){
      window.open(AppConstants.ReportServerURL + "Underwriting/W-2 Prep Service&rs:Command=Render", "_blank");
    }
  }
  Assignpermission(AllAccess: any) {
    if(AllAccess!=null){
    AllAccess.forEach(function (value) {
      if (value.Title == "Claim Information Search") {
        let o = new UserPermission();
        o.Sequence = 1;
        o.IsContainer = true;
        o.ControlName = value.Title;
        o.ImagePath = "assets/Images/man-with-computer.jpg";
        o.CallingFunction = "GoToClaimInfoSearch()";
        o.className = "box-grid";
        o.styleData = "";
        this.UserPermissions.push(o);
        this.blnCIS = true;
      }
      if (value.Title == "Policy Information Search") {
        this.blnPIS = true;
        let o = new UserPermission();
        o.Sequence = 2;
        o.IsContainer = true;
        o.ControlName = value.Title;
        o.ImagePath = "assets/Images/payroll-batch.png";
        o.CallingFunction = "GoToPolicyInfoSearch()";
        o.className = "box-grid floro-green";
        o.styleData = "";
        this.UserPermissions.push(o);
      }
      if (value.Title.toUpperCase() == "Broker Information Search".toUpperCase()) {
        let o = new UserPermission();
        o.Sequence = 3;
        o.IsContainer = true;
        o.ControlName = value.Title;
        o.ImagePath = "assets/Images/policyWarning.png";
        o.CallingFunction = "GoToBrokerInfoSearch()";
        o.className = "box-grid peach-shade iconImage";
        o.styleData = "";
        this.UserPermissions.push(o);
      }
      if (value.Title == "Online Account Management") {
        this.blnSUA = true;
        let o = new UserPermission();
        o.Sequence = 4;
        o.IsContainer = true;
        o.ControlName = value.Title;
        o.ImagePath = "assets/Images/girls-laptop.jpg";
        o.CallingFunction = "GoToSearchUserAccounts()";
        o.className = "box-grid";
        o.styleData = "";
        this.UserPermissions.push(o);
      }
      if (value.Title == "Commission Statement Information") {
        this.blnCSI = true;
        let o = new UserPermission();
        o.Sequence = 5;
        o.IsContainer = true;
        o.ControlName = value.Title;
        o.ImagePath = "assets/Images/schedule_payment.png";
        o.CallingFunction = "GoToCommissionStatementInformation()";
        o.className = "box-grid orange-bg";
        o.styleData = "";
        this.UserPermissions.push(o);
      }
      if (value.Title.toUpperCase() == "Call Log".toUpperCase()) {
        this.blnCSI = true;
        let o = new UserPermission();
        o.Sequence = 6;
        o.IsContainer = true;
        o.ControlName = value.Title;
        o.ImagePath = "assets/Images/call.png";
        o.CallingFunction = "GoToCallLog()";
        o.className = "box-grid green-bg-light iconImage";
        o.styleData = "";
        this.UserPermissions.push(o);
      }
      if (value.Title.toUpperCase() == "CSR Call Utilities".toUpperCase()) {
        this.blnCSI = true;
        let o = new UserPermission();
        o.Sequence = 7;
        o.IsContainer = true;
        o.ControlName = "Policy Amendment Report";
        o.ImagePath = "assets/Images/report.png";
        o.CallingFunction = "GoToPolicyAmendmentEntry()";
        o.className = "box-grid color-grey-light iconImage heigthWidth";
        o.styleData = "";
        this.UserPermissions.push(o);
      }
      // Added the below two links by Shloke due to CO#4169
      if (value.Title.toUpperCase() == "CSR Call Utilities".toUpperCase()) {
        this.blnCSI = true;
        let o = new UserPermission();
        o.Sequence = 8;
        o.ControlName = "FICA Remittance Service";
        this.UserPermissions.push(o);
      }
      if (value.Title.toUpperCase() == "CSR Call Utilities".toUpperCase()) {
        this.blnCSI = true;
        let o = new UserPermission();
        o.Sequence = 9; 
        o.ControlName = "W-2 Prep Service";
        this.UserPermissions.push(o);
      }
      // if (value.Title.toUpperCase() == "CSR Amend Entry".toUpperCase()) {
      //   this.blnCSI = true;
      //   let o = new UserPermission();
      //   o.Sequence = 8;
      //   o.IsContainer = true;
      //   o.ControlName = "Policy Amendment Entry";
      //   o.ImagePath = "assets/Images/edit_report.png";
      //   o.CallingFunction = "GoToPolicyAmendmentPolicy()";
      //   o.className = "box-grid color-grey-light iconImage heigthWidth";
      //   o.styleData = "";
      //   this.UserPermissions.push(o);
      // }
      // if (value.Title.toUpperCase() == "CSR Amend Task".toUpperCase()) {
      //   this.blnCSI = true;
      //   let o = new UserPermission();
      //   o.Sequence = 9;
      //   o.IsContainer = true;
      //   o.ControlName = "Policy Amendment Search";
      //   o.ImagePath = "assets/Images/research.png";
      //   o.CallingFunction = "GoToPolicyAmendmentSearch()";
      //   o.className = "box-grid color-grey-light iconImage";
      //   o.styleData = "";
      //   this.UserPermissions.push(o);
      // }
    }.bind(this));}
    this.UserPermissions.sort(function (a, b) {
      return a.Sequence - b.Sequence;
    });
    if (this.UserPermissions.length > 0) {
      this.isHomeAccess = true;
    }
  }
}
