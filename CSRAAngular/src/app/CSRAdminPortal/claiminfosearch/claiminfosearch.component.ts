import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AppConstants } from 'src/app/app.constants';
import { DataService } from 'src/app/CSRAdminPortal/services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Common } from 'src/common';
import { DatePipe } from '@angular/common';
import { DatePickerComponent } from 'ng2-date-picker';
import { States } from 'src/app/models/claiminfo';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-claiminfosearch',
  templateUrl: './claiminfosearch.component.html',
  styleUrls: ['./claiminfosearch.component.scss'],
  providers: [DatePipe]
})

export class ClaiminfosearchComponent implements OnInit {

  //date = new FormControl(new Date());
  serializedDate = new FormControl('');
  
  Radiovalue: boolean = true;
  AllState: States[];
  StateDetail: any;
  StatesDetailFinal: Array<States> = [];
  error: boolean = false;
  errorForMainFields: boolean = false;
  selectedDate: string = '';
  pipe: string = this.common.encrypt("|");
  // dateConfig: any =
  //   {
  //     locale: 'en',
  //     format: 'MM/DD/YYYY',
  //     disableKeypress: true,
  //     showMultipleYearsNavigation: true,
  //     multipleYearsNavigateBy: 5
  //   }
  ddlState: string = '';
  model: any = {};
  ddlStatus: string = '';
  Claim: string = '';
  SocialSecurty: string = '';
  FirstName: string = '';
  LastName: string = '';
  Address: string = '';
  City: string = '';
  Check: string = '';
  DOB: string = '';
  Policy: string = '';
  PolicyName: string = '';
  public selectedMoiProfile: boolean = false;
  _isExactMatchChecked: boolean = true;
  dynamicBorder: string = '';
  p: string = '';//postback

  @ViewChild('dpcalCalls') dateCallsPicker: DatePickerComponent;
  @ViewChild('dpcalClaim') dateClaimPicker: DatePickerComponent;
  @ViewChild('dpcalPolicy') datePolicyPicker: DatePickerComponent;


  constructor(private router: Router, private _data: DataService, private ngxService: NgxUiLoaderService, private common: Common,
    public datepipe: DatePipe, private route: ActivatedRoute ) {
    //this.ngxService.start(); 
    this.p = this.route.snapshot.queryParams['p'];
    if (this.p == "return") {
      var Claim = this.isNotNull(sessionStorage.getItem("ssClaimNo")) ? sessionStorage.getItem("ssClaimNo") : '';
      var SocialSecurty = this.isNotNull(sessionStorage.getItem("ssSSN")) ? sessionStorage.getItem("ssSSN") : '';
      var FirstName = this.isNotNull(sessionStorage.getItem("ssFname")) ? sessionStorage.getItem("ssFname") : '';
      var LastName = this.isNotNull(sessionStorage.getItem("ssLname")) ? sessionStorage.getItem("ssLname") : '';
      var Address = this.isNotNull(sessionStorage.getItem("ssAdd")) ? sessionStorage.getItem("ssAdd") : '';
      var City = this.isNotNull(sessionStorage.getItem("ssCity")) ? sessionStorage.getItem("ssCity") : '';
      var ddlState = this.isNotNull(sessionStorage.getItem("ssState")) ? sessionStorage.getItem("ssState") : '';
      var Check = this.isNotNull(sessionStorage.getItem("ssCheck")) ? sessionStorage.getItem("ssCheck") : '';
      var ddlStatus = this.isNotNull(sessionStorage.getItem("ssStatus")) ? sessionStorage.getItem("ssStatus") : '';
      var selectedDate = this.isNotNull(sessionStorage.getItem("ssDOB")) ? sessionStorage.getItem("ssDOB") : '';
      var Policy = this.isNotNull(sessionStorage.getItem("ssPolicyNo")) ? sessionStorage.getItem("ssPolicyNo") : '';
      var PolicyName = this.isNotNull(sessionStorage.getItem("ssPolicyName")) ? sessionStorage.getItem("ssPolicyName") : '';
      var isExact = this.isNotNull(sessionStorage.getItem("ssIsExact")) ? sessionStorage.getItem("ssIsExact") : "true";

      if (Claim != '' || SocialSecurty != '' || FirstName != '' || LastName != '' || Address != ''
        || City != '' || ddlState != '' || Check != '' || ddlStatus != '' || selectedDate != ''
        || Policy != '' || PolicyName != '') {
        this.Claim = Claim;
        this.SocialSecurty = SocialSecurty;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Address = Address;
        this.City = City;
        //this.ddlState = '';
        this.Check = Check;
        switch(ddlStatus){
            case "": this.ddlStatus = "";break;
            case "0": this.ddlStatus = "0";break;
            case "1": this.ddlStatus = "1";break;
            case "I": this.ddlStatus = "I";break;
        }
        //this.ddlStatus = this.isNotNull(ddlStatus) ? ddlStatus : '';
        if(selectedDate != ''){
          var serializedDOB:Date = new Date(selectedDate);
          this.serializedDate = new FormControl(serializedDOB.toISOString());
        }
        else
        this.serializedDate = new FormControl('');
        this.Policy = Policy;
        this.PolicyName = PolicyName;
        this._isExactMatchChecked = isExact=="true" ? true : false;
        this.Radiovalue = this._isExactMatchChecked;
        this.getStates(ddlState);
      }
    }
  }

