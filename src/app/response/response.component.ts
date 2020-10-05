import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Response } from '../response'
import { RESPONSES } from '../mock-response';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseServiceService } from '../response-service.service';
import { Observable } from 'rxjs';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  // responses= RESPONSES;
  responses: Response[] =[];
  selectedResponse : Response;

  onSelect(response: Response): void{
    this.selectedResponse = response;
  }

  constructor(private responseService: ResponseServiceService,
    private cdr: ChangeDetectorRef,
    private route : ActivatedRoute,
    private router: Router,
    private messageService: MessageService) { }
  // constructor() {}

  ngOnInit() : void{
    this.responses=[];
    this.getResponses();
  }
  // ngOnInit(): void{}

  getResponses(): void{
    let responseObservable: Observable<Response>;
    this.responseService.findAll()
    .subscribe(data => {
      this.responses.push(data);
      this.cdr.detectChanges();
    });
  }

  onDelete(id: string){
    this.responseService.delete(id).subscribe(data => {
      console.log(data);
      this.messageService.add("Deleted : "+id);
    },
    error => {
      this.messageService.add("Error deleting: "+id);
    });
    this.ngOnInit();
  }

  onEdit(response: Response){
    this.router.navigate(['response/edit/'+response.mockId]);
  }

}
