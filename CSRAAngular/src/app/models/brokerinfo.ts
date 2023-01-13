/*******************************************
 * Author : Shloke Ghenghat
 * Created Date : 23 OCT 2019, Wednesday
 * Decription :  producer properties
 *******************************************/
export class BrokerInfo {
    BrokerNumber: string;
    BrokerNumberEnc : string;
    ID_Broker: string;
    BrokerName: string;
    PhoneNumber: string;
    Fein: string;

    Address: string;
    City: string;
    State: string;
    Zipcode: string;
    Fax: string;
    Email: string;
    EffDate: string;
    TermDate: string;
    PolCount_Active: number;
    PolCount_Term: number;
    PolCount_Due: number;
    ID_BrokerEnc: string;

    //Policy Cancel
    PolCancel_Count: number;
    eff: string;
    termi_datee: string;
    pono1: string;
    ptelno: string;
    pname: string;
    pname1: string;
    bill_mode: string;
    termcode: string;
    SEVERITY: number;
    pzip: string;
    renewal_date: string;
    count_num: number;
    Dayslefttoreinstate: string;
    SEVERITYPFL: number;
    paymentURL: string;
    broker:string; //Added by Ravi For CO 3918

    //Recent Submission
    RowNumber: string;
    OLAPPNO: string;
    SUBMITTEDBY: string;
    DATESUBMITTED: string;
    STATUS: string;
    POLNO: string;
    EFFDT: string;
    POLNAME1: string;
    POLNAME2: string;
    FEDIDNUM: string;
    appbkrno: string;
    DisplayPrintDb120: string;
    printDB1201URL: string;
    PrintDB120Link: string;
    allowBrokerSubmission : boolean;

    


}