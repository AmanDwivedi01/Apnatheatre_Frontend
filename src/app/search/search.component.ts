import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormService } from '../Service/form.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  router_name: string | undefined;
  value:string | undefined;
  imgPath = './img/test.jpg';
  apiUrl:string="http://localhost:3000";
  selectedOption: string | null = null;
  searchPlaceholder: string = 'Choose Options';
  responseArray:any=[];
  email:string | null = null;
  id:any;
  data:any={};
  decdata:string='';
  name:string | null = null;
  userdata:any={};
  backgroundColor:any;
  ids: number=0;
  // http: any;
  //  data = {
  //   id: 1,
  //   title: 'The Matrix',
  // };
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
    }
    )
    console.log(this.id);
    console.log(this.email);
    console.log(this.name);
  })
 }
 selectOption(option: string) {
  this.selectedOption = option;
 if (option === 'Title')
 {
    this.searchPlaceholder = 'Enter title to search';
    this.ids=1;
 }
   else if (option === 'IMDb ID') 
   {
    this.searchPlaceholder = 'Enter IMDb ID to search';
    this.ids=2;
  }
}
details(imd:string)
{
  let data=JSON.stringify('id='+this.id+'&email='+this.email+'&name='+this.name+'&imdbid='+imd);
  let encryptedUrl = this.formService.encrypt(data)
  this.router.navigateByUrl(`/details?${encryptedUrl}`);
}
randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
 

 search()
 {
  console.log(this.id);
  console.log(this.value);
  if(this.id===0||this.value===undefined)
  {
    this.toastrService.error(" Select options First & Enter The value. ", '', { timeOut: 3000, positionClass: "toast-top-center",  closeButton: true, tapToDismiss: true })
    $(".overlay-container").addClass("addcontainerdisable");
    return;
  }
else
{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
   this.data={
  id:this.ids,
  title: this.value,
}
  console.log('hit')
  console.log(this.data);
  this.http.post(this.apiUrl + "/search", { data: JSON.stringify(this.data) }, httpOptions).subscribe(
    (response: any) => {
      console.log(response);
      this.responseArray=response.Search;
      console.log("array me value",this.responseArray);
 }
)}
 }
}
