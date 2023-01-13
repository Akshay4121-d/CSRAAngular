import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
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
import { AuthGuard } from '../auth.guard';
import { BrokerinfosearchComponent } from './brokerinfosearch/brokerinfosearch.component';
import { BrokerinforesultComponent } from './brokerinforesult/brokerinforesult.component';
import { BrokerinfodetailedComponent } from './brokerinfodetailed/brokerinfodetailed.component';
import { ClaiminfosearchComponent } from './claiminfosearch/claiminfosearch.component';
import { ClaiminforesultComponent } from './claiminforesult/claiminforesult.component';
import { ClaimdetailsComponent } from './claimdetails/claimdetails.component';
import { PolicyinfosearchComponent } from './policyinfosearch/policyinfosearch.component';
import { PolicyinforesultComponent } from './policyinforesult/policyinforesult.component';
import { PolicydetailsComponent } from './policydetails/policydetails.component';
import { DuplicatepolicyComponent } from "./duplicatepolicy/duplicatepolicy.component";
import { DuplicatepolicycontactComponent } from "./duplicatepolicycontact/duplicatepolicycontact.component";
import { DuplicatebillComponent } from "./duplicatebill/duplicatebill.component";
import {DuplicatebillcontactComponent} from "./duplicatebillcontact/duplicatebillcontact.component";
import { GenerateCertificateComponent } from "./generatecertificate/generatecertificate.component";
import { PostingNoticeComponent } from "./postingnotice/postingnotice.component";

const routes: Routes =[
    {path: 'home', component: HomeComponent},
    {path: 'brokerinfosearch', component: BrokerinfosearchComponent ,canActivate:[AuthGuard],data: {roles: 'Broker Information Search'} },
    {path: 'selectuser', component: SelectuserComponent ,canActivate:[AuthGuard],data: {roles: 'Online Account Management'} },
    {path: 'producersearch', component: ProducersearchComponent,canActivate:[AuthGuard],data: {roles: 'Online Account Management'}},
    {path: 'employersearch', component: EmployersearchComponent ,canActivate:[AuthGuard],data: {roles: 'Online Account Management'}},
    {path: 'membersearch', component: MembersearchComponent,canActivate:[AuthGuard],data: {roles: 'Online Account Management'} },
    {path: 'producerupdate/:ID_Login', component: ProducerupdateComponent ,canActivate:[AuthGuard],data: {roles: 'Online Account Management'}},
    {path: 'brokerinforesult', component: BrokerinforesultComponent, canActivate:[AuthGuard],data: {roles: 'Broker Information Search'} },
    {path: 'producerresult', component: ProducerresultComponent ,canActivate:[AuthGuard],data: {roles: 'Online Account Management'}},
    {path: 'employerresult', component: EmployerresultComponent,canActivate:[AuthGuard] ,data: {roles: 'Online Account Management'}},
    {path: 'memberresult', component: MemberresultComponent,canActivate:[AuthGuard] ,data: {roles: 'Online Account Management'}},
    {path: 'employerupdate/:ID_Login', component: EmployerupdateComponent,canActivate:[AuthGuard],data: {roles: 'Online Account Management'}},
    {path: 'memberupdate/:Master_id', component: MemberupdateComponent,canActivate:[AuthGuard],data: {roles: 'Online Account Management'}},
    //{path: 'brokerinfodetailed/:ID_Broker', component: BrokerinfodetailedComponent, canActivate:[AuthGuard],data: {roles: 'Broker Information Search'} },
    {path: 'brokerinfodetailed/:Broker_Number', component: BrokerinfodetailedComponent, canActivate:[AuthGuard],data: {roles: 'Broker Information Search'} },
    {path: 'generic-error', component: GenericErrorComponent },
    {path: 'acknowledge', component: AcknowledgeComponent },
    {path: 'invalid-access', component: InvalidAccessComponent },
    {path: 'claiminfosearch', component: ClaiminfosearchComponent ,canActivate:[AuthGuard],data: {roles: 'Claim Information Search'} },
    // {path: 'claiminfosearch/:p', component: ClaiminfosearchComponent ,canActivate:[AuthGuard],data: {roles: 'Claim Information Search'}},
    {path: 'claiminforesult', component: ClaiminforesultComponent ,canActivate:[AuthGuard],data: {roles: 'Claim Information Result'} },
    {path: 'claimdetails', component: ClaimdetailsComponent ,canActivate:[AuthGuard],data: {roles: 'Claim Details'} },
    {path: 'policyinfosearch', component: PolicyinfosearchComponent ,canActivate:[AuthGuard],data: {roles: 'Policy Information Search'} },
    {path: 'policyinforesult', component: PolicyinforesultComponent ,canActivate:[AuthGuard],data: {roles: 'Policy Information Result'} },
    {path: 'policydetails', component: PolicydetailsComponent ,canActivate:[AuthGuard],data: {roles: 'Policy Details'} },
    {path:'duplicatepolicy', component:DuplicatepolicyComponent, data:{roles:'Policy Details'} },
    {path:'duplicatepolicycontact', component:DuplicatepolicycontactComponent, data:{roles:'Policy Details'} },
    {path:'duplicatebill', component:DuplicatebillComponent, data:{roles:'Policy Details'}},
    {path:'duplicatebillcontact', component:DuplicatebillcontactComponent, data:{roles:'Policy Details'}},
    {path:'generatecertificate', component:GenerateCertificateComponent, data:{roles:'Policy Details'}},
    {path:'postingnotice', component:PostingNoticeComponent, data:{roles:'Policy Details'}}
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CSRAdminPortalRoutingModule { }