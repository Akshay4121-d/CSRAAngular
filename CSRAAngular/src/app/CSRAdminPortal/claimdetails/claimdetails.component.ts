import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router'
import { DataService } from '../services/data.service';
import { ClaimInfo } from 'src/app/models/claiminfo';
import { ClaimPaymentInfo } from 'src/app/models/claiminfo';
import { AdditionalCoverageLocationInfo } from 'src/app/models/claiminfo';
import { ClaimStatusInfo } from 'src/app/models/claiminfo';
import { AppConstants } from 'src/app/app.constants';
import { Common } from 'src/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { formatDate } from '@angular/common';
import { ExportAsService } from 'ngx-export-as';
import { DatePipe } from '@angular/common';
import { DatePickerComponent } from 'ng2-date-picker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-claimdetails',
  templateUrl: './claimdetails.component.html',
  styleUrls: ['./claimdetails.component.scss'],
  providers: [DatePipe]

})
export class ClaimdetailsComponent implements OnInit {


  //#region Global Variable


  //variable for BindRTWDate start

  lblBlankClaim: string = '';
  isVisiblelblBlankClaim: boolean = false;
  dtClaimPortalAccountInformation: any = [];
  dtWorkCertificationToDate: any = [];



  varMedRTW: string = '';
  varEstRTW: string = '';
  varTentativeRTWDate: string = '';
  varactualreturntoworkdate: string = '';
  varpercentofclaimdate: string = '';


  pnlRTW_lblESTRTWDt: string = '';
  pnlRTW_lblMedicalRTWDt: string = '';
  pnlRTW_lblTentativeWorkDt: string = '';
  pnlRTW_lblActualWorkDt: string = '';
  pnlRTW_RowClaimPercent: boolean = true;
  pnlRTW_lblPercent: string = '';
  pnlRTW_lblWorkCertifiedDt: string = '';
  pnlRTW_RowMedical: boolean = true;
  pnlRTW_EST: boolean = true;
  varWorkCertifiedToDate: string = '';
  pnlRTW_RowTentiveDt: boolean = false;
  pnlRTW_RowActualDt: boolean = false;
  pnlRTW_RowWorkCertified: boolean = false;
  isPilotClaim: number = 0;
  iClaimCountForMessage: number = 0;





  //variable for BindRTWDate end

  //variable for reset possword start
  Action: string = '';
  Name: string = '';
  //variable for reset possword ene

  // variable for claimdeatail start
  varHeadClaimNo: string = '';
  //variable for claimdeatail end

  //variable for claim status popup start
  paymentInfoLength: boolean = false;
  iClaimCount: number = 0;
  iClaimCountMessage: number = 0;
  varNextCheckDate: string = '';
  varRedStatus: string = '';
  varBasicInfoText: string = '';
  varWorkInfoText: string = '';
  varMedicalInfoText: string = '';
  isVisibledivBasicActionRequired: boolean = true;
  isVisibledivWorkActionRequired: boolean = true;
  isVisibledivMedicalActionRequired: boolean = true;
  isVisibledivTerminatedClaim: boolean = true;
  isVisibledivClaimStatus: boolean = false;
  isVisibledivWelcomeClaimMessage: boolean = false;
  isVisibledivclaimstatussummary: boolean = false;
  isVisibleExportBenifitSummary: boolean = false;

  classdivBasicClaimStatus: string = '';
  classdivWorkStatusBox: string = 'col-md-4 rightClaimBox ';
  //classdivWorkStatusBox: string = 'col-md-4 rightClaimBox p-l-0';
  classdivMedicalStatusBox: string = 'col-md-4 rightClaimBox p-l-0 ';
  h4BasicInfo: string = '';
  BasicInfoText: string = '';
  pBasicInfo: string = '';
  RedStatus: string = '';
  classpBasicInfo: string = '';
  lbDownloadWorkCertification: boolean = true;

  classdivWorkClaimStatus: string = '';
  h4WorkInfo: string = '';
  WorkInfoText: string = '';
  sWorkInfo: string = '';
  classpWorkInfo: string = '';

  aimgWorkInfo: string = '';


  isVisibledivMedicalStatusBox: boolean = false
  classdivBasicStatusBox: string = "col-md-4 rightClaimBox p-r-0";
  lblBecomeDisableLabel: string = 'Date you became disabled';
  isVisibledvHowToSubmitPFLForms: boolean = false;
  isVisiblePFLWorkInfo: boolean = false;
  isVisiblePFLReturnToWork: boolean = false;
  isVisiblePFLBasicInfo: boolean = false;
  isVisiblespnPFLBasicHeaderDescription: boolean = false;
  isVisiblespnPFLBasicHeader: boolean = false;
  isVisibledvHowToSubmitDBLForms: boolean = false;
  isVisibleDBLWorkInfo: boolean = false;
  isVisibleDBLReturnToWork: boolean = false;
  isVisibleDBLBasicInfo: boolean = false;
  isspnDBLBasicHeaderDescription: boolean = false;
  isVisiblespnDBLBasicHeader: boolean = false;

  classdivMedicalClaimStatus: string = '';
  h4MedicalInfo: string = '';
  MedicalInfoText: string = '';
  pMedicalInfo: string = '';
  classpMedicalInfo: string = '';
  isVisiblepNextPaymentDate: boolean = false;
  classpClaimStatus: string = '';
  pClaimStatus: string = '';
  pClaimStatusSummary: string = '';
  classpClaimStatus1: string = '';
  pClaimStatus1: string = '';
  pClaimStatusSummary1: string = '';

  isVisiblepNextPaymentDate1: boolean = false;
  lblNextPaymentDate1: string = '';
  lblDisabledDate: string = '';
  weekstopaid: string = '';
  lblBenefitAmtPaid: string = '';
  isVisibledivSetCommPref: boolean = false;
  lblNumWeeksPaid: string = '';
  dlClaimRedStatusReasons: string = ''
  //variable for claim status popup start




  rowDataClicked1 = {};

  varCheckDate: string;
  varCheck: string;
  varChecTo: string;
  varCheckFrom: string;
  varWeeks: string;
  varToDate: string;
  varFICA: string;
  varNET: string;
  varAddlTax: string;
  varSendCode: string;
  varCheckStatus: string;
  varClaimsVoidDate: string;
  varPeriodicCheckDates: string;
  varDaysWorked: string = 'isHidden';
  varDaysWorkedCount: string = 'isHidden';
  varShowDays: string = 'isHidden';
  isVisbleDayswork: boolean = true;



  varlinkButton: boolean = false;
  varlength: string = '255';
  varVoluntaryCoverage: string = 'isHidden';
  varOutOfStateCoverage: string = 'isHidden';
  variNonStat: boolean = false;
  varExclusionsCoverage: string = 'isHidden';
  Userid: string = '';
  error: boolean = false;

  ClaimNo: string;
  LinkedClaimNo: string;
  UserName: string;
  UserID: string;
  bind: boolean = false;
  IsPFLTrue: boolean = false;
  // IsPFLFalse: boolean = false;
  IsPFL: string = '';
  varSpecialProvisions: string = 'isHidden';
  varPolicyNumber: string = '';
  varSSN: string = '';
  varUserId: string = '';
  isVisiblelblErrMsg: boolean = false;
  lblErrMsg: string = '';
  isshowlblErrMsg: boolean = false;
  emailBody: string = '';
  password: string = '';
  ClaimDetails: any;
  ClaimDetails_copy: Array<ClaimInfo> = [];
  ClaimDetailFinal: Array<ClaimInfo> = [];

  ClaimStatusInfo: ClaimStatusInfo[];
  ClaimStatusDetailFinal: Array<ClaimStatusInfo> = [];

  ClaimInfo: ClaimInfo[];
  ClaimInfoDetails: any;
  ClaimInfoDetails_copy: Array<ClaimInfo> = [];
  ClaimInfos: ClaimInfo[];
  ClaimInfoDetailFinal: Array<ClaimInfo> = [];

  drpClaim: string;

  ClaimPaymentInfo: ClaimPaymentInfo[] = [];
  _postsArray: ClaimPaymentInfo[] = [];
  ClaimPaymentInfoDetailFinal: Array<ClaimPaymentInfo> = [];


  WorkHistoryDateFinal: Array<any> = [];
  MedicalHistoryDateFinal: Array<any> = [];
  workDateLength: boolean = false;
  medicalDateLength: boolean = false;




  rowLocationInfo_PopUp: any = [];
  rowProprietorPartnerInfo_PopUp: any = [];
  varProprietorPartner = "isHidden";
  AdditionalCoverageLocationInfoDetailFinal: Array<AdditionalCoverageLocationInfo> = [];

  rowClaimNotes: any = [];

  rowFromRecieved: any = [];
  rowFromSent: any = [];
  arrayFromSent: any;
  resultArray: Array<any> = []

  rowWorkCertification: any = [];
  rowMedicalCertification: any = [];


  rowPaymentInfo: any = [];

  isVisiblePasswordReset: boolean = true;
  isVisibleChkAffidavit: boolean = true;

  isVisibleRegisteredUserinPortal: boolean = true;
  isVisibleAccountCreated: boolean = true;
  isVisibleID: boolean = true;
  isVisibleAccountLocked: boolean = true;
  divClaimCertificationHistory:boolean = true;
  trWorkCertifiedTo:boolean = true;
  isfilled:boolean = true;
  //#endregion Global Variable

  //#region "Columns"

  columnLocInsured = [
    { headerName: 'Name', field: 'aname', cellStyle: { "white-space": "normal" }, width: 200 },
    { headerName: 'Address', field: 'addlocadd', cellStyle: { "white-space": "normal" }, width: 200 },
    { headerName: 'City', field: 'city', width: 200 },
    { headerName: 'State', field: 'state', width: 70 },
    { headerName: 'Zip', field: 'zip', width: 80 },
    { headerName: 'FEIN', field: 'federalid', width: 100 },
    { headerName: 'Eff Date', field: 'aeff', width: 100 },
    { headerName: 'Term Date', field: 'addlocterm', width: 100 },
    { headerName: 'Loc #', field: 'addlocnum', width: 100 }
  ];

  public gridApi_Global;
  public gridApi_AdditionalCov;


