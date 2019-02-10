import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // we are loading the Todo asynchronously! when it's ready, the page might have already loaded, giving an error in console
    // using a "dummy" fixes this problem, the user will be shown something very quickly
    this.todo = new Todo(this.id, '', false, new Date());

    if (this.id != -1) {
      this.todoService.retrieveTodo('pippo', this.id)
        .subscribe(
          response => {
            console.log(`retrieving todo ${response.id}`)
            this.todo = response;
          }
        );
    }
  }

  saveTodo() {
    if (this.id == -1) {
      this.todoService.createTodo('pippo', this.todo)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate(['todos']);
          }
        )
    } else {
      this.todoService.updateTodo('pippo', this.id, this.todo)
        .subscribe(
          response => {
            console.log(response);
            this.router.navigate(['todos']);
          }
        );
    }
  }

}
