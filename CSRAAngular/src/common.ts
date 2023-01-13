/**************************************************************************************
 * Author : Shloke Ghenghat
 * Created Date : 20 DEC 2018, Thursday
 * Decription :  This call will have all common functions/methods 
 **************************************************************************************/

export class Common
{
    encrypted: string;
    decrypted: string;

    //To encrypt sensitive information.
    encrypt(inString: string)
    {
        this.encrypted = window.btoa(inString); 
        return this.encrypted;
    }

    //To decrypt the encrypted information.
    decrypt(inString: string)
    {
        this.decrypted = window.atob(inString);
        return this.decrypted;
    }
}