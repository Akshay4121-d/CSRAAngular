/*********************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 31 DEC 2018, Monday
 * Decription :  Update Member information like Email, Password and Account status
 *********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Common } from 'src/common';
import { AppConstants } from 'src/app/app.constants';
import { Member, ClaimDetails, ClaimNotes } from 'src/app/models/member';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { inherits } from 'util';

@Component({
  selector: 'app-memberupdate',
  templateUrl: './memberupdate.component.html',
  styleUrls: ['./memberupdate.component.scss']
})
export class MemberupdateComponent implements OnInit {
  Master_id: string='';
  newEmail: string='';
  Members: Member[];
  ClaimDetails: ClaimDetails[];
  ClaimWithStatus: Array<any> = [{}];
  MemberDetail: any = {};
  public retrieveFromPost;
  LockStatus: number;
  ActiveFlag: number;
  model1: boolean = false;
  InvalidEmail: boolean = false;
  lblExistsMsg: boolean = false;

  EmailId: string='';
  SocialSecurityNo: string='';
  AccountLockedOut_Text: string='';
  AccountActiveStatus_Text: string='';
  PasswordExpirationDate: string='';
  LastLoginDate: string='';
  AccountCreated: string='';
  EmailExists: number;
  ClaimNotesFinal: Array<ClaimNotes> = [];
  records: boolean = true;
  isBadData: boolean = false;

  varlength: string = '255';
  error: boolean= false;
  ngNote: string;
  urlSsn: string;
  notes_ClaimNumber: string='';

  //constructor call : GetClaimDetails method and store param(ClaimNumber) from URL
  constructor(private _data: DataService,
    private route: ActivatedRoute,
    private common: Common,
    private router: Router,
    private ngxService: NgxUiLoaderService) {

    //this.Master_id = this.route.snapshot.params['Master_id'];
    let urlParam = this.common.decrypt(this.route.snapshot.params['Master_id']);
    this.Master_id = this.common.encrypt(urlParam.split(',')[0]);
    this.urlSsn = urlParam.split(',')[1];


    if (this.Master_id != null) {
      this.ngxService.start();
      this.GetClaimDetails(this.Master_id);
    }
  }

  ngOnInit() {
  }

  //GET
  //get details of clicked employer
  GetClaimDetails(Master_id: string) {
    let url = AppConstants.SERVICE_URL + "Member/GetClaimDetails?sMaster_id=" + Master_id;
    const promise = this._data.GetService(url).toPromise();
    promise.then((data) => {this.bindMemberDetail(data);
    }).then(() => this.ngxService.stop());
    // this._data.GetService(url).subscribe(data => {
    //   this.bindMemberDetail(data);
    // });
  }
  bindMemberDetail(ClaimWithStatus: any) {
    this.ClaimWithStatus = ClaimWithStatus;
    var ClaimWithStatus_filtered = this.ClaimWithStatus.filter(x=> x.SocialSecurityNo === this.urlSsn);
    this.EmailId = ClaimWithStatus_filtered[0].EmailId;
    this.SocialSecurityNo = ClaimWithStatus_filtered[0].SocialSecurityNo;
    this.AccountLockedOut_Text = ClaimWithStatus_filtered[0].AccountLockedOut_Text;
    this.AccountActiveStatus_Text = ClaimWithStatus_filtered[0].AccountActiveStatus_Text;
    this.PasswordExpirationDate = ClaimWithStatus_filtered[0].PasswordExpirationDate;
    this.LastLoginDate = ClaimWithStatus_filtered[0].LastLoginDate;
    this.AccountCreated = ClaimWithStatus_filtered[0].AccountCreated;
    this.newEmail = "";
    //this.ngxService.stop();
  }


  //GET
  //Update employer's email address
  UpdateMemberEmail() {
    this.ngxService.start();
    const url = AppConstants.SERVICE_URL + "Member/UpdateEmail?ClaimNumber=" + this.common.encrypt(this.ClaimWithStatus[0].ClaimNumber) + "&Id=" + this.common.encrypt("#" + this.ClaimWithStatus[0].Master_id) + "&Email=" + this.common.encrypt(this.newEmail)
    this._data.GetService(url).subscribe(data => {
      let objData: any = data;
      this.EmailExists = objData.EmailChanged_Status;
      this.ngxService.stop();
      if (this.EmailExists == 1) {
        document.getElementById('EmailClose').click();
        document.getElementById("openModalButton").click();
        if (this.isNotNull(sessionStorage.getItem("ssnMemberEmail"))) {
          sessionStorage.setItem("ssnMemberEmail", this.common.encrypt(this.newEmail));
        }
      }
    });
  }

  //GET
  //Send password reset link in Email
  SendResetPasswordLink() {
    let url = AppConstants.SERVICE_URL + "Member/SendResetLinkInEmail?Email=" + this.common.encrypt(this.ClaimWithStatus[0].EmailId) + "&Name=" + this.common.encrypt(this.ClaimWithStatus[0].NameOnAccount) + "&UserName=" + this.common.encrypt(sessionStorage.getItem("UserName"))
    this._data.GetService(url).subscribe
      (data => data);
  }

  //GET
  //Lock/Unlock member's account
  LockUnlockAccount() {
    if (this.ClaimWithStatus[0].AccountLockedOut_Text == 'Yes') {
      this.LockStatus = 1;
    }

    let url = AppConstants.SERVICE_URL + "Member/LockUnlockClaimAccount?Id=" + this.common.encrypt("#" + this.ClaimWithStatus[0].Master_id) + "&LockStatus=" + this.common.encrypt("#" + this.LockStatus)
    this._data.GetService(url).subscribe
      (data => data);
  }

  //GET
  //Enable/Disable member's account
  EnableDisableAccount() {
    if (this.AccountActiveStatus_Text == 'Yes') {
      this.ActiveFlag = 0;
    }
    else
      this.ActiveFlag = 1;
    let url = AppConstants.SERVICE_URL + "Member/UpdateMemberActiveInactive?Id=" + this.common.encrypt("#" + this.ClaimWithStatus[0].Master_id) + "&ActiveStatus=" + this.common.encrypt("#" + this.ActiveFlag)
    this._data.GetService(url).subscribe
      (data => data);
  }

  //Refresh screen after confirmation
  AfterConfirmation() {
    this.ngxService.start();
    this.GetClaimDetails(this.Master_id);
  }

  //Close detailed information of Member
  CloseDetails() {
    let url = '/memberresult?U=' + encodeURIComponent(sessionStorage.getItem("ssnMemberEmail")) + '&C=' + encodeURIComponent(sessionStorage.getItem("ssnClaimNumber")) + '&L=' + encodeURIComponent(sessionStorage.getItem("ssnLastname"));
    this.router.navigateByUrl(url);
  }

  GetClaimNotes(cno: string) {
    this.notes_ClaimNumber = cno;
    this.ClaimNotesFinal = [];
    this.ngxService.start();
    const url = AppConstants.SERVICE_URL + "Member/GetClaimNotes?ClaimNumber=" + this.common.encrypt(cno);
    this._data.GetService(url).subscribe(Notes => { this.bindClaimNotes(Notes) });
  }

  bindClaimNotes(Notesdetails: any) {
    if (this.isNotNull(Notesdetails) && Notesdetails[0].hasOwnProperty('isBadData')) {
      this.isBadData = true;
    }
    else {
      if (this.isNotNull(Notesdetails)) {
        for (var i = 0; i < Notesdetails.length; i++) {
          let o = new ClaimNotes();
          o.ClaimNote = Notesdetails[i].claimnotes;
          this.ClaimNotesFinal.push(o);
        }
        this.isBadData = false;
        this.records = true;
      }
      else {
        this.records = false;
      }
    }
    this.ngxService.stop();
  }

  callAddNewNote(NewNote: string) {
    if (this.isNotNull(NewNote)) {
      NewNote = NewNote.replace(/[•\t+]/g, '');
      this.error = false;
      this.ngxService.start();
      let url = AppConstants.SERVICE_URL + "Member/InsertClaimNotes?ClaimNumber=" + this.common.encrypt(this.notes_ClaimNumber) + "&Userid=" + this.common.encrypt(sessionStorage.getItem('id_CSR')) + "&Note=" + this.common.encrypt(NewNote);
      this._data.GetService(url).subscribe(obj => {
        this.bindAfterInsert(obj);
      });
    }
    else
    this.error = true;
  }

  onKeyUp(boxInput: HTMLInputElement) {
    if (this.ngNote == '')
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

  ResetNotesPopup(){
    this.error = false;
    this.varlength = '255';
    this.ngNote = "";
  }

  bindAfterInsert(iReturn: any) {
    new Promise(() => this.GetClaimNotes(this.notes_ClaimNumber)).then(() => this.ngxService.stop());
    document.getElementById("btnCloseAddNew").click();
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
  //POST METHODS

  // //POST
  // //Update employer's email address
  // UpdateEmployerEmail() {
  //   let toUpdate = {
  //     "ClaimNumber": this.ClaimWithStatus[0].ClaimNumber,
  //     "Master_id": this.ClaimWithStatus[0].Master_id,
  //     "Email": this.newEmail
  //   };

  //   const url = AppConstants.SERVICE_URL + "Member/UpdateEmail"

  //   this._data.PostService(url, toUpdate).subscribe
  //     (data => { this.retrieveFromPost = data });
  // }



  // //POST
  // //Send password reset link in Email
  // SendResetPasswordLink() {
  //   let toUpdate = {
  //     "Email": this.ClaimWithStatus[0].EmailId,
  //     "NameOnAccount": this.ClaimWithStatus[0].NameOnAccount,
  //     "UserName": sessionStorage.getItem("UserName")
  //   };

  //   const url = AppConstants.SERVICE_URL + "Member/SendResetLinkInEmail"
  //   this._data.PostService(url, toUpdate).subscribe
  //     (data => {
  //       this.retrieveFromPost = data
  //     }
  //     );
  // }

  // //POST
  // //Disable member's account
  // EnableDisableAccount() {
  //   if (this.ClaimWithStatus[0].AccountLockedOut < 5) {
  //     this.LockStatus = 5;
  //   }
  //   else
  //     this.LockStatus = 0;
  //   let toUpdate = { "Master_id": this.ClaimWithStatus[0].Master_id, "AccountLockedOut": this.LockStatus };
  //   const url = AppConstants.SERVICE_URL + "Member/LockUnlockClaimAccount"

  //   this._data.PostService(url, toUpdate).subscribe
  //     (data => { this.bindretrieveFromPost(data) });
  // }
  // bindretrieveFromPost(data: any) {
  //   this.retrieveFromPost = data
  // }
}