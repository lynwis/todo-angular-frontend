import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  executeHelloWorldBeanService() {
    return this.httpClient.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
  }

  executePersonalizedHelloWorldBeanService(userName: string) {
    // 
    // this logic has been refactored and moved to the http interceptor for basic auth
    // these headers are authomatically added to every outgoing request
    // 
    // let basicAuthString = this.createBasicAuthenticationHttpHeader();
    // let header = new HttpHeaders( {
    //   Authorization: basicAuthString
    // } );
    // return this.httpClient.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${userName}`,
    //   {headers : header});

    return this.httpClient.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${userName}`);
  }

  // createBasicAuthenticationHttpHeader(): string {
  //   let username = 'pippo';
  //   let password = 'pass';
  //   let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
  //   return basicAuthHeaderString;
  // }

}

export class HelloWorldBean {
  constructor (public message: string) {}
}
