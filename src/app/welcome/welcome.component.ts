// NB in javascript, many classes can be defined in the same file, which is called "Module" (just like in Java there are packages)

// if i want to use classes from other js Modules, I have to import them
// this one is a built-in angular module
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// this is how you import a class from another module
// import {AppComponent} from '../app.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

// NB interfaces are a TS concept
// in java, you declare public classes if you want to reference them outside of the package
// in TS, you must use EXPORT to make a class available to other modules
export class WelcomeComponent implements OnInit {
  message: string;
  username: string;
  
  // inject ActivatedRoute to get url parameters
  constructor(private route: ActivatedRoute) {
    this.message = "ciao!";   // NB in TS you can use double quotes to declare strings
    // this.message = 5;      compilation error, the type is string
  }

  // ngOnInit() : void {
  ngOnInit() {
    this.username = this.route.snapshot.params['name'];
  }

}
