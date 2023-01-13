/**************************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 18 DEC 2018, Tuesday
 * Decription :  This call will have all connection related functions/methods 
 ********************************************s******************************************/

import {HttpHeaders} from "@angular/common/http";
export class AppConstants {
 
 //  <--LOCAL(for running API)-->
  public static get IntranetSiteURL(): string {return "localhost:4200/"};
  public static get IntranetSiteURL_SharePoint(): string {return "https://spiisdev/"};
 public static get SERVICE_URL(): string { return "http://localhost:60951/api/"};// Local development
  //public static get SERVICE_URL(): string { return "http://spiisdev:8090/api/" };
  public static get UserEpayURL(): string {return "http://localhost:55124/epay"};
  public static get UserURL(): string {return "https://area51.shelterpoint.com/"};
  //public static get IntranetPortalURL(): string { return "https://spiisdev:4431/SPIntranetPortal_Stage/"};
  public static get IntranetPortalURL(): string {return "http://localhost:50951"};
  public static get ReportServerURL(): string {return "http://spdevsql/ReportServer/Pages/ReportViewer.aspx?/"};

  //<--LOCAL(for hosted API)-->
  //public static get IntranetSiteURL(): string {return "localhost:4200/"};
  //public static get SERVICE_URL(): string { return "http://192.168.2.66/SPLWebAPI/api/" };
  
  
  //<--STAGE-->
  //public static get IntranetSiteURL(): string {return "https://spiisdev:4431/"};
  //public static get IntranetSiteURL_SharePoint(): string {return "https://spiisdev/"};
  //public static get SERVICE_URL(): string { return "https://spiisdev:4431/SPIntranetPortal_Stage/SPLWebAPI_Stage/api/" };
  ////public static get SERVICE_URL(): string { return "http://spiisdev:8090/api/" };
  //public static get UserEpayURL(): string {return "https://area51.shelterpoint.com/epay"};
  //public static get UserURL(): string {return "https://area51.shelterpoint.com/"};
  //public static get IntranetPortalURL(): string { return "https://spiisdev:4431/SPIntranetPortal_Stage/"};
  //public static get ReportServerURL(): string {return "http://spdevsql/ReportServer/Pages/ReportViewer.aspx?/"};


  // //<--STAGE New-->
  // public static get IntranetSiteURL(): string {return "https://spdeviis:4431/"};
  // public static get IntranetSiteURL_SharePoint(): string {return "https://spdeviis/"};
  // public static get SERVICE_URL(): string { return "https://spdeviis:4431/SPIntranetPortal_Stage/SPLWebAPI_Stage/api/" };// Stage deploy
  // //public static get SERVICE_URL(): string { return "http://spdeviis:8090/api/" };
  // public static get UserEpayURL(): string {return "https://area51.shelterpoint.com/epay"};
  // public static get UserURL(): string {return "https://area51.shelterpoint.com/"};
  // public static get IntranetPortalURL(): string { return "https://spdeviis:4431/SPIntranetPortal_Stage/"};
  // public static get ReportServerURL(): string {return "http://spdevsql/ReportServer/Pages/ReportViewer.aspx?/"};

  //<--PRODUCTION-->
  // public static get IntranetSiteURL(): string {return "https://spiisprod:4431/"};
  // public static get IntranetSiteURL_SharePoint(): string {return "https://spiisprod/"};
  // public static get SERVICE_URL(): string { return "https://spiisprod:4431/SPIntranetPortal/SPLWebAPI/api/" };
  // public static get UserEpayURL(): string {return "https://www.shelterpoint.com/epay"};
  // public static get UserURL(): string {return "https://www.shelterpoint.com/"};
  // public static get IntranetPortalURL(): string { return "https://spiisprod:4431/SPIntranetPortal/"};
  // public static get ReportServerURL(): string {return "http://spprodsql/ReportServer/Pages/ReportViewer.aspx?/"};

  public static get API_HEADERS(): any { 
    return new HttpHeaders().set('Content-Type', 'application/json');
  };
}