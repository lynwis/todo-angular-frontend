import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// by implementing this class, i'm creating an httpInterceptor, that can add a basic auth header to each request
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();
    // the request obj cannot be modified, so we'll clone it and modify the property "setHeaders"
    // we will set the Authorization property with the string we created
    request = request.clone({
      setHeaders : {
        Authorization : basicAuthHeaderString
      }
    });

    // the interceptor acts like a filter in a chain, so now we send control back to the next filter in the chain
    return next.handle(request);

  }

  createBasicAuthenticationHttpHeader(): string {
    let username = 'pippo';
    let password = 'pass';
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    return basicAuthHeaderString;
  }
  
}
