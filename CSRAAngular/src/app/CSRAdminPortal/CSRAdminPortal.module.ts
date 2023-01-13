
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SelectuserComponent } from './selectuser/selectuser.component';
import { ProducersearchComponent } from './producersearch/producersearch.component';
import { ProducerresultComponent } from './producerresult/producerresult.component';
import { ProducerupdateComponent } from './producerupdate/producerupdate.component';
import { EmployersearchComponent } from './employersearch/employersearch.component';
import { EmployerresultComponent } from './employerresult/employerresult.component';
import { EmployerupdateComponent } from './employerupdate/employerupdate.component';
import { MembersearchComponent } from './membersearch/membersearch.component';
import { GenericErrorComponent } from '../generic-error/generic-error.component';
import { AcknowledgeComponent } from '../acknowledge/acknowledge.component';
import { InvalidAccessComponent } from '../invalid-access/invalid-access.component';
import { MemberresultComponent } from './memberresult/memberresult.component';
 import { MemberupdateComponent } from './memberupdate/memberupdate.component';
 import {CSRAdminPortalRoutingModule} from './CSRAdminPortal.routing';
 import { BrowserModule } from '@angular/platform-browser';
 import { NgxMaskModule } from 'ngx-mask';
import { BrokerinfosearchComponent } from './brokerinfosearch/brokerinfosearch.component';
import { BrokerinforesultComponent } from './brokerinforesult/brokerinforesult.component';
import { BrokerinfodetailedComponent } from './brokerinfodetailed/brokerinfodetailed.component';
import { AgGridModule } from 'ag-grid-angular';
import { ExportAsModule } from 'ngx-export-as';
import {DpDatePickerModule} from 'ng2-date-picker';
import { ClaiminfosearchComponent } from './claiminfosearch/claiminfosearch.component';
import { ClaiminforesultComponent } from './claiminforesult/claiminforesult.component';
import {MatSortModule} from '@angular/material/sort';
import { ClaimdetailsComponent } from './claimdetails/claimdetails.component';
import { DemoMaterialModule } from './material-module';
import { PolicyinfosearchComponent } from './policyinfosearch/policyinfosearch.component';
import { PolicyinforesultComponent } from './policyinforesult/policyinforesult.component';
import { PolicydetailsComponent } from './policydetails/policydetails.component';
import { DuplicatepolicyComponent } from './duplicatepolicy/duplicatepolicy.component';
import { DuplicatepolicycontactComponent } from './duplicatepolicycontact/duplicatepolicycontact.component';
import { DuplicatebillComponent } from './duplicatebill/duplicatebill.component';
import { DuplicatebillcontactComponent } from './duplicatebillcontact/duplicatebillcontact.component';
import { GenerateCertificateComponent } from './generatecertificate/generatecertificate.component';
import { PostingNoticeComponent } from './postingnotice/postingnotice.component';
import { CompareValidatorDirective } from './services/compare-validators.directive';

@NgModule({
  declarations: [
    HomeComponent,
    SelectuserComponent,
    ProducersearchComponent,
    ProducerresultComponent,
    ProducerupdateComponent,
    EmployersearchComponent,
    EmployerresultComponent,
    EmployerupdateComponent,
    MembersearchComponent,
    GenericErrorComponent,
    AcknowledgeComponent,
    MemberresultComponent,
    MemberupdateComponent,
    InvalidAccessComponent,
    BrokerinfosearchComponent,
    BrokerinforesultComponent,
    BrokerinfodetailedComponent,
    ClaiminfosearchComponent,
    ClaiminforesultComponent,
    ClaimdetailsComponent,
    PolicyinfosearchComponent,
    PolicyinforesultComponent,
    PolicydetailsComponent,
    DuplicatepolicyComponent,
    DuplicatepolicycontactComponent,
    DuplicatebillComponent,
    DuplicatebillcontactComponent,
    GenerateCertificateComponent,
    PostingNoticeComponent,
    CompareValidatorDirective
  ],
  imports: [
    CommonModule,
    CSRAdminPortalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    AgGridModule.withComponents([]),
    //AgGridModule.withComponents([ButtonRendererComponent]),
    ExportAsModule,
    DpDatePickerModule,
    MatSortModule,
    DemoMaterialModule    
  ]
})

export class CSRAdminPortalModule { }
