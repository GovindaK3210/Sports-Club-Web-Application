import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  baseUri:string = 'http://localhost:4000/user';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create
  createPlayer(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all players
  getPlayers() {
    return this.http.get(`${this.baseUri}`);
  }

  // Get player
  getPlayer(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update player
  updatePlayer(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete player
  deletePlayer(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //Practice sessions functions

  baseUriPracticeSession:string = 'http://localhost:4000/practice-session';

  //Create session
  createSession(data): Observable<any> {
    let url = `${this.baseUriPracticeSession}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all sessions
  getSessions() {
    return this.http.get(`${this.baseUriPracticeSession}`);
  }

  // Get session by session id
  getSessionBySessionID(id): Observable<any> {
    let url = `${this.baseUriPracticeSession}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update session by sesson id
  updateSession(id, data): Observable<any> {
    let url = `${this.baseUriPracticeSession}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete session
  deleteSession(id): Observable<any> {
    let url = `${this.baseUriPracticeSession}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
  
  // get session by playerID
  getSessionByPlayerID(id): Observable<any> {
    let url = `${this.baseUriPracticeSession}/read-by-playerid/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }


  // get session by coachID
  getSessionByCoachID(id): Observable<any> {
    let url = `${this.baseUriPracticeSession}/read-by-coachid/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }




  //Attendance functions

  baseUriAttendance:string = 'http://localhost:4000/attendance';


  createAttendance(data): Observable<any> {
    let url = `${this.baseUriAttendance}/create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }


  getAttendanceByIDandDate(id, date): Observable<any> {
    let url = `${this.baseUriAttendance}/read-special/${id}/${date}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getAllAttendanceByDate(date): Observable<any> {
    let url = `${this.baseUriAttendance}/find-date/${date}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }



}