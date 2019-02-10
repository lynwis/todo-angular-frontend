import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_BASIC_AUTH_URI, API_JWT_AUTH_URI } from '../app.constants';

export const TOKEN = 'authToken'
export const AUTHENTICATED_USR = 'authenticatedUser'

// the Injectable decorator is what makes this class a Service
// the class gathers all the authentication logic, and it can provide it to any component
// the component needing this logic just needs to inject this class in its constructor
@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string) : Observable<AuthenticationBean> { 
    // calling the authenticate endpoint with a post request containing username and password
    // we're getting back the jwt token, we're gonna save it in session storage
    return this.httpClient.post<any>(
      `${API_BASE_URL}${API_JWT_AUTH_URI}`,
      // this syntax is a shortcut, it produces a json object using the variable name as the property name
      // and its value as the value, i.e.
      // { "username": "value", "password" : "value" }
        {
          username,
          password
        }
      ).pipe(   // "pipe" is executed only in case of sucessful response
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USR, username);
            // setting the jwt token in session storage
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
            return data;
            // NB here we are still working on the DEFINITION of the observable
            // this code is executed only when someone subscribes to the observable we send back!
          }
        )
      );
  }

  getAuthenticatedUser() : string {
    return sessionStorage.getItem(AUTHENTICATED_USR);
  }

  getAuthenticatedToken() : string {
    if (this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN);
    else
      return null;
  }

  isUserLoggedIn() : boolean {
    return !(this.getAuthenticatedUser() === null);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USR);
    sessionStorage.removeItem(TOKEN);

  }

  private createBasicAuthenticationHttpHeader(username: string, password: string): string {
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    return basicAuthHeaderString;
  }

}

export class AuthenticationBean {
  constructor(public message: string) {}
}
