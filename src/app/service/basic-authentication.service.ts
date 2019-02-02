import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

// the Injectable decorator is what makes this class a Service
// the class gathers all the authentication logic, and it can provide it to any component
// the component needing this logic just needs to inject this class in its constructor
@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string) { 
    let basicAuthString = this.createBasicAuthenticationHttpHeader(username, password);
    let header = new HttpHeaders( {
      Authorization: basicAuthString
    } );

    return this.httpClient.get<AuthenticationBean>('http://localhost:8080/basicauth',
      { headers : header }).pipe(   // "pipe" is executed only in case of sucessful response
        map(
          data => {
            sessionStorage.setItem('authenticatedUser', username);
            // setting an authentication token in session storage
            sessionStorage.setItem('authToken', basicAuthString);
            return data;
            // NB here we are still working on the DEFINITION of the observable
            // this code is executed only when someone subscribes to the observable we send back!
          }
        )
      );
      // basically, this is happening: in case of successful call, the "pipe" function is called
      // this function operates on the response data
      // we're not interested in editing that data, but we want to store the fact that the user successfully authenticated
      // so we're calling the "map" function, which executes a given "command" and returns the observable data
      // we're not really doing anything on the data, just passing it back along

  }

  createBasicAuthenticationHttpHeader(username: string, password: string): string {
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    return basicAuthHeaderString;
  }

  getAuthenticatedUser() : string {
    return sessionStorage.getItem('authenticatedUser');
  }

  getAuthenticatedToken() : string {
    if (this.getAuthenticatedUser())
      return sessionStorage.getItem('authToken');
    else
      return null;
  }

  isUserLoggedIn() {
    return !(this.getAuthenticatedUser() === null);
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.removeItem('authToken');

  }

}

export class AuthenticationBean {
  constructor(public message: string) {}
}
