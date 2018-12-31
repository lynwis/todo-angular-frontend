// this file handles of all the routing of the application

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';

// routes are defined adding objects to this array
const routes: Routes = [
  {path: '', component: LoginComponent},                // default path goes to login
  {path: 'login', component: LoginComponent},
  {path: 'welcome/:name', component: WelcomeComponent}, // with this, i'm saying that i expect a parameter "name" in the query string/url
  {path: 'todos', component: ListTodosComponent},
  
  {path: '**', component: ErrorComponent}               // everything else goes here

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
