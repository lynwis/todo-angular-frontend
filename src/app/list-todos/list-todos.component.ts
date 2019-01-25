import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';

// a TS file is, afterall, still a JS module, so i can create any number of classes inside of it
export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) { }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  // todos = [
  //   new Todo(1, 'Learn Typescript, dammit!', false, new Date()),
  //   new Todo(2, 'Learn Angular, dammit!', false, new Date()),
  //   new Todo(3, 'Learn Node, dammit!', false, new Date())
  // ];

  todos: Todo[];
  message: string;

  constructor(
    private todoService: TodoDataService
  ) { }

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos('pippo').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }

  deleteTodo(id) {
    console.log(`Todo ${id} deleted`);
    this.todoService.deleteTodo('pippo', id).subscribe(
      response => {
        console.log(response);
        this.message = `Successfully deleted Todo ${id}`;
        this.refreshTodos();
      }
    )
  }

}
