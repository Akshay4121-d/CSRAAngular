import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';
import { DataService } from 'src/app/CSRAdminPortal/services/data.service';
import { Common } from 'src/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private _data:DataService,private common:Common) { }

checkAccess:boolean=false;
userRole:string="";
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
 let roles = route.data["roles"] as Array<string>;

if(roles!=null || roles!=undefined)
{
    this.userRole=roles.toString();
    this.checkAccess1('Customer Service Rep Tools');
}

//if(sessionStorage.getItem('isAccess')=="undefined" || sessionStorage.getItem('isAccess')==null)
  
//   {//if(sessionStorage.getItem('isAccess').toString().toUpperCase()!="TRUE")
//   this.checkAccess1('CSR Call Utilities');
//   }
//   else
//   {
 return true;
  //}
        //  if (sessionStorage.getItem('isAccess')=='true') {
        // //     // logged in so return true
        //      return true;
        //  }
        // 
        // // not logged in so redirect to login page with the return url
        // this.router.navigate(['/invalid-access']);
        // return false;
    }
    Assignpermission(AllAccess:any)
    {
    AllAccess.forEach(function(value){
     
      if(value.Title.toString().toUpperCase() ==this.userRole.toUpperCase())
    {
        this.checkAccess=true;
        return;
    }
}.bind(this));
  if(!this.checkAccess)
  this.router.navigate(['/acknowledge']);  
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
  let url = AppConstants.SERVICE_URL + "common/GetAccessMenus";
  this._data.GetService(url).subscribe(UserPermissionsData => this.Assignpermission(UserPermissionsData));
  }
  else
  {
    this.router.navigate(['/invalid-access']);
  }
}
}