import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '../response';
import { Header } from '../header';
import { ResponseServiceService } from '../response-service.service';
import { ResponseComponent } from '../response/response.component';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { MessageService } from '../message.service';

@Component({
  providers:[ResponseComponent],
  selector: 'app-response-form',
  templateUrl: './response-form.component.html',
  styleUrls: ['./response-form.component.css']
})
export class ResponseFormComponent implements OnInit{

  responseForm: FormGroup;
  headers: FormArray;  

  submitted = false;

  isLoadingResults = false;
  matcher = new ErrorStateMatcher();

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private responseService: ResponseServiceService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {
     }

  ngOnInit(){
    this.route.data.subscribe(data =>{
      switch (data.kind) {
        case 'edit':
          this.onEdit();
          break;
        default:
          break;
      }
    })
    this.responseForm = this.formBuilder.group({
      mockId : "",
      statusCode : null,
      contentType : "",
      encoding : "",
      body : null,
      headers : this.formBuilder.array([]),
      delay : null,
    });
    // console.log("created sket");
  }

  onEdit(){
    this.getResponseForEdit(this.route.snapshot.params.id);
  }

  getResponseForEdit(id: string){
    this.responseService.get(id).subscribe(data => {
      this.responseForm.patchValue({
        mockId : data.mockId,
        statusCode : data.statusCode,
        contentType : data.contentType,
        encoding : data.encoding,
        body : data.body,
        headers : data.headers,
        delay : data.delay,
      })
      // console.log("patchedValue");
      data.headers.forEach(header => this.getHeaders.push(this.formBuilder.group(header)));
      // console.log("patched header");
    },
    error => {
      console.log(error);
      this.messageService.add("Error fetching mockResponse: "+id);
      this.gotoDashboard();
    });
  }

  onSubmit(){
    this.isLoadingResults = true;
    this.responseService.save(this.responseForm.value).subscribe(result => {
      this.submitted = true;
      this.isLoadingResults = false;
      this.messageService.add("Saved MockResponse "+result.mockId+" Endpoint: /api/v2/response/test/"+result.mockId);
      this.gotoDashboard();
    },
    (err: any) => {
      console.log(err);
      this.messageService.add("Error: "+err)
      this.isLoadingResults = false;
    });
  }

  gotoDashboard(){
    this.router.navigate(['/']);
  }

  Remove(index) {
    // console.log("Remove Header at "+index);
    this.headers = this.getHeaders;
    this.headers.removeAt(index);
  }

  get getHeaders() {
    // console.log("getting Headers")
    return this.responseForm.get('headers') as FormArray;
  }

  createHeader(): FormGroup{
    // console.log("Creating header")
    return this.formBuilder.group({
      name: "",
      value: ""
    });
  }

  addHeader():void {
    // console.log("Adding header")
    this.headers = this.getHeaders;
    this.headers.push(this.createHeader());
  }
}
