import { Component, OnInit } from '@angular/core';
import { ToDoListLitem } from 'src/app/models/todo-list-item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  items: ToDoListLitem[] = [
    {description: 'clean gutters'},
    {description: 'clean roof'},
    {description: 'clean floor'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

  addItem(item: HTMLInputElement): void {
    const newItem: ToDoListLitem = {
      description: item.value
    }
    this.items = [newItem, ...this.items];
    item.value = '';
    item.focus();
  }

}
