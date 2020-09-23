import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BooksState, selectSortByAuthor, selectSortByTitle } from '../../reducers';
import * as actions from '../../actions/book-sort.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-sorter',
  templateUrl: './book-sorter.component.html',
  styleUrls: ['./book-sorter.component.scss']
})
export class BookSorterComponent implements OnInit {

  sortingByTitle$: Observable<boolean>;
  sortingByAuthor$: Observable<boolean>;

  constructor(private store: Store<BooksState>) { }

  ngOnInit(): void {
    this.sortingByAuthor$ = this.store.pipe(select(selectSortByAuthor));
    this.sortingByTitle$ = this.store.pipe(select(selectSortByTitle));
  }

  sortByTitle(): void {
    this.store.dispatch(actions.sortByTitle());
  }

  sortByAuthor(): void {
    this.store.dispatch(actions.sortByAuthor());
  }

}
