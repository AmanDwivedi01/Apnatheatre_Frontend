import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class FormService {
    

  SECRET_KEY :string = 'apnatheatre@1234';
    constructor() { }
    
    encrypt = (plaintext: string) => {      
      return CryptoJS.AES.encrypt(plaintext, this.SECRET_KEY).toString();
    };
    
    decrypt = (data: string) => {
      let removedSpaceUrl = Object.keys(data)[0].replace(/\s/g,'+');              
      let decryptedData = CryptoJS.AES.decrypt( removedSpaceUrl+'==', this.SECRET_KEY).toString(CryptoJS.enc.Utf8);
      return  decryptedData;
      // return CryptoJS.AES.decrypt(plaintext, this.SECRET_KEY).toString(
      //   CryptoJS.enc.Utf8
      // );
    };

}