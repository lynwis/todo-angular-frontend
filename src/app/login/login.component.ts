import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {
    this.username = '';
    this.password = '';
    this.errorMessage = "Invalid credentials";
    this.invalidLogin = false;
  }

  ngOnInit() {
  }

  handleLogin() {
    console.log(this.username);
    console.log(this.password);

    if (this.username==='pippo' && this.password==='pass') {
      // routing to welcome page, passing username as parameter
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }

    this.username = '';
    this.password = '';

  }

}
