import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private httpClient: HttpClient
  ) { }

  executeHelloWorldBeanService() {
    return this.httpClient.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
  }

  executePersonalizedHelloWorldBeanService(userName: String) {
    return this.httpClient.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${userName}`);
  }

}

export class HelloWorldBean {
  constructor (public message: string) {}
}
