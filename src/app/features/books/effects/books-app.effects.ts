import { Injectable } from '@angular/core';
import {createEffect, Actions, ofType} from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as appActions from '../../../actions/app.actions';
import * as booksActions from '../../books/actions/book.actions';

@Injectable()
export class BooksAppEffects {

  // appstarted -> load data
  onAppStartedLoadData$ = createEffect(() =>
  this.action$.pipe(
    ofType(appActions.applicationStarted),
    map(() => booksActions.loadBookData())
  ));

  constructor(private action$: Actions) {}
}
