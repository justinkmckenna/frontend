import { createSelector } from '@ngrx/store';
import * as fromCounter from './counter.reducer';

export interface AppState {
  counter: fromCounter.CounterState;
}

export const reducers = {
  counter: fromCounter.reducer
};

const selectCounterBranch = (state: AppState) => state.counter;

export const selectCurrent = createSelector(selectCounterBranch, b => b.current);
export const selectCountBy = createSelector(selectCounterBranch, b => b.by);
