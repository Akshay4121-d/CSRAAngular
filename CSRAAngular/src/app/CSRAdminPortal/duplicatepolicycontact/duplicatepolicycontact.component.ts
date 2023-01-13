import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { ReceipientsRole } from 'src/app/models/policyinfo';
import { Common } from 'src/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { compareValidator } from '../services/compare-validators.directive';
import { Params } from '@angular/router';


@Component({
  selector: 'app-duplicatepolicycontact',
  templateUrl: './duplicatepolicycontact.component.html',
  styleUrls: ['./duplicatepolicycontact.component.css']
})
export class DuplicatepolicycontactComponent implements OnInit {
  public bind: boolean = false;
  ReceipientDetails: any = [];
  AllReceipients: ReceipientsRole[];
  ReceipientDetailFinal: Array<ReceipientsRole> = [];
  ReceipientRoles : any;
  DPContact: FormGroup;
  ZipCode:any;
  l_Policyno:any
  l_ZipCode:any
  lnameValue: any;
  fnameValue: any;
  ddlRecipientRoleValue: any;
  ddlRecipientValue: any;
  emailValue: any;
  result: boolean=false;
  nameValue: string;
  
  constructor(private router: Router, private _data: DataService, private ngxService: NgxUiLoaderService, private common: Common,
    private route: ActivatedRoute) 
    {
      this.DPContact=new FormGroup(
        {
          ddlRecipient: new FormControl('', [Validators.required]),
          ddlRecipientRole: new FormControl('', [Validators.required]),
          FirstName: new FormControl('', [Validators.required]),
          LastName: new FormControl('', [Validators.required]),
          Email: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
          confirmEmail: new FormControl('', [Validators.required, compareValidator('Email')])

      })
    }

  ngOnInit(): void {

    this.route.params.forEach((params: Params) => {
      
      //this.Policyno = params['Policyno'];

      
      this.Policyno = this.route.snapshot.queryParams['pno'];
      this.l_Policyno = this.isNotNull(this.Policyno) ? this.common.decrypt(this.Policyno.toString()) : '';
  })
  }

  GoToSearch(data:any)
  {
    this.nameValue=this.DPContact.get('FirstName').value + ' '+ this.DPContact.get('LastName').value+ '  ';
  
    this.fnameValue=this.DPContact.get('FirstName').value;
    this.lnameValue=this.DPContact.get('LastName').value;
    this.emailValue=this.DPContact.get('Email').value;
    this.ddlRecipientRoleValue=this.DPContact.get('ddlRecipientRole').value;
    this.ddlRecipientValue=this.DPContact.get('ddlRecipient').value;
   
    let url=AppConstants.SERVICE_URL + "PolicyInformation/SaveDuplicatePolicyContact?FirstName="+ this.common.encrypt(this.fnameValue) + 
    "&LastName=" + this.common.encrypt(this.lnameValue) + "&Email=" + this.common.encrypt(this.emailValue) + 
    "&PolicyNo=" + this.common.encrypt(this.l_Policyno) + "&requestType="+this.common.encrypt("duplicatepolicy") +
    "&ReceipientRoleID=" + this.common.encrypt(this.ddlRecipientRoleValue) +"&ReqGroupId="+this.common.encrypt(this.ddlRecipientValue);
    this._data.GetService(url).subscribe((res:boolean)=>{
     // this.result=res;
     if(res==true)
     {
       this.result=res;
     }
    });       
    
  }
  getReceipientRole(value: string)
  {
    
    let url = AppConstants.SERVICE_URL + 'PolicyInformation/GetReceipientRole?requestType=' + this.common.encrypt('duplicatepolicy');
    this._data.GetService(url).subscribe(ReceipientInfos => { this.bindReceipentRole(ReceipientInfos, value)});       
  }

  bindReceipentRole(lstReceipients: any, value: string) {  
     
    this.ReceipientDetails = lstReceipients;
    this.ReceipientDetailFinal = [];
    if (this.ReceipientDetails != null && this.ReceipientDetails.length > 0) {
      // this.ReceipientRoles = lstReceipients;
      for (var i = 0; i < this.ReceipientDetails.length; i++) {
        if (lstReceipients[i].group_id == value)
        {
          let o = new ReceipientsRole();
          o.subgroup_id = lstReceipients[i].subgroup_id;
          o.subgroup_def = lstReceipients[i].subgroup_def;
          this.ReceipientDetailFinal.push(o);
        }
      }
    }
  }
  Policyno(Policyno: any) {
    throw new Error('Method not implemented.');
  }

  

  //Check if null or not
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
