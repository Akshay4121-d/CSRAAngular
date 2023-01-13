/********************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 28 DEC 2018, Friday
 * Decription : screen where user can see member's associated ids and information
 ********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';
import { Member } from 'src/app/models/member';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Common } from 'src/common';

@Component({
  selector: 'app-memberresult',
  templateUrl: './memberresult.component.html',
  styleUrls: ['./memberresult.component.scss']
})
export class MemberresultComponent implements OnInit {
  public records: boolean = false;
  public norecords: boolean = false;
  EmailID: string;
  ClaimNo: string;
  LastName: string;
  MemberDetail: any;
  MemberDetailFinal: Array<Member> = [];
  Members: Member[];
  rpath: string = '';
  FetchedMasterId: number;
  PilotCount : number;

  //constructor call: GetMemberBySearch method and stores param values from URL
  constructor(private _data: DataService,
    private common: Common,
    private route: ActivatedRoute, private ngxService: NgxUiLoaderService) {
    this.EmailID = this.route.snapshot.queryParams['U'];
    this.ClaimNo = this.route.snapshot.queryParams['C'];
    this.LastName = this.route.snapshot.queryParams['L'];
    this.ngxService.start();
    if ((this.EmailID == null && this.ClaimNo == null && this.LastName == null) ||
      (this.EmailID.trim() == '' && this.ClaimNo.trim() == '' && this.LastName == '')) {
      this.norecords = true;
      this.ngxService.stop();
    }
    else
      this.GetMemberBySearch(this.EmailID, this.ClaimNo, this.LastName.replace("'", "''"))
  }

  ngOnInit() {

  }


  //GET
  //To search and show member's associated profiles
  GetMemberBySearch(Email: string, ClaimNumber: string, LastName: string) {
    let url = AppConstants.SERVICE_URL + "Member/GetClaimBySearch?Email=" + Email + "&ClaimNumber=" + ClaimNumber + "&LastName=" + LastName
    this._data.GetService(url).subscribe(Members => {
      this.bindMemberDetail(Members);
    });
  }
  bindMemberDetail(MemberDetail: any) {
    this.MemberDetail = MemberDetail;
    if (this.MemberDetail != null) {
      this.records = true;
      for (var i = 0; i < this.MemberDetail.length; i++) {
        let o = new Member();
        o.FullName = MemberDetail[i].FullName;
        o.Email = MemberDetail[i].Email;
        o.SocialSecurityNo = MemberDetail[i].SocialSecurityNo;
        this.PilotCount = MemberDetail[i].PilotCount;
        o.Master_idEnc = this.common.encrypt('#' + MemberDetail[i].Master_id + ',' + o.SocialSecurityNo);
        if(MemberDetail[i].Master_id == 0 || MemberDetail[i].Master_id == null){
          this.records = false;
          this.norecords = true;
        }
        else{
          this.records = true;
          this.norecords = false;
          this.MemberDetailFinal.push(o);
        }
      }
    }
    else{
      this.PilotCount = -1;
      this.norecords = true;
    }
    setTimeout(() => { this.ngxService.stop(); });
  }
}
