import { createAction, props } from '@ngrx/store';
import { BookEntity } from '../reducers/books.reducers';

let currentId = 1;

export const bookCreated = createAction(
  '[books] book created',
  ({ title, author, numberOfPages }: BookCreate) => ({
    payload: {
      title,
      author,
      numberOfPages,
      id: 'T' + currentId++,
    } as BookEntity
  })
);

export const bookCreatedSuccess = createAction(
  '[books] book created success',
  props<{oldId: string, payload: BookEntity}>()
);

export const bookCreatedFailure = createAction(
  '[books] book created failure',
  props<{message: string, payload: BookEntity}>()
);

interface BookCreate {
  title: string;
  author: string;
  numberOfPages: number;
}

// initiaing action - go do this thing
export const loadBookData = createAction(
  '[books] load book data'
);

// a success action - the thing worked
export const loadBookDataSuccess = createAction(
  '[books] load books success',
  props<{payload: BookEntity[]}>()
);

// a fail action - that did not work
export const loadBookDataFailed = createAction(
  '[books] load books failed',
  props<{message: string}>()
);

export const removeBook = createAction(
  '[books] remove book',
  props<{payload: BookEntity}>()
);

export const removeBookFailed = createAction(
  '[books] remove book failed',
  props<{errorMessage: string, payload: BookEntity}>()
);

export const updateBookTitle = createAction(
  '[books] updated book title',
  props<{newTitle: string, payload: BookEntity}>()
);

export const updateBookTitleFailed = createAction(
  '[books] updated book title failed',
  props<{errorMessage: string, payload: BookEntity}>()
);
