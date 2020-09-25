import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { removeBook, updateBookTitle } from '../../actions/book.actions';
import { BookListItem } from '../../models/book-list-item';
import { BooksState } from '../../reducers';
import { BookEntity } from '../../reducers/books.reducers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {

  @Input() books: BookListItem[];
  isEditing: string = null;

  constructor(private store: Store<BooksState>) { }

  ngOnInit(): void {

  }

  removeBook(book: BookEntity): void {
    this.store.dispatch(removeBook({payload: book}));
  }

  edit(bookId: string): void {
    this.isEditing = bookId;
  }

  stopEditing(): void {
    this.isEditing = null;
  }

  updateTitle(newTitle: string, book: BookEntity): void {
    this.store.dispatch(updateBookTitle({newTitle, payload: book}));
    this.isEditing = null;
  }
}
