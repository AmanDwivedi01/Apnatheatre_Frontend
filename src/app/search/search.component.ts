import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../Service/form.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  name:string | null = null;
  userdata:any={};
  backgroundColor:any;
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

  // return;
  let route = this.router.url.split("?")
    console.log(route);
    this.router_name = route[1]
    console.log(this.router_name);
    let data = this.formService.decrypt(this.router_name)
    console.log("decrypt",data)
    const params = new URLSearchParams(data);
      this.id = params.get('id');
      this.email = params.get('email');
      this.name = params.get('name');
      console.log('ID:', this.id);
      console.log('Email:', this.email);
      console.log('Name:',this.name);
      this.name='AMAN'
      this.backgroundColor=this.randomColor();
 }

 selectOption(option: string) {
  this.selectedOption = option;
 if (option === 'Title')
 {
    this.searchPlaceholder = 'Enter title to search';
    this.id=1;
 }
   else if (option === 'IMDb ID') 
   {
    this.searchPlaceholder = 'Enter IMDb ID to search';
    this.id=2;
  }
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
  id:this.id,
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
