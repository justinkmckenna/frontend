import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment'; // only this, never environment.prod
import { BookEntity } from '../reducers/books.reducers';
import * as actions from '../actions/book.actions';
import { of } from 'rxjs';

@Injectable()
export class BookEffects {

  private url = environment.apiUrl;
  constructor(private actions$: Actions, private client: HttpClient) {}

  // load books -> load books success | load books failed
  onAppStartedLoadData$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadBookData),
    switchMap(() => this.client.get<GetBooksResponse>(this.url + 'books')
      .pipe(
        map(results => results.data),
        map(payload => actions.loadBookDataSuccess({payload})),
        catchError((err) => {
          console.log('Error: ', err);
          return of(actions.loadBookDataFailed({message: 'See console'}));
        })
      ))
  ), { dispatch: true });

  addBook$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.bookCreated),
    map(a => a.payload),
    switchMap(book => this.client.post<BookEntity>(this.url + 'books', getBookCreateFromBook(book))
    .pipe(
      map(payload => actions.bookCreatedSuccess({oldId: book.id, payload})),
      catchError((err) => {
        console.log(err);
        return of(actions.bookCreatedFailure({message: 'Could not add book', payload: book}))
      })
    ))
  ), {dispatch: true});
}

interface GetBooksResponse {
  data: BookEntity[];
}

function getBookCreateFromBook(book: BookEntity): {title: string, author: string, numberOfPages: number} {
  return {
    title: book.title,
    author: book.author,
    numberOfPages: book.numberOfPages
  };
}
