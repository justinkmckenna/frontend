import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { bookCreated } from '../../actions/book.actions';
import { BookListItem } from '../../models/book-list-item';
import { BooksState, selectBookListItems } from '../../reducers';
import { BookListState } from '../../reducers/books.reducers';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  bookForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<BooksState>) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      numberOfPages: ['', [Validators.required, Validators.min(4)]]
    });
  }

  get title(): AbstractControl { return this.bookForm.get('title'); }
  get author(): AbstractControl { return this.bookForm.get('author'); }
  get numberOfPages(): AbstractControl { return this.bookForm.get('numberOfPages'); }

  submit(focus: HTMLInputElement): void {
    this.store.dispatch(bookCreated(this.bookForm.value))
    focus.focus();
    this.bookForm.reset();
  }

}
