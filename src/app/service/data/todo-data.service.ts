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

  retrieveTodo(userName: string, id) {
    return this.http.get<Todo>(`http://localhost:8080/users/${userName}/todos/${id}`);
  }

  deleteTodo(userName: string, id) {
    return this.http.delete(`http://localhost:8080/users/${userName}/todos/${id}`);
  }

  updateTodo(userName: string, id: number, todo: Todo) {
    console.log(todo);
    return this.http.put(`http://localhost:8080/users/${userName}/todos/${id}`,
      todo);
  }

  createTodo(userName: string, todo: Todo) {
    console.log(todo);
    return this.http.post(`http://localhost:8080/users/${userName}/todos`,
      todo);
  }
}