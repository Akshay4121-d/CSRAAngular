/*********************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 22 Apr 2020, Wednesday
 * Decription :  Policy Information Search Screen
 *********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Common } from 'src/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ExportAsService } from 'ngx-export-as';
import { PolicyInfo, AdditionalCoverageLocationInfo } from 'src/app/models/policyinfo';
import { AppConstants } from 'src/app/app.constants';
import { formatDate, getLocaleNumberFormat } from '@angular/common';
import { StringBuilder } from 'typescript-string-operations';
import { Enumerable, List } from 'linqts';
import { Sort } from '@angular/material/sort';
import { CompileMetadataResolver } from '@angular/compiler';
declare var $: any;

@Component({
  selector: 'app-policydetails',
  templateUrl: './policydetails.component.html',
  styleUrls: ['./policydetails.component.scss']
})
export class PolicydetailsComponent implements OnInit {

  bind: boolean = false;
  UserName: string = '';
  PolicyNo_Enc: string;
  PolicyNo_Dec: string;
  PolicyDetailFinal: Array<PolicyInfo> = [];
  policyisActive: boolean;
  fullPolicyStatus: string;
  PolicyStatus_Header: string;
  billmode: string;
  PolicyType: string;
  url_searcheditemail: string;
  url_callLog: string;
  url_certiofinsurance: string;
  url_postingnotice: string;
  url_duplicatebill: string;
  url_duplicatepolicy: string;
  PolicyZip: string = '';
  iAmendedBenefit: boolean = false;
  iAmendedBenefitText: string = 'Custom Benefits: ';
  removepflBorder: string = '';

  dtReasons: any = null;
  dsPendingBalance: any = null;

  //hide show tr td
  trBalanceDueManual: boolean = false;
  trBalanceDue: boolean = false;
  trMissingInfo: boolean = false;
  trQuestionableWages: boolean = false;
  VTUrl: string = '';
  lbtnBalanceDue: string = '';
  total_inBalDueGrid: string = '';
  gvBalanceDue: any = [];
  PolicyStatus_static: string = '';
  lblQuestionableWagesReasons: string = '';
  lblMissingInfoReasons: string = '';
  txtPolicyNumberToRemovePFLRider: string = '';
  lblErrorMsgToRemovePFLRider: string = '';
  divPFLPolicyValidation: boolean = false;
  lblBalanceDueMessage: string = '';
  divPFLBalanceDueValidation: boolean = false;
  lbtnRemovePFLRider: boolean = false;
  lbtnReqDuplicateBill: boolean = false;
  lbtnReqDuplicatePolicy: boolean = false;

  //#region Member info
  active: string = 'active';
  inactive: string;
  MemberInformationSection: boolean = false;
  pnlActiveMember: boolean = true;
  pnlInactiveMember: boolean = false;
  dtEnrollList: any = null;

  //All_EnrollList: any = null;
  memberGridSize: string = '';
  errorActive: boolean = false;
  lblActiveEmployeesCount: string;
  lblActiveDependentsCount: string;
  lblActiveWaitingPeriod: string;
  errorInactive: boolean = false;
  lblInactiveEmployeesCount: string;
  lblInactiveDependentsCount: string;
  lblInactiveWaitingPeriod: string;

  RptActiveEnrollList: any = [];
  dessertsActive = this.RptActiveEnrollList;
  RptActiveDependent: any = [];

  RptInactiveEnrollList: any = [];
  dessertsInactive = this.RptInactiveEnrollList;
  RptInactiveDependent: any = [];

  arrowButton: string = '';
  //#endregion

  //Add Bill Mode Request
  pnlAddBillModeWarning: boolean = false;
  pnlAddBillModeExistingRequest: boolean = false;
  ReqExist_TxtRequestDt: string = '';
  ReqExist_TxtRequestNo: string = '';
  ReqExist_TxtRequestCmnt: string = '';
  ReqExist_DdlRequestAssgnTo: any = [];
  ddlRequestAssgnTo: string = "";
  ReqExist_DdlReqStatus: string = '';

  premInfoGridSize: string = "gridMinSize";

  //Rates Grid in popup
  public noRowsTemplate;
  public loadingTemplate;
  rowRatesHistory_onPopUp: any = [];
  rateHistoryGridSize: string = "gridMinSize";
  columnRatesHistory_onPopUp = [
    { headerName: 'Period From', field: 'periodfrom', width: 92 },
    { headerName: 'Period To', field: 'periodto', width: 90 },
    { headerName: 'Male Rate', field: 'malerate', width: 85, cellStyle:{'text-align':"right"} },
    { headerName: 'Female Rate', field: 'femalerate', width: 100, cellStyle:{'text-align':"right"} },
    { headerName: 'Payrate', field: 'payrate', cellStyle:{'text-align':"right"} }
  ];

  //Premium Information grid
  totalperiod: string = 'hideMe';
  totalpremium: string;
  totalfees: string;
  public gridApi_Global;
  private getRowHeightPremiumInfo;
  private getRowHeightPolicyNotes;
  rowPremiumInfo: any = [];
  columnPremiumInfo = [
    { headerName: 'Date Received', field: 'datereceived', width: 50 },
    { headerName: 'Payment', field: 'premiumamt', width: 50 },
    { headerName: 'Pay Period', field: 'payperiod', width: 50 },
    { headerName: 'Payment Type', field: 'paytype' }
    // , cellStyle: { "white-space": "normal" }
  ]

  //Policy Notes
  policyNotesGridSize = 'gridMinSize';
  rowPolicyNotes: any = [];
  varlength: string = '255';
  txtNewNote: string = '';
  error: boolean = false;
  columnPolicyNotes = [
    { headerName: 'Date', field: 'date', width: 40 },
    { headerName: 'User', field: 'username', width: 30 },
    { headerName: 'Comment', field: 'notes', cellStyle: { "white-space": "normal" } }
  ]

  //Form Received
  FormsGridSize = 'gridMinSize';
  rowFromRecieved: any = [];
  columnFromRecieved = [
    { headerName: 'Date', field: 'date', width: 20 },
    { headerName: 'Form', field: 'filename', cellStyle: { "white-space": "normal" }, width: 80 },
    {
      headerName: "Download", width: 20,
      field: "filepath",
      cellClass: "links",
      cellRenderer: function (params) {
        if (params.value.length > 0)
          return params.value;
      },
    }
  ]

  //#region Additional Coverage
  //Insured
  locationInsuredGridSize: string = "gridMinSizeLocaIns";
  rowLocationInsured_onPopUp: any = [];
  columnLocationInsured_onPopUp = [
    { headerName: 'Name', field: 'aname', cellStyle: { "white-space": "normal" }, width: 200 },
    { headerName: 'Address', field: 'addlocadd', cellStyle: { "white-space": "normal" }, width: 200 },
    { headerName: 'City', field: 'city', width: 200 },
    { headerName: 'State', field: 'state', width: 70 },
    { headerName: 'Zip', field: 'zip', width: 80 },
    { headerName: 'FEIN', field: 'federalid', width: 100 },
    { headerName: 'Eff Date', field: 'aeff', width: 100 },
    { headerName: 'Term Date', field: 'addlocterm', width: 100 },
    { headerName: 'Loc #', field: 'addlocnum', width: 100 },
    { headerName: 'Loc Code', field: 'mailcode', width: 100 }
  ];

  //Linked Products
  rowLinkedProducts_onPopUp = [];
  columnLinkedProducts_onPopUp = [
    { headerName: 'Policy#', field: 'linkpol', width: 100 },
    { headerName: 'Type', field: 'linkp_type', width: 70 },
    { headerName: 'Linked From', field: 'linkfrom', width: 150 },
    { headerName: 'Linked From', field: 'linkthru' }
  ];
  varLinkedProducts = 'hideMe';

  //Proprietor Partner
  varProprietorPartner = 'hideMe';
  columnProprietorPartner_onPopUp = [
    { headerName: 'Name', field: 'name', width: 170 },
    { headerName: 'Eff Date', field: 'effdate', width: 100 },
    { headerName: 'Term Date', field: 'termdate', width: 100 },
    { headerName: 'M/F', field: 'gender' }
  ]
  rowProprietorPartner_onPopUp: any = [];

  varVoluntaryCoverage: string = 'hideMe';
  varOutOfStateCoverage: string = 'hideMe';
  variNonStat: boolean = false;
  varExclusionsCoverage: string = 'hideMe';

  BillModeWrng_lblBillMode: boolean = false;
  BillModeWrng_lblPolicyStatus: boolean = false;
  BillModeWrng_lblInActiveNotAnnual: boolean = false;
  //#endregion

  constructor(private _data: DataService,
    private route: ActivatedRoute,
    private common: Common,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private exportAsService: ExportAsService) {
    //#region "Static URLs"
    this.url_callLog = AppConstants.IntranetSiteURL_SharePoint + 'FirstRehabCustomPages/calllog.aspx';
    //#endregion


    this.PolicyNo_Enc = this.route.snapshot.queryParams['pno'];
    this.PolicyNo_Dec = this.common.decrypt(this.PolicyNo_Enc);
    this.UserName = sessionStorage.getItem('id_CSR');
    this.GetInformation();

    this.getRowHeightPolicyNotes = function (params) {
      return 28 * (Math.floor(params.data.notes.trim().length / 166) + ((params.data.notes.trim().length > 240) ? 2 : 1));
    };
  }

  GetInformation(){
    this.GetMissingInfoReasons();
    this.GetAssignToList();
    this.getPolicyDetails('first');
    this.GetPremiumInfo();
    this.GetPolicyNotes();
    this.getFromRecieved();
  }

  ngOnInit() {
    this.ngxService.start();
    this.loadingTemplate = `<span style="padding-top: 26px;">No Records Available.</span>`;
    this.noRowsTemplate = `<span style="padding-top: 26px;">No Records Available.</span>`;
  }

  GetAssignToList() {
    let url = AppConstants.SERVICE_URL + "PolicyInformation/BindAssignToList?sUserid=" + this.common.encrypt(this.UserName);
    this._data.GetService(url).subscribe((assignList: any) => {
      this.bind_AssignToList(assignList);
    });
  }

  bind_AssignToList(assignList: any) {
    if (assignList != null && assignList.length > 0) {
      this.ReqExist_DdlRequestAssgnTo = assignList;
    }
  }

  //Get Policy Details
  getPolicyDetails(flag: string) {
    this.PolicyDetailFinal = [];
    let url = AppConstants.SERVICE_URL + "PolicyInformation/GetPolicyDetails?PolicyNo=" + this.PolicyNo_Enc;
    const promise = this._data.GetService(url).toPromise();
    promise.then((data) => {
      this.bindPolicyDetail(data);
    }).then((any) => {
      if (flag == 'first') {
        this.bind = true;
        if (this.IsEnrollmentPolicy()) {
          this.GetEnrollments(true, true, true);
          this.MemberInformationSection = true;
        }
        else {
          this.MemberInformationSection = false;
          this.ngxService.stop();
        }
      }
    }).catch((error) => {
      console.log("getPolicyDetails failed. " + JSON.stringify(error));
    });
  }
  //Bind - Policy Details
  bindPolicyDetail(objPolicyDetails: any) {
    if (this.isNotNull(objPolicyDetails)) {
      this.url_searcheditemail = AppConstants.IntranetPortalURL + 'crmsystem/webforms/searcheditemail.aspx';
      this.PolicyDetailFinal = [];
      let o = new PolicyInfo();
      o.policynumber = this.isNotNull(objPolicyDetails[0].policynumber) ? objPolicyDetails[0].policynumber.trim() : 'hideMe';
      o.policytype = this.isNotNull(objPolicyDetails[0].policytype) ? objPolicyDetails[0].policytype.trim() : 'hideMe';
      this.PolicyType = o.policytype != 'hideMe' ? o.policytype : '';
      if (this.PolicyType.toUpperCase().trim() == 'DBL') {
        this.lbtnReqDuplicateBill = true;
        this.lbtnReqDuplicatePolicy = true;
      }
      else {
        this.lbtnReqDuplicateBill = false;
        this.lbtnReqDuplicatePolicy = false;
      }
      o.policyeffectivedate = this.isNotNull(objPolicyDetails[0].policyeffectivedate) ? objPolicyDetails[0].policyeffectivedate.trim() : 'hideMe';
      o.carrier = this.isNotNull(objPolicyDetails[0].carrier) ? objPolicyDetails[0].carrier.trim() : 'hideMe';
      o.rosternonroster = this.isNotNull(objPolicyDetails[0].rosternonroster) ? objPolicyDetails[0].rosternonroster.trim() : 'hideMe';
      o.policyname = this.isNotNull(objPolicyDetails[0].policyname) ? objPolicyDetails[0].policyname.trim() : 'hideMe';
      o.policyphoneno = this.isNotNull(objPolicyDetails[0].policyphoneno) ? objPolicyDetails[0].policyphoneno.trim() : 'hideMe';
      o.fedid = this.isNotNull(objPolicyDetails[0].fedid) ? objPolicyDetails[0].fedid.trim() : 'hideMe';
      o.wcbdate = this.isNotNull(objPolicyDetails[0].wcbdate) ? objPolicyDetails[0].wcbdate.trim() : 'hideMe';
      o.uier = this.isNotNull(objPolicyDetails[0].uier) ? objPolicyDetails[0].uier.trim() : 'hideMe';
      o.wcbemployer = this.isNotNull(objPolicyDetails[0].wcbemployer) ? objPolicyDetails[0].wcbemployer.trim() : 'hideMe';
      o.policyfax = this.isNotNull(objPolicyDetails[0].policyfax) ? objPolicyDetails[0].policyfax.trim() : 'hideMe';
      o.policyaddress = this.isNotNull(objPolicyDetails[0].policyaddress) ? objPolicyDetails[0].policyaddress.trim() : 'hideMe';
      o.policyzip = this.isNotNull(objPolicyDetails[0].policyzip) ? objPolicyDetails[0].policyzip.trim() : 'hideMe';
      if (o.policyzip != 'hideMe')
        this.PolicyZip = o.policyzip;
      o.policyemail = this.isNotNull(objPolicyDetails[0].policyemail) ? objPolicyDetails[0].policyemail.trim() : 'hideMe';
      o.brokerno = this.isNotNull(objPolicyDetails[0].brokerno) ? objPolicyDetails[0].brokerno.trim() : 'hideMe';
      if (o.brokerno != 'hideMe') {
        this.GetBroker(o.brokerno);
      }
      o.brokername = this.isNotNull(objPolicyDetails[0].brokername) ? objPolicyDetails[0].brokername.trim() : 'hideMe';
      o.brokerphonenumber = this.isNotNull(objPolicyDetails[0].brokerphonenumber) ? objPolicyDetails[0].brokerphonenumber.trim() : 'hideMe';
      o.borkeraddress = this.isNotNull(objPolicyDetails[0].borkeraddress) ? objPolicyDetails[0].borkeraddress.trim() : 'hideMe';
      o.salesrep = this.isNotNull(objPolicyDetails[0].salesrep) ? objPolicyDetails[0].salesrep.trim() : 'hideMe';
      o.billmode = this.isNotNull(objPolicyDetails[0].billmode) ? objPolicyDetails[0].billmode.trim() : 'hideMe';
      if (o.billmode == 'A')
        o.billmode = 'ANNUAL';
      else if (o.billmode == 'Q')
        o.billmode = 'QUARTERLY';
      else
        o.billmode = 'hideMe';
      if (o.billmode != 'hideMe')
        this.billmode = o.billmode;
      else
        this.billmode = null;
      o.malerate = this.isNotNull(objPolicyDetails[0].malerate) ? objPolicyDetails[0].malerate : 'hideMe';
      o.femalerate = this.isNotNull(objPolicyDetails[0].femalerate) ? objPolicyDetails[0].femalerate : 'hideMe';
      o.census = this.isNotNull(objPolicyDetails[0].census) ? objPolicyDetails[0].census : 'hideMe';
      o.payrollfactor = this.isNotNull(objPolicyDetails[0].payrollfactor) ? objPolicyDetails[0].payrollfactor : 'hideMe';
      o.benefitlevel = this.isNotNull(objPolicyDetails[0].benefitlevel) ? objPolicyDetails[0].benefitlevel : 'hideMe';
      o.inhospitalrider = this.isNotNull(objPolicyDetails[0].inhospitalrider) ? objPolicyDetails[0].inhospitalrider : 'hideMe';
      o.malecount = this.isNotNull(objPolicyDetails[0].malecount) ? objPolicyDetails[0].malecount : 'hideMe';
      o.femalecount = this.isNotNull(objPolicyDetails[0].femalecount) ? objPolicyDetails[0].femalecount : 'hideMe';
      o.beneftieffectivedate = this.isNotNull(objPolicyDetails[0].beneftieffectivedate) ? objPolicyDetails[0].beneftieffectivedate.trim() : 'hideMe';
      o.inhospitaleffectivedate = this.isNotNull(objPolicyDetails[0].inhospitaleffectivedate) ? objPolicyDetails[0].inhospitaleffectivedate.trim() : 'hideMe';
      o.total = this.isNotNull(objPolicyDetails[0].total) ? objPolicyDetails[0].total : 'hideMe';
      o.policystatus = this.isNotNull(objPolicyDetails[0].policystatus) ? objPolicyDetails[0].policystatus.trim() : 'hideMe';
      this.PolicyStatus_Header = this.isNotNull(objPolicyDetails[0].policystatus) ? ((objPolicyDetails[0].policystatus.trim()).includes('TERMI') ? 'TERMINATED' : ((objPolicyDetails[0].policystatus.trim()).includes('PENDING') ? 'hideMe' : 'ACTIVE')) : 'hideMe';
      this.fullPolicyStatus = this.isNotNull(objPolicyDetails[0].policystatus) ? objPolicyDetails[0].policystatus : '';
      if (this.PolicyStatus_Header != 'hideMe') {
        this.policyisActive = this.PolicyStatus_Header.includes('TERMI') ? false : true;
      }
      
      o.wservice = this.isNotNull(objPolicyDetails[0].wservice) ? objPolicyDetails[0].wservice.trim() : 'hideMe';
      o.pfleffectivedate = this.isNotNull(objPolicyDetails[0].pfleffectivedate) ? objPolicyDetails[0].pfleffectivedate.trim() : 'hideMe';
      o.pflrider = this.isNotNull(objPolicyDetails[0].pflrider) ? objPolicyDetails[0].pflrider.trim() : 'hideMe';
      if (o.pflrider == 'Y') {
        o.pflrider = 'Yes';
        this.lbtnRemovePFLRider = true;
      }
      else {
        o.pflrider = 'No';
        this.lbtnRemovePFLRider = false;
      }
      o.amendedbenefit = this.isNotNull(objPolicyDetails[0].amendedbenefit) ? objPolicyDetails[0].amendedbenefit.trim() : 'hideMe';
      o.brokertermdate = this.isNotNull(objPolicyDetails[0].brokertermdate) ? 'TERMINATED' : 'ACTIVE';

      if (o.amendedbenefit != 'hideMe') {
        this.iAmendedBenefit = true;
        this.iAmendedBenefitText = '';
        this.iAmendedBenefitText = 'Custom Benefits: ' + o.amendedbenefit;
      }
      else
        this.iAmendedBenefit = false;



      this.PolicyDetailFinal.push(o);
    }
  }

  //To check if we have to show Member Information Section
  IsEnrollmentPolicy() {
    if (this.PolicyType == "GDC" || this.PolicyType == "GDP" || this.PolicyType == "GVC" || this.PolicyType == "GVP" || this.PolicyType == "STD" || this.PolicyType == "XGM" || this.PolicyType == "BPP" || this.PolicyType == "EAP" || this.PolicyType == "NHL" || this.PolicyType == "ACC" || this.PolicyType == "SME")
      return true;
    else
      return false;
  }

  //Get Missing Infomation/Reasons
  GetMissingInfoReasons() {
    let url = AppConstants.SERVICE_URL + "PolicyInformation/GetMissingInfoReasons";
    this._data.GetService(url).subscribe((MissingInfo) => {
      this.bind_MisingInfoReasons(MissingInfo);
    });
  }
  bind_MisingInfoReasons(miInfo: any) {
    if (miInfo != null) {
      this.dtReasons = miInfo;
    }
  }

  //GetBrokerId
  GetBroker(brokerNumber: string) {
    let url = AppConstants.SERVICE_URL + "PolicyInformation/GetBroker?BrokerNo=" + this.common.encrypt(brokerNumber);
    this._data.GetService(url).subscribe((brokerInfo: any) => {
      this.bind_BrokerInfo(brokerInfo)
    });
  }
  bind_BrokerInfo(brokerInfo: any) {
    debugger;
    if (this.isNotNull(brokerInfo)) {
      let username = this.common.decrypt(sessionStorage.getItem('UserName'));
      let csrpolicyredirect = AppConstants.UserURL + 'broker/csrpolicyredirect.aspx?request=';
      if (this.policyisActive) {
        // this.url_certiofinsurance = csrpolicyredirect + 'certiofinsurance&PolicyNo=' + this.PolicyNo_Dec + '&IDBroker=' + brokerInfo[0].ID_Broker + '&IntranetCSRUser=' + username;
        // this.url_postingnotice = csrpolicyredirect + 'postingnotice&PolicyNo=' + this.PolicyNo_Dec + '&IDBroker=' + brokerInfo[0].ID_Broker + '&IntranetCSRUser=' + username;

        //for stage
        this.url_certiofinsurance = '/WebUtilities/generatecertificate?pno=' + this.common.encrypt(this.PolicyNo_Dec) + '&brokerId=' + this.common.encrypt(brokerInfo[0].ID_Broker);
        this.url_postingnotice = '/WebUtilities/postingnotice?pno=' + this.common.encrypt(this.PolicyNo_Dec) + '&brokerId=' + this.common.encrypt(brokerInfo[0].ID_Broker);
        
        //for local
        // this.url_certiofinsurance = '/generatecertificate?pno=' + this.common.encrypt(this.PolicyNo_Dec) + '&brokerId=' + this.common.encrypt(brokerInfo[0].ID_Broker);
        // this.url_postingnotice = '/postingnotice?pno=' + this.common.encrypt(this.PolicyNo_Dec) + '&brokerId=' + this.common.encrypt(brokerInfo[0].ID_Broker);
       }
      else {
        this.url_certiofinsurance = '#';
        this.url_postingnotice = '#';
      }
      // this.url_duplicatebill = csrpolicyredirect + 'duplicatebill&IntranetCSRUser=' + username;
      // this.url_duplicatepolicy = csrpolicyredirect + 'duplicatepolicy&IntranetCSRUser=' + username;
      this.url_duplicatebill='duplicatebill';
      this.url_duplicatepolicy='duplicatepolicy';
    }
  }

  //Get Rate history
  getRateHistory() {
    this.ngxService.start();
    this.rowRatesHistory_onPopUp = [];
    let url = AppConstants.SERVICE_URL + "PolicyInformation/GetRatesHistory?PolicyNo=" + this.PolicyNo_Enc;
    this._data.GetService(url).subscribe((rateHistory: any) => {
      if(rateHistory != null)
        this.bind_RateHistory(rateHistory["RatesHistory"]);
      else
      {
        this.rateHistoryGridSize = "gridMinSize";
        this.ngxService.stop();
      }
    });
  }
  //Bind - Rate history
  bind_RateHistory(objRates: any) {
    if (this.isNotNull(objRates)) {
      this.rateHistoryGridSize = "gridMaxSizeten";
      this.rowRatesHistory_onPopUp = objRates;
    }
    else{
      this.rateHistoryGridSize = "gridMinSize";
    }
    this.ngxService.stop();
  }

  //Bind Premium Information Grid
  GetPremiumInfo() {
    this.ngxService.start();
    this.rowPremiumInfo = [];
    let url = AppConstants.SERVICE_URL + "PolicyInformation/GetPremiumInfo?PolicyNo=" + this.PolicyNo_Enc;
    this._data.GetService(url).subscribe((premiumInfo: any) => {
      this.bind_PremiumInfo(premiumInfo)
    });
  }
  //Bind - Premium Information
  bind_PremiumInfo(premiumInfo: any) {
    if (this.isNotNull(premiumInfo)) {
      for (var i in premiumInfo) {
        if (this.isNotNull(premiumInfo[i].premiumamt)) {
          let amount = Number(premiumInfo[i].premiumamt).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
          if (amount.charAt(0) == '-') {
            amount = '(' + amount.substring(1, amount.length) + ')';
          }
          premiumInfo[i].premiumamt = amount;
        }
        else
          premiumInfo[i].premiumamt = '$0.00';
        //premiumInfo[i].premiumamt = this.isNotNull(premiumInfo[i].premiumamt) ? '$' + Number(premiumInfo[i].premiumamt).toLocaleString() : '$0.00';
        premiumInfo[i].datereceived = this.isNotNull(premiumInfo[i].datereceived) ? formatDate(premiumInfo[i].datereceived, 'MM/dd/yyyy', 'en') : '';
      }
      this.totalperiod = this.isNotNull(premiumInfo[0].totalperiod) ? premiumInfo[0].totalperiod : 'hideMe';
      this.totalpremium = this.isNotNull(premiumInfo[0].totalpremium) ? premiumInfo[0].totalpremium : (premiumInfo[0].totalpremium == 0 ? premiumInfo[0].totalpremium : 'hideMe');
      this.totalfees = this.isNotNull(premiumInfo[0].totalfees) ? premiumInfo[0].totalfees : (premiumInfo[0].totalfees == 0 ? premiumInfo[0].totalfees : 'hideMe');
      this.premInfoGridSize = "gridMaxSize";
      this.rowPremiumInfo = premiumInfo;
      this.GetPendingBalance();
    }
    else {
      this.premInfoGridSize = "gridMinSize";
      // lblTotalsFor.Visible = false;
      // lblPremium.Visible = false;
      // lblFees.Visible = false;
    }
    this.getRowHeightPremiumInfo = function (params) {
      return 28 * (Math.floor(params.data.paytype.trim().length / 166) + 1);
    };
    //this.ngxService.stop();
  }

  //Get Pending balance details
  GetPendingBalance() {
    let url = AppConstants.SERVICE_URL + "PolicyInformation/GetPendingBalance?PolicyNo=" + this.PolicyNo_Enc;
    this._data.GetService(url).subscribe((obj: any) => {
      this.bind_PendingBal(obj)
    });
  }

  bind_PendingBal(obj: any) {
    this.dsPendingBalance = obj;
    if (this.dsPendingBalance != null) {
      // Balance Due Letter
      if (this.dsPendingBalance.Table[0]["letter_templateid"].toString().trim() == "1") {
        if (this.dsPendingBalance.Table.length > 0 && this.dsPendingBalance.Table[0]["customletterid"] != null && Number(this.dsPendingBalance.Table[0]["customletterid"]) > 0)
          this.trBalanceDueManual = true;
        else
          this.trBalanceDue = true;
        this.trMissingInfo = false;
        this.trQuestionableWages = false;

        //         gvBalanceDue.DataSource = null;
        for (var i in this.dsPendingBalance.Table) {
          this.dsPendingBalance.Table[i]["periodf"] = this.isNotNull(this.dsPendingBalance.Table[i]["periodf"]) ? formatDate(this.dsPendingBalance.Table[i]["periodf"], 'MM/dd/yyyy', 'en') : '';
          this.dsPendingBalance.Table[i]["periodt"] = this.isNotNull(this.dsPendingBalance.Table[i]["periodt"]) ? formatDate(this.dsPendingBalance.Table[i]["periodt"], 'MM/dd/yyyy', 'en') : '';
        }

        this.gvBalanceDue = this.dsPendingBalance.Table;
        //         gvBalanceDue.DataBind();

        //here add code for column total sum and show in footer   
        this.total_inBalDueGrid = "0";

        //total = this.dsPendingBalance.Table.AsEnumerable().Sum(x => Number(x.balanceamount));
        this.total_inBalDueGrid = obj.Table.map(t => t.balanceamount).reduce((a, value) => a + value, 0);
        this.lbtnBalanceDue = Number(this.total_inBalDueGrid).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

        //         string VTUrl = string.Empty;

        if (this.PolicyStatus_static == "ACTIVE") {
          this.VTUrl = AppConstants.UserEpayURL + "/DBLReconciliation/onlinepaymentvalidation.aspx?pno=" + this.PolicyNo_Enc + "&zip=" + this.common.encrypt(this.PolicyZip) + "&payprocess=QkFMQU5DRURVRQ==";
        }
        else {
          this.VTUrl = AppConstants.IntranetPortalURL + "/onlinepaymentvt/webforms/vtpolicysearch.aspx";
        }
      }
      // Questionable Wages Letter
      else if (this.dsPendingBalance.Table[0]["letter_templateid"].toString().trim() == "3") {
        var sbReasons = new StringBuilder('');
        let isFirstRow: Boolean = true;
        for (var cn in this.dsPendingBalance.Table) {
          if (this.isNotNull(this.dsPendingBalance.Table[0]["letter_exceptioncode"])) {
            if (!isFirstRow)
              sbReasons.Append("<br />");
            let perf = this.isNotNull(this.dsPendingBalance.Table[cn]["periodf"]) ? formatDate(this.dsPendingBalance.Table[cn]["periodf"], 'MM/dd/yyyy', 'en') : '';
            let perd = this.isNotNull(this.dsPendingBalance.Table[cn]["periodt"]) ? formatDate(this.dsPendingBalance.Table[cn]["periodt"], 'MM/dd/yyyy', 'en') : '';
            sbReasons.Append("<p style='font-size:13px; font-weight:bold;'>Coverage Period: " + perf + "-" + perd + "</p>");

            let reasons = [];
            reasons = (this.dsPendingBalance.Table[cn]["letter_exceptioncode"]).toString().trim().split(',');

            let iCount = 1;
            if (this.dtReasons == undefined)
              setTimeout(function () { }, 1000);
            for (var sReason in reasons) {
              var query = this.dtReasons.filter(dr1 => dr1.letter_exceptioncode == reasons[sReason]);
              //.Select(dr1 => dr1.field[("letter_exceptiondesc")]);

              if (query.length > 0) {
                sbReasons.Append(iCount + ". ");
                sbReasons.Append(query[0].letter_exceptiondesc);
                sbReasons.Append("<br />");
              }
              iCount++;
            }
          }
          isFirstRow = false;
        }
        if (sbReasons.Values.length > 0) {
          this.trQuestionableWages = true;
          this.trBalanceDue = false;
          this.trBalanceDueManual = false;
          this.trMissingInfo = false;
          this.lblQuestionableWagesReasons = sbReasons.ToString();
        }
      }
      // Missing Information Letter
      else {
        var sbReasons = new StringBuilder('');
        let isFirstRow: Boolean = true;
        for (var cn in this.dsPendingBalance.Table) {

          if (this.isNotNull(this.dsPendingBalance.Table[0]["letter_exceptioncode"])) {
            if (!isFirstRow)
              sbReasons.Append("<br />");
            let perf = this.isNotNull(this.dsPendingBalance.Table[cn]["periodf"]) ? formatDate(this.dsPendingBalance.Table[cn]["periodf"], 'MM/dd/yyyy', 'en') : '';
            let perd = this.isNotNull(this.dsPendingBalance.Table[cn]["periodt"]) ? formatDate(this.dsPendingBalance.Table[cn]["periodt"], 'MM/dd/yyyy', 'en') : '';

            sbReasons.Append("<p style='font-size:13px; font-weight:bold;'>Coverage Period: " + perf + "-" + perd + "</p>");
            let reasons = [];
            reasons = (this.dsPendingBalance.Table[cn]["letter_exceptioncode"]).toString().trim().split(',');

            let iCount = 1;
            if (this.dtReasons == undefined)
              setTimeout(function () { }, 1000);
            for (var sReason in reasons) {

              var query = this.dtReasons.filter(dr1 => dr1.letter_exceptioncode == reasons[sReason]);

              if (query.length > 0) {
                sbReasons.Append(iCount + ". ");
                sbReasons.Append(query[0].letter_exceptiondesc);
                sbReasons.Append("<br />");
              }
              iCount++;
            }
          }
          isFirstRow = false;
        }
        if (sbReasons.Values.length > 0) {
          this.trMissingInfo = true;
          this.trBalanceDue = false;
          this.trBalanceDueManual = false;
          this.trQuestionableWages = false;
          this.lblMissingInfoReasons = sbReasons.ToString();
        }
      }
    }
  }

  //Bind Policy Notes Grid
  GetPolicyNotes() {
    this.ngxService.start();
    this.rowPolicyNotes = [];
    let url = AppConstants.SERVICE_URL + "Employer/GetPolicyNotes?PolicyNumber=" + this.PolicyNo_Enc;
    this._data.GetService(url).subscribe((policyNotes: any) => {
      this.bind_PolicyNotes(policyNotes)
    });
  }
  //Bind - Policy Notes
  bind_PolicyNotes(policyNotes: any) {
    this.rowPolicyNotes = policyNotes;
    if (this.isNotNull(policyNotes)) {
      this.policyNotesGridSize = "gridMaxSize";
      // this.getRowHeightPolicyNotes = function (params) {
      //   return 28 * (Math.floor(params.data.notes.trim().length / 166) + 1);
      // };
    }
    else
      this.policyNotesGridSize = "gridMinSize";
    //this.ngxService.stop();
  }

  checkComment() {
    if (this.txtNewNote == '')
      this.error = true;
    else
      document.getElementById("SaveNotes").click();
  }

  //Insert Policy Note
  callAddNewNote(NewNote: string) {
    if (this.isNotNull(NewNote)) {
      NewNote = NewNote.replace(/[•\t+]/g, '');
      this.error = false;
      this.ngxService.start();
      let polValue = this.PolicyNo_Dec;
      polValue = polValue.replace(/\D/g, '');
      let url = AppConstants.SERVICE_URL + "Employer/InsertPolicyNotes?PolicyNumber=" + this.PolicyNo_Enc + "&Userid=" + this.common.encrypt(sessionStorage.getItem('id_CSR')) + "&Note=" + this.common.encrypt(NewNote) + "&PolicynoValue=" + this.common.encrypt(polValue);
      this._data.GetService(url).subscribe(obj => {
        this.bindAfterInsert(obj);
      });
    }
    else
      this.error = true;
  }
  //Bind - policy notes again after insertion
  bindAfterInsert(iReturn: any) {
    new Promise(() => this.GetPolicyNotes()).then(() => this.ngxService.stop());
    document.getElementById("btnCloseAddNew").click();
    this.ngxService.stop();

  }
  // decrease the count while typing
  onKeyUp(boxInput: HTMLInputElement) {
    if (this.txtNewNote == '')
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

  //Reset Policy Notes Popup
  ResetPolicyNotesPopup() {
    this.error = false;
    this.varlength = '255';
    this.txtNewNote = "";
  }

  //#region "Form Received"
  getFromRecieved() {
    let url = AppConstants.SERVICE_URL + "PolicyInformation/FormsReceived?PolicyNumber=" + this.PolicyNo_Enc;
    this._data.GetService(url).subscribe(obj => {
      this.bindFromRecieved(obj);
    });
  }

  bindFromRecieved(obj: any) {
    this.rowFromRecieved = [];
    if (obj != null) {
      this.rowFromRecieved = obj;
      this.FormsGridSize = "gridMaxSize";
    }
    else
    this.FormsGridSize = "gridMinSize";
  }

  DownloadFile(filename: string){
    let url = AppConstants.SERVICE_URL + "Common/DownloadFile?filename=" + filename;
    this._data.GetService(url).subscribe(obj => {
    });
  }
  //#endregion

  //#region Bind - Additional Coverage Details
  showAdditionalCoverageDetails() {
    this.ngxService.start();
    if (this.PolicyNo_Enc != "") {
      let url = AppConstants.SERVICE_URL + "PolicyInformation/GetAdditionCoverageDetails?PolicyNo=" + this.PolicyNo_Enc;
      const promise = this._data.GetService(url).toPromise();
      promise.then((obj) => {
        obj['AdditionalLocation']
        this.bindLocationInfo(obj);
      }).catch((error) => {
        console.log("Promise rejected with " + JSON.stringify(error));
      });
    }
  }
  //Bind - Location Information 
  bindLocationInfo(obj: any) {
    //console.log(obj);

    //#region Locations / Insured
    if (obj["AdditionalLocation"].length > 0) {
      this.locationInsuredGridSize = 'gridMaxSize';
      this.rowLocationInsured_onPopUp = obj["AdditionalLocation"];
    }
    else
      this.locationInsuredGridSize = 'gridMinSizeLocaIns';

    //#endregion

    //#region Linked Products
    if (obj["LinkedProducts"].length > 0) {
      for (var product in obj["LinkedProducts"]) {
        obj["LinkedProducts"][product].linkfrom = this.isNotNull(obj["LinkedProducts"][product].linkfrom) ? formatDate(obj["LinkedProducts"][product].linkfrom, 'MM/dd/yyyy', 'en') : '';
        obj["LinkedProducts"][product].linkthru = this.isNotNull(obj["LinkedProducts"][product].linkthru) ? formatDate(obj["LinkedProducts"][product].linkthru, 'MM/dd/yyyy', 'en') : '';
      }
      this.rowLinkedProducts_onPopUp = obj["LinkedProducts"];
      this.varLinkedProducts = '';
    }
    else
      this.varLinkedProducts = 'hideMe';
    //#endregion

    //#region Proprietors
    if (obj["Proprietor"].length > 0) {
      this.rowProprietorPartner_onPopUp = obj["Proprietor"];
      this.varProprietorPartner = "";
    }
    else
      this.varProprietorPartner = "hideMe";
    //#endregion

    //#region Out of State
    if (obj["OutOfStateCoverage"].length > 0) {
      this.variNonStat = true;

      for (var i = 0; i < obj["OutOfStateCoverage"].length; i++) {
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
      this.varOutOfStateCoverage = "hideMe";
    //#endregion

    //#region Voluntary Coverage
    if (obj["VoluntaryCoverage"].length > 0)
      this.varVoluntaryCoverage = obj["VoluntaryCoverage"][0].group_name;
    else
      this.varVoluntaryCoverage = "hideMe";
    //#endregion

    //#region Exclusions
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
        if (obj["Exclusions"][0]["printflag"] == "N" && obj["Exclusions"][0]["printflag"] != "") {
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
      this.varExclusionsCoverage = "hideMe";
    }
    //#endregion

    this.ngxService.stop();
  }
  //#endregion

  //#region "Add Bill Mode Request"
  AddBillModeChangeRequest() {
    this.ngxService.start();
    try {
      if (this.isNotNull(this.PolicyNo_Dec)) {
        this.CheckExistingBillModeChgRequest();
      }
    }
    catch (Error) {
      console.log(console.error());
    }
    finally {
    }
  }

  //Check Existing Bill Mode Change Request
  CheckExistingBillModeChgRequest() {
    let url = AppConstants.SERVICE_URL + "PolicyInformation/CheckExistingBillModeChgRequest?PolicyNumber=" + this.PolicyNo_Enc;
    this._data.GetService(url).subscribe(obj => {
      this.bindBillModeChgRequest(obj);
    });
  }
  bindBillModeChgRequest(obj: any) {
    //#region  Status
    console.log(obj);
    let isValid = true;
    let arrPolStatus = [];
    arrPolStatus = this.fullPolicyStatus.trim().split(':');
    let PolicyStatus = '';
    if (arrPolStatus.length > 1) {
      PolicyStatus = arrPolStatus[1];
      if (this.isNotNull(PolicyStatus)) {
        let dtTerm = new Date(PolicyStatus);
        if (new Date(dtTerm.setDate(dtTerm.getDate() + 30)) >= new Date()) {
          PolicyStatus = "ACTIVE";
        }
        else
          PolicyStatus = "TERMINATED";
        this.PolicyStatus_static = PolicyStatus;
      }
    }
    else
      PolicyStatus = this.fullPolicyStatus.trim();
    //#endregion

    //Check The Existing Requst
    if (obj != null && obj.length > 0 && obj[0].RequestStatus != null && (this.isNotNull(this.billmode) && this.billmode.trim().toUpperCase() == "ANNUAL") && this.isNotNull(this.fullPolicyStatus) && PolicyStatus.trim() == "ACTIVE") {
      isValid = false;
      this.ManageBillModePopup(1, obj);
    }
    else {
      if (this.isNotNull(this.billmode) && this.isNotNull(this.fullPolicyStatus) && (this.billmode.trim().toUpperCase() != "ANNUAL" && PolicyStatus.trim() != "ACTIVE")) {
        this.BillModeWrng_lblBillMode = false;
        this.BillModeWrng_lblPolicyStatus = false;
        this.BillModeWrng_lblInActiveNotAnnual = true;
        isValid = false;
      }
      else {
        //Check Bill Mode
        if (this.isNotNull(this.billmode) && this.billmode.trim().toUpperCase() != "ANNUAL") {
          this.BillModeWrng_lblBillMode = true;
          isValid = false;
          this.BillModeWrng_lblInActiveNotAnnual = false;
        }
        else {
          this.BillModeWrng_lblBillMode = false;
          this.BillModeWrng_lblInActiveNotAnnual = false;
        }
        //Check Policy Status Active/inactive
        if (this.isNotNull(this.fullPolicyStatus) && PolicyStatus.trim() != "ACTIVE") {
          this.BillModeWrng_lblPolicyStatus = true;
          isValid = false;
          this.BillModeWrng_lblInActiveNotAnnual = false;
        }
        else {
          this.BillModeWrng_lblPolicyStatus = false;
          this.BillModeWrng_lblInActiveNotAnnual = false;
        }
      }

      if (!isValid && (obj != null && obj.length > 0 && obj[0].RequestStatus != null && (this.isNotNull(this.billmode) && this.billmode.trim().toUpperCase() == "ANNUAL") && this.isNotNull(this.fullPolicyStatus) && PolicyStatus.trim() == "ACTIVE")) {
        this.ManageBillModePopup(1, obj);
      }
      else if (!isValid && (obj == null || obj.length == 0)) {
        this.ManageBillModePopup(0, obj);
      }
      else {
        //Redirect to Add bill mode request change page
        //SPIntranetPortalURL
        let url = AppConstants.IntranetPortalURL + "/billmodechange/webforms/addbillmodechangerequest.aspx?pno=" + this.PolicyNo_Enc;
        window.open(url);
      }
    }

    this.ngxService.stop();
  }

  ManageBillModePopup(isExistRequest: number, lstBillModeReq: any) {
    try {
      if (isExistRequest == 0) {
        this.pnlAddBillModeWarning = true;
        this.pnlAddBillModeExistingRequest = false;
      }
      else if (isExistRequest == 1) {
        this.pnlAddBillModeWarning = false;
        this.pnlAddBillModeExistingRequest = true;
        //#region "Populate Existing Request"
        if (lstBillModeReq != null && lstBillModeReq.length > 0) {
          this.ReqExist_TxtRequestDt = this.isNotNull(lstBillModeReq[0].RequestDate) ? formatDate(lstBillModeReq[0].RequestDate, 'MM/dd/yyyy', 'en') : '';

          if (lstBillModeReq[0].RequestStatus != null)
            this.ReqExist_DdlReqStatus = lstBillModeReq[0].RequestStatus;
          // if (ReqExist_DdlReqStatus.Items.FindByValue(lstBillModeReq[0].RequestStatus) != null)
          //     ReqExist_DdlReqStatus.SelectedValue = Convert.ToString(lstBillModeReq[0].RequestStatus);

          this.ReqExist_TxtRequestNo = lstBillModeReq[0].RequestNo;

          this.ddlRequestAssgnTo = lstBillModeReq[0].AssignToUserId;
          // if (ReqExist_DdlRequestAssgnTo.Items.FindByValue(Convert.ToString(lstBillModeReq[0].AssignToID)) != null)
          //     ReqExist_DdlRequestAssgnTo.SelectedValue = Convert.ToString(lstBillModeReq[0].AssignToUserId);

          this.ReqExist_TxtRequestCmnt = lstBillModeReq[0].Comment;
        }
        //#endregion
      }
      // mpeBillModeContainer.Show();
      document.getElementById("openBillModeChangeRequest").click();
    }
    catch (Error) {
      console.log(console.error());
    }
    finally {
    }
  }

  //Bind Coverage type to the member information grid
  coverageType(_empno: string, _gender: string, _depqty: string) {
    let coverageType = "";
    if (this.dtEnrollList != null && this.dtEnrollList.length > 0) {
      let flagMale = false;
      let flagFemale = false;
      let flagChild = false;
      let empno = this.isNotNull(_empno) ? _empno : '';
      let gender = this.isNotNull(_gender) ? _gender.toUpperCase() : '';
      let DEPQTY = this.isNotNull(_depqty) ? Number(_depqty) : 0;

      var drResult = this.dtEnrollList.filter(x => x.EMPNO == empno && x.DEPNO > 0 && x.SPOUSE == 'T');

      if ((gender == "M") || (DEPQTY >= 1 && drResult != null && drResult.length > 0))
        flagMale = true;

      if (gender == "F" || (DEPQTY >= 1 && drResult != null && drResult.length > 0))
        flagFemale = true;

      drResult = this.dtEnrollList.filter(x => x.EMPNO == empno && x.DEPNO > 0 && x.CHILDREN == 'T');

      if (drResult != null && drResult.length > 0)
        flagChild = true;

      if (flagMale && flagFemale && flagChild)
        coverageType = "Family";
      else if (flagMale && flagFemale)
        coverageType = "EE & Partner";
      else if ((flagMale || flagFemale) && flagChild)
        coverageType = "EE & Child";
      else
        coverageType = "EE";
    }
    return coverageType;
  }

  //MEMBER INFORMATION GRID
  GetEnrollments(flagreload: boolean, flagUpdateActive: boolean, flagUpdateInactive: boolean) {
    try {
      if (this.dtEnrollList == null || flagreload == true) {
        let url = AppConstants.SERVICE_URL + "PolicyInformation/GetEnrollments?PolicyNo=" + this.PolicyNo_Enc;
        this._data.GetService(url).subscribe(obj => this.Bind_Enrollments(flagreload, flagUpdateActive, flagUpdateInactive, obj));
      }
    }
    catch (Exception) {
    }
  }
  Bind_Enrollments(flagreload: boolean, flagUpdateActive: boolean, flagUpdateInactive: boolean, dtEnrollList: any) {

    //If no records found then hide the member information section
    if (dtEnrollList == null || dtEnrollList.length == 0) {
      this.MemberInformationSection = false;
    }
    else if (dtEnrollList != null && dtEnrollList.length > 0) {

      //Adding extra key and values to the array
      dtEnrollList = dtEnrollList.map(v => ({ ...v, GROUP: "" }));
      dtEnrollList = dtEnrollList.map(v => ({ ...v, ARROW: false }));
      dtEnrollList = dtEnrollList.map(v => ({ ...v, TYPO: "single" }));

      this.dtEnrollList = dtEnrollList;

      //Bind Head-Counts Employees/Dependents/Waiting Period for Active members 
      if (flagUpdateActive) {
        var dvEmployeeActive;
        var dvDependentActive;
        dvEmployeeActive = this.dtEnrollList.filter(x => x.DEPNO == 0 && new Date(x.SNAPTHRUDT) >= new Date() && x.ACTIVE == 'T');
        dvDependentActive = this.dtEnrollList.filter(x => x.DEPNO > 0 && new Date(x.SNAPTHRUDT) >= new Date() && x.ACTIVE == 'T');

        this.memberGridSize = '';
        if (dvEmployeeActive.length > 0) {
          this.errorActive = false;
          this.memberGridSize = "memberMaxSize";
        }
        else {
          this.errorActive = true;
          this.memberGridSize = "memberMinSize";
        }
        this.lblActiveEmployeesCount = dvEmployeeActive.length;
        this.lblActiveDependentsCount = dvDependentActive.length;
        if (dvEmployeeActive.length > 0 || dvDependentActive.length > 0) {
          this.lblActiveWaitingPeriod = this.dtEnrollList[0]["WAITPRD"];
        }
        else {
          this.lblActiveWaitingPeriod = "0";
        }
      }

      //Bind Head-Counts Employees/Dependents/Waiting Period for Inactive members
      if (flagUpdateInactive) {
        var dvEmployeeInactive;
        var dvDependentInactive;
        var dvEmployeeInactive = this.dtEnrollList.filter(x => x.DEPNO == 0 && (new Date(x.SNAPFROMDT) > new Date() || new Date(x.SNAPTHRUDT) < new Date() || x.ACTIVE == 'F'));
        var dvDependentInactive = this.dtEnrollList.filter(x => x.DEPNO > 0 && (new Date(x.SNAPFROMDT) > new Date() || new Date(x.SNAPTHRUDT) < new Date() || x.ACTIVE == 'F'));

        if (dvEmployeeInactive.length > 0) {
          if (this.memberGridSize == '' || this.memberGridSize == 'memberMinSize')
            this.memberGridSize = 'memberMazSize';
          this.errorInactive = false;
        }
        else {
          this.errorInactive = true;
        }

        this.lblInactiveEmployeesCount = dvEmployeeInactive.length;
        this.lblInactiveDependentsCount = dvDependentInactive.length;
        if (dvEmployeeInactive.length > 0 || dvDependentInactive.length > 0) {
          this.lblInactiveWaitingPeriod = this.dtEnrollList[0]["WAITPRD"];
        }
        else {
          this.lblInactiveWaitingPeriod = "0";
        }
      }

      //Bind data to the grid
      this.BindDependents(flagUpdateActive, flagUpdateInactive);
    }
  }

  //Bind child to the parent record
  dependents(EMPNO) {
    var dependents = this.dtEnrollList.filter(x => x.EMPNO == EMPNO && x.DEPNO != 0);
    return dependents;
  }

  //Bind member information grid
  BindDependents(flagUpdateActive: boolean, flagUpdateInactive: boolean) {
    if (this.dtEnrollList != null && this.dtEnrollList.length > 0) {

      //#region "Active members and dependents"
      if (flagUpdateActive) {
        var dvEmployeeActive = this.dtEnrollList.filter(x => x.ACTIVE == 'T');
        for (var items in dvEmployeeActive) {
          var dvTotalSameEMPNO = dvEmployeeActive.filter(x => x.EMPNO == dvEmployeeActive[items].EMPNO)
          //console.log(dvEmployeeActive[items].LASTNAME + ", " + dvEmployeeActive[items].FIRSTNAME + ", " + dvEmployeeActive[items].EMPNO);
          if (dvTotalSameEMPNO.length > 1) {
            var dvIsDependent = dvTotalSameEMPNO.filter(x => x.DEPNO > 0);
            var dvParentCount = dvTotalSameEMPNO.filter(x => x.TYPE == 'parent');

            if (dvIsDependent.length > 0 && dvParentCount.length == 0 && dvEmployeeActive[items].DEPNO == 0) {
              dvEmployeeActive[items].TYPO = 'parent';
              dvEmployeeActive[items].ARROW = true;
              //console.log(dvEmployeeActive[items].LASTNAME + ", " + dvEmployeeActive[items].FIRSTNAME);
            }
            else {

              dvEmployeeActive[items].TYPO = 'child';
            }
          }
        }

        var dvEmployee_Active = dvEmployeeActive.filter(x => x.DEPNO == 0 && new Date(x.SNAPTHRUDT) >= new Date() && x.ACTIVE == 'T');
        var dvDependent_Active = dvEmployeeActive.filter(x => x.DEPNO > 0 && new Date(x.SNAPTHRUDT) >= new Date() && x.ACTIVE == 'T');

        for (var i in dvEmployee_Active) {
          dvEmployee_Active[i].SNAPFROMDT = this.isNotNull(dvEmployee_Active[i].SNAPFROMDT) ? formatDate(dvEmployee_Active[i].SNAPFROMDT, 'MM/dd/yyyy', 'en') : '';
          dvEmployee_Active[i].SNAPTHRUDT = this.isNotNull(dvEmployee_Active[i].SNAPTHRUDT) ? formatDate(dvEmployee_Active[i].SNAPTHRUDT, 'MM/dd/yyyy', 'en') != '12/31/2999' ? formatDate(dvEmployee_Active[i].SNAPTHRUDT, 'MM/dd/yyyy', 'en') : '' : '';
          dvEmployee_Active[i].GROUP = this.coverageType(dvEmployee_Active[i].EMPNO, dvEmployee_Active[i].GENDER, dvEmployee_Active[i].DEPQTY);
        }
        for (var i in dvDependent_Active) {
          dvDependent_Active[i].SNAPFROMDT = this.isNotNull(dvDependent_Active[i].SNAPFROMDT) ? formatDate(dvDependent_Active[i].SNAPFROMDT, 'MM/dd/yyyy', 'en') : '';
          dvDependent_Active[i].SNAPTHRUDT = this.isNotNull(dvDependent_Active[i].SNAPTHRUDT) ? formatDate(dvDependent_Active[i].SNAPTHRUDT, 'MM/dd/yyyy', 'en') != '12/31/2999' ? formatDate(dvDependent_Active[i].SNAPTHRUDT, 'MM/dd/yyyy', 'en') : '' : '';
        }
        this.RptActiveEnrollList = dvEmployee_Active;
        this.dessertsActive = dvEmployee_Active;
        this.RptActiveDependent = dvDependent_Active;
      }
      //#endregion 

      //#region "Inactive members and dependents"
      if (flagUpdateInactive) {
        var dvEmployeeInactive = this.dtEnrollList.filter(x => new Date(x.SNAPFROMDT) > new Date() || new Date(x.SNAPTHRUDT) < new Date() || x.ACTIVE == 'F');
        for (var items in dvEmployeeInactive) {
          var dvTotalSameEMPNO = dvEmployeeInactive.filter(x => x.EMPNO == dvEmployeeInactive[items].EMPNO)

          if (dvTotalSameEMPNO.length > 0) {
            var dvIsDependent = dvTotalSameEMPNO.filter(x => x.DEPNO > 0)
            // var dvIsParent = dvTotalSameEMPNO.filter(x => x.DEPNO == 0)
            var dvParentCount = dvTotalSameEMPNO.filter(x => x.TYPE == 'parent');
            if (dvIsDependent.length > 0 && dvParentCount.length == 0 && dvEmployeeInactive[items].DEPNO == 0) {
              dvEmployeeInactive[items].TYPO = 'parent';
              dvEmployeeInactive[items].ARROW = true;
              //console.log(dvEmployeeInactive[items].LASTNAME + ", " + dvEmployeeInactive[items].FIRSTNAME);
            }
            else
              dvEmployeeInactive[items].TYPO = 'child';
          }
        }
        var dvEmployee_Inactive = dvEmployeeInactive.filter(x => x.DEPNO == 0 && (new Date(x.SNAPFROMDT) > new Date() || new Date(x.SNAPTHRUDT) < new Date() || x.ACTIVE == 'F'));
        var dvDependent_Inactive = dvEmployeeInactive.filter(x => x.DEPNO > 0 && (new Date(x.SNAPFROMDT) > new Date() || new Date(x.SNAPTHRUDT) < new Date() || x.ACTIVE == 'F'));
        for (var i in dvEmployee_Inactive) {
          dvEmployee_Inactive[i].SNAPFROMDT = this.isNotNull(dvEmployee_Inactive[i].SNAPFROMDT) ? formatDate(dvEmployee_Inactive[i].SNAPFROMDT, 'MM/dd/yyyy', 'en') : '';
          dvEmployee_Inactive[i].SNAPTHRUDT = this.isNotNull(dvEmployee_Inactive[i].SNAPTHRUDT) ? formatDate(dvEmployee_Inactive[i].SNAPTHRUDT, 'MM/dd/yyyy', 'en') != '12/31/2999' ? formatDate(dvEmployee_Inactive[i].SNAPTHRUDT, 'MM/dd/yyyy', 'en') : '' : '';
          dvEmployee_Inactive[i].GROUP = this.coverageType(dvEmployee_Inactive[i].EMPNO, dvEmployee_Inactive[i].GENDER, dvEmployee_Inactive[i].DEPQTY);
        }
        for (var i in dvDependent_Inactive) {
          dvDependent_Inactive[i].SNAPFROMDT = this.isNotNull(dvDependent_Inactive[i].SNAPFROMDT) ? formatDate(dvDependent_Inactive[i].SNAPFROMDT, 'MM/dd/yyyy', 'en') : '';
          dvDependent_Inactive[i].SNAPTHRUDT = this.isNotNull(dvDependent_Inactive[i].SNAPTHRUDT) ? formatDate(dvDependent_Inactive[i].SNAPTHRUDT, 'MM/dd/yyyy', 'en') != '12/31/2999' ? formatDate(dvDependent_Inactive[i].SNAPTHRUDT, 'MM/dd/yyyy', 'en') : '' : '';
        }
        this.RptInactiveEnrollList = dvEmployee_Inactive;
        this.dessertsInactive = dvEmployee_Inactive
;        this.RptInactiveDependent = dvDependent_Inactive;
      }
    }
    this.ngxService.stop();
  }

  lbtnRemovePFLRider_Click() {
    this.divPFLPolicyValidation = true;
    this.divPFLBalanceDueValidation = false;
    this.txtPolicyNumberToRemovePFLRider = '';
    this.lblErrorMsgToRemovePFLRider = '';
    this.removepflBorder = '';
  }

  SubmitToRemovePFLRider() {
    if (this.txtPolicyNumberToRemovePFLRider != '') {
      if (this.txtPolicyNumberToRemovePFLRider.toString().toUpperCase().trim() != this.PolicyNo_Dec.toString().toUpperCase().trim()) {
        this.lblErrorMsgToRemovePFLRider = "Entered policy number is incorrect.";
        this.divPFLPolicyValidation = true;
        this.divPFLBalanceDueValidation = false;
      }
      else{
      this.ngxService.start();
      let url = AppConstants.SERVICE_URL + "PolicyInformation/GetPendingBalanceForPFlPolicy?PolicyNumber=" + this.PolicyNo_Enc;
      this._data.GetService(url).subscribe(obj => {
        this.bind_SubmitToRemovePFLRider(obj);
      });
    }
    }
    else{
      this.removepflBorder = 'redBorder';
    }
  }

  bind_SubmitToRemovePFLRider(dPFLBalanceDue: any) {
    if (this.txtPolicyNumberToRemovePFLRider.toString().toUpperCase().trim() != this.PolicyNo_Dec.toString().toUpperCase().trim()) {
      this.lblErrorMsgToRemovePFLRider = "Entered policy number is incorrect.";
      this.divPFLPolicyValidation = true;
      this.divPFLBalanceDueValidation = false;
      this.ngxService.stop()
    }
    else if (dPFLBalanceDue > 0) {
      this.lblBalanceDueMessage = "This policy has a PFL balance due of " + "$" + Math.abs(dPFLBalanceDue) + ". Please pay the balance due now or continue with cancellation and collect the balance due at a later date.";
      this.divPFLPolicyValidation = false;
      this.divPFLBalanceDueValidation = true;
      this.ngxService.stop()
    }
    else {
      this.RemovePFLRider();
      document.getElementById("closeRemovePfl").click();
    }
  }

  // Remove PFL Rider
  RemovePFLRider() {
    if (this.txtPolicyNumberToRemovePFLRider.toString() != '') {
      let pno = this.txtPolicyNumberToRemovePFLRider.toString().toUpperCase().trim();
      let url = AppConstants.SERVICE_URL + "PolicyInformation/RemovePFLRider?PolicyNo=" + this.common.encrypt(pno) + "&UserId=" + this.common.encrypt(this.UserName) + "&Comment=" + this.common.encrypt("Remove PFL Rider");
      this._data.GetService(url).subscribe(obj => {
        this.bind = false; this.GetInformation();
      });
    }
  }

  //When user click on pay balance due button then we redirect user to VT payment system.
  PayBalanceDue() {
    let url = AppConstants.IntranetPortalURL + "/onlinepaymentvt/webforms/vtpolicysearch.aspx";
    window.open(url, '_blank');
  }

  //When user click on this button then we remove the PFL rider from tables.
  ContinueandCancelPFLPolicy() {
    this.RemovePFLRider();
    document.getElementById("closeRemovePfl").click();
  }
  //#endregion

  //Return back to the search via button
  returnSearch() {
    let url = '/policyinfosearch?p=return';
    this.router.navigateByUrl(url);
  }

  //#region "Grid Events"
  onGridReady_Popup(evt) {
    evt.api.setDomLayout("autoHeight");
    evt.api.sizeColumnsToFit();
    evt.api.paginationSetPageSize(Number(10));
  }

  onGridReady_Global(evt) {
    this.gridApi_Global = evt.api;
    evt.api.sizeColumnsToFit();
  }
  //#endregion

  //switch Active or Inactive tab under Member Information section
  shiftToActiveInactive(id) {
    if (id == 1) {
      this.active = 'active';
      this.inactive = '';
      this.pnlActiveMember = true;
      this.pnlInactiveMember = false;
    }
    else if (id == 2) {
      this.active = '';
      this.inactive = 'active'
      this.pnlActiveMember = false;
      this.pnlInactiveMember = true;
    }
  }

  //Arrow functionality under Member Information section
  arrowButtonClick(emp_no) {
    if ($("#" + emp_no + "_button").hasClass('arrowButtonUp')) {
      $("#" + emp_no + "_button").removeClass('arrowButtonUp');
      $("." + emp_no).hide();
    }
    else {
      $("#" + emp_no + "_button").addClass('arrowButtonUp');
      $("." + emp_no).show();
    }
  }

  //Sorting on ACTIVE Member Information Grid
  sortData_Active(sort: Sort) {
    const data = this.dessertsActive.slice();
    if (!sort.active || sort.direction === '') {
      this.RptActiveEnrollList = data;
      return;
    }

    this.RptActiveEnrollList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'LASTNAME': return compare(a.LASTNAME + ", " + a.FIRSTNAME, b.LASTNAME + ", " + b.FIRSTNAME, isAsc);
        case 'SNAPFROMDT': return compare(a.SNAPFROMDT, b.SNAPFROMDT, isAsc);
        default: return 0;
      }
    });
    
  }

  //Sorting on INACTIVE Member Information Grid
  sortData_Inactive(sort: Sort) {
    const data = this.dessertsInactive.slice();
    if (!sort.active || sort.direction === '') {
      this.RptInactiveEnrollList = data;
      return;
    }

    this.RptInactiveEnrollList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'LASTNAME': return compare(a.LASTNAME + ", " + a.FIRSTNAME, b.LASTNAME + ", " + b.FIRSTNAME, isAsc);
        case 'SNAPFROMDT': return compare(a.SNAPFROMDT, b.SNAPFROMDT, isAsc);
        default: return 0;
      }
    });
    
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

// function percentCellRenderer(params) {
//   var value = params.value;
//   var eValue = document.createElement('a');
//   eValue

//   var eOuterDiv = document.createElement('div');
//   eOuterDiv.className = 'links';
//   eOuterDiv.appendChild(eValue);

//   return eOuterDiv;
// }