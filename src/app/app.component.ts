import { Component } from '@angular/core';

// Decorator: this is how you declare that something is a component in Angular
@Component({
  selector: 'app-root',                 // tag name of the Component, i.e. you will use it like this <app-root></app-root>
  templateUrl: './app.component.html',  // location of html template
  //template: '<h1>{{title}}</h1>',
  styleUrls: ['./app.component.css']    // location of styling
})
export class AppComponent {
  title = 'todo';                       // this statements creates a variable that can be referenced in the html template via "interpolation" (DataBinding), like {{title}}
  name = 'Marco';
}
