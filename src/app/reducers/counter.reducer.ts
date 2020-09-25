import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import * as counterActions from '../actions/counter.actions';

export interface CounterState {
  current: number;
  by: number;
}

const initialState: CounterState = {
  current: 0,
  by: 1
};

const reducerFunction = createReducer(
  initialState,
  on(counterActions.countDecremented, (oldState) => ({ ...oldState, current: oldState.current - oldState.by })),
  on(counterActions.countIncremented, (oldState) => ({ ...oldState, current: oldState.current + oldState.by })),
  on(counterActions.countBySet, (oldState, action) => ({ ...oldState, by: action.by })),
  on(counterActions.countReset, () => ( initialState ))
);

export function reducer(counterState: CounterState = initialState, action: Action): CounterState {
  return reducerFunction(counterState, action);
}
