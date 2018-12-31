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
    if (username==='pippo' && password==='pass') {
      return true;
    } else {
      return false;
    }
  }

}