  ngOnInit() {
    this.getStates('first');
  }

  //Radio Button
  onRadioClick() {
    this.Radiovalue = !this.Radiovalue;
    if (this.Radiovalue) {
      this._isExactMatchChecked = true;
    }
    else {
      this._isExactMatchChecked = false;
    }
  }


  // //#region "Calendar Events"
  // dateSelection_Calendar(item, id) {
  //   let calendarDate = this.datepipe.transform(item, 'MM/dd/yyyy');
  // }

  dateOpen(id) {
    if (id == 1)
      this.dateCallsPicker.api.open();
  }
  // //#endregion

  getClaimInfoBySearch() {
    this.error = false;
    this.errorForMainFields = false;
    this.dynamicBorder = "";

    let Claim = this.isNotNull(this.Claim) ? this.common.encrypt(this.Claim.trim()) : '';
    let SocialSecurty = this.isNotNull(this.SocialSecurty) ? this.common.encrypt(this.SocialSecurty.trim()) : '';
    let FirstName = this.isNotNull(this.FirstName) ? this.common.encrypt(this.FirstName.trim()) : '';
    let LastName = this.isNotNull(this.LastName) ? this.common.encrypt(this.LastName.trim()) : '';
    let Address = this.isNotNull(this.Address) ? this.common.encrypt(this.Address.trim()) : '';
    let City = this.isNotNull(this.City) ? this.common.encrypt(this.City.trim()) : '';
    let State = this.isNotNull(this.ddlState) ? this.common.encrypt(this.ddlState.trim()) : '';
    let Check = this.isNotNull(this.Check) ? this.common.encrypt(this.Check.trim()) : '';
    let Status = this.isNotNull(this.ddlStatus) ? this.common.encrypt(this.ddlStatus.trim()) : '';
    let DOB = this.isNotNull(this.serializedDate.value) ? this.common.encrypt(this.datepipe.transform(this.serializedDate.value, 'MM/dd/yyyy')) : '';
    let Policy = this.isNotNull(this.Policy) ? this.common.encrypt(this.Policy.trim()) : '';
    let PolicyName = this.isNotNull(this.PolicyName) ? this.common.encrypt(this.PolicyName.trim()) : '';

    // let SocialSecurty = (this.SocialSecurty.trim() != '' && this.SocialSecurty != null) ? this.common.encrypt(this.SocialSecurty.trim()) : '';
    // let FirstName = (this.FirstName.trim() != '' && this.FirstName != null) ? this.common.encrypt(this.FirstName.trim()) : '';
    // let LastName = (this.LastName.trim() != '' && this.LastName != null) ? this.common.encrypt(this.LastName.trim()) : '';
    // let Address = (this.Address.trim() != '' && this.Address != null) ? this.common.encrypt(this.Address.trim()) : '';
    // let City = (this.City.trim() != '' && this.City != null) ? this.common.encrypt(this.City.trim()) : '';
    // let State = (this.ddlState.trim() != '' && this.ddlState != null) ? this.common.encrypt(this.ddlState.trim()) : '';
    // let Check = (this.Check.trim() != '' && this.Check != null) ? this.common.encrypt(this.Check.trim()) : '';
    // let Status = (this.ddlStatus.trim() != '' && this.ddlStatus != null) ? this.common.encrypt(this.ddlStatus.trim()) : '';
    // let DOB = (this.selectedDate != '' && this.selectedDate != null) ? this.common.encrypt(this.datepipe.transform(this.selectedDate, 'MM/dd/yyyy')) : '';
    // let Policy = (this.Policy.trim() != '' && this.Policy != null) ? this.common.encrypt(this.Policy.trim()) : '';
    // let PolicyName = (this.PolicyName.trim() != '' && this.PolicyName != null) ? this.common.encrypt(this.PolicyName.trim()) : '';

    sessionStorage.setItem("ssClaimNo", this.Claim);
    sessionStorage.setItem("ssSSN", this.SocialSecurty);
    sessionStorage.setItem("ssFname", this.FirstName);
    sessionStorage.setItem("ssLname", this.LastName);
    sessionStorage.setItem("ssAdd", this.Address);
    sessionStorage.setItem("ssCity", this.City);
    sessionStorage.setItem("ssState", this.ddlState);
    sessionStorage.setItem("ssCheck", this.Check);
    sessionStorage.setItem("ssStatus", this.ddlStatus);
    sessionStorage.setItem("ssDOB", this.serializedDate.value);
    sessionStorage.setItem("ssPolicyNo", this.Policy);
    sessionStorage.setItem("ssPolicyName", this.PolicyName);
    sessionStorage.setItem("ssIsExact", this._isExactMatchChecked == false ? "false" : "true");

    if (Claim != '' || SocialSecurty != '' || FirstName != '' || LastName != '' ||
      Address != '' || City != '' || Policy != '' || PolicyName != '' || State != '' ||
      Status != '' || DOB != '' || Check != '') {
      if (Claim == '' && SocialSecurty == '' && FirstName == '' && LastName == '' && Policy == '' && PolicyName == '' && Check == '') {
        this.dynamicBorder = "redBorder";
        this.errorForMainFields = true;
        this.error = false;
      }
      else {
        if (DOB.trim() == '') DOB = this.common.encrypt('12/31/1899');
        this.error = false;
        this.errorForMainFields = false;
        let exact = this._isExactMatchChecked == false ? this.common.encrypt("false") : this.common.encrypt("true");
        let url = '/claiminforesult?search=' + encodeURIComponent(Claim.trim()) + '%7C' + encodeURIComponent(SocialSecurty.trim()) + '%7C' + encodeURIComponent(FirstName.trim()) + '%7C' + encodeURIComponent(LastName.trim()) + '%7C' + encodeURIComponent(Address.trim()) + '%7C' + encodeURIComponent(City.trim()) + '%7C' + encodeURIComponent(State.trim()) + '%7C' + encodeURIComponent(Check.trim()) + '%7C' + encodeURIComponent(Status.trim()) + '%7C' + encodeURIComponent(DOB.trim()) + '%7C' + encodeURIComponent(Policy.trim()) + '%7C' + encodeURIComponent(PolicyName.trim()) + '%7C' + exact;
        //let url = '/claiminforesult?Claim=' + encodeURIComponent(Claim.trim()) + '&SocialSecurity=' + encodeURIComponent(SocialSecurty.trim()) + '&FirstName=' + encodeURIComponent(FirstName.trim()) + '&LastName=' + encodeURIComponent(LastName.trim()) + '&Address=' + encodeURIComponent(Address.trim()) + '&City=' + encodeURIComponent(City.trim()) + '&State=' + encodeURIComponent(State.trim()) + '&Check=' + encodeURIComponent(Check.trim()) + '&Status=' + encodeURIComponent(Status.trim()) + '&DOB=' + encodeURIComponent(DOB.trim()) + '&Policy=' + encodeURIComponent(Policy.trim()) + '&PolicyName=' + encodeURIComponent(PolicyName.trim()) + '&isExactMatch=' + this._isExactMatchChecked;
        this.router.navigateByUrl(url);
      }
    }
    else {
      this.error = true;
    }
  }

