import { Injectable } from '@angular/core';

// the Injectable decorator is what makes this class a Service
// the class gathers all the authentication logic, and it can provide it to any component
// the component needing this logic just needs to inject this class in its constructor
@Injectable({
  providedIn: 'root'
})
export class HardCodedAuthenticationService {

  constructor() { }

  authenticate(username: string, password: string) {
    // console.log('before login, isLogged: ' + this.isUserLoggedIn());
    if (username==='pippo' && password==='pass') {
      sessionStorage.setItem('authenticatedUser', username);
      // console.log('after login, isLogged: ' + this.isUserLoggedIn());
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

}
