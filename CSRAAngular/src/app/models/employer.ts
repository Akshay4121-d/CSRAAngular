/*******************************************
 * Author : Shloke Ghenghat
 * Created Date : 27 DEC 2018, Thursday
 * Decription :  employer properties
 *******************************************/
export class Employer {
    ID_Login: number;
    Flag_Active: number=0;
    ActiveText: string;
    ActiveCommand: string;
    PolicyNumber: string;
    UserID: string;
    ID_Contact: number;
    Email: string;
    HintQuestion: string;
    HintAnswer: string;
    NameOnAccount: string;
    UserName: string;
    Fedral_TaxIDNumber: string;
    ID_PolicyOnline: number;
    ID_Policy: number;
    CompanyName: string;
    OrderNumber: number;
    FEIN: string;
    EmployerName: string;
    ID_LoginEnc : string;
    ID_Group : number; //CO#4144 Multiple Employer Account For Get Admin we Added Ravi
    ID_EmployerAdmin : number; //CO#4144 Multiple Employer Account For Get Admin we Added Ravi
    ActiveCount : number; //CO#4144 Multiple Employer Account For Get Admin we Added Ravi
}

export class PolicyNotes{
    PolicyNote: string;
}

export class Users {   //CO#4144 Multiple Employer Account For Get Admin we Added Ravi
    ID_Login: number;
    UserName: string;
 }