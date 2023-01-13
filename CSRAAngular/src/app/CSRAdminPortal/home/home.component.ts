/**************************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 17 DEC 2018, Monday
 * Decription :  CSR Admin Portal's Home Page
 * Modified By : Shloke		Reson:3744 - Add Call Log Related task and Amendment links to new CSR Portal
 **************************************************************************************/

import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { AppConstants } from 'src/app/app.constants';
import { DataService } from 'src/app/CSRAdminPortal/services/data.service';
import { UserPermission } from 'src/app/models/user-permission'
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Common } from 'src/common';
import { DatePipe } from '@angular/common';
import { DatePickerComponent } from 'ng2-date-picker';
import { ProfileCallCounts, ProfileCallHistory, ProfileClaimNote, ProfilePolicyNote, CSRdetails } from 'src/app/models/profile';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  serializedDateCall1 = new FormControl((new Date()).toISOString());
  serializedDateCall = new FormControl((new Date()).toISOString());
  serializedDateClaim1 = new FormControl((new Date()).toISOString());
  serializedDateClaim = new FormControl((new Date()).toISOString());
  serializedDatePolicy1 = new FormControl((new Date()).toISOString());
  serializedDatePolicy = new FormControl((new Date()).toISOString());
  maxDate = new Date();

  //selectedDate = this.datepipe.transform(new Date(), 'MM/dd/yyyy');
  // maxDatee = this.datepipe.transform(new Date(), 'MM/dd/yyyy');
  // dateConfig: any =
  //   {
  //     locale: 'en',
  //     disableKeypress: true,
  //     format: 'MM/DD/YYYY',
  //     opens: 'left',
  //     mode: 'day',
  //     showGoToCurrent: true,
  //     max: this.maxDatee

  //   }

  //#region "Public Variables"

  columnRecentHist = [
    { headerName: 'Time', field: 'time', width: 75, suppressSizeToFit: true },
    { headerName: 'Identifier', field: 'identifier', width: 85, suppressSizeToFit: true },
    { headerName: 'Identifier #', field: 'identifierno', width: 90, autoHeight: true, cellStyle: { "white-space": "normal" }, suppressSizeToFit: true },
    { headerName: 'Reason', field: 'reason', autoHeight: true, cellStyle: { "white-space": "normal" } },
    { headerName: 'Action', field: 'action', width: 278, autoHeight: true, cellStyle: { "white-space": "normal" } },
    { headerName: 'Type', field: 'calltype', width: 75, suppressSizeToFit: true }
  ];

  columnRecentHistPopUp = [
    { headerName: 'Date', field: 'date', width: 140, suppressSizeToFit: true },
    { headerName: 'Identifier', field: 'identifier', width: 85, suppressSizeToFit: true },
    { headerName: 'Identifier #', field: 'identifierno', width: 90, autoHeight: true, cellStyle: { "white-space": "normal" }, suppressSizeToFit: true },
    { headerName: 'Reason', field: 'reason', autoHeight: true, cellStyle: { "white-space": "normal" } },
    { headerName: 'Action', field: 'action', width: 209, autoHeight: true, cellStyle: { "white-space": "normal" } },
    { headerName: 'Type', field: 'calltype', width: 80, suppressSizeToFit: true }
  ];

  columnClaimNoteHist = [
    { headerName: 'Date', field: 'date', width: 140, suppressSizeToFit: true },
    { headerName: 'Claim #', field: 'claimno', width: 90, suppressSizeToFit: true },
    { headerName: 'Note', field: 'note', width: 574, autoHeight: true, cellStyle: { "white-space": "normal" } }
  ];

  columnPolicyNoteHist = [
    { headerName: 'Date', field: 'date', width: 140, suppressSizeToFit: true },
    { headerName: 'Policy #', field: 'businessobjectcharid', width: 90, suppressSizeToFit: true },
    { headerName: 'Note', field: 'note', width: 574, autoHeight: true, cellStyle: { "white-space": "normal" } }
  ];

  //public gridApi_Call;
  //public gridApi_Claim;
  //public gridApi_Policy;

  //public gridApi_Call_Popup;
  //public gridApi_Claim_Popup;
  //public gridApi_Policy_Popup;
  public defaultColDef;
  public noRowsTemplate;
  public loadingTemplate;
  public domLayout;
  public autoHeight;
  classMarg: string = "test";

  rowRecentCallHistory: any = [];
  //  rowClaimNoteHistory: any = [];
  rowPolicyNoteHistory: any = [];

  rowRecentCallHistory_PopUp: any = [];
  rowClaimNoteHistory_PopUp: any = [];
  rowPolicyNoteHistory_PopUp: any = [];

  ProfileCallCountsInfo: ProfileCallCounts[];
  ProfileCallHistoryInfo: ProfileCallHistory[];
  ProfileClaimNoteInfo: ProfileClaimNote[];
  ProfilePolicyNoteInfo: ProfilePolicyNote[];
  CSRdetailsInfo: CSRdetails[];

  CountDetails: any;
  ProfileCountsFinal: Array<ProfileCallCounts> = [];
  ProfileDetailFinal: Array<CSRdetails> = [];

  CallAttendant: string;
  Id_CSR: string;
  countsBind: boolean = false;
  callAll: boolean = true;
  popUp: boolean = false;
  showNextLink_Call: boolean = false;
  showNextLink_Claim: boolean = false;
  showNextLink_Policy: boolean = false;
  //#endregion

  @ViewChild('dpcalCalls') dateCallsPicker: DatePickerComponent;
  @ViewChild('dpcalClaim') dateClaimPicker: DatePickerComponent;
  @ViewChild('dpcalPolicy') datePolicyPicker: DatePickerComponent;

  accessflag: any;
  blnCIS: boolean = false; blnPIS: boolean = false; blnSUA: boolean = false; blnCSI: boolean = false;
  UserPermissionsData: UserPermission[];
  UserPermissions: UserPermission[] = [];
  private gridApi;
  gridColumnApi: any;
  showInvalidDateRange: boolean = false;

  public showCallExport: boolean = false;
  public showClaimExport: boolean = false;
  public showPolicyExport: boolean = false;

  constructor(private router: Router, private _data: DataService, private ngxService: NgxUiLoaderService, private common: Common,
    public datepipe: DatePipe) {
    this.ngxService.start();
    this.loadingTemplate = `<span style="padding-top: 26px;">No Records Available.</span>`;
    this.noRowsTemplate = `<span>No Records Available.</span>`;
    this.defaultColDef = { resizable: true }; 
    this.checkAccess1('Customer Service Rep Tools');   
  }

  // @HostListener('window:resize')
  // onResize() {
  //   if (!this.gridApi) return;

  //   setTimeout(() => {
  //     this.gridApi.sizeColumnsToFit();
  //   });
  // }

  ngOnInit() {
  }

  //#region "Home Page Tiles"
  GoToClaimInfoSearch() {
    window.open(AppConstants.IntranetSiteURL + "csrcallutilities/claiminformationsearch.aspx?p=1.1.8.12", "_blank");
  }
  GoToPolicyInfoSearch() {
    window.open(AppConstants.IntranetSiteURL + "csrcallutilities/PolicyInformationSearch.aspx?p=1.1.8.13", "_blank");
  }
  // GoToPolicyAmendmentReport(){
  //   window.open(AppConstants.ReportServerURL + "Report/PolicyAmendmentReport&rs:Command=Render", "_blank");
  // }

  checkAccess() {    
    //this.ngxService.start();
    if (this.common.decrypt(sessionStorage.getItem("isAccess")).toString().toLocaleUpperCase() == "TRUE") {
      let url = AppConstants.SERVICE_URL + "common/GetAccessMenus";
      this._data.GetService(url).subscribe(UserPermissionsData => this.Assignpermission(UserPermissionsData));

      this.Id_CSR = sessionStorage.getItem('id_CSR');
      var temp_CallAttendant = sessionStorage.getItem('UserName');
      this.CallAttendant = this.common.decrypt(temp_CallAttendant);
      //var todays_date = this.selectedDate;

      var todays_date1 = this.datepipe.transform(this.serializedDateCall1.value, 'MM/dd/yyyy');
      var todays_date = this.datepipe.transform(this.serializedDateCall.value, 'MM/dd/yyyy');

      if (this.isNotNull(this.Id_CSR) && this.isNotNull(this.CallAttendant)) {
        sessionStorage.setItem("ssnCallAttendant", this.CallAttendant.toString());
        sessionStorage.setItem("ssnDateBack", todays_date1);
        sessionStorage.setItem("ssnDateNext", todays_date);
        sessionStorage.setItem("ssnUserId", this.Id_CSR.toString());
        localStorage.setItem("ssnCallAll", "true");
        this.getCallHistoryCounts(this.CallAttendant, todays_date);
        this.getRecentCallHistory(this.CallAttendant, todays_date1, todays_date, false, true);
        //this.getClaimNoteHistory(this.Id_CSR, "2/2/2015", false);
        //this.getPolicyNoteHistory(this.Id_CSR, "11/3/2015", false);
      }

      return this.accessflag;
    }
    else {
      this.router.navigate(['/invalid-access']);
    }
  }
  checkAccess1(role: string) {   
    this.ngxService.start();
    let isAccess: boolean = false;
    let url = AppConstants.SERVICE_URL + "common/CheckUserAccess?role=" + role;
    this._data.GetService(url).subscribe(isAccess => {
      this.forSuccess(isAccess.toString())

    });
  }
  forSuccess(isAccess: string) {
    //sessionStorage.clear();
    if (isAccess.toUpperCase() == "TRUE") {
      sessionStorage.setItem('isAccess', this.common.encrypt(isAccess.toString()));
      this.checkAccess();
    }
    else {
      this.router.navigate(['/invalid-access']);
    }
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
      //window.open(AppConstants.IntranetSiteURL+ "Resource/How%20to%20Find%20Commission%20Statements.pdf", "_blank");
      window.open("assets/Documents/How%20to%20Find%20Commission%20Statements.pdf", "_blank");
    }
    if(requestType.toUpperCase() == "Call Log".toUpperCase()){
      window.open(AppConstants.IntranetSiteURL + "calllog/calllog.aspx", "_blank");
    }
    if(requestType.toUpperCase() == "Policy Amendment Report".toUpperCase()){
      window.open(AppConstants.ReportServerURL + "Report/PolicyAmendmentReport&rs:Command=Render", "_blank");
    }
    if(requestType.toUpperCase() == "Policy Amendment Entry".toUpperCase()){
      window.open(AppConstants.UserURL + "broker/csrpolicyredirect.aspx?request=amendmententry&IntranetCSRUser=" + this.common.encrypt(this.CallAttendant), "_blank");
    }
    if(requestType.toUpperCase() == "Policy Amendment Search".toUpperCase()){
      window.open(AppConstants.UserURL + "broker/csrpolicyredirect.aspx?request=amendmentsearch&IntranetCSRUser=" + this.common.encrypt(this.CallAttendant), "_blank");
    }
    if(requestType.toUpperCase() == "FICA Remittance Service".toUpperCase()){
      window.open(AppConstants.ReportServerURL + "Underwriting/FICA Remittance Service&rs:Command=Render", "_blank");
    }
    if(requestType.toUpperCase() == "W-2 Prep Service".toUpperCase()){
      window.open(AppConstants.ReportServerURL + "Underwriting/W-2 Prep Service&rs:Command=Render", "_blank");
    }
  }
  Assignpermission(AllAccess: any) {
    if (AllAccess != null) {
      AllAccess.forEach(function (value) {
        if (value.Title.toUpperCase() == "Claim Information Search".toUpperCase()) {
          let o = new UserPermission();
          o.Sequence = 1;
          o.IsContainer = true;
          o.ControlName = value.Title;
          o.ImagePath = "assets/Images/research.png";
          o.CallingFunction = "GoToClaimInfoSearch_new()";
          o.className = "box-grid skyblue-bg-light img-photo";
          o.styleData = "";
          this.UserPermissions.push(o);
          this.blnCIS = true;
        }
        if (value.Title.toUpperCase() == "Policy Information Search".toUpperCase()) {

          this.blnPIS = true;
          let o = new UserPermission();
          o.Sequence = 2;
          o.IsContainer = true;
          o.ControlName = value.Title;
          o.ImagePath = "assets/Images/policy-info.png";
          o.CallingFunction = "GoToPolicyInfoSearch()";
          o.className = "box-grid floro-green iconImage";
          o.styleData = "";
          this.UserPermissions.push(o);
        }
        if (value.Title.toUpperCase() == "Broker Information Search".toUpperCase()) {
          this.blnSUA = true;
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
        if (value.Title.toUpperCase() == "Online Account Management".toUpperCase()) {
          this.blnSUA = true;
          let o = new UserPermission();
          o.Sequence = 4;
          o.IsContainer = true;
          o.ControlName = value.Title;
          o.ImagePath = "assets/Images/settings-gears.png";
          o.CallingFunction = "GoToSearchUserAccounts()";
          o.className = "box-grid purple-bg-light";
          o.styleData = "";
          this.UserPermissions.push(o);
        }
        if (value.Title.toUpperCase() == "Commission Statement Information".toUpperCase()) {
          this.blnCSI = true;
          let o = new UserPermission();
          o.Sequence = 5;
          o.IsContainer = true;
          o.ControlName = value.Title;
          o.ImagePath = "assets/Images/commission.png";
          o.CallingFunction = "GoToCommissionStatementInformation()";
          o.className = "box-grid orange-bg-light iconImage";
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
          o.IsContainer = true;
          o.ControlName = "FICA Remittance Service";
          o.ImagePath = "assets/Images/report.png";
          o.className = "box-grid color-orange-dull iconImage heigthWidth";
          o.styleData = "";
          this.UserPermissions.push(o);
        }
        if (value.Title.toUpperCase() == "CSR Call Utilities".toUpperCase()) {
          this.blnCSI = true;
          let o = new UserPermission();
          o.Sequence = 9;
          o.IsContainer = true;
          o.ControlName = "W-2 Prep Service";
          o.ImagePath = "assets/Images/report.png";
          o.className = "box-grid color-pista-bright iconImage heigthWidth";
          o.styleData = "";
          this.UserPermissions.push(o);
        }
        //-----------------------------********------------------------------------------
        //Below code Comment by ravi 28/JAN/2021 CO#4154 Remove the intranet CSR intranet Policy Amendment Entry and Search menu items.
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
//-----------------------------********------------------------------------------
      }.bind(this));
    }
    this.UserPermissions.sort(function (a, b) {
      return a.Sequence - b.Sequence;
    });
  }
  //#endregion

  //#region "CSR Profile"

  //#region "Call counts"
  //Get call counts from calllog_history
  getCallHistoryCounts(CallAttender: string, date: string) {
    if ((CallAttender != "undefined" && CallAttender != null) && (date != "undefined" && date != null)) {
      let url = AppConstants.SERVICE_URL + "Profile/GetCallCounts?CallAttendant=" + this.common.encrypt(CallAttender) + "&CreatedDate=" + this.common.encrypt(date);
      this._data.GetService(url).subscribe(ProfileCallCountsInfo => {
        this.bindCountsDetail(ProfileCallCountsInfo);
      });
    }
  }
  bindCountsDetail(CallCounts: any) {
    this.CountDetails = CallCounts;
    //this.EpayLoginInfo = this.common.encrypt(this.loginInfo);
    if (this.CountDetails != null) {
      //this.bind = true;
      let o = new ProfileCallCounts();
      o.Count_TotalCalls = this.isNotNull(CallCounts[0].totalcalls) ? CallCounts[0].totalcalls : 0;
      o.Count_AnsweredCalls = this.isNotNull(CallCounts[0].answeredcalls) ? CallCounts[0].answeredcalls : 0;
      o.Count_InsuredCalls = this.isNotNull(CallCounts[0].insuredcalls) ? CallCounts[0].insuredcalls : 0;
      o.Count_PolicyholderCalls = this.isNotNull(CallCounts[0].phcalls) ? CallCounts[0].phcalls : 0;
      o.Count_BrokerCalls = this.isNotNull(CallCounts[0].brokercalls) ? CallCounts[0].brokercalls : 0;
      this.ProfileCountsFinal.push(o);
      this.countsBind = true;
    }
  }
  //#endregion

  //#region "Recent Call History"

  //Get recent call history
  getRecentCallHistory(CallAttender: string, dateFrom: string, dateTo: string, isPopup: boolean, callAll: boolean) {
    this.showCallExport = false;
    if (this.isNotNull(CallAttender) && this.isNotNull(dateFrom) && this.isNotNull(dateTo)) {
      let url = AppConstants.SERVICE_URL + "Profile/GetRecentCallHistory?CallAttendant=" + this.common.encrypt(CallAttender) + "&CreatedDateFrom=" + this.common.encrypt(dateFrom) + "&CreatedDateTo=" + this.common.encrypt(dateTo);
      this._data.GetService(url).subscribe(ProfileCallHistoryInfo => {
        this.bindInt_CallHistoryRows(ProfileCallHistoryInfo, '', isPopup, false);
      });
    }
  }

  bindInt_CallHistoryRows(CallHistoryRows: any, date: string, isPopup: boolean, callAllfinal: boolean) {
    if (this.isNotNull(CallHistoryRows)) {
      this.classMarg = "testMarg";
      if (isPopup == true) {
        this.rowRecentCallHistory_PopUp = CallHistoryRows;
        if (this.isNotNull(this.rowRecentCallHistory_PopUp))
          this.showCallExport = true;
        else
          this.showCallExport = false;
        //this.ngxService.stop();
      }
      else
        this.rowRecentCallHistory = CallHistoryRows;
    }

    // this.gridApi_Call.setDomLayout("autoHeight");
    // setTimeout(() => { this.gridApi_Call.sizeColumnsToFit(); }, 500);
    // this.gridApi_Call.paginationSetPageSize(Number(5));
    //if (isPopup) {
    // this.gridApi_Call_Popup.setDomLayout("autoHeight");
    // setTimeout(() => { this.gridApi_Call_Popup.sizeColumnsToFit(); }, 500);
    // this.gridApi_Call_Popup.paginationSetPageSize(Number(10));
    //}

    // if (callAllfinal == true && isPopup == false)
    //   this.getClaimNoteHistory(this.Id_CSR, date, false, true);
    // else
    this.ngxService.stop();
  }

  //Get recent call history - POPUP
  getRecentCallHistory_Popup(date: string, isNav: boolean) {
    this.showInvalidDateRange = false;
    this.clearPopupGrids();
    this.popUp = true;
    this.ngxService.start();
    if (isNav == true) {
      let formatteddate = new Date(sessionStorage.getItem("ssnDateBack"));
      var subDateBack = 0;
      var subDateNext = 0;
      if (date == 'back') {
        subDateBack = formatteddate.setDate(formatteddate.getDate() - 1);
        // this.selectedDate = this.datepipe.transform(subDate, 'MM/dd/yyyy');
        // sessionStorage.setItem("ssnDate", this.selectedDate);
        var selectSerilizedDate: Date = new Date(subDateBack);
        this.serializedDateCall1 = new FormControl(selectSerilizedDate.toISOString());
        sessionStorage.setItem("ssnDateBack", this.datepipe.transform(subDateBack, 'MM/dd/yyyy'));
      }
      else if (date == 'next') {
        subDateNext = formatteddate.setDate(formatteddate.getDate() + 1);
        // this.selectedDate = this.datepipe.transform(subDate, 'MM/dd/yyyy');
        // sessionStorage.setItem("ssnDate", this.selectedDate);
        var selectSerilizedDate: Date = new Date(subDateNext);
        this.serializedDateCall = new FormControl(selectSerilizedDate.toISOString());
        sessionStorage.setItem("ssnDateNext", this.datepipe.transform(subDateNext, 'MM/dd/yyyy'));
      }
      //if (this.datepipe.transform(new Date(), 'MM/dd/yyyy') == this.selectedDate)
      if (this.datepipe.transform(new Date(), 'MM/dd/yyyy') == this.datepipe.transform(this.serializedDateCall.value, 'MM/dd/yyyy'))
        this.showNextLink_Call = false;
      else
        this.showNextLink_Call = true;
      let latestBack_date = this.datepipe.transform(subDateBack, 'MM/dd/yyyy');
      let latestNext_date = this.datepipe.transform(subDateNext, 'MM/dd/yyyy');
      this.getRecentCallHistory(sessionStorage.getItem("ssnCallAttendant"), latestBack_date, latestNext_date, true, false);
    }
    else {
      let url = "";
      if (date == 'first') {
        // this.selectedDate = this.datepipe.transform(new Date(), 'MM/dd/yyyy');
        // sessionStorage.setItem("ssnDate", this.selectedDate);
        // this.getRecentCallHistory(sessionStorage.getItem("ssnCallAttendant"), this.selectedDate, true, false);
        var selectSerilizedDate: Date = new Date();
        this.serializedDateCall1 = new FormControl(selectSerilizedDate.toISOString())
        this.serializedDateCall = this.serializedDateCall1;

        let today_date = this.datepipe.transform(new Date(), 'MM/dd/yyyy');

        sessionStorage.setItem("ssnDateBack", this.datepipe.transform(new Date(), 'MM/dd/yyyy'));
        sessionStorage.setItem("ssnDateNext", this.datepipe.transform(new Date(), 'MM/dd/yyyy'));
        this.getRecentCallHistory(sessionStorage.getItem("ssnCallAttendant"), today_date, today_date, true, false);
      }


      else {
        let dateBack = this.datepipe.transform(new Date(sessionStorage.getItem("ssnDateBack")), 'MM/dd/yyyy');
        let dateNext = this.datepipe.transform(new Date(sessionStorage.getItem("ssnDateNext")), 'MM/dd/yyyy');
        this.getRecentCallHistory(sessionStorage.getItem("ssnCallAttendant"), dateBack, dateNext, true, false);
      }
    }
  }
  //#endregion

  //#region "Recent Claim Notes"
  //Get Claim Notes history
  getClaimNoteHistory(UserId: string, dateFrom: string, dateTo: string, isPopup: boolean, callAll: boolean) {
    this.showClaimExport = false;
    if (this.isNotNull(UserId) && this.isNotNull(dateFrom), this.isNotNull(dateTo)) {
      let url = AppConstants.SERVICE_URL + "Profile/GetClaimNoteHistory?UserId=" + this.common.encrypt(UserId) + "&CreatedDateFrom=" + this.common.encrypt(dateFrom) + "&CreatedDateTo=" + this.common.encrypt(dateTo);
      this._data.GetService(url).subscribe(ProfileClaimNoteInfo => {
        this.bindInt_ClaimNotesRows(ProfileClaimNoteInfo, '', isPopup, false);
      });
    }
  }

  bindInt_ClaimNotesRows(ClaimNotesRows: any, date: string, isPopup: boolean, callAllfinal: boolean) {
    if (ClaimNotesRows != null && ClaimNotesRows != "undefined") {
      if (isPopup == true) {
        this.rowClaimNoteHistory_PopUp = ClaimNotesRows;
        if (this.isNotNull(this.rowClaimNoteHistory_PopUp))
          this.showClaimExport = true;
        else
          this.showClaimExport = false;
        //this.ngxService.stop();
      }
      //else
      //this.rowClaimNoteHistory = ClaimNotesRows;
    }
    //this.gridApi_Claim.setDomLayout("autoHeight");
    //setTimeout(() => { this.gridApi_Claim.sizeColumnsToFit(); }, 500);
    //this.gridApi_Claim.paginationSetPageSize(Number(5));

    //if (isPopup) {
    // this.gridApi_Claim_Popup.setDomLayout("autoHeight");
    // setTimeout(() => { this.gridApi_Claim_Popup.sizeColumnsToFit(); }, 500);
    // this.gridApi_Claim_Popup.paginationSetPageSize(Number(10));
    //}

    // if (callAllfinal == true && isPopup == false)
    //   this.getPolicyNoteHistory(this.Id_CSR, date, false, true);
    // else
    this.ngxService.stop();
  }

  //Get Claim Notes history - POPUP
  getClaimNoteHistory_Popup(date: string, isNav: boolean) {
    this.showInvalidDateRange = false;
    this.clearPopupGrids();
    this.ngxService.start();
    this.popUp = true;
    if (isNav == true) {
      let formatteddate = new Date(sessionStorage.getItem("ssnDate"));
      var subDate = 0;
      if (date == 'back') {
        subDate = formatteddate.setDate(formatteddate.getDate() - 1);
        // this.selectedDate = this.datepipe.transform(subDate, 'MM/dd/yyyy');
        var selectSerilizedDate: Date = new Date(subDate);
        this.serializedDateClaim = new FormControl(selectSerilizedDate.toISOString());
      }
      else if (date == 'next') {
        subDate = formatteddate.setDate(formatteddate.getDate() + 1);
        //this.selectedDate = this.datepipe.transform(subDate, 'MM/dd/yyyy');
        var selectSerilizedDate: Date = new Date(subDate);
        this.serializedDateClaim = new FormControl(selectSerilizedDate.toISOString());
      }
      let latest_date = this.datepipe.transform(subDate, 'MM/dd/yyyy');
      this.getClaimNoteHistory(sessionStorage.getItem("ssnUserId"), latest_date, latest_date, true, false);
    }
    else {
      let url = "";
      if (date == 'first') {
        //this.selectedDate = this.datepipe.transform(new Date(), 'MM/dd/yyyy');
        var selectSerilizedDate: Date = new Date();
        this.serializedDateClaim1 = new FormControl(selectSerilizedDate.toISOString());
        this.serializedDateClaim = this.serializedDateClaim1;

        let today_date = this.datepipe.transform(new Date(), 'MM/dd/yyyy');

        sessionStorage.setItem("ssnDateBack", this.datepipe.transform(new Date(), 'MM/dd/yyyy'));
        sessionStorage.setItem("ssnDateNext", this.datepipe.transform(new Date(), 'MM/dd/yyyy'));
        this.getClaimNoteHistory(sessionStorage.getItem("ssnUserId"), today_date, today_date, true, false);
      }
      else {
        let dateBack = this.datepipe.transform(new Date(sessionStorage.getItem("ssnDateBack")), 'MM/dd/yyyy');
        let dateNext = this.datepipe.transform(new Date(sessionStorage.getItem("ssnDateNext")), 'MM/dd/yyyy');
        this.getClaimNoteHistory(sessionStorage.getItem("ssnUserId"), dateBack, dateNext, true, false);
      }
    }
  }
  //#endregion

  //#region "Recent Policy Notes"
  //Get Policy Notes history
  getPolicyNoteHistory(UserId: string, dateFrom: string, dateTo: string, isPopup: boolean, callAll: boolean) {
    this.showPolicyExport = false;
    localStorage.setItem("ssnCallAll", "false");
    if (this.isNotNull(UserId) && this.isNotNull(dateFrom) && this.isNotNull(dateTo)) {
      let url = AppConstants.SERVICE_URL + "Profile/GetPolicyNoteHistory?UserId=" + this.common.encrypt(UserId) + "&CreatedDateFrom=" + this.common.encrypt(dateFrom) + "&CreatedDateTo=" + this.common.encrypt(dateTo);
      this._data.GetService(url).subscribe((ProfilePolicyNoteInfo: any) => {
        this.bindInt_PolicyNotesRows(ProfilePolicyNoteInfo, isPopup, callAll)
      });
    }
  }

  bindInt_PolicyNotesRows(PolicyNotesRows: any, isPopup: boolean, callAllfinal: boolean) {
    try {
      if (PolicyNotesRows != null && PolicyNotesRows != "undefined") {
        if (isPopup == true) {
          this.rowPolicyNoteHistory_PopUp = PolicyNotesRows;
          if (this.isNotNull(this.rowPolicyNoteHistory_PopUp))
            this.showPolicyExport = true;
          else
            this.showPolicyExport = false;
        }
        else
          this.rowPolicyNoteHistory = PolicyNotesRows;
      }
      // this.gridApi_Policy.setDomLayout("autoHeight");
      // setTimeout(() => { this.gridApi_Policy.sizeColumnsToFit(); }, 500);
      // this.gridApi_Policy.paginationSetPageSize(Number(5));
      // if (isPopup) {
      //   this.gridApi_Policy_Popup.setDomLayout("autoHeight");
      //   setTimeout(() => { this.gridApi_Policy_Popup.sizeColumnsToFit(); }, 500);
      //   this.gridApi_Policy_Popup.paginationSetPageSize(Number(10));
      // }
    }
    catch (Error) {
      console.log(console.error());
    }
    finally {
      this.ngxService.stop();
    }
  }

  //Get Policy Notes history
  getPolicyNoteHistory_Popup(date: string, isNav: boolean) {
    this.showInvalidDateRange = false;
    this.clearPopupGrids();
    this.ngxService.start();
    this.popUp = true;
    if (isNav == true) {
      let formatteddate = new Date(sessionStorage.getItem("ssnDate"));
      var subDate = 0;
      if (date == 'back') {
        subDate = formatteddate.setDate(formatteddate.getDate() - 1);
        //this.selectedDate = this.datepipe.transform(subDate, 'MM/dd/yyyy');
        var selectSerilizedDate: Date = new Date(subDate);
        this.serializedDatePolicy = new FormControl(selectSerilizedDate.toISOString());
      }
      else if (date == 'next') {
        subDate = formatteddate.setDate(formatteddate.getDate() + 1);
        //this.selectedDate = this.datepipe.transform(subDate, 'MM/dd/yyyy');
        var selectSerilizedDate: Date = new Date(subDate);
        this.serializedDatePolicy = new FormControl(selectSerilizedDate.toISOString());
      }
      let latest_date = this.datepipe.transform(subDate, 'MM/dd/yyyy');
      this.getPolicyNoteHistory(sessionStorage.getItem("ssnUserId"), latest_date, latest_date, true, false);
    }
    else {
      let url = "";
      if (date == 'first') {
        //this.selectedDate = this.datepipe.transform(new Date(), 'MM/dd/yyyy');
        var selectSerilizedDate: Date = new Date();
        this.serializedDatePolicy1 = new FormControl(selectSerilizedDate.toISOString());
        this.serializedDatePolicy = this.serializedDatePolicy1;

        let today_date = this.datepipe.transform(new Date(), 'MM/dd/yyyy');

        sessionStorage.setItem("ssnDateBack", this.datepipe.transform(new Date(), 'MM/dd/yyyy'));
        sessionStorage.setItem("ssnDateNext", this.datepipe.transform(new Date(), 'MM/dd/yyyy'));

        this.getPolicyNoteHistory(sessionStorage.getItem("ssnUserId"), today_date, today_date, true, false);
      }
      else {
        let dateBack = this.datepipe.transform(new Date(sessionStorage.getItem("ssnDateBack")), 'MM/dd/yyyy');
        let dateNext = this.datepipe.transform(new Date(sessionStorage.getItem("ssnDateNext")), 'MM/dd/yyyy');
        this.getPolicyNoteHistory(sessionStorage.getItem("ssnUserId"), dateBack, dateNext, true, false);
      }
    }
  }
  //#endregion

  //#region "Calendar Events"
  // dateSelection_Calendar(item, id) {
  //   this.clearPopupGrids();
  //   this.ngxService.start();
  //   sessionStorage.setItem("ssnDate", item);
  //   let calendarDate = this.datepipe.transform(item, 'MM/dd/yyyy');
  //   if (id == 1) {
  //     if (this.datepipe.transform(new Date(), 'MM/dd/yyyy') == calendarDate)
  //       this.showNextLink_Call = false;
  //     else
  //       this.showNextLink_Call = true;
  //     this.getRecentCallHistory_Popup(calendarDate, false);
  //   }
  //   else if (id == 2) {
  //     if (this.datepipe.transform(new Date(), 'MM/dd/yyyy') == calendarDate)
  //       this.showNextLink_Claim = false;
  //     else
  //       this.showNextLink_Claim = true;
  //     this.getClaimNoteHistory_Popup(calendarDate, false);
  //   }
  //   else if (id == 3) {
  //     if (this.datepipe.transform(new Date(), 'MM/dd/yyyy') == calendarDate)
  //       this.showNextLink_Policy = false;
  //     else
  //       this.showNextLink_Policy = true;
  //     this.getPolicyNoteHistory_Popup(calendarDate, false);
  //   }
  // }
  // dateSelection_Calendar(item, id) {
  //   item = item.value;
  //   this.clearPopupGrids();
  //   this.ngxService.start();
  //   sessionStorage.setItem("ssnDate", item);
  //   let calendarDate = this.datepipe.transform(item, 'MM/dd/yyyy');
  //   if (id == 1) {
  //     if (this.datepipe.transform(new Date(), 'MM/dd/yyyy') == calendarDate)
  //       this.showNextLink_Call = false;
  //     else
  //       this.showNextLink_Call = true;
  //     this.getRecentCallHistory_Popup(calendarDate, false);
  //   }
  //   else if (id == 2) {
  //     if (this.datepipe.transform(new Date(), 'MM/dd/yyyy') == calendarDate)
  //       this.showNextLink_Claim = false;
  //     else
  //       this.showNextLink_Claim = true;
  //     this.getClaimNoteHistory_Popup(calendarDate, false);
  //   }
  //   else if (id == 3) {
  //     if (this.datepipe.transform(new Date(), 'MM/dd/yyyy') == calendarDate)
  //       this.showNextLink_Policy = false;
  //     else
  //       this.showNextLink_Policy = true;
  //     this.getPolicyNoteHistory_Popup(calendarDate, false);
  //   }
  // }

  dateSelection_Calendar(item, id, calenderId) {
    item = item.value;
    if (calenderId == 1)
      sessionStorage.setItem("ssnDateBack", item);
    else if (calenderId == 2)
      sessionStorage.setItem("ssnDateNext", item);

    // else {
    //   let calendarDate = this.datepipe.transform(item, 'MM/dd/yyyy');
    //   if (id == 1) {
    //     if (this.datepipe.transform(new Date(), 'MM/dd/yyyy') == calendarDate)
    //       this.showNextLink_Call = false;
    //     else
    //       this.showNextLink_Call = true;
    //     this.getRecentCallHistory_Popup(calendarDate, false);
    //   }
    //   else if (id == 2) {
    //     if (this.datepipe.transform(new Date(), 'MM/dd/yyyy') == calendarDate)
    //       this.showNextLink_Claim = false;
    //     else
    //       this.showNextLink_Claim = true;
    //     this.getClaimNoteHistory_Popup(calendarDate, false);
    //   }
    //   else if (id == 3) {
    //     if (this.datepipe.transform(new Date(), 'MM/dd/yyyy') == calendarDate)
    //       this.showNextLink_Policy = false;
    //     else
    //       this.showNextLink_Policy = true;
    //     this.getPolicyNoteHistory_Popup(calendarDate, false);
    //   }
    // }
  }
  SearchHistoryOnPopups(id) {
    this.showInvalidDateRange = false;
    let dateBack = new Date(sessionStorage.getItem("ssnDateBack"));
    let dateNext = new Date(sessionStorage.getItem("ssnDateNext"));
    if (dateBack > dateNext) {
      this.showInvalidDateRange = true;
      sessionStorage.setItem("ssnDateBack", sessionStorage.getItem("ssnDateBack_previousDate"));
      sessionStorage.setItem("ssnDateNext", sessionStorage.getItem("ssnDateNext_previousDate"));
      // this.showCallExport = false;
      // this.showClaimExport = false;
      // this.showPolicyExport = false;
    }
    else {
      sessionStorage.setItem("ssnDateBack_previousDate",this.datepipe.transform(dateBack, 'MM/dd/yyyy'));
      sessionStorage.setItem("ssnDateNext_previousDate",this.datepipe.transform(dateNext, 'MM/dd/yyyy'));
      this.clearPopupGrids();
      if (id == 1) {
        this.getRecentCallHistory_Popup('', false);
      }
      else if (id == 2) {
        this.getClaimNoteHistory_Popup('', false);
      }
      else if (id == 3) {
        this.getPolicyNoteHistory_Popup('', false);
      }
    }
  }

  // dateOpen(id) {
  //   if (id == 1)
  //     this.dateCallsPicker.api.open();
  //   else if (id == 2)
  //     this.dateClaimPicker.api.open();
  //   else if (id == 3)
  //     this.datePolicyPicker.api.open();
  // }
  //#endregion

  //#region "Grid Events"
  onFirstDataRendered(params) {
    //params.api.sizeColumnsToFit();
  }
  onGridReady_Main(evt) {
    //this.gridApi_Call = evt.api;
    evt.api.setDomLayout("autoHeight");
    evt.api.sizeColumnsToFit();
    evt.api.paginationSetPageSize(Number(5));
    //setTimeout(() => { evt.api.sizeColumnsToFit(); }, 500);
  }
  // onGridReady_Claim(evt) {
  //   //this.gridApi_Claim = evt.api;
  //   evt.api.setDomLayout("autoHeight");
  //   evt.api.sizeColumnsToFit();
  //   evt.api.paginationSetPageSize(Number(5));
  // }
  // onGridReady_Policy(evt) {
  //   //this.gridApi_Policy = evt.api;
  //   evt.api.setDomLayout("autoHeight");
  //   evt.api.sizeColumnsToFit();
  //   evt.api.paginationSetPageSize(Number(5));
  // }
  onGridReady_Call_Popup(evt) {
    evt.api.setDomLayout("autoHeight");
    evt.api.sizeColumnsToFit();
    evt.api.paginationSetPageSize(Number(10));
    //setTimeout(() => { evt.api.sizeColumnsToFit(); }, 500);
  }

  onGridReady_Popup(evt) {
    //this.gridApi_Call_Popup = evt.api;
    evt.api.setDomLayout("autoHeight");
    evt.api.sizeColumnsToFit();
    evt.api.paginationSetPageSize(Number(10));
    //setTimeout(() => { evt.api.sizeColumnsToFit(); }, 500);
  }
  // onGridReady_Claim_Popup(evt) {
  //   //this.gridApi_Claim_Popup = evt.api;
  //   evt.api.setDomLayout("autoHeight");
  //   evt.api.sizeColumnsToFit();
  //   evt.api.paginationSetPageSize(Number(10));
  // }
  // onGridReady_Policy_Popup(evt) {
  //   //this.gridApi_Policy_Popup = evt.api;
  //   evt.api.setDomLayout("autoHeight");
  //   evt.api.sizeColumnsToFit();
  //   evt.api.paginationSetPageSize(Number(10));
  // }
  clearPopupGrids() {
    this.rowRecentCallHistory_PopUp = null;
    this.rowClaimNoteHistory_PopUp = null;
    this.rowPolicyNoteHistory_PopUp = null;
  }
  //#endregion

  ExportToExcel(id) {
    let UserName = sessionStorage.getItem("ssnCallAttendant");
    let CSRid = sessionStorage.getItem("ssnUserId");
    let dateBack = this.datepipe.transform(new Date(sessionStorage.getItem("ssnDateBack")), 'MM/dd/yyyy');
    let dateNext = this.datepipe.transform(new Date(sessionStorage.getItem("ssnDateNext")), 'MM/dd/yyyy');

    if (id == 1) {
      let url = AppConstants.SERVICE_URL + "Profile/ExportToExcel?CallId=1&UserId=" + this.common.encrypt(UserName) + "&CreatedDateFrom=" + this.common.encrypt(dateBack) + "&CreatedDateTo=" + this.common.encrypt(dateNext);
      window.open(url, "_blank");
    }
    else if (id == 2) {
      let url = AppConstants.SERVICE_URL + "Profile/ExportToExcel?CallId=2&UserId=" + this.common.encrypt(CSRid) + "&CreatedDateFrom=" + this.common.encrypt(dateBack) + "&CreatedDateTo=" + this.common.encrypt(dateNext);
      window.open(url, "_blank");
    }
    else if (id == 3) {
      let url = AppConstants.SERVICE_URL + "Profile/ExportToExcel?CallId=3&UserId=" + this.common.encrypt(CSRid) + "&CreatedDateFrom=" + this.common.encrypt(dateBack) + "&CreatedDateTo=" + this.common.encrypt(dateNext);
      window.open(url, "_blank");
    }
  }



  isNotNull(value: string) {
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