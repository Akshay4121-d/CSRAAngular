/**************************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 14 DEC 2018, Friday
 * Decription :  This call will get data from API
 **************************************************************************************/

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {observable, throwError} from 'rxjs'
import {retry,catchError} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  
   }

  //used to call GET api's methods
  GetService(url: string) {    
    return this.http.get(url);
  }


// CallMethod(){
//   this.http.get('https://spiisprod:4431/SPIntranetPortal/SPLWebAPI/api/common/GetUserName', {
//     withCredentials: true
//     }).subscribe(response => {
//     console.log({ response })
//     // this.submit();
//     });
//}

  

  //used to call POST api's methods
  PostService(url: string, toUpdate) {
    return this.http.post(url, toUpdate)
  }

  // private extractData(res: Response) {
  //   let body = JSON.parse(res.text());
  //   if (body) {
  //       return body
  //   } else {
  //       return {}
  //   }
  // }

  // private handleError(error: any) {
  //   // In a real world app, we might use a remote logging infrastructure
  //   // We'd also dig deeper into the error to get a better message
  //   if (error.status == 401) {


  //       $.SmartMessageBox({
  //           title: "<i class='fa fa-exclamation-triangle txt-color-orangeDark'></i> Error! <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span>",
  //           content: 'Your session has been expired. Please Login again.',
  //           buttons: '[Log In]'
  //       }, (ButtonPressed) => {
  //           window.location.href = '/auth/login';
  //       });

  //   }

  //   try {
  //       let errMsg = (error.message) ? error.message :
  //           error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //       
  //       return Observable.throw(errMsg);
  //   }
  //   catch (e) {
  //     
  //   }
  // }

  // PostService(url: string, data: any, authtoken:string): Observable<any> {

  //   var headers = new Headers();
  //   headers.append("Content-Type", 'application/json');
  //   if (authtoken) {
  //       headers.append("Authorization", 'bearer ' + authtoken)
  //   }
  //   headers.append("Accept", 'application/json');

  //   var requestoptions = new RequestOptions({
  //       method: RequestMethod.Post,
  //       url:  url,
  //       headers: headers,
  //       body: JSON.stringify(data)
  //   });

  //   let req = new Request(requestoptions);

  //   let body = JSON.stringify(data);
  //   return this.http
  //       .post(url, body, requestoptions)
  //       .map(this.extractData)
  //       .catch(this.handleError);
  //  }   
}