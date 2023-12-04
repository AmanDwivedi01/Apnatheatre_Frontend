import { Component, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormService } from '../Service/form.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  appemail:string="";
  apppassword:string="";
  appName:string="";
  apiUrl:string="http://localhost:3000";
  id:number | undefined;
  // router: any;


  constructor(private el: ElementRef,
     private renderer: Renderer2,
     private toastrService: ToastrService, 
     private http: HttpClient,
     private formService:FormService,
     private router:Router) { }

  ngAfterViewInit() {
   
    const signUpButton = this.el.nativeElement.querySelector('#signUp');
    const signInButton = this.el.nativeElement.querySelector('#signIn');
    const container = this.el.nativeElement.querySelector('#container');

    signUpButton.addEventListener('click', () => {
      this.renderer.addClass(container, 'right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      this.renderer.removeClass(container, 'right-panel-active');
    });
  }

  signUp() 
  {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordregex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (this.appName == "") {
    this.toastrService.error("Name is Required. ", '', { timeOut: 3000, positionClass: "toast-top-center",  closeButton: true, tapToDismiss: true })
    $(".overlay-container").addClass("addcontainerdisable");
    return;
  }
  else if (this.apppassword === "") {
    this.toastrService.error("Password  is Required. ", '', { timeOut: 3000, positionClass: "toast-top-center",  closeButton: true, tapToDismiss: true })
    $(".overlay-container").addClass("addcontainerdisable");
    return;
  }
  else if (passwordregex.test(this.apppassword) == false) {
    this.toastrService.error(" Valid Password  is Required. ", '', { timeOut: 3000, positionClass: "toast-top-center",  closeButton: true, tapToDismiss: true })
    $(".overlay-container").addClass("addcontainerdisable");
    return;
  }
  else if (this.appemail === "") {
    this.toastrService.error("Email  is Required. ", '', { timeOut: 3000, positionClass: "toast-top-center",  closeButton: true, tapToDismiss: true })
    $(".overlay-container").addClass("addcontainerdisable");
    return;
  }
  else if (emailRegex.test(this.appemail) == false) {
    this.toastrService.error("Email  is Required. ", '', { timeOut: 3000, positionClass: "toast-top-center",  closeButton: true, tapToDismiss: true })
    $(".overlay-container").addClass("addcontainerdisable");
    return;
  }
  else
  { 
    const data={
      name:this.appName,
      email:this.appemail,
      password:this.apppassword
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http.post(this.apiUrl + "/login", { data: JSON.stringify(data) }, httpOptions).subscribe(
      (response: any) => {
        console.log(response);

        if(response.status===206 || response.status===500)
        {
          this.toastrService.error(response.data.msg, '', { timeOut: 3000, positionClass: "toast-top-center",  closeButton: true, tapToDismiss: true })
        
        }
        else {
            this.toastrService.success(response.data.msg, '', { timeOut: 3000, positionClass: "toast-top-center", closeButton: true, tapToDismiss: true });
          }
        },
      (error: any) => {
        console.error(error)
        this.toastrService.error(error, '', { timeOut: 3000, positionClass: "toast-top-center",  closeButton: true, tapToDismiss: true })
      }
    );  
  }
  }

  signIn() 
  {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordregex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

   if (this.apppassword === "") {
    this.toastrService.error("Password  is Required. ", '', { timeOut: 3000, positionClass: "toast-top-center",  closeButton: true, tapToDismiss: true })
    $(".overlay-container").addClass("addcontainerdisable");
    return;
  }
  else if (passwordregex.test(this.apppassword) == false) {
    this.toastrService.error(" Valid Password  is Required. ", '', { timeOut: 3000, positionClass: "toast-top-center",  closeButton: true, tapToDismiss: true })
    $(".overlay-container").addClass("addcontainerdisable");
    return;
  }
  else if (this.appemail === "") {
    this.toastrService.error("Email  is Required. ", '', { timeOut: 3000, positionClass: "toast-top-center",  closeButton: true, tapToDismiss: true })
    $(".overlay-container").addClass("addcontainerdisable");
    return;
  }
  else if (emailRegex.test(this.appemail) == false) {
    this.toastrService.error("Email  is Required. ", '', { timeOut: 3000, positionClass: "toast-top-center",  closeButton: true, tapToDismiss: true })
    $(".overlay-container").addClass("addcontainerdisable");
    return;
  }
  else
  { 
    const data={
      email:this.appemail,
      password:this.apppassword
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http.post(this.apiUrl + "/signin", { data: JSON.stringify(data) }, httpOptions).subscribe(
      (response: any) => {
        console.log(response);
        if(response.status===201)
         {
          this.id=response.data.id;
          this.appName=response.data.name;
          console.log(this.id);
            this.toastrService.success(response.data.msg, '', { timeOut: 3000, positionClass: "toast-top-center", closeButton: true, tapToDismiss: true });
            let data=JSON.stringify('id='+this.id+'&email='+this.appemail+'&name='+this.appName);
            // let encriptUrl = ;
            // console.log(encriptUrl);
            let encryptedUrl = this.formService.encrypt(data)
            this.router.navigateByUrl(`/search?${encryptedUrl}`);
          }
        },
      (error: any) => {
        console.error(error)
        this.toastrService.error("Something went  wrong. ", '', { timeOut: 3000, positionClass: "toast-top-center",  closeButton: true, tapToDismiss: true })
      }
    );  
  }












  }
  validateInputAlpha(event: any) {
    const input = event.target.value;
    const nonNumericInput = input.replace(/[^a-zA-Z\s.]/g, '');
    event.target.value = nonNumericInput;
  }
}

