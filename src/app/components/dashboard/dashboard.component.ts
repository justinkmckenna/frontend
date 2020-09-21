import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoDashboard } from 'src/app/models';
import { TodoService } from 'src/app/services/todo-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  todoSummary$: Observable<ToDoDashboard>;

  constructor(private service: TodoService) { }

  ngOnInit(): void {
    this.todoSummary$ = this.service.getDashboard();
  }

}
