import { createSelector } from '@ngrx/store';
import * as fromCounter from './counter.reducer';
import * as fromUiHints from './ui-hints.reducer';

export interface AppState {
  counter: fromCounter.CounterState;
  uiHints: fromUiHints.UiHintsState;
}

export const reducers = {
  counter: fromCounter.reducer,
  uiHints: fromUiHints.reducer
};

const selectCounterBranch = (state: AppState) => state.counter;
const selectUiHintsBranch = (state: AppState) => state.uiHints;

export const selectCurrent = createSelector(selectCounterBranch, b => b.current);
export const selectCountBy = createSelector(selectCounterBranch, b => b.by);
export const selectHasError = createSelector(selectUiHintsBranch, b => b.hasErrors);
export const selectErrorMessage = createSelector(selectUiHintsBranch, b => b.errorMessage);
