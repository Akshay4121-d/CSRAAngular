import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { LayoutComponent } from './layout/layout.component';
;

const routes: Routes =[
        {path: '', redirectTo: 'home', pathMatch: 'full'},
      //   {path: 'home', component: HomeComponent},
      //   {path: 'selectuser', component: SelectuserComponent ,canActivate:[AuthGuard],data: {roles: 'selectuser'} },
      //  {path: 'producersearch', component: ProducersearchComponent,canActivate:[AuthGuard],data: {roles: 'producersearch'}},
      //   {path: 'employersearch', component: EmployersearchComponent ,canActivate:[AuthGuard],data: {roles: 'employersearch'}},
      //   {path: 'membersearch', component: MembersearchComponent,canActivate:[AuthGuard],data: {roles: 'membersearch'} },
      //   {path: 'producerupdate/:ID_Login', component: ProducerupdateComponent ,canActivate:[AuthGuard],data: {roles: 'producerupdate'}},
      //  {path: 'producerresult', component: ProducerresultComponent ,canActivate:[AuthGuard],data: {roles: 'producerresult'}},
      //   {path: 'employerresult', component: EmployerresultComponent,canActivate:[AuthGuard] ,data: {roles: 'employerresult'}},
      //   {path: 'memberresult', component: MemberresultComponent,canActivate:[AuthGuard] ,data: {roles: 'memberresult'}},
      //   {path: 'employerupdate/:ID_Login', component: EmployerupdateComponent,canActivate:[AuthGuard],data: {roles: 'employerupdate'}},
      //   {path: 'memberupdate/:ClaimNumber', component: MemberupdateComponent,canActivate:[AuthGuard],data: {roles: 'memberupdate'}},
      //   {path: 'generic-error', component: GenericErrorComponent },
      //   {path: 'acknowledge', component: AcknowledgeComponent },
      //   {path: 'invalid-access', component: InvalidAccessComponent },
      //   {path: '**', component: HomeComponent},


{path:'', component:LayoutComponent,
children:[
  {path: '', loadChildren: './CSRAdminPortal/CSRAdminPortal.module#CSRAdminPortalModule'},
    ],
},
{ path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }