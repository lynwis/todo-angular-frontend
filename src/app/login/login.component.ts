import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardCodedAuthenticationService } from '../service/hard-coded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMessage: string;
  invalidLogin: boolean;

  // Router - i need an instance to route user to welcome page
  // i can get it by dependency injection via a parameter in the constructor


  // in Typescript, constructor arguments are visible in the whole class, much like member variables
  constructor(private router: Router,
    private hardCodedAuthService: HardCodedAuthenticationService,
    private basicAuthService: BasicAuthenticationService) {
    this.username = '';
    this.password = '';
    this.errorMessage = "Invalid credentials";
    this.invalidLogin = false;
  }

  ngOnInit() {
  }

  /**
   * Fake hardcoded login
   */
  handleHardCodedLogin() {
    console.log(this.username);
    console.log(this.password);

    // if (this.username==='pippo' && this.password==='pass') {
    if (this.hardCodedAuthService.authenticate(this.username, this.password)) {
      // routing to welcome page, passing username as parameter
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }

    this.username = '';
    this.password = '';

  }

  /**
   * Baic authentication login
   */
  handleBasicAuthLogin() {
    // i'm placing the username in this local variable because otherwise
    // when the welcome page is first loaded, as this service is called asynchronously,
    // the username won't be visualized on the page
    // i'm using this local variable as parameter for the routing
    let user = this.username;
  // NB here we're gonna call the basic auth service
  // since service calls are asynchronous (Observables), we need to specify two callback functions
  // to handle success and error scenarios
    this.basicAuthService.authenticate(this.username, this.password)
      .subscribe(
        response => {   // success
          console.log(response);
          this.router.navigate(['welcome', user]);
          this.invalidLogin = false;
        },
        error => {    // error scenario
          console.log(error);
          this.invalidLogin = true;
        }
      )

    this.username = '';
    this.password = '';

  }

}
