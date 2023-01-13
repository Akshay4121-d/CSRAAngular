/**************************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 18 DEC 2018, Tuesday
 * Decription :  Update Producer information like Email, Password and Account status
 * Modidified by : Shloke   Dated: 15 Apr 2020   Purpose: Pass Login id when request to update eemail, CO# 3771
 **************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producer, ProducerNotes } from 'src/app/models/producer';
import { AppConstants } from 'src/app/app.constants';
import { Common } from 'src/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-producerupdate',
  templateUrl: './producerupdate.component.html',
  styleUrls: ['./producerupdate.component.scss']
})

export class ProducerupdateComponent implements OnInit {

  ID_Login: string;
  Producers: Producer[];
  ProducerDetail: any = {};
  EmailID: string;
  public retrieveFromPost;
  model1: boolean = false;
  btnDelete: boolean = false;
  ID_ContactType: string;
  ProducerNotesFinal: Array<ProducerNotes> = [];
  records: boolean = true;
  ID_LoginEnc: string;

  varlength: string = '255';
  error: boolean= false;
  ngNote: string;
  fadeWhileAdd:string='';
   Isunlock:string; //CO# 4352
  
  //constructor call : getProducerDetails method and store param(ID_Login) from URL
  constructor(private _data: DataService,
    private route: ActivatedRoute,
    private common: Common,
    private router: Router,
    private ngxService: NgxUiLoaderService) {
    let urlParam = this.common.decrypt(this.route.snapshot.params['ID_Login']);
    this.ID_Login = urlParam.split(',')[0];
    this.ID_ContactType = urlParam.split(',')[1];
    

    if (this.ID_Login != null) {
      this.ngxService.start();
      this.ID_LoginEnc = this.common.encrypt(this.ID_Login)
      this.getProducerDetails(this.ID_LoginEnc);
    }
  }

  ngOnInit() {
    this.checkDeleteButtonAccess('Delete User Account');
  }

  //GET
  //Check Access to delete button
  checkDeleteButtonAccess(role: string) {
    let isAccess: boolean = false;
    let url = AppConstants.SERVICE_URL + "common/CheckUserAccess?role=" + role;
    this._data.GetService(url).subscribe(isAccess => {
      this.forSuccess(isAccess.toString())
    });
  }
  forSuccess(isAccess: string) {
    if (isAccess.toUpperCase() == "TRUE")
      this.btnDelete = true;
    else
      this.btnDelete = false;
  }

  //GET
  //Get details of clicked producer
  // getProducerDetails(Id_Login: number) {
  //   let url = AppConstants.SERVICE_URL + "Producer/GetProducerByID_Login?sId_Login=" + Id_Login
  //   this._data.GetService(url).subscribe(Producers => {
  //     this.ProducerDetail = Producers;
  //     this.ngxService.stop();
  //   });
  // }

  getProducerDetails(Id_Login: string) {
    let url = AppConstants.SERVICE_URL + "Producer/GetProducerByID_Login?sId_Login=" + Id_Login;
    this._data.GetService(url).subscribe(BrokerInfos => {
      this.bindProducerDetails(BrokerInfos);
    });
  }

  bindProducerDetails(ProducerDetails: any) {
    if (this.isNotNull(ProducerDetails)) {
      this.ProducerDetail = ProducerDetails;
      sessionStorage.setItem("ssnIdLogin", this.ProducerDetail.ID_Login);
    }
    this.ngxService.stop();
  }

  //GET
  //Update producer's email address
  UpdateProducerEmail() {
    let ID_Contact = this.common.encrypt("#" + this.ProducerDetail.ID_Contact);
    let Email = this.common.encrypt(this.EmailID.trim());
    if (this.isNotNull(sessionStorage.getItem("ssnProducerEmail"))) {
      sessionStorage.setItem("ssnProducerEmail", Email);
    }
    let url = AppConstants.SERVICE_URL + "Producer/UpdateEmail?ID_Contact=" + ID_Contact + "&Email=" + Email + "&Id_login=" + this.ID_LoginEnc;
    this._data.GetService(url).subscribe(Producers => this.ProducerDetail = Producers);
  }

  //GET
  //Send password reset link in Email
  SendResetPasswordLink() {
    let Email = this.common.encrypt(this.ProducerDetail.Email);
    let Name = this.common.encrypt(this.ProducerDetail.Name);
    let BrokerNumber = this.common.encrypt(this.ProducerDetail.BrokerNumber);
    let ID_Contact = this.common.encrypt("#" + this.ProducerDetail.ID_Contact);
    let url = AppConstants.SERVICE_URL + "Producer/SendResetLinkInEmail?Email=" + Email + "&Name=" + Name + "&ProducerNumber=" + BrokerNumber + "&ID_Contact=" + ID_Contact
    this._data.GetService(url).subscribe(Producers => Producers);
  }

  //GET
  //Enable or Disable producer's account
  EnableDisableAccount() {
    let url = AppConstants.SERVICE_URL + "Producer/UpdateProducerActiveInactive?sId_Login=" + this.ID_LoginEnc
    this._data.GetService(url).subscribe(Producers => Producers);
  }

  //Refresh screen after confirmation
  AfterConfirmation() {
    //window.location.reload();
    this.ngxService.start();
    this.getProducerDetails(this.ID_LoginEnc);
  }

  //Delete(not physically) Producer's Account
  DeleteProducerAccount() {
    //let userid = this.ProducerDetail.UserID;
    let url = AppConstants.SERVICE_URL + "Producer/DeleteUserAccount?sId_Login=" + this.ID_LoginEnc + "&sSupervisorName=" + sessionStorage.getItem('UserName') + "&sContactIdType=" + this.common.encrypt(this.ID_ContactType);
    this._data.GetService(url).subscribe(data => data);
  }
// Added by piyush shrivastava on 01/11/2021, CO#4352.
  UnlockAccount() {
    let url = AppConstants.SERVICE_URL + "Producer/UnlockAccount?sId_Login=" + this.ID_LoginEnc + "&sSupervisorName=" + sessionStorage.getItem('UserName');
    this._data.GetService(url).subscribe(data => {
      if(data.toString()=='success'){
        this.Isunlock='Account unlocked successfully!';
      }
      else{
        this.Isunlock='Account unlock failed!';
      }
      
    });
  }

  //Close detailed information of Producer
  CloseDetails() {
    let url = '/producerresult?E=' + encodeURIComponent(sessionStorage.getItem("ssnProducerEmail")) + '&P=' + encodeURIComponent(sessionStorage.getItem("ssnProducerNumber"));
    this.router.navigateByUrl(url);
  }

  //Get Policy Notes
  GetProducerNotes() {
    this.ProducerNotesFinal = [];
    this.ngxService.start();
    const url = AppConstants.SERVICE_URL + "Producer/GetProducerNotes?ProducerNumber=" + this.common.encrypt(this.ProducerDetail.BrokerNumber) + '&UserName=' + this.common.encrypt(this.ProducerDetail.UserID.toUpperCase());
    this._data.GetService(url).subscribe(Notes => { this.bindProducerNotes(Notes) });
  }

  bindProducerNotes(Notesdetails: any) {
    if (this.isNotNull(Notesdetails)) {
      for (var i = 0; i < Notesdetails.length; i++) {
        let o = new ProducerNotes();
        o.ProducerNote = Notesdetails[i].producernotes;
        this.ProducerNotesFinal.push(o);
      }
      this.records = true;
    }
    else
      this.records = false;
    this.ngxService.stop();
  }

  callAddNewNote(NewNote: string) {
    if (this.isNotNull(NewNote)) {
      NewNote = NewNote.replace(/[•\t+]/g, '');
      this.error = false;
      this.ngxService.start();
      let url = AppConstants.SERVICE_URL + "Producer/InsertProducerNotes?ProducerNumber=" + this.common.encrypt(this.ProducerDetail.BrokerNumber) + "&ProducerUserid=" + this.common.encrypt(this.ProducerDetail.UserID) + "&Userid=" + this.common.encrypt(sessionStorage.getItem('id_CSR')) + "&Note=" + this.common.encrypt(NewNote);
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
    new Promise(() => this.GetProducerNotes()).then(() => this.ngxService.stop());
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

  //POST
  //Update producer's email address
  // UpdateProducerEmail() {
  //   let toUpdate = { "ID_Online": this.ProducerDetail.ID_Online, "Email": this.EmailID };
  //   const url = AppConstants.SERVICE_URL + "Producer/UpdateEmail"

  //   this._data.PostService(url, toUpdate).subscribe
  //     (data => { this.retrieveFromPost = data });
  // }


  //POST
  //Send password reset link in Email
  // SendResetPasswordLink() {
  //   let toUpdate = {
  //     "Email": this.ProducerDetail.Email,
  //     "Name": this.ProducerDetail.Name,
  //     "BrokerNumber": this.ProducerDetail.BrokerNumber,
  //     "ID_Contact": this.ProducerDetail.ID_Contact
  //   };
  //   const url = AppConstants.SERVICE_URL + "Producer/SendResetLinkInEmail"
  //   this._data.PostService(url, toUpdate).subscribe
  //     (data => {
  //       this.retrieveFromPost = data
  //     }
  //     );
  // }

  //POST
  //Enable or Disable producer's account
  // EnableDisableAccount() {
  //   let toUpdate = { "ID_Login": this.ProducerDetail.ID_Login };
  //   const url = AppConstants.SERVICE_URL + "Producer/UpdateProducerActiveInactive"

  //   this._data.PostService(url, toUpdate).subscribe
  //     (data => { this.retrieveFromPost = data });
  // }
}