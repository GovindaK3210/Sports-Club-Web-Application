import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as moment from "moment";


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  baseUri:string = 'http://localhost:4000/login';


  constructor(private http: HttpClient) {
  }
    

         
      
  login(email:string, password:string ): Observable<any>  {
    

    return this.http.post(this.baseUri, {email, password}).pipe(
        map((res: Response) => {
          console.log(res);
          this.setSession(res);
      
        }),
        
        catchError(this.errorMgmt)
      )
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );

    localStorage.setItem('user_id', authResult.user_id);
    localStorage.setItem('user_name', authResult.user_name);
    localStorage.setItem('user_email', authResult.user_email);
    localStorage.setItem('user_role', authResult.user_role);

                

}     

logout() {
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");

  localStorage.removeItem('user_id')
  localStorage.removeItem('user_name')
  localStorage.removeItem('user_email')
  localStorage.removeItem('user_role')
}

public isLoggedIn() {
  return moment().isBefore(this.getExpiration());
}

isLoggedOut() {
  return !this.isLoggedIn();
}

getUserRole() {
  return localStorage.getItem("user_role");
}

getUserName() {
  return localStorage.getItem("user_name");
}

getUserEmail() {
  return localStorage.getItem("user_email");
}

getUserID() {
  return localStorage.getItem("user_id");
}

getExpiration() {
  const expiration = localStorage.getItem("expires_at");
  const expiresAt = JSON.parse(expiration);
  return moment(expiresAt);
}    


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

}
