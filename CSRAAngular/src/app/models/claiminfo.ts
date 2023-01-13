export class States{
   statecode: string;
}

export class ClaimResult{
   Claim: string;
   FirstName: string;
   LastName: string;
   SSN: string;
   Address: string;
   City: string;
   State: string;
   Checkno: string;
   Status: string;
   DOB: string;
   Policyno: string;
   Policyname: string;
}

export class ClaimInfo{
   //parameter for Basic Info
   ClaimNumber: string;
   FirstName: string;
   LastName: string;
   FullName :string;
   Address: string;
   City: string;
   State: string;
   FullAddress:string;
   Zip: string;
   Phone: string;
   Gender: string;
   DOB: string;
   SSN: string;
   
   //parameter for Benifit Details
   BenifitRate: string;
   FirstDayOfLeave :string;
   LeaveType:string;
   LeavePattern:string;
   AccountACCumulator: string;
   PFACCumulator: string;
   Contribution: string;
   TAX : string;
   UintedLocation:string;
   ShowDays:string;

   DeliveryDate:string;
   OnSetDate:string;
   DeliveryType:string;
   DaysWorked:string;

   //parameter for Claim Status
   // TermDate: string;
   // TentativeRTWDate: string;
   // ActualRTWDate: string;
   // WorkCertifiedTo: string;
   // AccountCreated: string;
   // ID:string;
   // AccountLocked:string;
   

   //parameter for Policy Info
   PolicyNumber:string;
   Name:string;
   Effective:string;
   TermDatePolicyInfo: string;   
   TermCode: string;   
   BenifitLevel: string;   
   SpecialProvisions:string;

   pAddress: string;
   pCity: string;
   pState: string;
   pZip: string;
   pFullAddress:string;
   PolicyType: string;

}

export class ClaimStatusInfo {
   TermDate: string;
   MedRTW:string;
   TentativeRTWDate: string;
   ActualRTWDate: string;
   WorkCertifiedTo: string;
   AccountCreated: string;
   ID:string;
   AccountLocked:string;

   EstRTW:string;
}

export class ClaimPaymentInfo{
   CheckDate: string;
   Check : string;
   CheckFrom :string;
   ChecTo :string;
   Weeks :string;
   ToDate :string;
   FICA :string;
   NET :string;
   AddlTax :string;
   SendCode :string;
   CheckStatus :string;
   ClaimsVoidDate:string;
   viewperiodicpayments:boolean;
   PeriodicPayment :string;   
}


export class AdditionalCoverageLocationInfo{
   Name: string;
   Address : string;
   City :string;
   State :string;
   Zip :string;
   FEIN :string;
   EffDate	 :string;
   TermDate	 :string;
   Loc  :string;  
}