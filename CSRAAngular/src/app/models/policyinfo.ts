import * as internal from "stream";

export class PolicyInfo {
   policynumber: string="";
   policytype: string="";
   policyeffectivedate: string="";
   carrier: string="";
   rosternonroster: string="";
   policyname: string="";
   policyphoneno: string="";
   fedid: string="";
   wcbdate: string="";
   uier: string="";
   wcbemployer: string="";
   policyfax: string="";
   policyaddress: string="";
   policyzip: string="";
   policyemail: string="";
   brokerno: string="";
   brokername: string="";
   brokerphonenumber: string="";
   borkeraddress: string="";
   salesrep: string="";
   billmode: string="";
   malerate: string="";
   femalerate: string="";
   census: string="";
   payrollfactor: string="";
   benefitlevel: string="";
   inhospitalrider: string="";
   malecount: string="";
   femalecount: string="";
   beneftieffectivedate: string="";
   inhospitaleffectivedate: string="";
   total: string="";
   policystatus: string="";
   wservice: string="";
   pfleffectivedate: string="";
   pflrider: string="";
   amendedbenefit: string="";
   brokertermdate: string="";
}

export class States {
   statecode: string="";
}

export class PolicyResult {
   Policyno: string="";
   Policyname: string="";
   FederalId: string="";
   BrokerNo: string="";
   Status: string="";
   Address: string="";
   City: string="";
   State: string="";
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

export class ReceipientsRole{
   subgroup_id: string ="";
   subgroup_def: string = "";
}