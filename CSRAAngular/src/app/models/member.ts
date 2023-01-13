/*******************************************
 * Author : Shloke Ghenghat
 * Created Date : 27 DEC 2018, Thursday
 * Decription :  member properties
 *******************************************/
export class Member {
    ClaimNumber: string;
    Email: string;
    SocialSecurityNo: string;
    Master_id: number;
    NameOnAccount: string;
    FullName: string;
    EmailChanged_Status: number;
    AccountLocked_Status: string;
    Master_idEnc:string;
    PilotCount:number;
}

export class ClaimDetails {
    ClaimNumber: number;
    Status: Date;
    IsTerminated: string;
    ShowWelcomeMessage: string;
    EmailId: string
    AccountLockedOut_Text: string;
    AccountActiveStatus_Text: string;
    //AccountLockedOut: number;
    PasswordExpirationDate: string;
    LastLoginDate: string;
    AccountCreated: string;
    SocialSecurityNo: string;
    Master_id: number;
    NameOnAccount: string;

}

export class ClaimNotes{
    ClaimNote: string;
}