import { Injectable } from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as appActions from '../../../actions/app.actions';
import * as booksActions from '../../books/actions/book.actions';

@Injectable()
export class BooksAppEffects {

  // turn feature errors into application errors
  onLoadBooksFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(booksActions.loadBookDataFailed),
      map(e => appActions.featureError({ feature: 'Books', message: e.message }))
    )
    , {dispatch: true}
  );

  onAddBooksFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(booksActions.bookCreatedFailure),
      map(e => appActions.featureError({ feature: 'Books', message: e.message }))
    )
    , {dispatch: true}
  );

  // appstarted -> load data
  onAppStartedLoadData$ = createEffect(() =>
  this.actions$.pipe(
    ofType(appActions.applicationStarted),
    map(() => booksActions.loadBookData())
  ));

  constructor(private actions$: Actions) {}
}
