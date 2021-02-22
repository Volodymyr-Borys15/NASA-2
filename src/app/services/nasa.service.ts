import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import {  Photos } from '../interfaces/photo';
import { catchError, delay,map,pluck,retryWhen, take } from 'rxjs/operators';
import { handleError } from '../shared/handle-error';
import { startingPage } from '../interfaces/starting-page';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  //apiKey:string = 'RclUaAiqC24sqIAOXUJaXg26aqSzKa2eXQV0x1RE';
 
  startingPage = `https://api.nasa.gov/planetary/apod?api_key=RclUaAiqC24sqIAOXUJaXg26aqSzKa2eXQV0x1RE`;
  
  constructor(private http:HttpClient) { }

  getStartingPage():Observable<startingPage>{
    return this.http.get<startingPage>(this.startingPage).pipe(
      map(data => data),
      catchError(handleError),
      retryWhen(err => err.pipe(
        delay(1000),
        take(3))) 
    )
  }
  getSelectedPhoto(rover?,sol?,camera?,num?):Observable<Photos[]>{

    const reqUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=RclUaAiqC24sqIAOXUJaXg26aqSzKa2eXQV0x1RE`;
     
    return this.http.get<any>(reqUrl).pipe(
      pluck('photos'),
      map((a:Array<Photos>) => { return a.splice(0,num)}),
      catchError(handleError),
      retryWhen(err => err.pipe(
        delay(1000),
        take(3))) 
    )
   }
}
