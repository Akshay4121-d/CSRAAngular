/**************************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 27 DEC 2018, Thursday
 * Decription : screen where user can see empolyer associated ids and information
 **************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';
import { Employer } from 'src/app/models/employer';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Common } from 'src/common';

@Component({
  selector: 'app-employerresult',
  templateUrl: './employerresult.component.html',
  styleUrls: ['./employerresult.component.scss']
})
export class EmployerresultComponent implements OnInit {
  public records: boolean = false;
  public norecords: boolean = false;
  UserId: string;
  FedralId: string;
  PolicyNo: string;
  CompanyName: string;
  EmployerDetail: any;
  Employers: Employer[];
  EmployerDetailFinal: Array<Employer> = [];
  //UsersDetailFinal: Array<Users> = [];
  isAdminInActive: number = 0;
  //AllUsers: Users[];
  //ddlUsers: string = '';

  //constructor call: stores param from URL and calls GetPolicyholderBySearch method
  constructor(private _data: DataService, private common: Common,
    private route: ActivatedRoute,private ngxService: NgxUiLoaderService) {
    this.UserId = this.route.snapshot.queryParams['U'];
    this.FedralId = this.route.snapshot.queryParams['F'];
    this.PolicyNo = this.route.snapshot.queryParams['P'];
    this.CompanyName = this.route.snapshot.queryParams['C'];
    this.ngxService.start();
    if ((this.UserId == null && this.FedralId == null && this.PolicyNo == null && this.CompanyName == null) ||
      (this.UserId.trim() == '' && this.FedralId.trim() == '' && this.PolicyNo.trim() == '' && this.CompanyName.trim() == '')) {
      this.norecords = true;
      this.ngxService.stop();
    }
    else
      this.GetPolicyholderBySearch(this.UserId, this.FedralId, this.PolicyNo, this.CompanyName)

  }

  ngOnInit() {
  }

  //GET
  //get policy-holder by UserID or Fedral_TaxIDNumber or PolicyNumber
  GetPolicyholderBySearch(UserID: string, Fedral_TaxIDNumber: string, PolicyNumber: string, Company_Name: string) {   
    let url = AppConstants.SERVICE_URL + "Employer/GetPolicyholderBySearch?UserID=" + UserID + "&Fedral_TaxIDNumber=" + Fedral_TaxIDNumber + "&PolicyNumber=" + PolicyNumber + "&CompanyName=" + Company_Name
    this._data.GetService(url).subscribe(Employers => {
      this.bindEmployerDetail(Employers);
      
    });
  }

bindEmployerDetail(EmployerDetail: any) {
  this.EmployerDetail=EmployerDetail;
  if (this.EmployerDetail != null) {
    this.records = true;
    for (var i = 0; i < this.EmployerDetail.length; i++) {
      let o = new Employer();
      o.UserID= EmployerDetail[i].UserID
      o.Fedral_TaxIDNumber = EmployerDetail[i].Fedral_TaxIDNumber;
      o.PolicyNumber = EmployerDetail[i].PolicyNumber;
      o.ActiveText = EmployerDetail[i].ActiveText;
      o.ID_LoginEnc = this.common.encrypt('#' + EmployerDetail[i].ID_Login +','+EmployerDetail[i].PolicyNumber);
      o.ID_Group = EmployerDetail[i].ID_Group;
      o.ID_EmployerAdmin = EmployerDetail[i].ID_EmployerAdmin;
      o.Flag_Active = EmployerDetail[i].Flag_Active;
      if(o.ID_EmployerAdmin==0)    
      {        
        this.PolicyNo = o.PolicyNumber;
        if(this.EmployerDetail[i].Flag_Active)         
        this.isAdminInActive = 1;
        else
        this.isAdminInActive = 0;     
      }
      else{
    
        if(o.Flag_Active == 1)
        {
          this.isAdminInActive = 1;
        }
        else{
          this.isAdminInActive = 1;
        }
      }
     
      this.EmployerDetailFinal.push(o);
    }
  }
  else
    this.norecords = true;
  setTimeout(() => { this.ngxService.stop(); });
}

// getUsers(call: string) {
//   let url = AppConstants.SERVICE_URL + "ClaimInformation/GetAllStates";
//   this._data.GetService(url).subscribe(lstUsers => { this.bindSubAdminUsers(lstUsers, call) });
// }


//Sub-Admin List start
// bindSubAdminUsers(lstUsers: any, call: string) {
//   this.AllUsers = lstUsers;
//   if (this.AllUsers != null) {
//     for (var i = 0; i < this.AllUsers.length; i++) {
//       let o = new Users();
//       o.ID_Login = lstUsers[i].ID_Login;
//       this.UsersDetailFinal.push(o);
//     }
//     if (call != 'first')
//       this.ddlUsers = call;
//   }
// }
//Sub-Admin List start
  
}
