/*******************************************
 * Author : Shloke Ghenghat
 * Created Date : 21 NOV 2019, Thursday
 * Decription :  producer properties
 *******************************************/
export class ProfileCallCounts {
    //history in counts
    Count_TotalCalls : number = 0;
    Count_AnsweredCalls : number = 0;
    Count_InsuredCalls : number = 0;
    Count_PolicyholderCalls : number = 0;
    Count_BrokerCalls : number = 0;
}

export class ProfileCallHistory{
    //Recent Call History
    Recent_Time : string;
    Recent_Identifier : string;
    Recent_IdentifierNo : string;
    Recent_Reason : string;
    Recent_Action : string;
    Recent_Type : string;
}

export class ProfileClaimNote{
    //Claim Note
    Claim_Time : string;
    Claim_ClaimNo : string;
    Claim_Note : string;
}

export class ProfilePolicyNote{
    //Policy Note
    Policy_Time : string;
    Policy_BusinessObjectCharId : string;
    Policy_Note : string;
}

export class CSRdetails{
    CSR_userid: string;
}