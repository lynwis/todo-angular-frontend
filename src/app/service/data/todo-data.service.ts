import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';
import { API_BASE_JPA_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http: HttpClient
  ) { }

  retrieveAllTodos(userName: string) {
    return this.http.get<Todo[]>(`${API_BASE_JPA_URL}/users/${userName}/todos`);
  }

  retrieveTodo(userName: string, id: number) {
    return this.http.get<Todo>(`${API_BASE_JPA_URL}/users/${userName}/todos/${id}`);
  }

  deleteTodo(userName: string, id: number) {
    return this.http.delete(`${API_BASE_JPA_URL}/users/${userName}/todos/${id}`);
  }

  updateTodo(userName: string, id: number, todo: Todo) {
    console.log('update todo called' + todo);
    return this.http.put(`${API_BASE_JPA_URL}/users/${userName}/todos/${id}`, todo);
  }

  createTodo(userName: string, todo: Todo) {
    console.log('create todo called' + todo);
    return this.http.post(`${API_BASE_JPA_URL}/users/${userName}/todos`, todo);
  }
}