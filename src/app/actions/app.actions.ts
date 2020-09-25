import { createAction, props } from '@ngrx/store';

export const applicationStarted = createAction(
  '[App] APPLICATION_STARTED'
);

export const featureError = createAction(
  '[app] feature error',
  props<{feature: string, message: string}>()
);

export const featureErrorCleared = createAction(
  '[app] feature error cleared'
);
