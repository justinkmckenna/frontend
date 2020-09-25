import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment'; // only this, never environment.prod
import { BookEntity } from '../reducers/books.reducers';
import * as actions from '../actions/book.actions';
import { of } from 'rxjs';

@Injectable()
export class BookEffects {

  private url = environment.apiUrl;
  constructor(private actions$: Actions, private client: HttpClient) { }

  // load books -> load books success | load books failed
  onAppStartedLoadData$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadBookData),
    switchMap(() => this.client.get<GetBooksResponse>(this.url + 'books')
      .pipe(
        map(results => results.data),
        map(payload => actions.loadBookDataSuccess({ payload })),
        catchError((err) => {
          return of(actions.loadBookDataFailed({ message: 'Could Not Load Books' }));
        })
      ))
  ), { dispatch: true });

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.bookCreated),
      map(a => a.payload),
      switchMap(book => this.client.post<BookEntity>(this.url + 'books', getBookCreateFromBook(book))
        .pipe(
          map(payload => actions.bookCreatedSuccess({ oldId: book.id, payload })),
          catchError((err) => {
            return of(actions.bookCreatedFailure({ message: 'Could not add book', payload: book }));
          })
        ))
    ), { dispatch: true });

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.removeBook),
      switchMap(a => this.client.delete(`${this.url}books/${a.payload.id}`)
        .pipe(
          filter(() => false),
          map(() => ({ type: 'noop' })),
          catchError(() => of(actions.removeBookFailed({ errorMessage: 'Could not remove book', payload: a.payload })))
        ))
    ), { dispatch: true });

  updateTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateBookTitle),
      switchMap((originalAction) => this.client.put(`${this.url}books/${originalAction.payload.id}/title`,
        JSON.stringify(originalAction.newTitle),
        { headers: { 'Content-Type': 'application/json' } })
        .pipe(
          filter(() => false), // that seemed to have worked
          map(() => ({ type: 'noop' })),
          catchError((err) => of(actions.updateBookTitleFailed({
            errorMessage: 'Could not update title',
            payload: originalAction.payload
          })))
        )
      )
    )
    , { dispatch: true }
  );
}

interface GetBooksResponse {
  data: BookEntity[];
}

function getBookCreateFromBook(book: BookEntity): { title: string, author: string, numberOfPages: number } {
  return {
    title: book.title,
    author: book.author,
    numberOfPages: book.numberOfPages
  };
}