  onItemChange(item) {
    //alert(item);
    //alert(this.ExactMatch);
  }

  clearClaimInfo() {
    this.Claim = '';
    this.SocialSecurty = '';
    this.FirstName = '';
    this.LastName = '';
    this.Address = '';
    this.City = '';
    this.Check = '';
    this.Policy = '';
    this.PolicyName = '';
    this._isExactMatchChecked = true;
    this.Radiovalue = true;
    //this.selectedDate = '';
    this.serializedDate = new FormControl('');
    this.DOB = '';
    this.ddlState = '';
    this.ddlStatus = "";
    this.errorForMainFields = false;
    this.dynamicBorder = "";
    this.error = false;
  }

  getStates(call:string) {
    let url = AppConstants.SERVICE_URL + "ClaimInformation/GetAllStates";
    this._data.GetService(url).subscribe(lstStates => { this.bindState(lstStates,call) });
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

  private _prevSelected: any;



  handleChange(evt) {
    if (evt.target.checked) {
      this._isExactMatchChecked = true;
    }
    else {
      this._isExactMatchChecked = false;
    }
  }

  onKeydown(event: any) {
    if (event.target.value.trim() != '') {
      this.dynamicBorder = "clearBorder";
      this.errorForMainFields = false;
    }
  }

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
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
