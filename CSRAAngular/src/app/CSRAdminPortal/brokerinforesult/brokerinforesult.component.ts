/**************************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 23 OCT 2019, Wednesday
 * Decription : screen where user can see empolyer associated ids and information
 **************************************************************************************/
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Common } from 'src/common';
import { BrokerInfo } from 'src/app/models/brokerinfo';

@Component({
  selector: 'app-brokerinforesult',
  templateUrl: './brokerinforesult.component.html',
  styleUrls: ['./brokerinforesult.component.scss']
})
export class BrokerinforesultComponent implements OnInit {
  public records: boolean = false;
  public norecords: boolean = false;
  BrokerNo: string;
  FedralId: string;
  BrokerName: string;
  PhoneNo: string;
  
  BrokerDetails: any;
  BrokerInfos: BrokerInfo[];
  BrokerDetailFinal: Array<BrokerInfo> = [];

  //constructor call: stores param from URL and calls GetPolicyholderBySearch method
  constructor(private _data: DataService, private common: Common,
    private route: ActivatedRoute,private ngxService: NgxUiLoaderService) {
    this.BrokerNo = this.route.snapshot.queryParams['B'];
    this.FedralId = this.route.snapshot.queryParams['F'];
    this.BrokerName = this.route.snapshot.queryParams['N'];
    this.PhoneNo = this.route.snapshot.queryParams['P'];
    this.ngxService.start();
    if ((this.BrokerNo == null && this.FedralId == null && this.BrokerName == null && this.PhoneNo == null) ||
      (this.BrokerNo.trim() == '' && this.FedralId.trim() == '' && this.BrokerName.trim() == '' && this.PhoneNo.trim() == '')) {
      this.norecords = true;
      this.ngxService.stop();
    }
    else
      this.GetBrokerInfoBySearch(this.BrokerNo, this.FedralId, this.BrokerName, this.PhoneNo)

  }

  ngOnInit() {
  }

  //GET
  //get policy-holder by UserID or Fedral_TaxIDNumber or PolicyNumber
  GetBrokerInfoBySearch(BrokerNo: string, FederalId: string, BrokerName: string, PhoneNumber: string) {
    let url = AppConstants.SERVICE_URL + "Producer/GetBrokerInformationBySearch?BrokerNumber=" + BrokerNo + "&FederalId=" + FederalId + "&BrokerName=" + BrokerName + "&PhoneNumber=" + PhoneNumber
    this._data.GetService(url).subscribe(BrokerInfos => {
      this.bindBrokerDetail(BrokerInfos);
    });
  }

bindBrokerDetail(BrokerDetails: any) {
  this.BrokerDetails=BrokerDetails;
  if (this.BrokerDetails != null) {
    this.records = true;
    for (var i = 0; i < this.BrokerDetails.length; i++) {
      let o = new BrokerInfo();
      o.BrokerNumber= BrokerDetails[i].brokernumber;
      o.BrokerName = BrokerDetails[i].brokername;
      o.PhoneNumber = BrokerDetails[i].phone;
      o.Fein = BrokerDetails[i].taxid;
      o.BrokerNumberEnc = this.common.encrypt(o.BrokerNumber);
      this.BrokerDetailFinal.push(o);
    }
  }
  else
    this.norecords = true;
  setTimeout(() => { this.ngxService.stop(); });
}

}
