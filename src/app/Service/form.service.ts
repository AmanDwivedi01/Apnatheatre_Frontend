import { Injectable } from '@angular/core';
const SECRET_KEY :string = 'apna123';
import * as CryptoJS from 'crypto-js';
import { enc } from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class FormService {
    

  encryptdata:string='';
  decryptdata:any;
 
    constructor() {
  }
    encrypt(data: String )
    {
      
      console.log(data);
      this.encryptdata=CryptoJS.AES.encrypt(data.trim(),SECRET_KEY).toString();
      return this.encryptdata;
    }
    decrypt(data:String)
    {
      
      console.log(data);
      this.decryptdata = CryptoJS.AES.decrypt(data.trim(), SECRET_KEY).toString();
      return this.decryptdata;
    }
}