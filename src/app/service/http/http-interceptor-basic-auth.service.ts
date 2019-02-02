import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
// by implementing this class, i'm creating an httpInterceptor, that can add a basic auth header to each request
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(
    private basicAuthSrv : BasicAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();
    let basicAuthHeaderString = this.basicAuthSrv.getAuthenticatedToken();
    let username = this.basicAuthSrv.getAuthenticatedUser();
    // the request obj cannot be modified, so we'll clone it and modify the property "setHeaders"
    // we will set the Authorization property with the string we created
    if (basicAuthHeaderString && username) {
      request = request.clone({
        setHeaders : {
          Authorization : basicAuthHeaderString
        }
      });
    }

    // the interceptor acts like a filter in a chain, so now we send control back to the next filter in the chain
    return next.handle(request);

  }

  // after introducing basic authentication service, i'm getting this
  // directly from the service (it gets retrieved from session storage)
  // createBasicAuthenticationHttpHeader(): string {
  //   let username = 'pippo';
  //   let password = 'pass';
  //   let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
  //   return basicAuthHeaderString;
  // }
  
}
