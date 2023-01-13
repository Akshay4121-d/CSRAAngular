/***********************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 28 DEC 2018, Friday
 * Decription :  Update Employer information like Email, Password and Account status
 ***********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Common } from 'src/common';
import { AppConstants } from 'src/app/app.constants';
import { Employer, PolicyNotes,Users } from 'src/app/models/employer';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-employerupdate',
  templateUrl: './employerupdate.component.html',
  styleUrls: ['./employerupdate.component.scss']
})
export class EmployerupdateComponent implements OnInit {
  ID_Login: string;
  EmailID: string;
  Employers: Employer[];
  EmployerDetail: any = {};
  public retrieveFromPost;
  model1: boolean = false;
  btnDelete: boolean = false;
  PolicyNotesFinal: Array<PolicyNotes> = [];
  records: boolean = true;
  PolicyNumber: string;
  varlength: string = '255';
  error: boolean = false;
  ngEmpNote: string;
  invalidInputEmail: boolean = false;
  //below 4 lines Add by Ravi CO#4144 Multiple employer Acount
  UsersDetailFinal: Array<Users> = [];
  isAdminInActive: number = 0;
  AllUsers: Users[];
  ddlUsers: string = '';
  ddlUserId: number = 0;
  mySelect : number=0;
  selectedValue: any;
  isdisabledAdmin: boolean = false;
  isdeleteAdmin:  boolean = false;
  isActivecountExceed: boolean = false;
  Isunlock:string; //CO#4352

  //constructor call : GetPolicyholderByID_Login method and store param(ID_Login) from URL
  constructor(private _data: DataService,
    private route: ActivatedRoute,
    private common: Common,
    private router: Router,
    private ngxService: NgxUiLoaderService) {
    //this.ID_Login = this.route.snapshot.params['ID_Login'];
    let urlParam = this.common.decrypt(this.route.snapshot.params['ID_Login']);
  
    this.ID_Login = urlParam.split(',')[0];
    this.PolicyNumber = urlParam.split(',')[1];


    if (this.ID_Login != null) {
      this.ngxService.start();
      this.GetPolicyholderByID_Login(this.common.encrypt(this.ID_Login));
     
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
  //get details of clicked employer
  GetPolicyholderByID_Login(Id_Login: string) {  
    let url = AppConstants.SERVICE_URL + "Employer/GetPolicyholderByID_Login?sId_Login=" + Id_Login
    this._data.GetService(url).subscribe(Employers => this.bindEmployerDetail(Employers));
  }
  bindEmployerDetail(Employers: any) {

    this.EmployerDetail = Employers; 
  
    if(this.EmployerDetail.ID_EmployerAdmin==0){
      this.getUsers();
    }
    this.EmailID = "";
    this.ngxService.stop();
  }

  //GET
  //Update employer's email address
  UpdateEmployerEmail() {
    let url = AppConstants.SERVICE_URL + "Employer/UpdateEmail?Id_login=" + this.common.encrypt("#" + this.EmployerDetail.ID_Login) + "&Email=" + this.common.encrypt(this.EmailID.trim())
    this._data.GetService(url).subscribe
      (data => { this.retrieveFromPost = data; this.EmployerDetail = [{}]; this.GetPolicyholderByID_Login(this.common.encrypt(this.ID_Login)); });

}

emailValidation(){
  var email = (this.EmailID.trim());
  if ((/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/).test(email)) {
    this.invalidInputEmail = false;
    alert('hello');
    document.getElementById("saveEmail").click();
  }
  else {
    this.invalidInputEmail = true;
  }
}

//GET
//Send password reset link in Email
SendResetPasswordLink() {
  let url = AppConstants.SERVICE_URL + "Employer/SendResetLinkInEmail?Email=" + this.common.encrypt(this.EmployerDetail.Email) + "&UserId=" + this.common.encrypt(this.EmployerDetail.UserID) + "&ID_Contact=" + this.common.encrypt("#" + this.EmployerDetail.ID_Contact) + "&Name=" + this.common.encrypt(this.EmployerDetail.NameOnAccount) + "&UserName=" + sessionStorage.getItem("UserName")
  this._data.GetService(url).subscribe
    (data => data);
}

//GET
//Disable employer's account
EnableDisableAccount() {
  let url = AppConstants.SERVICE_URL + "Employer/UpdatePolicyholderActiveInactive?sId_Login=" + this.common.encrypt("#" + this.EmployerDetail.ID_Login)
  this._data.GetService(url).subscribe(Employer => Employer);
}

//Refresh screen after confirmation
AfterConfirmation() {
  //window.location.reload();
  this.ngxService.start();
  this.GetPolicyholderByID_Login(this.common.encrypt(this.ID_Login));
}

//Delete(not physically) Employer's Account
DeleteEmployerAccount(){
  let url = AppConstants.SERVICE_URL + "Employer/DeleteUserAccount?sId_Login=" + this.common.encrypt("#" + this.EmployerDetail.ID_Login) + "&sSupervisorName=" + sessionStorage.getItem('UserName')
  this._data.GetService(url).subscribe
    (data => data);
}

// Added by piyush shrivastava on 01/11/2021, CO#4352.
UnlockAccount() {
  let url = AppConstants.SERVICE_URL + "Employer/UnlockAccount?sId_Login=" + this.common.encrypt("#" + this.EmployerDetail.ID_Login) + "&sSupervisorName=" + sessionStorage.getItem('UserName');
  this._data.GetService(url).subscribe(data => {
    if(data.toString()=='success'){
      this.Isunlock='Account unlocked successfully!';
    }
    else{
      this.Isunlock='Account unlock failed!';
    }
    
  });
}


//Close detailed information of Employer
CloseDetails() {
  let url = '/employerresult?U=' + encodeURIComponent(sessionStorage.getItem("ssnUserId")) + '&F=' + encodeURIComponent(sessionStorage.getItem("ssnFederalId")) + '&P=' + encodeURIComponent(sessionStorage.getItem("ssnPolicyNo")) + '&C=' + encodeURIComponent(sessionStorage.getItem("ssnCompanyName"));
  this.router.navigateByUrl(url);
}

//Get Policy Notes
GetPolicyNotes() {
  this.PolicyNotesFinal = [];
  this.ngxService.start();
  const url = AppConstants.SERVICE_URL + "Employer/GetPolicyNotes?PolicyNumber=" + this.common.encrypt(this.PolicyNumber);
  this._data.GetService(url).subscribe(Notes => { this.bindPolicyNotes(Notes) });
}

bindPolicyNotes(Notesdetails: any) {
  if (this.isNotNull(Notesdetails)) {
    for (var i = 0; i < Notesdetails.length; i++) {
      let o = new PolicyNotes();
      o.PolicyNote = Notesdetails[i].policynotes;
      this.PolicyNotesFinal.push(o);
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
    let polValue = this.EmployerDetail.PolicyNumber;
    polValue = polValue.replace(/\D/g, '');
    let url = AppConstants.SERVICE_URL + "Employer/InsertPolicyNotes?PolicyNumber=" + this.common.encrypt(this.EmployerDetail.PolicyNumber) + "&Userid=" + this.common.encrypt(sessionStorage.getItem('id_CSR')) + "&Note=" + this.common.encrypt(NewNote) + "&PolicynoValue=" + this.common.encrypt(polValue);
    this._data.GetService(url).subscribe(obj => {
      this.bindAfterInsert(obj);
    });
  }
  else
    this.error = true;
}

onKeyUp(boxInput: HTMLInputElement) {
  if (this.ngEmpNote == '')
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
  this.ngEmpNote = "";
}

bindAfterInsert(iReturn: any) {
  new Promise(() => this.GetPolicyNotes()).then(() => this.ngxService.stop());
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

DisplayActivecountwarning(){
  
  if(this.EmployerDetail.ActiveCount >= 15){//update from 10 to 15 by piyush shrivastava, CO# 4396.
    this.isActivecountExceed =true;
  }
  else{
    this.isActivecountExceed = false;
  }
}

  //POST METHODS

  // //POST
  // //Update employer's email address
  // UpdateEmployerEmail() {
  //   let toUpdate = { "ID_Login": this.EmployerDetail.ID_Login, "Email": this.EmailID };
  //   const url = AppConstants.SERVICE_URL + "Employer/UpdateEmail"

  //   this._data.PostService(url, toUpdate).subscribe
  //     (data => { this.retrieveFromPost = data });
  // }

  // //POST
  // //Send password reset link in Email
  // SendResetPasswordLink() {
  //   let toUpdate = {
  //     "Email": this.EmployerDetail.Email,
  //     "UserID": this.EmployerDetail.UserID,
  //     "ID_Contact": this.EmployerDetail.ID_Contact,
  //     "NameOnAccount": this.EmployerDetail.NameOnAccount,
  //     "UserName": sessionStorage.getItem("UserName")
  //   };

  //   const url = AppConstants.SERVICE_URL + "Employer/SendResetLinkInEmail"
  //   this._data.PostService(url, toUpdate).subscribe
  //     (data => {this.retrieveFromPost = data}
  //     );
  // }

  // //POST
  // //Disable employer's account
  // EnableDisableAccount() {
  //   let toUpdate = { "ID_Login": this.EmployerDetail.ID_Login };
  //   const url = AppConstants.SERVICE_URL + "Employer/UpdatePolicyholderActiveInactive"

  //   this._data.PostService(url, toUpdate).subscribe
  //     (data => { this.retrieveFromPost = data });
  // }

  getUsers() {
    
  let url = AppConstants.SERVICE_URL + "Employer/GetPolicyholderSubAdminsByID_Login?sId_Login=" + this.common.encrypt(this.ID_Login);
  this._data.GetService(url).subscribe(lstUsers => { this.bindSubAdminUsers(lstUsers) });
}


//Sub-Admin List start
bindSubAdminUsers(lstUsers: any) {
  
  this.AllUsers = lstUsers;
  if (this.AllUsers != null) {
    for (var i = 0; i < this.AllUsers.length; i++) {
      
      let o = new Users();
      o.ID_Login = lstUsers[i].ID_Login;
      o.UserName = lstUsers[i].FName + ' '+lstUsers[i].LName;
      this.UsersDetailFinal.push(o);
    }
    // if (call != 'first')
    //   this.ddlUsers = call;
  }
}

GetDisableStatus(){
      
  this.isdisabledAdmin = true;
  this.isdeleteAdmin = false;
}

GetDeleteStatus(){
      
  this.isdeleteAdmin= true;
  this.isdisabledAdmin = false;
}

MakeAdminPopup(){
      
    let  url = AppConstants.SERVICE_URL + "Employer/UpdateAdminUserByID_Login?iAdminID_Login=" + this.common.encrypt(this.ID_Login)
     +'&iSubAdminID_Login='+ this.common.encrypt(this.mySelect.toString()) + '&Is_Disable=' + this.isdisabledAdmin + '&Is_Delete=' + this.isdeleteAdmin;
     this._data.GetService(url).subscribe(Employer => Employer);
    let url1 = '/employerresult?U=' + encodeURIComponent(sessionStorage.getItem("ssnUserId")) + '&F=' + encodeURIComponent(sessionStorage.getItem("ssnFederalId")) + '&P=' + encodeURIComponent(sessionStorage.getItem("ssnPolicyNo")) + '&C=' + encodeURIComponent(sessionStorage.getItem("ssnCompanyName"));
    this.router.navigateByUrl(url1);

}



//Sub-Admin List END


}
