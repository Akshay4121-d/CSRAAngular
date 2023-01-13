import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import { DataService } from 'src/app/CSRAdminPortal/services/data.service';
import { Router} from '@angular/router';
import { Common } from 'src/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var $: any;


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent  {
  title = 'WebUtilities';





constructor(private router: Router,private _data:DataService,private common:Common,private ngxService: NgxUiLoaderService){
//   if(sessionStorage.getItem('isAccess')=="undefined" || sessionStorage.getItem('isAccess')==null)
//   {//if(sessionStorage.getItem('isAccess').toString().toUpperCase()!="TRUE")
// //   Home: Customer Service Rep Tools //Previous - CSR Call Utilities
// // 3rd tab: Online Account Management
// // 4th tab: Commission Statement Information
//  // this.checkAccess1('Customer Service Rep Tools');//  
// }
//   else
//   {//  
//   }
}

checkAccess1(role : string)
{
    let isAccess:boolean=false;
  let url = AppConstants.SERVICE_URL + "common/CheckUserAccess?role="+role;
  this._data.GetService(url).subscribe(isAccess => { this.forSuccess(isAccess.toString())
     
    });
}
forSuccess(isAccess:string)
{
  //sessionStorage.clear();
  
  if(isAccess.toUpperCase()=="TRUE")
  {
  sessionStorage.setItem('isAccess', this.common.encrypt(isAccess.toString()));
  
  }
  else
  {
    this.router.navigate(['/invalid-access']);
  }
}

ngOnInit(){
  $(document).ready(function(){
  var ftr = $(window).height();
  var calculate = ftr - 50;
  $('.ach_portal').css("min-height", calculate);
});
}


}
