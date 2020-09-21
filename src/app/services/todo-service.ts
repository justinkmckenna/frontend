import { BehaviorSubject, Observable } from 'rxjs';
import { count, mergeMap, map, tap } from 'rxjs/operators';
import { ToDoListItemCreate, ToDoDashboard, ToDoListItem } from '../models';

export class TodoService {

  private subject: BehaviorSubject<ToDoListItem[]>;
  private data: ToDoListItem[] = [
    {id: '1', description: 'build shelves', completed: false},
    {id: '2', description: 'build bed', completed: false}
  ];

  currentId = 3;

  constructor() {
    this.subject = new BehaviorSubject(this.data);
    // go to the api and get the data and cache it here
  }

  getToDos() {
    return this.subject.asObservable();
    // if some component wants to observe (look but dont change) this data they will call this
  }

  addToDo(item: ToDoListItemCreate): void {
    // add to api
    const newItem: ToDoListItem = {
      id: (this.currentId++).toString(),
      description: item.description,
      completed: false
    };
    this.data = [newItem, ...this.data];
    this.subject.next(this.data); // pushes new data to subscriber
  }

  markComplete(item: ToDoListItem): void {
    this.data.filter(x => x.id === item.id)[0].completed = true;
    this.subject.next(this.data);
  }

  removeCompleted(): void {
    this.data = this.data.filter(x => !x.completed);
    this.subject.next(this.data);
  }

  hasCompletedItems(): Observable<boolean> {
    return this.subject.pipe(
      map(items => items.filter(t => t.completed)),
      map(completed => completed.length),
      map(num => num > 0)
    );
  }

  getDashboard(): Observable<ToDoDashboard> {
    return this.subject.pipe(
      map(items => items as ToDoListItem[]),
      map(items => {
        return {
          totalTodos: items.length,
          completed: items.filter(item => item.completed).length,
          incomplete: items.filter(item => !item.completed).length
        } as ToDoDashboard;
      })
    );
  }
}
