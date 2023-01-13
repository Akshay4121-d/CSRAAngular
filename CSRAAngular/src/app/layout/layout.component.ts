import { Component } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import { DataService } from 'src/app/CSRAdminPortal/services/data.service';
import { Router} from '@angular/router';
import { Common } from 'src/common';
import { NgxUiLoaderService } from 'ngx-ui-loader'
declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './layout.component.html',
  
  })
  export class LayoutComponent  {
    title = 'WebUtilities';

    constructor(NgxUiLoaderService:NgxUiLoaderService)
    {}

    ngOnInit(){
      $(document).ready(function(){
      var ftr = $(window).height();
      var calculate = ftr - 130;
      $('.ach_portal').css("min-height", calculate);
    });
    }

  }  