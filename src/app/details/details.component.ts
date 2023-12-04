import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormService } from '../Service/form.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
 

  id:any;
  email: string='';
  name: string='';
  imdbid: string='';
backgroundColor: any;
apiUrl:string="http://localhost:3000";
  responseArray: any=[];
  data:any={};
  value: any;





  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastrService: ToastrService,
    private formService:FormService,
  )
  {
  }


  ngOnInit()
  {
   this.route.queryParams.subscribe((encryptedUrl: any) => {
     let decryptedUrl: string = JSON.parse(this.formService.decrypt(encryptedUrl));
     let params = decryptedUrl.split('&');
     console.log(params);
     params.forEach((param: string) => {
       let [key, val] = param.split('=');
       if(key==='id')
       {
         this.id=val;
       }
       if(key==='email')
       {
         this.email=val;
       }
       if(key==='name')
       {
         this.name=val;
       }
       if(key==='imdbid')
       {
        this.imdbid=val;
        this.details()
       }
     }
     )
     console.log(this.id);
     console.log(this.email);
     console.log(this.name);
   })
   




  }
details()
{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
   this.data={
  id:2,
  title: this.imdbid,
}
  this.http.post(this.apiUrl + "/search", { data: JSON.stringify(this.data) }, httpOptions).subscribe(
    (response: any) => {
      console.log(response);
      this.responseArray=response.Search;
      console.log("array me value",this.responseArray);
 }
)}
}
