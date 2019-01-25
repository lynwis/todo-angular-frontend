// this file handles of all the routing of the application

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { TodoComponent } from './todo/todo.component';

// routes are defined adding objects to this array
const routes: Routes = [
  {path: '', component: LoginComponent},                // default path goes to login
  {path: 'login', component: LoginComponent},
  // with this, i'm saying that i expect a parameter "name" in the query string/url
  // the second arg is the component that's going to be initialized when the route is activated
  // the third is the CanActivate interface: you implement this interface in a Service to define boolean activation logic
  {path: 'welcome/:name', component: WelcomeComponent, canActivate: [RouteGuardService]},
  {path: 'todos', component: ListTodosComponent, canActivate: [RouteGuardService]},
  {path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService]},
  {path: 'todos/:id', component: TodoComponent, canActivate: [RouteGuardService]},

  {path: '**', component: ErrorComponent}               // everything else goes here

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
