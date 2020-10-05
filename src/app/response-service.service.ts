import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from './response';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable(
  {
  providedIn: 'root'
})
export class ResponseServiceService {

  private responseUrl : string;
  private getResponseUrl: string;
  private saveResponseUrl: string;
  private hostUrl: string

  constructor(private http: HttpClient,
     private messageService: MessageService) {
    this.hostUrl = 'http://localhost:8080'
    this.responseUrl= '/api/v2/response/';
    this.saveResponseUrl= '/api/v2/response';
    this.getResponseUrl= '/api/v2/response/stream';
   }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public findAll(): Observable<Response>{
    // return this.http.get<Response[]>(this.getResponseUrl);
    // this.messageService.add("Fetched All responses");
    return new Observable<Response>((observer) => {
      let eventSource = new EventSource(this.hostUrl+this.getResponseUrl);
      eventSource.onmessage = (event) => {
        console.debug("received Event: ", event);
        let responseJsonevent = JSON.parse(event.data);
        observer.next(responseJsonevent);
      };
      eventSource.onerror = (error) => {
        // readyState === 0 (closed) means the remote source closed the connection,
        // so we can safely treat it as a normal situation. Another way 
        // of detecting the end of the stream is to insert a special element
        // in the stream of events, which the client can identify as the last one.
        if(eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      }
    })
  }

  public get(id: string): Observable<Response>{
    // this.messageService.add("Fetcheing response "+id);
    return this.http.get<Response>(this.hostUrl+this.responseUrl+id);
  }

  public save(response: Response){
    // this.messageService.add("saving responses "+response.mockId);
    return this.http.post<Response>(this.hostUrl+this.saveResponseUrl,response,this.httpOptions);
  }

  public delete(id: string): Observable<any>{
    // this.messageService.add("Deleting "+id);
    return this.http.delete<any>(this.hostUrl+this.responseUrl+id);

  }

}

