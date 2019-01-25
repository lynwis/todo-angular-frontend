// NB in javascript, many classes can be defined in the same file, which is called "Module" (just like in Java there are packages)

// if i want to use classes from other js Modules, I have to import them
// this one is a built-in angular module
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService, HelloWorldBean } from '../service/data/welcome-data.service';
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
  messageFromService: string;
  
  // inject ActivatedRoute to get url parameters
  constructor(private route: ActivatedRoute,
    private service: WelcomeDataService) {
    this.message = "ciao!";   // NB in TS you can use double quotes to declare strings
    // this.message = 5;      compilation error, the type is string
  }

  // ngOnInit() : void {
  ngOnInit() {
    this.username = this.route.snapshot.params['name'];
  }

  getWelcomeMessage() {
    // here an Observable is being used
    // the service is not really called until someone (observer) subscribes to the observable
    console.log(this.service.executeHelloWorldBeanService());
    // subscribe needs a callback function in order for us to get the data from the service
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );

    console.log("get welcome message ends");
  }

  getCustomWelcomeMessage(userName: string) {
    this.service.executePersonalizedHelloWorldBeanService(userName).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  handleSuccessfulResponse(response: HelloWorldBean) {
    console.log(response);
    console.log(response.message);
    this.messageFromService = response.message;
  }

  handleErrorResponse(error) {
    console.log(error);
    console.log(error.error);
    console.log(error.error.message);
    this.messageFromService = error.error.message;
  }

}
