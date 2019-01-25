import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number;
  todo: Todo;

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // we are loading the Todo asynchronously! when it's ready, the page might have already loaded, giving an error in console
    // using a "dummy" fixes this problem, the user will be shown something very quickly
    this.todo = new Todo(1, '', false, new Date());
    this.todoService.retrieveTodo('pippo', this.id)
      .subscribe(
        response => {
          console.log(`retrieving todo ${response.id}`)
          this.todo = response;
        }
      );
  }



}
