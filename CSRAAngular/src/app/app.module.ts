import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataService } from './CSRAdminPortal/services/data.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';

import { Common } from 'src/common';
import { AppConstants } from './app.constants';

import { InvalidAccessComponent } from './invalid-access/invalid-access.component';
import {AuthGuard} from './auth.guard';
import {HttpErrorInterceptor} from './http-error-interceptor'
import {NgxUiLoaderModule} from 'ngx-ui-loader'
import {LayoutModule} from './layout/layout.module';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [
    AppComponent,
    // ProducersearchComponent,
    // SelectuserComponent,
    // ProducerresultComponent,
    // HomeComponent,
    // ProducerupdateComponent,
    // EmployersearchComponent,
    // EmployerresultComponent,
    // EmployerupdateComponent,
    // MembersearchComponent,
    // MemberresultComponent,
    // MemberupdateComponent,
    // AcknowledgeComponent,
    // GenericErrorComponent,
    //InvalidAccessComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    LayoutModule,
    NgxMaskModule.forRoot(),
    NgxUiLoaderModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AccordionModule.forRoot()
  ],
  providers: [DataService, Common, AppConstants,AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpErrorInterceptor,
      multi:true
    }]
  ,
  bootstrap: [AppComponent],
})
export class AppModule { }
