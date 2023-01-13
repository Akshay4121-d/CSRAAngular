/********************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 18 DEC 2018, Tuesday
 * Decription : screen where user can see producer associated ids and information
 ********************************************************************************/
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { DataService } from '../services/data.service';
import { Producer } from 'src/app/models/producer';
import { AppConstants } from 'src/app/app.constants';
import { Common } from 'src/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-producerresult',
  templateUrl: './producerresult.component.html',
  styleUrls: ['./producerresult.component.scss']
})
export class ProducerresultComponent implements OnInit {

  public records:boolean = false;
  public norecords:boolean = false;
  ProducerNumber: string;
  Producers: Producer[];
  ProducerDetail:any;
  ID_Login: string;
  ProducerNoText: string;
  EmailID: string;
  EmailText: string;
  ProducerDetailFinal: Array<Producer> = [];
  btnDelete: boolean;

  //constructor call: getProducerByNo method and stores param(ProducerNumber) from URL
  constructor(private _data : DataService,
              private route:ActivatedRoute,
              private common: Common,
              private ngxService: NgxUiLoaderService)
  { 
    this.ngxService.start();
    this.EmailID = this.route.snapshot.queryParams['E'];
    this.ProducerNumber = this.route.snapshot.queryParams['P'];

    this.EmailText = this.common.decrypt(this.EmailID);
    this.ProducerNoText = this.common.decrypt(this.ProducerNumber);
    // this.ProducerNumber=  this.route.snapshot.params['ProducerNumber'];
    if ((this.EmailID == null && this.ProducerNumber == null) ||
    (this.EmailID.trim() == '' && this.ProducerNumber.trim() == '')) {
      this.norecords = true;
        this.ngxService.stop(); 
    }
    else
      this.getProducerByNo(this.EmailID, this.ProducerNumber);
      }

  ngOnInit() { };

  //GET
  //To search and show producer's associated profiles
  getProducerByNo(Email: string, ProducerNumber: string)
  {
    let url = AppConstants.SERVICE_URL + "Producer/GetProducerByNo?Email=" + Email +"&ProducerNumber=" + ProducerNumber
    //this._data.GetService(url).subscribe(Producers => { this.ProducerDetail = Producers;
    this._data.GetService(url).subscribe(Producers => { this.bindProducerDetails(Producers)});
    
  }


bindProducerDetails(ProducerDetail: any) {
  this.ProducerDetail=ProducerDetail;
  if (this.ProducerDetail != null) {
    this.records = true;
    for (var i = 0; i < this.ProducerDetail.length; i++) {
      let o = new Producer();
      o.BrokerNumber= ProducerDetail[i].BrokerNumber;
      o.UserID= ProducerDetail[i].UserID;
      o.Email = ProducerDetail[i].Email;
      o.ID_LoginEnc = this.common.encrypt('#' + ProducerDetail[i].ID_Login + ',' + ProducerDetail[i].ID_ContactType);
      this.ProducerDetailFinal.push(o);
    }
  }
  else
    this.norecords = true;
  setTimeout(() => { this.ngxService.stop(); });
}

}
