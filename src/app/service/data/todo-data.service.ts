import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveAllTodos(userName: string) {
    return this.http.get<Todo[]>(`http://localhost:8080/users/${userName}/todos`);
  }

  deleteTodo(userName: string, id) {
    return this.http.delete(`http://localhost:8080/users/${userName}/todos/${id}`);
  }

}