  //public gridApi_Claim;
  columnProprietorPartner = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Eff Date', field: 'effdate' },
    { headerName: 'Term Date', field: 'termdate' },
    { headerName: 'M/F', field: 'gender' }
  ]

  columnClaimNotes = [
    // { headerName: 'Date', field: 'date', width: 100, suppressSizeToFit: true },
    // { headerName: 'User', field: 'username', width: 100, suppressSizeToFit: true },
    // { headerName: 'Comment', field: 'claimnotes', autoHeight: true }

    { headerName: 'Date', field: 'date', width: 30 },
    { headerName: 'User', field: 'username', width: 30 },
    { headerName: 'Comment', field: 'claimnotes', cellStyle: { "white-space": "normal" } }
  ]

  columnFromRecieved = [
    { headerName: 'Date', field: 'date', width: 20 },
    { headerName: 'Form', field: 'filename', cellStyle: { "white-space": "normal" }, width: 80 },
    {
      headerName: "Download", width: 20,
      field: "filepath",
      cellRenderer: function (params) {
        if (params.value.length > 0)
          return params.value;
      },
    }
  ]

  columnFromSent = [
    { headerName: 'Date', field: 'FormDate', width: 20 },
    { headerName: 'Form', field: 'FormName', cellStyle: { "white-space": "normal" }, width: 80 },
    {
      headerName: "Download", width: 20,
      field: "View",
      cellRenderer: function (params) {
        if (params.value.length > 0) {
          if (params.value.toString().startsWith("http") || params.value.toString().startsWith("https"))
            return '<a href=' + params.value + ' target="_blank">View</a>'
          else
            return params.value;
        }

      },
    }
  ]


  columnWorkCertification = [
    { headerName: '', field: 'WorkCertificationPeriod' },

  ]

  columnMedicalCertification = [
    { headerName: '', field: 'MedicalCertificationPeriod' },
  ]

  //#endregion


  public lstLinkedClaim: [];
  selectedRTWDate: string = '';
  dateConfig: any =
    {
      disableKeypress: true,
      locale: 'en',
      format: 'MM/DD/YYYY',
    }
  errorRTW: boolean = false;
  ShowClaimTermDate: boolean = false;
  ShowPolicyTermDate: boolean = false;
  firstPreviewClaim: boolean = false;
  firstPreviewPolicy: boolean = false;
  EmailCheckforAffidavit: string = '';
  public defaultColDef;
  public noRowsTemplate;
  public loadingTemplate;

  private getRowHeightClaimNotes;
  private getRowHeightLocation;
  private getRowHeightFormRece;
  private getRowHeightFormSent;
  ClaimGridSize: string = "gridMinSize";
  FormsGridSize: string = "gridMinSize";
  events: string[] = [];
  showRTW_currentOLess: boolean = false;
  showRTW_greaterThanToday: boolean = false;

  defaultPlusMinus11: string = "fa fa-minus";
  defaultPlusMinus12: string = "fa fa-minus";
  defaultPlusMinus21: string = "fa fa-minus";
  defaultPlusMinus22: string = "fa fa-minus";
  defaultPlusMinus23: string = "fa fa-minus";
  defaultPlusMinus31: string = "fa fa-minus";
  defaultPlusMinus32: string = "fa fa-minus";

  statusSectionClass11:string = "action";
  statusSectionClass12:string = "rightClaimBoxPara";
  statusSectionClass21:string = "action";
  statusSectionClass22:string = "action";
  statusSectionClass23:string = "rightClaimBoxPara";
  statusSectionClass31:string = "action";
  statusSectionClass32:string = "rightClaimBoxPara";


  todayDate = new Date();
  strTodayDAte = '';
  accountCreated: boolean= false;
  @ViewChild('dpcalCalls') dateCallsPicker: DatePickerComponent;
  @ViewChild('dpcalClaim') dateClaimPicker: DatePickerComponent;
  @ViewChild('dpcalPolicy') datePolicyPicker: DatePickerComponent;


  constructor(private _data: DataService,
    private route: ActivatedRoute,
    private common: Common,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private exportAsService: ExportAsService,
    public datepipe: DatePipe,
  ) {
    ngxService.start();
    this.defaultColDef = {
      sortable: true,
      resizable: true
    };
    //this.rowHeight = 275;
    //this.defaultColDef = { resizable: true };
    this.loadingTemplate = `<span style="padding-top: 26px;">No Records Available</span>`;
    this.noRowsTemplate = `<span style="padding-top: 26px;">No Records Available</span>`;



    this.strTodayDAte = formatDate(this.todayDate, 'MM/dd/yyyy', 'en-US', '+0530');
    this.ClaimNo = this.route.snapshot.queryParams['Claim'];
    if (this.ClaimNo != null) {

      if ((this.common.decrypt(this.ClaimNo)).startsWith('F')) {
        this.IsPFL = 'Y';

      }
      else {
        this.IsPFL = 'N';
        //this.IsPFLTrue = false;this.IsPFLFalse = true;
      }
      this.UserName = sessionStorage.getItem('id_CSR');;
      //this.UserID = this.common.decrypt(sessionStorage.getItem("UserID"));

      //this.ngxService.start();
      // this.getLinkedClaim(this.ClaimNo);


      var test = [] as any;
      test.push({ 'linkedclaim': this.common.decrypt(this.ClaimNo) });
      //this.lstLinkedClaim = this.ClaimNo;
      this.lstLinkedClaim = test;
      // console.log(this.lstLinkedClaim);

      this.getLinkedClaim();
      this.showDaysWorked(2);
      this.getSpecialProvisions();


      // this.getClaimStatus();
      // this.getClaimStatusDetail();
      // this.getWorkCertifiedToDate();
      // this.GetClaimCountForMessage();
      // this.GetClaimCountFromClaimm_PilotTable(this.ClaimNo)
      // this.getLinkedClaim(this.ClaimNo);
      // this.getClaimsDetails(this.ClaimNo);
      // this.getClaimsNotes(this.ClaimNo);
      // this.getClaimCount();


      //arrangeble

      // this.showDaysWorked();
      // this.getClaimsPaymentInfo(this.ClaimNo);
      // this.getFromRecieved(this.ClaimNo);
      // this.getFromSent(this.ClaimNo, "");
      // this.getWorkCertification(this.ClaimNo);
      // this.getMedicalCertification(this.ClaimNo);


      this.claimFont = this.common.decrypt(this.ClaimNo);

      // setTimeout(() => { this.BindRTWdate(this.varMedRTW,this.varTentativeRTWDate,this.varactualreturntoworkdate,this.varWorkCertifiedToDate,this.varpercentofclaimdate); }, 10000);
      //this.BindRTWdate(this.varMedRTW,this.varTentativeRTWDate,this.varactualreturntoworkdate,this.varWorkCertifiedToDate,this.varpercentofclaimdate);



      //this.drpClaim = this.LinkedClaimNo;
      //this.ngxService.stop();
      // Methods For Bind Claim Status Section
    }
    this.getRowHeightClaimNotes = function (params) {
      return 28 * (Math.floor(params.data.claimnotes.trim().length / 166) + 1);
    };
    this.getRowHeightLocation = function (params) {
      var size = Math.max(params.data.aname.trim().length, params.data.addlocadd.trim().length, params.data.city.trim().length);
      return 28 * (Math.floor(size / 27) + 1);
    };
    this.getRowHeightFormRece = function (params) {
      return 28 * (Math.floor(params.data.filename.trim().length / 55) + 1);
    };
    this.getRowHeightFormSent = function (params) {
      return 28 * (Math.floor(params.data.FormName.trim().length / 55) + 1);
    };
  }
  // onColumnResized(evt) {
  //   evt.api.resetRowHeights();
  // }

  brandFont: any;
  defaultFont: any;

  claimFont: any;
  defaultClaim: any;
  ngOnInit() {
    this.defaultFont = this.common.decrypt(this.ClaimNo);
    this.claimFont = Object.assign(this.defaultFont);
  }

  getSpecialProvisions() {

    this.bind = false;
    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetSpecialProvisions?ClaimNumber=" + this.ClaimNo;
    const promise = this._data.GetService(url).toPromise();
    promise.then((res) => {
      //console.log("called 1");
      if (res != null)
        this.varSpecialProvisions = res.toString().trim() != "" ? res.toString().trim() : 'isHidden';
      else
        this.varSpecialProvisions = 'isHidden';
    }).then((any) => { this.getWorkCertifiedToDate(); }).catch((error) => {
      console.log("getSpecialProvisions failed " + JSON.stringify(error));
    });
  }


  getWorkCertifiedToDate() {
    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetWorkCertificationToDate?ClaimNumber=" + this.ClaimNo
    const promise = this._data.GetService(url).toPromise();
    promise.then((res) => {
      //console.log("called 2");
      if (res[0].worktocertified != '' && res[0].worktocertified != null && res[0].worktocertified != 'undefined' && res[0].worktocertified != '0001-01-01T00:00:00') {
        this.varWorkCertifiedToDate = this.datepipe.transform(res[0].worktocertified, 'MM/dd/yyyy');
      }
      else
        this.varWorkCertifiedToDate = 'isHidden'
      //this.showDaysWorked()
    }).then((any) => { this.getClaimsNotes(); }).catch((error) => {
      console.log("getWorkCertifiedToDate failed." + JSON.stringify(error));
    });
  }


  getClaimsNotes() {
    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetClaimNotes?ClaimNumber=" + this.ClaimNo;
    const promise = this._data.GetService(url).toPromise();
    promise.then((data) => {
      //console.log("called 3");
      this.bindClaimsNotes(data);
    }).then((any) => { this.getClaimCount(); }).catch((error) => {
      console.log("getClaimsNotes failed " + JSON.stringify(error));
    });
  }



  bindClaimsNotes(objClaimsNotes: any) {
    this.rowClaimNotes = [];
    if (objClaimsNotes != null) {
      this.rowClaimNotes = objClaimsNotes; this.ClaimGridSize = "claimNotesGridSize";
    }
    else
      this.ClaimGridSize = "gridMinSize";
    //this.ngxService.stop();
  }


  getClaimCount() {

    // let iClaimCount;
    let strClaimCount = '';
    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetClaimCountForClaimStatusSection?ClaimNumber=" + this.ClaimNo;
    const promise = this._data.GetService(url).toPromise();

    promise.then((data) => {
      //console.log("called 5");
      this.iClaimCount = +data.toString();
      //console.log(this.iClaimCount);
    }).then((any) => { this.getClaimStatusDetail(); }).catch((error) => {
      console.log("getClaimCount falild " + JSON.stringify(error));
    });
  }



  getClaimStatusDetail() {
    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetClaimStatus?ClaimNumber=" + this.ClaimNo;
    const promise = this._data.GetService(url).toPromise();
    promise.then((data) => {
      //console.log("called 4");
      this.bindClaimStatusDetail(data);
      //}).then((any)=>{this.getClaimCount();}).catch((error)=>{
    }).then((any) => { this.GetClaimCountForMessage(); }).catch((error) => {
      console.log("getClaimStatusDetail falild " + JSON.stringify(error));
    });
  }

  bindClaimStatusDetail(obj: any) {
    //console.log('ClaimStatusDetail');
    //console.log(obj);

    var GeneralInfoStatus = null;
    var BasicStatus = null;
    var WorkStatus = null;
    var MedicalStatus = null;
    if (obj != null) {
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].StatusType == "GeneralInfo") {
          GeneralInfoStatus = obj[i];
        }

        if (obj[i].StatusType == "Basic") {
          //if (obj[i].Basic != null){
          BasicStatus = obj[i];
          // }
        }
        if (obj[i].StatusType == "Work") {
          //if (obj[i].Work != null){
          WorkStatus = obj[i];
          //}
        }
        if (obj[i].StatusType == "Medical") {
          //if (obj[i].Medical != null){
          MedicalStatus = obj[i];
          //}
        }
      }
      if (GeneralInfoStatus.NextCheckDate != null) {
        this.varNextCheckDate = formatDate(GeneralInfoStatus.NextCheckDate, 'MM/dd/yyyy', 'en');
      }
      //Checking Terminated condition
      if (GeneralInfoStatus.IsTerminated == "Y") {
        this.isVisibledivTerminatedClaim = true;
        this.isVisibledivClaimStatus = false;
        this.isVisibledivWelcomeClaimMessage = false;
        this.isVisibledivclaimstatussummary = false;
      }
      else {
        this.isVisibledivTerminatedClaim = false;
        if (obj[0].ShowWelcomeMessage == "Y") {
          this.isVisibledivWelcomeClaimMessage = true;
          this.isVisibledivClaimStatus = false;
          this.isVisibledivclaimstatussummary = false;
        }
        else {
          this.isVisibledivWelcomeClaimMessage = false;
          this.isVisibledivClaimStatus = true;
          this.isVisibledivclaimstatussummary = true;
        }
      }






      if (this.iClaimCount > 0) // if claim exits in dblclaims_standing_master AND claim exists in acct_objects
      {
        //Basic Status Information
        this.isVisibledivclaimstatussummary = false;
        switch (BasicStatus.Status) {
          case 1:
            // divBasicClaimStatus.Attributes.Add("class", "greenBox");
            // h4BasicInfo.InnerText = "No Action Required";
            // BasicInfoText = "It looks like we have everything we need to process your claim regarding Basic Information. No action is required by you at this point in time.";
            // pBasicInfo.InnerHtml = "<strong>Status: </strong>" + BasicInfoText;
            // divBasicActionRequired.Visible = false;
            // divWorkStatusBox.Attributes["class"] = divWorkStatusBox.Attributes["class"].Replace(" disable-box", "");
            // divMedicalStatusBox.Attributes["class"] = divMedicalStatusBox.Attributes["class"].Replace(" disable-box", "");

            this.classdivBasicClaimStatus = "greenBox";
            this.h4BasicInfo = "No Action Required";
            this.BasicInfoText = "It looks like we have everything we need to process your claim regarding Basic Information. No action is required by you at this point in time.";
            //this.pBasicInfo = "<strong>Status: </strong>" + this.BasicInfoText;                  
            this.pBasicInfo = this.BasicInfoText;
            this.isVisibledivBasicActionRequired = false;
            // this.classdivWorkStatusBox = " disable-box";
            // this.classdivMedicalStatusBox = " disable-box";
            this.classdivWorkStatusBox = this.classdivWorkStatusBox; //+ " disable-box";
            this.classdivMedicalStatusBox = this.classdivMedicalStatusBox; //+ " disable-box";

            break;
          case 3:
            // if (IsPFL.Trim().ToUpper() == "Y") //Added by Neeraj Jain on 03/14/2018 to show different label for PFL claims. CO# 3123.
            //     RedStatus = "Claim Initiation";
            // else
            //     RedStatus = "Basic";
            // divBasicClaimStatus.Attributes.Add("class", "redBox");
            // h4BasicInfo.InnerText = "Action Required Now";
            // pBasicInfo.Attributes.Add("class", "highlight-red");
            // BasicInfoText = "We need updated Basic information from you in order to continue processing your claim. Benefit checks are suspended until receipt of the updated information.";
            // pBasicInfo.InnerHtml = "<strong>Status: </strong>" + BasicInfoText;
            // divBasicActionRequired.Visible = true;
            // divWorkStatusBox.Attributes["class"] = divWorkStatusBox.Attributes["class"] + " disable-box";
            // divMedicalStatusBox.Attributes["class"] = divMedicalStatusBox.Attributes["class"] + " disable-box";
            // ScriptManager.RegisterStartupScript(this, this.GetType(), "OpenToggle", "OpenToggle();", true);

            if (this.IsPFL == "Y") //Added by Neeraj Jain on 03/14/2018 to show different label for PFL claims. CO# 3123.
              this.RedStatus = "Claim Initiation";
            else
              this.RedStatus = "Basic";
            this.classdivBasicClaimStatus = "redBox";
            this.h4BasicInfo = "Action Required Now";
            this.classpBasicInfo = "highlight-red";
            this.BasicInfoText = "We need updated Basic information from you in order to continue processing your claim. Benefit checks are suspended until receipt of the updated information.";
            //this.pBasicInfo = "<strong>Status: </strong>" + this.BasicInfoText;
            this.pBasicInfo = this.BasicInfoText;
            this.isVisibledivBasicActionRequired = true;
            this.classdivWorkStatusBox = this.classdivWorkStatusBox + " disable-box";
            this.classdivMedicalStatusBox = this.classdivMedicalStatusBox + " disable-box";
            break;
          default:
            // divBasicClaimStatus.Attributes.Add("class", "");
            // h4BasicInfo.InnerText = "";
            // pBasicInfo.InnerHtml = "";
            // divBasicActionRequired.Visible = false;
            // divWorkStatusBox.Attributes["class"] = divWorkStatusBox.Attributes["class"].Replace(" disable-box", "");
            // divMedicalStatusBox.Attributes["class"] = divMedicalStatusBox.Attributes["class"].Replace(" disable-box", "");

            this.classdivBasicClaimStatus = "";
            this.h4BasicInfo = "";
            this.pBasicInfo = "";
            this.isVisibledivBasicActionRequired = false;
            this.classdivWorkStatusBox = this.classdivWorkStatusBox + " disable-box";
            this.classdivMedicalStatusBox = this.classdivMedicalStatusBox + " disable-box";
            break;
        }

        if (BasicStatus.QuestionNote != '') {

          this.dlClaimRedStatusReasons = BasicStatus.QuestionNote;
          // dlClaimRedStatusReasons.Visible = true;
          // dlClaimRedStatusReasons.DataSource = BasicStatus;
          // dlClaimRedStatusReasons.DataBind();
        }
        else if (BasicStatus.QuestionNote == "") {
          // dlClaimRedStatusReasons.Visible = false;
        }

        //Work Status Information
        this.lbDownloadWorkCertification = false;
        switch (WorkStatus.Status) {
          case 1:
            // divWorkClaimStatus.Attributes.Add("class", "greenBox");
            // h4WorkInfo.InnerText = "No Action Required";
            // WorkInfoText = "It looks like we have everything we need to process your claim regarding Work Certification. No action is required by you at this point in time.";// Benefit checks are generally processed bi-weekly.
            // sWorkInfo.InnerHtml = "<strong>Status: </strong>" + WorkInfoText;
            // divWorkActionRequired.Visible = false;

            this.classdivWorkClaimStatus = "greenBox";
            this.h4WorkInfo = "No Action Required";
            this.WorkInfoText = "It looks like we have everything we need to process your claim regarding Work Certification. No action is required by you at this point in time.";// Benefit checks are generally processed bi-weekly.
            // this.sWorkInfo = "<strong>Status: </strong>" + this.WorkInfoText ;
            this.sWorkInfo = this.WorkInfoText;
            this.isVisibledivWorkActionRequired = false;
            break;
          case 2:
            // divWorkClaimStatus.Attributes.Add("class", "yellowBox");
            // h4WorkInfo.InnerText = "Action Required Soon";
            // if (IsPFL == "Y") //Added by Neeraj Jain on 01/08/2018 to show different language for PFL claims. CO# 3072.
            //     WorkInfoText = "We will need updated work status soon, but no action is required now.";
            // else
            //     WorkInfoText = "You will need to submit your Work Certification Form soon, but no action is required at the moment.";
            // sWorkInfo.InnerHtml = "<strong>Status: </strong>" + WorkInfoText;
            //divWorkActionRequired.Visible = false;

            this.classdivWorkClaimStatus = "yellowBox";
            this.h4WorkInfo = "Action Required Soon";
            if (this.IsPFL == "Y")
              this.WorkInfoText = "We will need updated work status soon, but no action is required now.";
            else
              this.WorkInfoText = "You will need to submit your Work Certification Form soon, but no action is required at the moment.";
            //this.sWorkInfo = "<strong>Status: </strong>" + this.WorkInfoText ;
            this.sWorkInfo = this.WorkInfoText;
            this.isVisibledivWorkActionRequired = false;
            break;
          case 3:
            // RedStatus = RedStatus + ((RedStatus == "") ? "Work" : ((MedicalStatus[0].Status == 3) ? ", Work" : " and Work"));
            // divWorkClaimStatus.Attributes.Add("class", "redBox");
            // h4WorkInfo.InnerText = "Action Required Now";
            // pWorkInfo.Attributes.Add("class", "highlight-red");
            // if (this.IsPFL == "Y")
            // {
            //     this.lbDownloadWorkCertification = true;
            // }
            // WorkInfoText = "We need updated Work information from you in order to continue processing your claim. Benefit checks are suspended until receipt of the updated information.";
            // sWorkInfo.InnerHtml = "<strong>Status: </strong>" + WorkInfoText;
            // divWorkActionRequired.Visible = true;

            this.RedStatus = this.RedStatus + (this.RedStatus == "") ? "Work" : ((MedicalStatus.Status == 3) ? ", Work" : " and Work");
            this.classdivWorkClaimStatus = "redBox";
            this.h4WorkInfo = "Action Required Now";
            if (this.IsPFL == "Y")
                this.lbDownloadWorkCertification = true;
            this.classpWorkInfo = "highlight-red"
            this.WorkInfoText = "We need updated Work information from you in order to continue processing your claim. Benefit checks are suspended until receipt of the updated information.";
            //this.sWorkInfo = "<strong>Status: </strong>" + this.WorkInfoText ;
            this.sWorkInfo = this.WorkInfoText;
            this.isVisibledivWorkActionRequired = true;

            break;
          default:
            // divWorkClaimStatus.Attributes.Add("class", "");
            // h4WorkInfo.InnerText = "";
            // aimgWorkInfo.HRef = "";
            // sWorkInfo.InnerHtml = "";
            // divWorkActionRequired.Visible = false;

            this.classdivWorkClaimStatus = "";
            this.h4WorkInfo = "";
            //this.aimgWorkInfo = "";
            this.sWorkInfo = "";
            this.isVisibledivWorkActionRequired = false;
            break;
        }

        //Medical Status Information
        if (this.IsPFL == "Y") //Added by Neeraj Jain on 01/08/2018 to hide Medical Certification for PFL claims. CO# 3072.
        {
          // divMedicalStatusBox.Style.Add("display", "none");
          // divBasicStatusBox.Attributes["class"] = divBasicStatusBox.Attributes["class"].Replace("col-md-4", "col-md-6");
          // divWorkStatusBox.Attributes["class"] = divWorkStatusBox.Attributes["class"].Replace("col-md-4", "col-md-6");
          // lblBecomeDisableLabel.InnerText = "First date of leave";
          // dvHowToSubmitPFLForms.Visible = true;
          // PFLWorkInfo.Visible = true;
          // PFLReturnToWork.Visible = true;
          // PFLBasicInfo.Visible = true;
          // spnPFLBasicHeaderDescription.Visible = true;
          // spnPFLBasicHeader.Visible = true;
          // dvHowToSubmitDBLForms.Visible = false;
          // DBLWorkInfo.Visible = false;
          // DBLReturnToWork.Visible = false;
          // DBLBasicInfo.Visible = false;
          // spnDBLBasicHeaderDescription.Visible = false;
          // spnDBLBasicHeader.Visible = false;

          this.isVisibledivMedicalStatusBox = false;
          this.classdivBasicStatusBox = this.classdivBasicStatusBox.replace("col-md-4", "col-md-6"); //"col-md-6 rightClaimBox";
          this.classdivWorkStatusBox = this.classdivWorkStatusBox.replace("col-md-4", "col-md-6"); //"col-md-6 rightClaimBox";

          this.lblBecomeDisableLabel = "First date of leave";
          this.isVisibledvHowToSubmitPFLForms = true;
          this.isVisiblePFLWorkInfo = true;
          this.isVisiblePFLReturnToWork = true;
          this.isVisiblePFLBasicInfo = true;
          this.isVisiblespnPFLBasicHeaderDescription = true;
          this.isVisiblespnPFLBasicHeader = true;
          this.isVisibledvHowToSubmitDBLForms = false;
          this.isVisibleDBLWorkInfo = false;
          this.isVisibleDBLReturnToWork = false;
          this.isVisibleDBLBasicInfo = false;
          this.isspnDBLBasicHeaderDescription = false;
          this.isVisiblespnDBLBasicHeader = false;
        }
        else {
          // lblBecomeDisableLabel.InnerText = "Date you became disabled";
          // dvHowToSubmitPFLForms.Visible = false;
          // PFLWorkInfo.Visible = false;
          //PFLReturnToWork.Visible = false;
          //PFLBasicInfo.Visible = false;
          //spnPFLBasicHeaderDescription.Visible = false;
          //spnPFLBasicHeader.Visible = false;
          //dvHowToSubmitDBLForms.Visible = true;
          // DBLWorkInfo.Visible = true;
          // DBLReturnToWork.Visible = true;
          // DBLBasicInfo.Visible = true;
          // spnDBLBasicHeaderDescription.Visible = true;
          // spnDBLBasicHeader.Visible = true;

          //divMedicalStatusBox.Style.Add("display", "block");
          //divBasicStatusBox.Attributes["class"] = divBasicStatusBox.Attributes["class"].Replace("col-md-6", "col-md-4");
          //divWorkStatusBox.Attributes["class"] = divWorkStatusBox.Attributes["class"].Replace("col-md-6", "col-md-4");


          this.lblBecomeDisableLabel = "Date you became disabled";
          this.isVisibledvHowToSubmitPFLForms = false;
          this.isVisiblePFLWorkInfo = false;
          this.isVisiblePFLReturnToWork = false;
          this.isVisiblePFLBasicInfo = false;
          this.isVisiblespnPFLBasicHeaderDescription = false;
          this.isVisiblespnPFLBasicHeader = false;
          this.isVisibledvHowToSubmitDBLForms = true;
          this.isVisibleDBLWorkInfo = true;
          this.isVisibleDBLReturnToWork = true;
          this.isVisibleDBLBasicInfo = true;
          this.isspnDBLBasicHeaderDescription = true;
          this.isVisiblespnDBLBasicHeader = true;
          this.isVisibledivMedicalStatusBox = true;
          // this.classdivBasicStatusBox = "col-md-4 rightClaimBox";
          // this.classdivWorkStatusBox = "col-md-4 rightClaimBox p-l-0";
          this.classdivBasicStatusBox = this.classdivBasicStatusBox.replace("col-md-6", "col-md-4");
          this.classdivWorkStatusBox = this.classdivWorkStatusBox.replace("col-md-6", "col-md-4");
          switch (MedicalStatus.Status) {
            case 1:
              // divMedicalClaimStatus.Attributes.Add("class", "greenBox");
              // h4MedicalInfo.InnerText = "No Action Required";
              // MedicalInfoText = "It looks like we have everything we need to process your claim regarding Medical Certification. No action is required by you at this point in time.";
              // pMedicalInfo.InnerHtml = "<strong>Status: </strong>" + MedicalInfoText;
              // divMedicalActionRequired.Visible = false;
              this.classdivMedicalClaimStatus = "greenBox";
              this.h4MedicalInfo = "No Action Required";
              this.MedicalInfoText = "It looks like we have everything we need to process your claim regarding Medical Certification. No action is required by you at this point in time.";
              //this.pMedicalInfo= "<strong>Status: </strong>" + this.MedicalInfoText;
              this.pMedicalInfo = this.MedicalInfoText;
              this.isVisibledivMedicalActionRequired = false;
              break;
            case 2:
              // divMedicalClaimStatus.Attributes.Add("class", "yellowBox");
              // h4MedicalInfo.InnerText = "Action Required Soon";
              // MedicalInfoText = "You will need to submit your Medical Certification Form soon, but no action is required at the moment.";
              // pMedicalInfo.InnerHtml = "<strong>Status: </strong>" + MedicalInfoText;
              // divMedicalActionRequired.Visible = false;
              this.classdivMedicalClaimStatus = "yellowBox";
              this.h4MedicalInfo = "Action Required Soon";
              this.MedicalInfoText = "You will need to submit your Medical Certification Form soon, but no action is required at the moment.";
              //this.pMedicalInfo="<strong>Status: </strong>" + this.MedicalInfoText;
              this.pMedicalInfo = this.MedicalInfoText;
              this.isVisibledivMedicalActionRequired = false;
              break;
            case 3:
              // RedStatus = RedStatus + ((RedStatus == "") ? "Medical" : " and Medical");
              // divMedicalClaimStatus.Attributes.Add("class", "redBox");
              // h4MedicalInfo.InnerText = "Action Required Now";
              // pMedicalInfo.Attributes.Add("class", "highlight-red");
              // MedicalInfoText = "We need updated Medical information from you in order to continue processing your claim. Benefit checks are suspended until receipt of the updated information.";
              // pMedicalInfo.InnerHtml = "<strong>Status: </strong>" + MedicalInfoText;
              // divMedicalActionRequired.Visible = true;
              this.RedStatus = this.RedStatus + ((this.RedStatus == "") ? "Medical" : " and Medical");
              this.classdivMedicalClaimStatus = "redBox";
              this.h4MedicalInfo = "Action Required Now";
              this.classpMedicalInfo = "highlight-red";
              this.MedicalInfoText = "We need updated Medical information from you in order to continue processing your claim. Benefit checks are suspended until receipt of the updated information.";
              //this.pMedicalInfo = "<strong>Status: </strong>" + this.MedicalInfoText;
              this.pMedicalInfo = this.MedicalInfoText;
              this.isVisibledivMedicalActionRequired = true;
              break;
            default:
              // divMedicalClaimStatus.Attributes.Add("class", "");
              // h4MedicalInfo.InnerText = "";
              // aimgMedicalInfo.HRef = "";
              // pMedicalInfo.InnerHtml = "";
              // divMedicalActionRequired.Visible = false;
              this.classdivMedicalClaimStatus = "";
              this.h4MedicalInfo = "";
              // aimgMedicalInfo.HRef = "";
              this.MedicalInfoText = "";
              this.pMedicalInfo = "";
              this.isVisibledivMedicalActionRequired = false;
              break;
          }
        }
        //When there is no next check date
        if (this.varNextCheckDate != '') {
          // pNextPaymentDate.Visible = true;
          // lblNextPaymentDate.Text = NextCheckDate;
          this.isVisiblepNextPaymentDate = true;

        }
        else {
          // pNextPaymentDate.Visible = false;
          // lblNextPaymentDate.Text = string.Empty;
          this.isVisiblepNextPaymentDate = true;
          this.varNextCheckDate = "";
        }

        //Claim Status Summary
        if (BasicStatus.Status != 3 && WorkStatus.Status != 3 && MedicalStatus.Status != 3) {
          if (this.varNextCheckDate != '') {
            // pClaimStatus.Attributes.Add("class", "blue-data");
            // pClaimStatus.InnerText = "Your claim is in good standing!";
            // if (IsPFL == "Y") //Added by Neeraj Jain on 01/08/2018 to hide Medical Certification for PFL claims. CO# 3072.
            //     pClaimStatusSummary.InnerText = "All of your Basic and Work Certifications have been reviewed and are up to date. You can expect your next payment to be sent out on " + NextCheckDate + ". Any changes to your claim status between now and " + NextCheckDate + " could result in an adjusted or delayed payment.";
            // else
            //     pClaimStatusSummary.InnerText = "All of your Basic, Work, and Medical Certifications have been reviewed and are up to date. You can expect your next payment to be sent out on " + NextCheckDate + ". Any changes to your claim status between now and " + NextCheckDate + " could result in an adjusted or delayed payment.";
            this.classpClaimStatus = "blue-data";
            this.pClaimStatus = "Your claim is in good standing!";
            if (this.IsPFL == "Y")
              this.pClaimStatusSummary = "All of your Basic and Work Certifications have been reviewed and are up to date. You can expect your next payment to be sent out on " + this.varNextCheckDate + ". Any changes to your claim status between now and " + this.varNextCheckDate + " could result in an adjusted or delayed payment.";
            else
              this.pClaimStatusSummary = "All of your Basic, Work, and Medical Certifications have been reviewed and are up to date. You can expect your next payment to be sent out on " + this.varNextCheckDate + ". Any changes to your claim status between now and " + this.varNextCheckDate + " could result in an adjusted or delayed payment.";
          }
          else {
            this.classpClaimStatus = "blue-data";
            this.pClaimStatus = "Your claim is in good standing!";
            if (this.IsPFL == "Y") //Added by Neeraj Jain on 01/08/2018 to hide Medical Certification for PFL claims. CO# 3072.
              this.pClaimStatusSummary = "All of your Basic and Work Certifications have been reviewed and are up to date.";
            else
              this.pClaimStatusSummary = "All of your Basic, Work, and Medical Certifications have been reviewed and are up to date.";

            // pClaimStatus.Attributes.Add("class", "blue-data");
            // pClaimStatus.InnerText = "Your claim is in good standing!";
            // if (IsPFL == "Y") //Added by Neeraj Jain on 01/08/2018 to hide Medical Certification for PFL claims. CO# 3072.
            //     pClaimStatusSummary.InnerText = "All of your Basic and Work Certifications have been reviewed and are up to date.";
            // else
            //     pClaimStatusSummary.InnerText = "All of your Basic, Work, and Medical Certifications have been reviewed and are up to date.";
          }
        }
        else {
          // pClaimStatus.Attributes.Add("class", "highlight-red");
          // pClaimStatus.InnerText = "Your claim is on hold because we are missing " + RedStatus + " Information.";
          // if (IsPFL == "Y") //Added by Neeraj Jain on 03/14/2018 to show different text for PFL. CO# 3123.
          //     pClaimStatusSummary.InnerText = "Details are provided below on exactly what is missing. Once we receive the required information/documentation, we will be able to to review and make a determinations on your claim. We are unable to issue any benefit payment until such time.";
          // else
          //     pClaimStatusSummary.InnerText = "Details are provided above on exactly what is missing. Once the required updated information has been obtained, submit it to us for review and action. We are unable to issue benefit payments without receipt of updated information.";

          this.classpClaimStatus = "highlight-red";
          this.pClaimStatus = "Your claim is on hold because we are missing " + this.RedStatus + " Information.";
          if (this.IsPFL == "Y") //Added by Neeraj Jain on 03/14/2018 to show different text for PFL. CO# 3123.
            this.pClaimStatusSummary = "Details are provided below on exactly what is missing. Once we receive the required information/documentation, we will be able to to review and make a determinations on your claim. We are unable to issue any benefit payment until such time.";
          else
            this.pClaimStatusSummary = "Details are provided above on exactly what is missing. Once the required updated information has been obtained, submit it to us for review and action. We are unable to issue benefit payments without receipt of updated information.";


        }
        if (this.IsPFL == "Y") //Added by Neeraj Jain on 03/14/2018 to mirror the content of the “Claim Status”. CO# 3123.
        {
          // pBasicInfo.InnerHtml = "<strong>Status: </strong>" + pClaimStatus.InnerText;
          // sWorkInfo.InnerHtml = "<strong>Status: </strong>" + pClaimStatus.InnerText;
          // this.pBasicInfo = "<strong>Status: </strong>" + this.pClaimStatus;
          // this.sWorkInfo = "<strong>Status: </strong>" + this.pClaimStatus;
          this.pBasicInfo = this.pClaimStatus;
          this.sWorkInfo = this.pClaimStatus;

        }
        // Claim status section
      }
      else {
        //divClaimStatus.Visible = false;
        this.isVisibledivClaimStatus = false;
      }

      //General Info
      if (GeneralInfoStatus.SetDate != null)
        // lblDisabledDate.Text = Convert.ToDateTime(GeneralInfoStatus[0].SetDate.ToString()).ToString("MM/dd/yyyy");
        // Decimal weekspaid = GeneralInfoStatus[0].NumWeeksPaid;
        // string weekstopaid = Convert.ToString(weekspaid).Replace(".00", "");

        this.lblDisabledDate = formatDate(GeneralInfoStatus.SetDate.toString(), 'MM/dd/yyyy', 'en');

      let weekspaid = GeneralInfoStatus.NumWeeksPaid;

      if (GeneralInfoStatus.NumWeeksPaid.toString().includes(".")) {
        if (weekspaid.toString().includes("00"))
          this.weekstopaid = weekspaid.toString().Replace(".00", "");
        let weekanddays = GeneralInfoStatus.NumWeeksPaid.toString().split(".");
        var weeks = weekanddays[0];
        var days = "." + weekanddays[1];

        let dayDecimal = +days * 10;
        this.lblNumWeeksPaid = (weeks != "" ? ((+weeks == 1) ? weeks + " Week and " : weeks + " Weeks and ") : "") + ((dayDecimal <= 1) ? dayDecimal.toString().replace(".00", "") + " Day" : dayDecimal.toString().replace(".00", "") + " Days");


        //lblNumWeeksPaid.Text = (weeks != "" ? ((Convert.ToInt32(weeks) == 1) ? weeks + " Week and " : weeks + " Weeks and ") : "") + ((Convert.ToDecimal(days) * 10 <= 1) ? Convert.ToString(Convert.ToDecimal(days) * 10).Replace(".00", "") + " Day" : Convert.ToString(Convert.ToDecimal(days) * 10).Replace(".00", "") + " Days");
      }
      else {
        //lblNumWeeksPaid.Text = (Convert.ToInt32(weekstopaid) == 1) ? weekstopaid + " Week" : weekstopaid + " Weeks";
        this.lblNumWeeksPaid = (weekspaid.toString() == "1") ? weekspaid.toString() + " Week" : weekspaid.toString() + " Weeks";
      }





      let benefitspaid = GeneralInfoStatus.BenefitsPaid;
      if (benefitspaid.toString().includes("."))
        this.lblBenefitAmtPaid = "$" + Math.abs(benefitspaid).toString();
      else
        this.lblBenefitAmtPaid = "$" + Math.abs(benefitspaid).toString() + ".00";
      if (this.varNextCheckDate != '') {
        // pNextPaymentDate.Visible = true;
        // lblNextPaymentDate.Text = NextCheckDate;
        this.isVisiblepNextPaymentDate = true;
        this.varNextCheckDate = this.varNextCheckDate;
      }
      else {
        // pNextPaymentDate.Visible = false;
        // lblNextPaymentDate.Text = string.Empty;
        this.isVisiblepNextPaymentDate = false;
        this.varNextCheckDate = '';
      }
      //Claim Status Summary
      if (this.iClaimCount > 0) {
        //aSeeMoreSummary.Visible = true;
        //this.isVisibleaSeeMoreSummary = true

        if (BasicStatus.Status != 3 && WorkStatus.Status != 3 && MedicalStatus.Status != 3) {
          if (this.varNextCheckDate != '') {
            // pClaimStatus1.Attributes.Add("class", "blue-data");
            // pClaimStatus1.InnerText = "Your claim is in good standing!";
            // pClaimStatusSummary1.InnerText = "All of your Basic, Work, and Medical Certifications have been reviewed and are up to date. You can expect your next payment to be sent out on " + NextCheckDate + ". Any changes to your claim status between now and " + NextCheckDate + " could result in an adjusted or delayed payment.";
            this.classpClaimStatus1 = "blue-data";
            this.pClaimStatus1 = "Your claim is in good standing!";
            this.pClaimStatusSummary1 = "All of your Basic, Work, and Medical Certifications have been reviewed and are up to date. You can expect your next payment to be sent out on " + this.varNextCheckDate + ". Any changes to your claim status between now and " + this.varNextCheckDate + " could result in an adjusted or delayed payment.";


          }
          else {
            // pClaimStatus1.Attributes.Add("class", "blue-data");
            // pClaimStatus1.InnerText = "Your claim is in good standing!";
            // pClaimStatusSummary1.InnerText = "All of your Basic, Work, and Medical Certifications have been reviewed and are up to date.";
            this.classpClaimStatus1 = "blue-data"
            this.pClaimStatus1 = "Your claim is in good standing!";
            this.pClaimStatusSummary1 = "All of your Basic, Work, and Medical Certifications have been reviewed and are up to date.";

          }
        }
        else {
          // pNextPaymentDate1.Visible = false;
          // lblNextPaymentDate1.Text = string.Empty;
          // pClaimStatus1.Attributes.Add("class", "highlight-red");
          // pClaimStatus1.InnerText = "Your claim is on hold because we are missing " + RedStatus + " Information.";
          // pClaimStatusSummary1.InnerText = "Details are provided above on exactly what is missing. Once the required updated information has been obtained, submit it to us for review and action. We are unable to issue benefit payments without receipt of updated information.";

          this.isVisiblepNextPaymentDate1 = false;
          this.lblNextPaymentDate1 = "";
          this.pClaimStatus1 = "Your claim is on hold because we are missing " + this.RedStatus + " Information.";
          this.pClaimStatusSummary1 = "Details are provided above on exactly what is missing. Once the required updated information has been obtained, submit it to us for review and action. We are unable to issue benefit payments without receipt of updated information.";
        }
      }
      else {
        // aSeeMoreSummary.Visible = false;
        // pNextPaymentDate1.Visible = false;
        // lblNextPaymentDate1.Text = string.Empty;

        // pClaimStatus1.Attributes.Add("class", "highlight-red");
        // pClaimStatus1.InnerText = "In Progress";
        // pClaimStatusSummary1.InnerText = "Your Claim is currently in progress. An examiner has reviewed your claim and taken action.  If you have received any forms from us, please make sure to fully complete and return for our review. If your claim is eligible for payment, we will issue benefit checks accordingly. Benefit checks are usually sent out bi-weekly.";

        // this.isVisibleaSeeMoreSummary = false;
        this.isVisiblepNextPaymentDate1 = false;
        this.lblNextPaymentDate1 = "";
        this.classpClaimStatus1 = "highlight-red"
        this.pClaimStatus1 = "In Progress";
        this.pClaimStatusSummary1 = "Your Claim is currently in progress. An examiner has reviewed your claim and taken action.  If you have received any forms from us, please make sure to fully complete and return for our review. If your claim is eligible for payment, we will issue benefit checks accordingly. Benefit checks are usually sent out bi-weekly.";

      }
      //setTimeout(() => { this.bind = true; this.ngxService.stop(); }, 5000);
    }
  }

  GetClaimCountForMessage() {
    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetClaimCountForMessage?ClaimNumber=" + this.ClaimNo//this.common.encrypt(this.LinkedClaimNo);
    const promise = this._data.GetService(url).toPromise();
    promise.then((data) => {
      //console.log("called 6");
      this.bindClaimCount(data);
    }).then((any) => { this.GetClaimCountFromClaimm_PilotTable(); }).catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
  }

  bindClaimCount(ClaimCount: any) {

    this.iClaimCountForMessage = ClaimCount;
    // if(ClaimCount > 0 && this.EmailCheckforAffidavit == 'isHidden') {
    //   this.isVisiblePasswordReset = false;
    //   this.isVisibleChkAffidavit= false;
    //   this.isVisibleAccountCreated = false;
    //   this.isVisibleID = false;
    //   this.isVisibleAccountLocked = false;
    // }
    // else if(ClaimCount == 0 && this.EmailCheckforAffidavit == 'isHidden'){
    //   this.isVisibleChkAffidavit= false;     
    //   this.isVisibleRegisteredUserinPortal  = false;  
    // }
    // this.BindRTWdate(this.varMedRTW,this.varTentativeRTWDate,this.varactualreturntoworkdate,this.varWorkCertifiedToDate,this.varpercentofclaimdate);
  }

  GetClaimCountFromClaimm_PilotTable() {
    this.ClaimDetailFinal = [];
    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetClaimCountFromClaimm_PilotTable?ClaimNumber=" + this.ClaimNo;
    const promise = this._data.GetService(url).toPromise();
    promise.then((data) => {
      //console.log("called 7");
      this.bindGetClaimCountFromClaimm_PilotTable(data);
    }).then((any) => { this.getClaimStatus(1); }).catch((error) => {
      console.log("getClaimCountFromClaimm_PilotTable failed." + JSON.stringify(error));
    });
  }
  bindGetClaimCountFromClaimm_PilotTable(obj: any) {
    if (obj != null) {
      this.isPilotClaim = obj;
    }
  }


  getClaimStatus(flag: number) {
    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetDetailsFromClaimPortal?ClaimNumber=" + this.ClaimNo;
    const promise = this._data.GetService(url).toPromise();
    if (flag == 1) {
      promise.then((data) => {
        //console.log("called 8");
        this.bindClaimStatus(data, flag);
      }).then((any) => { this.getClaimsDetails(); }).catch((error) => {
        console.log("getClaimStatus failed. " + JSON.stringify(error));
      });
    }
    else {
      promise.then((data) => {
        //console.log("called 8");
        this.bindClaimStatus(data, flag);
      }).catch((error) => {
        console.log("getClaimStatus failed. " + JSON.stringify(error));
      });
    }
  }

  bindClaimStatus(obj: any, flag: number) {
    // if(flag == 2){
    //   this.ngxService.start();
    // }
    // console.log('ClaimStatus');
    // console.log(obj);
    // console.log('iClaimCountForMessage ' + this.iClaimCountForMessage );

    if (obj != null) {
      this. ClaimStatusDetailFinal  = [];
      for (var i = 0; i < obj.length; i++) {
        this.ShowClaimTermDate = false;
        this.firstPreviewClaim = false;

        let o = new ClaimStatusInfo();
        o.TermDate = (obj[0].claimterminateddate != '' && obj[0].claimterminateddate != null && obj[0].claimterminateddate != 'undefined' && obj[0].claimterminateddate != '0001-01-01T00:00:00') ? this.datepipe.transform(obj[0].claimterminateddate, 'MM/dd/yyyy') : 'isHidden';
        if ((o.TermDate).toUpperCase() != 'ISHIDDEN')
          this.ShowClaimTermDate = true;
        this.firstPreviewClaim = true;

        o.MedRTW = (obj[0].medicalreturntoworkdate != '' && obj[0].medicalreturntoworkdate != null && obj[0].medicalreturntoworkdate != 'undefined' && obj[0].medicalreturntoworkdate != '0001-01-01T00:00:00') ? this.datepipe.transform(obj[0].medicalreturntoworkdate, 'MM/dd/yyyy') : 'isHidden';
        this.varMedRTW = o.MedRTW;
        if (this.IsPFL == "Y") { o.MedRTW = 'isHidden'; }

        o.TentativeRTWDate = (obj[0].tentativereturntoworkdate != '' && obj[0].tentativereturntoworkdate != null && obj[0].tentativereturntoworkdate != 'undefined' && obj[0].tentativereturntoworkdate != '0001-01-01T00:00:00') ? this.datepipe.transform(obj[0].tentativereturntoworkdate, 'MM/dd/yyyy') : 'isHidden';
        this.varTentativeRTWDate = o.TentativeRTWDate;

        o.ActualRTWDate = (obj[0].actualreturntoworkdate != '' && obj[0].actualreturntoworkdate != null && obj[0].actualreturntoworkdate != 'undefined' && obj[0].actualreturntoworkdate != '0001-01-01T00:00:00') ? this.datepipe.transform(obj[0].actualreturntoworkdate, 'MM/dd/yyyy') : 'isHidden';
        this.varactualreturntoworkdate = o.ActualRTWDate;
        // alert('varTentativeRTWDate ' + this.varTentativeRTWDate);
        // alert('varactualreturntoworkdate ' + this.varactualreturntoworkdate);



        this.varpercentofclaimdate = (obj[0].percentofclaimdate != '' && obj[0].percentofclaimdate != null && obj[0].percentofclaimdate != 'undefined' && obj[0].percentofclaimdate != '0001-01-01T00:00:00') ? this.datepipe.transform(obj[0].percentofclaimdate, 'MM/dd/yyyy') : 'isHidden';

        o.EstRTW = (obj[0].estreturntoworkdate != '' && obj[0].estreturntoworkdate != null && obj[0].estreturntoworkdate != 'undefined' && obj[0].estreturntoworkdate != '0001-01-01T00:00:00') ? this.datepipe.transform(obj[0].estreturntoworkdate, 'MM/dd/yyyy') : 'isHidden';
        this.varEstRTW = o.EstRTW;
        //this.getWorkCertifiedToDate(this.ClaimNo, o);
        o.WorkCertifiedTo = this.varWorkCertifiedToDate;

        //o.AccountCreated = (obj[0].accountcreated != '' && obj[0].accountcreated != null && obj[0].accountcreated != 'undefined' && obj[0].accountcreated != '0001-01-01T00:00:00') ? this.datepipe.transform(obj[0].accountcreated, 'MM/dd/yyyy') : 'isHidden';
        //o.ID = (obj[0].emailid != '' && obj[0].emailid != null && obj[0].emailid != 'undefined') ? obj[0].emailid : 'isHidden';
        // o.AccountLocked = (obj[0].accountlockedout != '' && obj[0].accountlockedout != null && obj[0].accountlockedout != 'undefined') ? obj[0].accountlockedout : 'isHidden'; 
        if (obj[0].accountcreated != '' && obj[0].accountcreated != null && obj[0].accountcreated != 'undefined' && obj[0].accountcreated != '0001-01-01T00:00:00') {
          o.AccountCreated = obj[0].accountcreated;
          this.isVisibleAccountCreated = true;
          this.accountCreated = true;
        }
        else{
          this.isVisibleAccountCreated = true;
          this.accountCreated = false;
        }

        if ((obj[0].emailid != '' && obj[0].emailid != null && obj[0].emailid != 'undefined')) {
          o.ID = obj[0].emailid;
          this.EmailCheckforAffidavit = o.ID;
          this.isVisibleID = true;
          this.varUserId = o.ID;
        }
        else {
          this.isVisibleID = false;
          this.EmailCheckforAffidavit = 'isHidden';
        }


        if (obj[0].accountlockedout != '' && obj[0].accountlockedout != null && obj[0].accountlockedout != 'undefined') {
          this.isVisibleAccountLocked = true;
          o.AccountLocked = obj[0].accountlockedout;

        }
        else
          this.isVisibleAccountLocked = false;

        this.ClaimStatusDetailFinal.push(o);
      }


      //check exting condition

      if (this.iClaimCountForMessage > 0) {
        this.isVisiblelblBlankClaim = false;
        this.lblBlankClaim = '';
        this.isVisibleRegisteredUserinPortal = true;


      }
      else if (this.isPilotClaim > 0) {
        this.isVisiblelblBlankClaim = true;
        this.lblBlankClaim = '';
        if (this.IsPFL == "Y")
          this.lblBlankClaim = "This Claimant has not yet signed up for the PFL Claim Portal.";
        else
          this.lblBlankClaim = "This claimant is eligible to register through the Claims Portal, but has not yet done so.";
        this.BindRTWdate(1, this.varEstRTW, this.varMedRTW, this.varTentativeRTWDate, this.varactualreturntoworkdate, this.varWorkCertifiedToDate, this.varpercentofclaimdate);

      }
      else {
        this.isVisiblelblBlankClaim = true;
        this.lblBlankClaim = '';
        if (this.IsPFL == "Y")
          this.lblBlankClaim = "This Claimant has not yet signed up for the PFL Claim Portal.";
        else
          this.lblBlankClaim = "This Claimant is eligible to register through the Claims Portal, but has not yet done so. This is not a pilot Claim.";
        this.BindRTWdate(0, this.varEstRTW, this.varMedRTW, this.varTentativeRTWDate, this.varactualreturntoworkdate, this.varWorkCertifiedToDate, this.varpercentofclaimdate);
      }


      if (this.iClaimCountForMessage > 0 && this.EmailCheckforAffidavit == 'isHidden') {
        this.isVisiblePasswordReset = false;
        this.isVisibleChkAffidavit = false;
        this.isVisibleAccountCreated = false;
        this.isVisibleID = false;
        this.isVisibleAccountLocked = false;
      }
      else if (this.iClaimCountForMessage == 0 && this.EmailCheckforAffidavit == 'isHidden') {
        this.isVisibleChkAffidavit = false;
        this.isVisibleRegisteredUserinPortal = false;
      }

      // iClaimCount > 0 means claim in Pilot Table.
      if (this.iClaimCount > 0) {
        //if (this.IsPFL == "Y") 
          //tr75ClaimDate.Visible = 'isHidden';
        this.divClaimCertificationHistory = true;
          this.trWorkCertifiedTo = true;
      }
      else if (this.iClaimCount == 0) {
        //tr75ClaimDate.Visible = 'isHidden';
        this.divClaimCertificationHistory = false;
        this.trWorkCertifiedTo = false;
      }
      if (flag == 2) {
        this.ngxService.stop();
      }

    } 
  }


  getClaimsDetails() {
    this.ClaimDetailFinal = [];
    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetClaimDetails?ClaimNumber=" + this.ClaimNo;
    const promise = this._data.GetService(url).toPromise();
    promise.then((data) => {
      //  console.log("called 9");
      //setTimeout(() => { this.bindClaimDetail(data)}, 5000);
      this.bindClaimDetail(data);
    }).then((any) => { this.showDaysWorked(1); }).catch((error) => {
      console.log("getClaimsDetails failed. " + JSON.stringify(error));
    });

  }

  bindClaimDetail(objClaimDetails: any) {
    //console.log(objClaimDetails);
    if (objClaimDetails != null) {
      this.ClaimDetailFinal = [];
      let o = new ClaimInfo();
      //parameter for Basic Info
      o.ClaimNumber = this.isNotNull(objClaimDetails[0].claimnumber) ? objClaimDetails[0].claimnumber.trim() : 'isHidden';
      this.varHeadClaimNo = o.ClaimNumber;
      o.FirstName = this.isNotNull(objClaimDetails[0].firstname) ? objClaimDetails[0].firstname.trim() : '';
      o.LastName = this.isNotNull(objClaimDetails[0].lastname) ? objClaimDetails[0].lastname.trim() : '';
      o.FullName = o.FirstName + " " + o.LastName;
      o.FullName = o.FullName.trim() != '' ? o.FullName.trim() : 'isHidden';
      o.Address = this.isNotNull(objClaimDetails[0].address) ? objClaimDetails[0].address.trim() : '';
      o.City = this.isNotNull(objClaimDetails[0].city) ? objClaimDetails[0].city.trim() : '';
      o.State = this.isNotNull(objClaimDetails[0].state) ? objClaimDetails[0].state.trim() : '';
      o.Zip = this.isNotNull(objClaimDetails[0].zip) ? objClaimDetails[0].zip.trim() : '';
      o.FullAddress = o.Address + " " + o.City + " " + o.State + " " + o.Zip;
      o.FullAddress = o.FullAddress.trim() != '' ? o.FullAddress.trim() : 'isHidden';
      o.Phone = this.isNotNull(objClaimDetails[0].phone) ? objClaimDetails[0].phone.trim() : 'isHidden';
      o.Gender = this.isNotNull(objClaimDetails[0].gender) ? objClaimDetails[0].gender.trim() : 'isHidden';
      if (o.Gender == 'M') o.Gender = 'Male';
      if (o.Gender == 'F') o.Gender = 'Female';
      o.DOB = this.isNotNull(objClaimDetails[0].dob) ? formatDate(objClaimDetails[0].dob, 'MM/dd/yyyy', 'en') : 'isHidden';
      // if (objClaimDetails[0].DOB != '' && objClaimDetails[0].DOB != null && objClaimDetails[0].DOB != 'undefined') {
      //   o.DOB = formatDate(objClaimDetails[0].dob, 'MM/dd/yyyy', 'en');
      //   o.DOB = (o.DOB != '' && o.DOB != null) ? o.DOB.trim() : 'isHidden';
      // }
      // else
      //   o.DOB = 'isHidden';
      o.SSN = this.isNotNull(objClaimDetails[0].ssn) ? objClaimDetails[0].ssn.trim() : 'isHidden';
      if (o.SSN.trim() != '')
        this.varSSN = o.SSN.trim();

      //parameter for Benifit Details

      if (this.IsPFL == 'Y') {
        o.BenifitRate = this.isNotNull(objClaimDetails[0].benefitrate) ? objClaimDetails[0].benefitrate : 'isHidden';
        o.FirstDayOfLeave = this.isNotNull(objClaimDetails[0].onsetdate) ? objClaimDetails[0].onsetdate : 'isHidden';
        o.LeaveType = this.isNotNull(objClaimDetails[0].pflreason) ? objClaimDetails[0].pflreason : 'isHidden';
        o.LeavePattern = this.isNotNull(objClaimDetails[0].contperiod) ? objClaimDetails[0].contperiod : 'isHidden';
        o.AccountACCumulator = this.isNotNull(objClaimDetails[0].acctaccumulator) ? objClaimDetails[0].acctaccumulator : 'isHidden';
        if (o.AccountACCumulator != 'isHidden') {
          var number = +o.AccountACCumulator;
          if (number > 1)
            o.AccountACCumulator = o.AccountACCumulator + " weeks";
          else
            o.AccountACCumulator = o.AccountACCumulator + " week";
        }
        o.PFACCumulator = this.isNotNull(objClaimDetails[0].pflaccumulator) ? objClaimDetails[0].pflaccumulator : 'isHidden';
        if (o.PFACCumulator != 'isHidden') {
          var number = +o.PFACCumulator;
          if (number > 1)
            o.PFACCumulator = o.PFACCumulator + " weeks";
          else
            o.PFACCumulator = o.PFACCumulator + " week";
        }
        o.Contribution = this.isNotNull(objClaimDetails[0].contribution) ? objClaimDetails[0].contribution : 'isHidden';
        o.TAX = this.isNotNull(objClaimDetails[0].taxpercentage) ? objClaimDetails[0].taxpercentage : 'isHidden';
        o.UintedLocation = this.isNotNull(objClaimDetails[0].linkedtolocation) ? objClaimDetails[0].linkedtolocation : 'isHidden';
        this.varShowDays = this.isNotNull(objClaimDetails[0].pfldatestaken) ? objClaimDetails[0].pfldatestaken : 'isHidden';
        // alert(this.varShowDays);
      }
      else {
        o.BenifitRate = this.isNotNull(objClaimDetails[0].benefitrate) ? objClaimDetails[0].benefitrate : 'isHidden';
        o.DeliveryDate = this.isNotNull(objClaimDetails[0].deliverydate) ? objClaimDetails[0].deliverydate : 'isHidden';
        o.OnSetDate = this.isNotNull(objClaimDetails[0].onsetdate) ? objClaimDetails[0].onsetdate : 'isHidden';
        o.DeliveryType = this.isNotNull(objClaimDetails[0].deliverytype) ? (objClaimDetails[0].deliverytype.trim() != "N/A" ? objClaimDetails[0].deliverytype.trim() : 'isHidden') : 'isHidden';
        o.DaysWorked = this.isNotNull(objClaimDetails[0].contperiod) ? objClaimDetails[0].contperiod : 'isHidden';
        o.AccountACCumulator = this.isNotNull(objClaimDetails[0].acctaccumulator) ? objClaimDetails[0].acctaccumulator : 'isHidden';
        if (o.AccountACCumulator != 'isHidden') {
          var number = +o.AccountACCumulator;
          if (number > 1)
            o.AccountACCumulator = o.AccountACCumulator + " weeks";
          else
            o.AccountACCumulator = o.AccountACCumulator + " week";
        }
        //o.PFACCumulator = (objClaimDetails[0].pflaccumulator != '' && objClaimDetails[0].pflaccumulator != null && objClaimDetails[0].pflaccumulator != 'undefined') ? objClaimDetails[0].pflaccumulator : 'isHidden';
        o.Contribution = this.isNotNull(objClaimDetails[0].contribution) ? objClaimDetails[0].contribution : 'isHidden';
        o.TAX = this.isNotNull(objClaimDetails[0].taxpercentage) ? objClaimDetails[0].taxpercentage : 'isHidden';
        o.UintedLocation = this.isNotNull(objClaimDetails[0].linkedtolocation) ? objClaimDetails[0].linkedtolocation : 'isHidden';

      }

      //parameter for Policy Info
      o.PolicyNumber = this.isNotNull(objClaimDetails[0].policynumber) ? objClaimDetails[0].policynumber.trim() : 'isHidden';
      if (this.isNotNull(objClaimDetails[0].policynumber)) this.varPolicyNumber = objClaimDetails[0].policynumber.trim();

      let pname = this.isNotNull(objClaimDetails[0].pname) ? objClaimDetails[0].pname.trim() : '';
      let pname1 = this.isNotNull(objClaimDetails[0].pname1) ? objClaimDetails[0].pname1.trim() : '';
      let pname2 = this.isNotNull(objClaimDetails[0].pname2) ? objClaimDetails[0].pname2.trim() : '';
      let fullPolicyName = pname + (pname1 != '' ? ' ' : '') + pname1 + (pname2 != '' ? ' ' : '') + pname2; 
      o.Name = this.isNotNull(fullPolicyName) ? fullPolicyName.trim() : 'isHidden';
      //o.Address = this.isNotNull(objClaimDetails[0].paddress) ? objClaimDetails[0].paddress.trim() : '';
      o.pAddress = this.isNotNull(objClaimDetails[0].paddress) ? objClaimDetails[0].paddress.trim() : '';
      o.pCity = this.isNotNull(objClaimDetails[0].pcity) ? objClaimDetails[0].pcity.trim() : '';
      o.pState = this.isNotNull(objClaimDetails[0].pstate) ? objClaimDetails[0].pstate.trim() : '';
      o.pZip = this.isNotNull(objClaimDetails[0].pzip) ? objClaimDetails[0].pzip.trim() : '';

      o.pFullAddress = o.pAddress + ' ' + o.pCity + ' ' + o.pState + ' ' + o.pZip;
      o.pFullAddress = this.isNotNull(o.pFullAddress) ? o.pFullAddress : 'isHidden';

      o.Effective = this.isNotNull(objClaimDetails[0].peffectivedate) ? objClaimDetails[0].peffectivedate : 'isHidden';
      o.TermDatePolicyInfo = this.isNotNull(objClaimDetails[0].ptermdate) ? objClaimDetails[0].ptermdate : 'isHidden';
      if ((o.TermDatePolicyInfo).toUpperCase() != 'ISHIDDEN')
        this.ShowPolicyTermDate = true;

      this.firstPreviewPolicy = true;
      o.TermCode = this.isNotNull(objClaimDetails[0].ptermcode) ? objClaimDetails[0].ptermcode : 'isHidden';
      o.BenifitLevel = this.isNotNull(objClaimDetails[0].pbenefitlevel) ? objClaimDetails[0].pbenefitlevel : 'isHidden';
      o.PolicyType = this.isNotNull(objClaimDetails[0].ptype) ? objClaimDetails[0].ptype.trim() : 'isHidden';
      // this.getSpecialProvisions(this.ClaimNo, o);
      o.SpecialProvisions = this.varSpecialProvisions;
      this.ClaimDetailFinal.push(o);
      this.LinkedClaimNo = o.ClaimNumber;
      //this.bind = true;


    }
    else {
      //this.bind = false;
      //this.varHeadClaimNo = this.common.decrypt(this.ClaimNo);
      //this.bind = true;
    }


  }


  showDaysWorked(flag: number) {
    //this.ngxService.start();
    this.varDaysWorked = '';
    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetWorkedDays?ClaimNumber=" + this.ClaimNo;
    if (flag == 1) {
      const promise = this._data.GetService(url).toPromise();
      promise.then((obj) => {
        //console.log("called 11");
        var str = obj.toString();
        var a1 = new Array();
        var days = str.split(":")[0];
        var daysCount = str.split(":")[1];
        var daysBreak = days.split(",");
        this.varDaysWorked = '';
        for (var i = 0; i < daysBreak.length; i++) {
          this.varDaysWorked = this.varDaysWorked + daysBreak[i].toString() + "\n";// "<br>";//   //  "<br/>;"
        }
        this.varDaysWorkedCount = obj.toString();
        this.varDaysWorkedCount = this.varDaysWorkedCount.substr(this.varDaysWorkedCount.length - 1);
        if (daysBreak.length <= 1)
          this.isVisbleDayswork = false;
        else
          this.isVisbleDayswork = true;

      }).then((any) => { this.getClaimsPaymentInfo(); }).catch((error) => {
        //}).catch((error)=>{
        console.log("showDaysWorked failed " + JSON.stringify(error));
      });
    }
    else {
      const promise = this._data.GetService(url).toPromise();
      promise.then((obj) => {
        // console.log("called 11");
        var str = obj.toString();
        var a1 = new Array();
        var days = str.split(":")[0];
        var daysCount = str.split(":")[1];
        var daysBreak = days.split(",");
        this.varDaysWorked = '';
        for (var i = 0; i < daysBreak.length; i++) {
          this.varDaysWorked = this.varDaysWorked + daysBreak[i].toString() + "\n";// "<br>";//   //  "<br/>;"
        }
        this.varDaysWorkedCount = obj.toString();
        this.varDaysWorkedCount = this.varDaysWorkedCount.substr(this.varDaysWorkedCount.length - 1);
        //console.log('varDaysWorked');
        //console.log(this.varDaysWorked);
        // console.log(this.varDaysWorkedCount);
        if (daysBreak.length <= 1)
          this.isVisbleDayswork = false;
        else
          this.isVisbleDayswork = true;
      }).catch((error) => {
        //}).catch((error)=>{
        console.log("showDaysWorked failed " + JSON.stringify(error));
      });
    }

  }



  getClaimsPaymentInfo() {
    this.paymentInfoLength = false;
    this.ClaimPaymentInfoDetailFinal = [];

    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetPaymentInfo?ClaimNumber=" + this.ClaimNo;
    const promise = this._data.GetService(url).toPromise();
    promise.then((data) => {
      // console.log("called 10");
      this.bindClaimsPaymentInfo(data);
    }).then((any) => { this.getFromRecieved(); }).catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
  }

  bindClaimsPaymentInfo(objClaimPaymentInfo: any) {
    if (objClaimPaymentInfo != null) {
      var checkperiodpaymentBlank = 0;
      for (var i = 0; i < objClaimPaymentInfo.length; i++) {
        let o = new ClaimPaymentInfo();
        o.CheckDate = objClaimPaymentInfo[i].checkdate;
        o.Check = objClaimPaymentInfo[i].checknumber;
        o.CheckFrom = objClaimPaymentInfo[i].checkfrom;
        o.ChecTo = objClaimPaymentInfo[i].checkto;
        o.Weeks = objClaimPaymentInfo[i].weeks;
        o.ToDate = objClaimPaymentInfo[i].todate;
        o.FICA = objClaimPaymentInfo[i].fica;
        o.NET = objClaimPaymentInfo[i].net;
        o.AddlTax = objClaimPaymentInfo[i].tax;
        o.SendCode = objClaimPaymentInfo[i].send;
        o.CheckStatus = objClaimPaymentInfo[i].checkstatus;
        o.ClaimsVoidDate = objClaimPaymentInfo[i].voiddate;
        if (objClaimPaymentInfo[i].viewperiodicpayments == 'true') {o.viewperiodicpayments = true; }
        else { o.viewperiodicpayments = false;
        checkperiodpaymentBlank++;}
        o.PeriodicPayment = '';
        this.ClaimPaymentInfoDetailFinal.push(o);
        this.paymentInfoLength = true;
        if(this.ClaimDetailFinal[0].PolicyType == 'TDB')
        {
          this.isVisibleExportBenifitSummary = false;
        }
        else
        {
          this.isVisibleExportBenifitSummary = true;
        }
      }
      if(checkperiodpaymentBlank == objClaimPaymentInfo.length){
        this.isfilled = false;
      }
    }
    else { this.isVisibleExportBenifitSummary = false; }
    this.bind = true;
  }


  getFromRecieved() {
    //this.ngxService.start();
    let url = AppConstants.SERVICE_URL + "ClaimInformation/FormsReceived?ClaimNumber=" + this.ClaimNo;
    const promise = this._data.GetService(url).toPromise();
    promise.then((data) => {
      //console.log("called 11");
      this.bindFromRecieved(data);
    }).then((any) => { this.getFromSent(""); }).catch((error) => {
      console.log("getFromRecieved failed " + JSON.stringify(error));
    });
  }

  bindFromRecieved(obj: any) {
    this.rowFromRecieved = [];
    if (obj != null) {
      this.rowFromRecieved = obj; this.FormsGridSize = "FormsGridSize";
    }
    //this.ngxService.stop();
  }


  getFromSent(mode: string) {

    this.rowFromSent = [];
    let url = AppConstants.SERVICE_URL + "ClaimInformation/FormsSent?ClaimNumber=" + this.ClaimNo;
    const promise = this._data.GetService(url).toPromise();
    promise.then((data) => {
      //console.log("called 12");

      if (mode == "MakeAffidavit") {
        this.bindFromSentForMakeAffidavit(data);
      }
      else {
        this.bindFromSent(data);
      }
    }).then((any) => { this.getWorkCertification(); }).catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });


  }
  bindFromSent(obj: any) {
    this.rowFromSent = [];
    // this.arrayFromSent = null;
    if (obj != null) {
      if (obj.length > 1)

      for (var i = 0; i < obj.length; i++) {
        if (obj[i].InputOutput == "O") {
          const hashDBLforms = new Set([1, 4, 5, 6, 7, 11, 13]);
          const hashPFLforms = new Set([6, 11, 35, 39, 40, 41, 42]);
          const hashMiscPFLforms = new Set([22, 23, 25]);
          const hashMiscDBLforms = new Set([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);

          if (obj[i].DocID > 0 && (obj[i].InputOutput != "O" || (obj[i].InputOutput == "O" && (!hashDBLforms.has(obj[i].FormTypeId) && !hashPFLforms.has(obj[i].FormTypeId) && !hashMiscDBLforms.has(obj[i].FormTypeId) && !hashMiscPFLforms.has(obj[i].FormTypeId))))){
              this.varlinkButton = true;
          }
          else
            this.chkForLink((obj[i].FormTypeId), obj[i].InputOutput, obj[i].AddressType, obj[i].View)

          if (obj[i].View == "false" && obj[i].ViewPath == "" && this.varlinkButton == false) {
            obj[i].View = "";
            this.rowFromSent.push(obj[i]);
          }
          else if (obj[i].ViewPath != "" && this.varlinkButton == true) {
            obj[i].View = obj[i].ViewPath;
            this.rowFromSent.push(obj[i]);
          }
          else if (this.varlinkButton == true && obj[i].View != "") {
            obj[i].View = AppConstants.SERVICE_URL + `ClaimInformation/DownloadFormsSentByShelterPoint?profile=` + this.common.encrypt(obj[i]["FormTypeId"] + `|` + this.LinkedClaimNo + `|` + obj[i]["FormDate"] + `|` + obj[i]["FormID"] + `|` + obj[i]["AddressType"]);
            this.rowFromSent.push(obj[i]);
            this.FormsGridSize = "FormsGridSize";
          }
        }
      }
    }
    else
      this.rowFromSent = [];

    this.bind = true;
    //this.ngxService.stop();
  }

  chkForLink(form_type_id: string, InputOutPut: string, AddressType: string, View: string) {
    const hashDBLforms = new Set([1, 4, 5, 6, 7, 11, 13]);
    const hashPFLforms = new Set([6, 11, 35, 39, 40, 41, 42]);
    const hashMiscPFLforms = new Set([22, 23, 25]);
    const hashMiscDBLforms = new Set([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);

    let IsPFL = '';
    let FormTypeId = +form_type_id;
    if (this.LinkedClaimNo != null)
      IsPFL = this.LinkedClaimNo.toString().startsWith("F") ? "Y" : "N";
    if (InputOutPut == "O" && ((hashDBLforms.has(FormTypeId) && IsPFL == "N") || (hashMiscDBLforms.has(FormTypeId) && View == "true" && IsPFL == "N") || (hashPFLforms.has(FormTypeId) && IsPFL == "Y") || (hashMiscPFLforms.has(FormTypeId) && View == "true" && IsPFL == "Y"))) {
      this.varlinkButton = true;
    }
    else {
      this.varlinkButton = false;
    }
  }

  bindFromSentForMakeAffidavit(obj: any) {
    // this.ngxService.start();
    this.rowFromSent = [];

    if (obj.length > 0) {
      for (var i = 0; i < obj.length; i++) {
        if (obj[i]["InputOutput"] == "O") {
          const hashDBLforms = new Set([1, 4, 5, 6, 7, 11, 13]);
          const hashPFLforms = new Set([6, 11, 35, 39, 40, 41, 42]);
          const hashMiscPFLforms = new Set([22, 23, 25]);
          const hashMiscDBLforms = new Set([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);

          if (obj[i]["DocID"] > 0 && (obj[i]["InputOutput"] != "O" || (obj[i]["InputOutput"] == "O" && (!hashDBLforms.has(obj[i]["FormTypeId"]) && !hashPFLforms.has(obj[i]["FormTypeId"]) && !hashMiscDBLforms.has(obj[i]["FormTypeId"]) && !hashMiscPFLforms.has(obj[i]["FormTypeId"]))))){
              this.varlinkButton = true;
          }
          else
            this.chkForLink((obj[i]["FormTypeId"]), obj[i]["InputOutput"], obj[i]["AddressType"], obj[i]["View"])

          if (obj[i]["View"] == "false" && obj[i]["ViewPath"] == "" && this.varlinkButton == false) {
            obj[i]["View"] = "";
          }
          else if (this.varlinkButton == true && obj[i]["View"] != "") {
            obj[i]["View"] = AppConstants.SERVICE_URL + `ClaimInformation/DownloadFormsSentByShelterPoint?profile=` + this.common.encrypt(obj[i]["FormTypeId"] + `|` + this.LinkedClaimNo + `|` + obj[i]["FormDate"] + `|` + obj[i]["FormID"] + `|` + obj[i]["AddressType"]);
          }
          else if (obj[i]["View"] == "false" && obj[i]["ViewPath"] != "") {
            obj[i]["View"] = obj[i]["ViewPath"];
          }
          this.rowFromSent.push(obj[i]);
        }
      }
    }
    else
      this.rowFromSent = [];

    // this.ngxService.stop();
    //this.bind = true;
  }


  getFromSentbyMarkCheck(mode: string) {
    this.ngxService.start();
    this.rowFromSent = [];
    let url = AppConstants.SERVICE_URL + "ClaimInformation/FormsSent?ClaimNumber=" + this.ClaimNo;
    const promise = this._data.GetService(url).toPromise();
    promise.then((data) => {
      //  console.log("called 12");

      if (mode == "MakeAffidavit") {
        this.bindFromSentForMakeAffidavit(data);
      }
      else {
        this.bindFromSent(data);
      }
    }).then((any) => { this.getWorkCertification(); }).catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
    //this.ngxService.stop();


  }




  getWorkCertification() {
    //this.ngxService.start();

    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetClaimWorkCertificationHistory?ClaimNumber=" + this.ClaimNo;
    const promise = this._data.GetService(url).toPromise();
    promise.then((obj) => {
      //console.log("called 13");
      this.bindWorkCertification(obj);
    }).then((any) => { this.getMedicalCertification(); }).catch((error) => {
      console.log("getWorkCertification failed " + JSON.stringify(error));
    });
  }

  bindWorkCertification(obj: any) {
    // this.rowWorkCertification = null;
    // if (obj != null)
    //   this.rowWorkCertification = obj;
    //this.ngxService.stop();
    if (obj != null) {
      this.WorkHistoryDateFinal = obj;
      this.workDateLength = true;
    }
  }

  getMedicalCertification() {
    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetClaimMedicalCertificationHistory?ClaimNumber=" + this.ClaimNo;
    const promise = this._data.GetService(url).toPromise();
    promise.then((obj) => {
      this.bindMedicalCertification(obj);
    }).catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
    // this._data.GetService(url).subscribe(obj => {
    //   this.bindMedicalCertification(obj);
    // });
  }

  bindMedicalCertification(obj: any) {
    if (obj != null) {
      this.MedicalHistoryDateFinal = obj;
      this.medicalDateLength = true;
    }
    // this.rowMedicalCertification = null;
    // if (obj != null)
    //   this.rowMedicalCertification = obj;
    this.bind = true;
    this.ngxService.stop();
  }











  onBtnClick1(e) {
    this.rowDataClicked1 = e.rowData;
  }

  dateOpen(id) {
    if (id == 1)
      this.dateCallsPicker.api.open();
  }








  // //#endregion










  // getWorkCertifiedToDate(ClaimNo: string, ClaimStatusInfo: ClaimStatusInfo) {
  //   let url = AppConstants.SERVICE_URL + "ClaimInformation/GetWorkCertificationToDate?ClaimNumber=" + this.ClaimNo
  //   this._data.GetService(url).subscribe(res => {
  //     if(res[0].worktocertified != '' && res[0].worktocertified != null && res[0].worktocertified != 'undefined' && res[0].worktocertified != '0001-01-01T00:00:00') 
  //     {
  //       ClaimStatusInfo.WorkCertifiedTo = res[0].worktocertified;        
  //     }
  //     else
  //        ClaimStatusInfo.WorkCertifiedTo = 'isHidden';
  //     this.varWorkCertifiedToDate =  ClaimStatusInfo.WorkCertifiedTo;
  //   });
  // }








  callAddNewClaimNote(NewClaimNote: string) {
    if (this.isNotNull(NewClaimNote)) {
      this.ngxService.start();
      let url = AppConstants.SERVICE_URL + "ClaimInformation/InsertClaimNotes?ClaimNumber=" + this.ClaimNo + "&UserName=" + this.common.encrypt(this.UserName) + "&NewClaimNote=" + this.common.encrypt(NewClaimNote);
      this._data.GetService(url).subscribe(obj => {
        this.bindAfterInsert(obj);
      });
    }
  }

  bindAfterInsert(iReturn: any) {
    new Promise(() => this.getClaimsNotes()).then(() => this.ngxService.stop());
    document.getElementById("btnCloseAddNewClaimNote").click();
  }

  callMakeAffidavitAvlbetoClaimant(e) {

    // if (e.target.checked)
    //   this.getFromSent("MakeAffidavit");
    // else
    //   this.getFromSent("");

    if (e.target.checked)
      new Promise(() => this.getFromSentbyMarkCheck("MakeAffidavit")).then(() => this.ngxService.stop());
    else
      new Promise(() => this.getFromSentbyMarkCheck("")).then(() => this.ngxService.stop());

  }









  // getSpecialProvisions(ClaimNo: string, ClaimInfo: ClaimInfo) {
  //   let url = AppConstants.SERVICE_URL + "ClaimInformation/GetSpecialProvisions?ClaimNumber=" + ClaimNo;
  //   const promise = this._data.GetService(url).toPromise();
  //   promise.then((res)=>{
  //     if (ClaimInfo.SpecialProvisions == '' || ClaimInfo.SpecialProvisions == 'undefined' || ClaimInfo.SpecialProvisions == null)
  //        this.varSpecialProvisions = 'isHidden';
  //     else
  //        this.varSpecialProvisions = res.toString();  
  //   }).catch((error)=>{
  //     console.log("Promise rejected with " + JSON.stringify(error));
  //   });
  //   // this._data.GetService(url).subscribe(res => {
  //   //   if (ClaimInfo.SpecialProvisions == '' || ClaimInfo.SpecialProvisions == 'undefined' || ClaimInfo.SpecialProvisions == null)
  //   //     this.varSpecialProvisions = 'isHidden';
  //   //   else
  //   //     this.varSpecialProvisions = res.toString();
  //   // });
  // }


  getLinkedClaim() {
    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetLinkedClaims?ClaimNumber=" + this.ClaimNo;
    const promise = this._data.GetService(url).toPromise();
    promise.then((result) => {
      if (result != null) {
        this.lstLinkedClaim = [];
        this.lstLinkedClaim = result as [];
        //console.log( this.lstLinkedClaim);

      }
      // else{

      //   var test = [] as any;  
      //    test.push( this.common.decrypt(this.ClaimNo));
      //   //this.lstLinkedClaim = this.ClaimNo;
      //   this.lstLinkedClaim = test;
      //   console.log(this.lstLinkedClaim);
      // }
    }).catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
    // this._data.GetService(url).subscribe(result => {
    //   this.lstLinkedClaim = result as [];
    // });
  }

  filterForLinkedClaim(SelectedClaim: any) {
    this.ngxService.start();
    this.varHeadClaimNo = "";
    this.varHeadClaimNo = SelectedClaim;
    if (SelectedClaim.trim() == this.LinkedClaimNo.trim()) {

    }
    else {
      this.ClaimNo = this.common.encrypt(SelectedClaim);
      this.LinkedClaimNo = this.ClaimNo
      this.claimFont = SelectedClaim;

      //this.getLinkedClaim(this.ClaimNo);
      this.showDaysWorked(2);
      this.getSpecialProvisions();

      let claimNo = SelectedClaim.trim() != null ? this.common.encrypt(SelectedClaim.trim()) : '';
      if (SelectedClaim.startsWith('F')) 
        this.IsPFL = 'Y';
      else 
        this.IsPFL = 'N';

      let url = 'claimdetails';
      this.router.navigateByUrl(url + '?Claim=' + claimNo);
    }
  }

  callExportBenifitSummary() {
    var IsPFL = "";
    if (this.IsPFLTrue)
      IsPFL = "Y";
    else
      IsPFL = "N";
    let url = AppConstants.SERVICE_URL + "ClaimInformation/ExportBenefitSummary?ClaimNumber=" + this.common.encrypt(this.LinkedClaimNo) + "&IsPFL=" + this.common.encrypt(IsPFL);
    window.open(url, "_blank");
  }

  showPeriodicPayments1(e) {
    //alert();
    //alert( e.rowData);
  }

  showPeriodicPayments(CheckDate: string, Check: string, CheckFrom: string, ChecTo: string, Weeks: string, ToDate: string,
    FICA: string, NET: string, AddlTax: string, SendCode: string, CheckStatus: string,
    ClaimsVoidDate: string) {
    this.varCheckDate = CheckDate;
    this.varCheck = Check
    this.varCheckFrom = CheckFrom;
    this.varChecTo = ChecTo;
    this.varWeeks = Weeks;
    this.varToDate = ToDate;
    this.varFICA = FICA;
    this.varNET = NET;
    this.varAddlTax = AddlTax;
    this.varSendCode = SendCode;
    this.varCheckStatus = CheckStatus;
    this.varClaimsVoidDate = ClaimsVoidDate;
    this.ngxService.start();
    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetPeriodicCheckDates?ClaimNumber=" + this.common.encrypt(this.LinkedClaimNo) + "&CheckFrom=" + this.common.encrypt(ChecTo) + "&CheckTo=" + this.common.encrypt(ChecTo);
    const promise = this._data.GetService(url).toPromise();
    promise.then((result) => {
      this.varPeriodicCheckDates = result as any;
    }).catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });

    // this._data.GetService(url).subscribe(result => {
    //   this.varPeriodicCheckDates = result as any;
    // });
    this.ngxService.stop();

  }





  onKeyUp(boxInput: HTMLInputElement) {
    if (this.Userid == '')
      this.error = true;
    else
      this.error = false;
    let totallenth = 255;
    let length = boxInput.value.length; //this will have the length of the text entered in the input box
    if (length == 0)
      this.varlength = '255';
    else {
      totallenth = totallenth - length;
      this.varlength = totallenth.toString();
    }
  }



  showAdditionalCoverageDetails() {
    this.ngxService.start();
    if (this.varPolicyNumber != "") {
      let url = AppConstants.SERVICE_URL + "ClaimInformation/BindAdditionalCoverageDetails?PolicyNumber=" + this.common.encrypt(this.varPolicyNumber);
      const promise = this._data.GetService(url).toPromise();
      promise.then((obj) => {
        obj['AdditionalLocation']
        this.bindLocationInfo(obj);
      }).catch((error) => {
        console.log("Promise rejected with " + JSON.stringify(error));
      });

      // this._data.GetService(url).subscribe(obj => {
      //   obj['AdditionalLocation']
      //   this.bindLocationInfo(obj);
      // });
    }

  }

  bindLocationInfo(obj: any) {
    this.AdditionalCoverageLocationInfoDetailFinal = [];
    //console.log(obj);
    if (obj["AdditionalLocation"].length > 0)
      this.rowLocationInfo_PopUp = obj["AdditionalLocation"];

    if (obj["Proprietor"].length > 0) {
      this.rowProprietorPartnerInfo_PopUp = obj["Proprietor"];
      this.varProprietorPartner = "";
    }
    else
      //this.rowProprietorPartnerInfo_PopUp = "isHidden";
      this.varProprietorPartner = "isHidden";

    if (obj["OutOfStateCoverage"].length > 0) {
      this.variNonStat = true;

      // console.log(obj["OutOfStateCoverage"]);
      // console.log(obj["OutOfStateCoverage"].length);

      //this.varOutOfStateCoverage =  obj["Proprietor"][0].state;
      for (var i = 0; i < obj["OutOfStateCoverage"].length; i++) {
        // console.log(obj["OutOfStateCoverage"][i].state);
        if (i == 0)
          this.varOutOfStateCoverage = obj["OutOfStateCoverage"][i].state
        else
          this.varOutOfStateCoverage = "," + obj["OutOfStateCoverage"][i].state;

        if (obj["OutOfStateCoverage"][i].nonstatsts == "" || obj["OutOfStateCoverage"][i].nonstatsts != "X") {
          this.variNonStat = false;
          break;
        }
      }



    }
    else
      this.varOutOfStateCoverage = "isHidden";


    if (obj["VoluntaryCoverage"].length > 0)
      this.varVoluntaryCoverage = obj["VoluntaryCoverage"][0].grp_name;
    else
      this.varVoluntaryCoverage = "isHidden";


    if (obj["Exclusions"].length > 0) {
      this.varExclusionsCoverage = '';
      if (obj["Exclusions"].length > 0) {

        if (obj["Exclusions"][0]["grp_name"] != "") {
          this.varExclusionsCoverage = obj["Exclusions"][0]["grp_name"];
          this.varExclusionsCoverage = "\n";
        }
        if (obj["Exclusions"][0]["grp_name2"] != "") {
          this.varExclusionsCoverage = obj["Exclusions"][0]["grp_name2"];
          this.varExclusionsCoverage = "\n";
        }
        if (obj["Exclusions"][0]["grp_name3"] != "") {
          this.varExclusionsCoverage = obj["Exclusions"][0]["grp_name3"];
          this.varExclusionsCoverage = "\n";
        }
        if (obj["Exclusions"][0]["grp_name4"] != "") {
          this.varExclusionsCoverage = obj["Exclusions"][0]["grp_name4"];
          this.varExclusionsCoverage = "\n";
        }

        if (obj["Exclusions"][0]["printflag"] == "Y") {
          this.varExclusionsCoverage = "This policy covers the following employees:";
          this.varExclusionsCoverage = this.varExclusionsCoverage + "\n";
        }
        if (obj["Exclusions"][0]["printflag"] != "N" && obj["Exclusions"][0]["printflag"] != "") {
          this.varExclusionsCoverage = "The following are excluded from policy coverage:";
          this.varExclusionsCoverage = this.varExclusionsCoverage + "\n";

        }
        for (var i = 1; i <= 4; i++) {
          if (obj["Exclusions"][0]["line" + i] != "" && obj["Exclusions"][0]["line" + i] != null) {
            this.varExclusionsCoverage = this.varExclusionsCoverage + "\n";
            this.varExclusionsCoverage = this.varExclusionsCoverage + obj["Exclusions"][0]["line" + i];
          }
        }
      }
    }
    else {
      this.varExclusionsCoverage = "isHidden";
    }
    this.ngxService.stop();
    //this.ngxService.stop();
  }

  checkComment() {
    if (this.Userid == '')
      this.error = true;
    else
      document.getElementById("SaveNotes").click();
  }

  ResetClaimNotesPopup() {
    this.error = false;
    this.varlength = '255';
    this.Userid = "";
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  onGridReady_Global(evt) {
    //evt.api.setDomLayout("autoHeight");
    this.gridApi_Global = evt.api;
    evt.api.sizeColumnsToFit();
  }
  onGridReady_AdditionalCov(evt) {
    //evt.api.setDomLayout("autoHeight");
    this.gridApi_AdditionalCov = evt.api;
    evt.api.sizeColumnsToFit();
  }
  callUpdateRTWDate() {
    this.selectedRTWDate = this.datepipe.transform(this.selectedRTWDate, 'MM/dd/yyyy');
    if (this.selectedRTWDate != '') {
      if (this.selectedRTWDate == '' || this.selectedRTWDate == undefined) {
        this.errorRTW = true;
      }
      else {
        //UserId
        this.ngxService.start();
        if (this.ClaimNo != "" && this.selectedRTWDate != "" && this.UserName != "" && this.varPolicyNumber != "") {

          let url = AppConstants.SERVICE_URL + "ClaimInformation/InsertReturnToWorkDate?ClaimNumber=" + this.ClaimNo + "&RTWdate=" + this.common.encrypt(this.selectedRTWDate) + "&CsrId=" + this.common.encrypt(this.UserName) + "&PolicyNumber=" + this.common.encrypt(this.varPolicyNumber);
          const promise = this._data.GetService(url).toPromise();
          promise.then((obj) => {

            //this.getSpecialProvisions();        
          }).then((any) => { this.getClaimStatus(2); }).catch((error) => {
            //}).catch((error)=>{
            console.log("Promise rejected with callUpdateRTWDate method." + JSON.stringify(error));
          });
          //console.log(url);
          // this._data.GetService(url).subscribe(obj => { });
        }
        //this.getSpecialProvisions();
        document.getElementById("btnCloaseUpdateRTW").click();
        this.showUpdateRTWPopUp();
        // this.ngxService.stop();
      }
    }
    else {
      this.errorRTW = true;
    }
  }

  closeRWT() {
    this.errorRTW = false;
    this.selectedRTWDate = '';
  }

  // //#region "Calendar Events"
  dateSelection_Calendar() {
    this.errorRTW = false;
  }


  checkRTW() {
    if (this.Userid == '')
      this.error = true;
    else
      document.getElementById("UpdateRTW").click();
  }

  callUserPassword() {
    this.ngxService.start();
    let url = AppConstants.SERVICE_URL + "ClaimInformation/UpdateTempPassword?AccountID=" + this.common.encrypt(this.varUserId.trim()) + "&ClaimNumber=" + this.ClaimNo + "&SSN=" + this.common.encrypt(this.varSSN);
    const promise = this._data.GetService(url).toPromise();
    promise.then((obj) => {
      this.bindResetPassword(obj);
    }).catch((error) => {
      console.log("Promise rejected with callUserPassword method failed." + JSON.stringify(error));
    });
    this.ngxService.stop();
  }

  bindResetPassword(dsForgotPasswordDetails) {
    //this.ngxService.start();
    if (dsForgotPasswordDetails != null) {
      this.Action = dsForgotPasswordDetails.Table[0].action;
      this.Name = dsForgotPasswordDetails.Table[0].name;
      let Attempts = 0;
      if (dsForgotPasswordDetails.Table[0].attempt != null && dsForgotPasswordDetails.Table[0].attempt != "") {
        Attempts = +dsForgotPasswordDetails[0].attempt;
      }
      switch (this.Action.toLowerCase().trim()) {
        case "locked for today":
          this.lblErrMsg = "Your account has been locked because of too many failed logins. To unlock your account please call us at 516-829-8100 customer service at extension 7786.";
          //lblErrMsg.Visible = true;
          this.isVisiblelblErrMsg = true;

          break;
        case "update temp password":
          this.lblErrMsg = "";
          this.isVisiblelblErrMsg = false;
          //this.varUserId = 'shyam.raghuvanshi@beyondkey.com';
          this.SendMail(this.Name.trim() + "|" + this.varUserId.trim());
          this.getSpecialProvisions();

          //this.ngxService.stop();


          // mpeClaimPortalAccuntInformation.Hide();
          // Refresh page with new password
          // RefreshPassword();
          break;
        case "no of attempts left":
          switch (Attempts) {
            case 2:
              this.lblErrMsg = "The email, claim number, and social security number combination is incorrect. Please try again.";
              this.isVisiblelblErrMsg = true;
              break;
            case 3:
              this.lblErrMsg = "The email, claim number, and social security number combination is incorrect. You have 2 more login attempts before your account is locked.";
              this.isVisiblelblErrMsg = true;
              break;
            case 4:
              this.lblErrMsg = "The email, claim number, and social security number combination is incorrect. You have 1 more login attempts before your account is locked.";
              this.isVisiblelblErrMsg = true;
              break;
            case 5:
              this.lblErrMsg = "Your account has been locked because of too many failed logins. To unlock your account please call us at 516-829-8100 customer service at extension 7786.";
              this.isVisiblelblErrMsg = true;
              break;
          }

          break;
        case "locked":
          this.lblErrMsg = "Your account has been locked because of too many failed logins. To unlock your account please call us at 516-829-8100 customer service at extension 7786.";
          this.isVisiblelblErrMsg = true;

          break;
        case "1st attempt":
          this.lblErrMsg = "The email, claim number, and social security number combination is incorrect.";
          this.isVisiblelblErrMsg = true;
          //mpeClaimPortalAccuntInformation.Show();
          break;
        case "check emailid":
          this.lblErrMsg = "Email ID is not valid.";
          this.isVisiblelblErrMsg = true;
          break;
      }
      document.getElementById("btnCloseUpdateRTW").click();

    }
    this.ngxService.stop();
  }
  SendMail(Info: string) {
    //let emailParam = this.Name.trim() + "|" + this.varUserId.trim();
    let url = AppConstants.SERVICE_URL + "ClaimInformation/SendEmail?Info=" + this.common.encrypt(Info);
    //console.log(url);
    this.ngxService.start();
    //this._data.GetService(url);
    this._data.GetService(url).subscribe(obj => { });
    this.getClaimsDetails();
  }

  BindRTWdate(isPilotClaim, varEstRTW, varMedRTW, varTentativeRTWDate, varactualreturntoworkdate, varWorkCertifiedToDate, varpercentofclaimdate) {

    // alert(varMedRTW);
    // alert(varTentativeRTWDate);
    // alert(varactualreturntoworkdate);
    //alert(varWorkCertifiedToDate);
    // alert(varpercentofclaimdate);
    //alert(varMedRTW);



    // if(this.varMedRTW == 'isHidden')
    // this.pnlRTW_lblMedicalRTWDt =varMedRTW;
    // if(this.varMedRTW == 'isHidden')
    // this.varTentativeRTWDate = varTentativeRTWDate;
    // if(this.varWorkCertifiedToDate == 'isHidden')
    // this.pnlRTW_lblWorkCertifiedDt = varWorkCertifiedToDate;



    // if (this.IsPFL == "Y")
    // {
    // this.pnlRTW_RowMedical = false;
    // this.pnlRTW_lblMedicalRTWDt = varMedRTW;
    // }
    // else
    // {
    // this.pnlRTW_RowMedical = true;
    // if(this.varMedRTW != 'isHidden' )
    // this.pnlRTW_lblMedicalRTWDt = varMedRTW;
    // else
    // this.pnlRTW_lblMedicalRTWDt = 'isHidden';
    // }

    if (this.IsPFL == "N") {
      // this.pnlRTW_RowMedical = false;
      // this.pnlRTW_lblMedicalRTWDt = varMedRTW;
      this.pnlRTW_RowMedical = true;
      if (this.varMedRTW != 'isHidden')
        this.pnlRTW_lblMedicalRTWDt = varMedRTW;
      else
        this.pnlRTW_lblMedicalRTWDt = 'isHidden';
      this.pnlRTW_lblESTRTWDt = 'isHidden'
    }
    else {
      this.pnlRTW_EST = true;
      if (this.varEstRTW != 'isHidden')
        this.pnlRTW_lblESTRTWDt = varEstRTW;
      else
        this.pnlRTW_lblESTRTWDt = 'isHidden';
      this.pnlRTW_lblMedicalRTWDt = 'isHidden';
    }

    if (this.varTentativeRTWDate != 'isHidden')
      this.pnlRTW_lblTentativeWorkDt = varTentativeRTWDate;
    else
      this.pnlRTW_lblTentativeWorkDt = 'isHidden';

    if (this.varactualreturntoworkdate != 'isHidden') {
      this.pnlRTW_RowActualDt = true;
      this.pnlRTW_lblActualWorkDt = varactualreturntoworkdate;
    }
    else {
      this.pnlRTW_lblActualWorkDt = 'isHidden';
      this.pnlRTW_RowActualDt = false;
    }

    if (this.IsPFL == "Y") //Added by Neeraj Jain on 01/08/2018 to hide Medical Certification for PFL claims. CO# 3072.
      this.pnlRTW_RowClaimPercent = false;
    else {
      this.pnlRTW_RowClaimPercent = true;
      if (varpercentofclaimdate != 'isHidden') {
        this.pnlRTW_lblPercent = varpercentofclaimdate;
      }
      else {
        this.pnlRTW_lblPercent = "isHidden";
      }
    }

    if (varWorkCertifiedToDate != 'isHidden') {
      this.pnlRTW_lblWorkCertifiedDt = varWorkCertifiedToDate;
    }
    else {
      this.pnlRTW_lblWorkCertifiedDt = "isHidden";
    }



    this.isVisibleRegisteredUserinPortal = true;
    this.pnlRTW_RowTentiveDt = true;
    //this.pnlRTW_RowActualDt = true;

    if (this.isPilotClaim == 1) {
      if (this.IsPFL != "Y")
        this.pnlRTW_RowClaimPercent = true;
      this.pnlRTW_RowWorkCertified = true;
    }
    else {
      this.pnlRTW_RowClaimPercent = false;
      this.pnlRTW_RowWorkCertified = false;
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

  returnSearch() {
    let url = '/claiminfosearch?p=return';
    this.router.navigateByUrl(url);
  }

  setRtwMessage(evt) {
    alert("RTW date changed");
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.errorRTW = false;
    var selectedDate: Date = event.value//this.datepipe.transform(event.value, 'MM/dd/yyyy');
    var currentDate: Date = new Date();
    if (selectedDate > currentDate) {
      this.showRTW_greaterThanToday = true;
      this.showRTW_currentOLess = false;
    }
    else if (selectedDate <= currentDate) {
      this.showRTW_greaterThanToday = false;
      this.showRTW_currentOLess = true;
    }
    else
      this.showUpdateRTWPopUp();
  }

  showUpdateRTWPopUp() {
    this.errorRTW = false;
    this.selectedRTWDate = '';
    this.showRTW_greaterThanToday = false;
    this.showRTW_currentOLess = false;
  }

  toggleClass(id){
    switch (id) {
      case 11:
        if(this.statusSectionClass11 == "action"){this.statusSectionClass11 = "action hideDisplay";this.defaultPlusMinus11="fa fa-plus"}
        else{this.statusSectionClass11 = "action";this.defaultPlusMinus11="fa fa-minus"}
        break;
      case 12:
        if(this.statusSectionClass12 == "rightClaimBoxPara"){this.statusSectionClass12 = "rightClaimBoxPara hideDisplay";this.defaultPlusMinus12="fa fa-plus"}
        else{this.statusSectionClass12 = "rightClaimBoxPara";this.defaultPlusMinus12="fa fa-minus"}
        break;
      case 21:
        if(this.statusSectionClass21 == "action"){this.statusSectionClass21 = "action hideDisplay";this.defaultPlusMinus21="fa fa-plus"}
        else{this.statusSectionClass21 = "action";this.defaultPlusMinus21="fa fa-minus"}
      break;
      case 22:
        if(this.statusSectionClass22 == "action"){this.statusSectionClass22 = "action hideDisplay";this.defaultPlusMinus22="fa fa-plus"}
        else{this.statusSectionClass22 = "action";this.defaultPlusMinus22="fa fa-minus"}
      break;
      case 23:
        if(this.statusSectionClass23 == "rightClaimBoxPara"){this.statusSectionClass23 = "rightClaimBoxPara hideDisplay";this.defaultPlusMinus23="fa fa-plus"}
        else{this.statusSectionClass23 = "rightClaimBoxPara";this.defaultPlusMinus23="fa fa-minus"}
        break;
      case 31:
        if(this.statusSectionClass31 == "action"){this.statusSectionClass31 = "action hideDisplay";this.defaultPlusMinus31="fa fa-plus"}
        else{this.statusSectionClass31 = "action";this.defaultPlusMinus31="fa fa-minus"}
      break;
      case 32:
        if(this.statusSectionClass32 == "rightClaimBoxPara"){this.statusSectionClass32 = "rightClaimBoxPara hideDisplay";this.defaultPlusMinus32="fa fa-plus"}
        else{this.statusSectionClass32 = "rightClaimBoxPara";this.defaultPlusMinus32="fa fa-minus"}
        break;
    }
  }
}

