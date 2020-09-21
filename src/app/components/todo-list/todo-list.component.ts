import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ToDoListItem, ToDoListItemCreate } from 'src/app/models';
import { TodoService } from 'src/app/services/todo-service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  items$: Observable<ToDoListItem[]>;
  hasCompletedItems$: Observable<boolean>;

  constructor(private service: TodoService) { }

  ngOnInit(): void {
    this.items$ = this.service.getToDos();
    this.hasCompletedItems$ = this.service.hasCompletedItems();
  }

  addItem(item: HTMLInputElement): void {
    const newItem: ToDoListItemCreate = {
      description: item.value,
    }
    item.value = '';
    item.focus();
    this.service.addToDo(newItem);
  }

  markComplete(item: ToDoListItem): void {
    this.service.markComplete(item);
  }

  removeCompleted(): void {
    this.service.removeCompleted();
  }
}
