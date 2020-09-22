import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, tap } from 'rxjs/operators';
import { countBySet } from '../actions/counter.actions';
import { applicationStarted } from '../actions/app.actions';

@Injectable()
export class CounterEffects {

  readBy$ = createEffect(() => this.actions$.pipe(
    ofType(applicationStarted),
    map(() => localStorage.getItem('by')),
    filter(by => by !== null),
    map(by => parseInt(by, 10)),
    filter(by => [1, 2, 3].includes(by)),
    map(by => countBySet({by}))
  ));

  saveBy$ = createEffect(() => this.actions$.pipe(
    ofType(countBySet),
    map(action => action.by),
    tap(by => localStorage.setItem('by', by.toString()))
  ), { dispatch: false });

  constructor(private actions$: Actions) { }
}
