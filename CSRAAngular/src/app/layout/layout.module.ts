import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { LayoutComponent } from './layout.component';
import {FormsModule} from "@angular/forms";
import { RouterModule } from '@angular/router';
import {NgxUiLoaderModule} from 'ngx-ui-loader'
import {NgxUiLoaderService} from 'ngx-ui-loader'
import { DataService } from '../CSRAdminPortal/services/data.service';
import { Common } from 'src/common';
import { AppConstants } from '../app.constants';
import { AuthGuard } from '../auth.guard';
import { HttpErrorInterceptor } from '../http-error-interceptor';


@NgModule({
    declarations: [
        LayoutComponent,
        SiteHeaderComponent,
        SiteFooterComponent,
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        NgxUiLoaderModule

      ],
      exports:[
        LayoutComponent,
        SiteHeaderComponent,
        SiteFooterComponent
      ],
      providers: [DataService, Common, AppConstants,AuthGuard,NgxUiLoaderService,
        {
          provide:HTTP_INTERCEPTORS,
          useClass:HttpErrorInterceptor,
          multi:true,
          
        }]
    })
export class LayoutModule
{
   
}