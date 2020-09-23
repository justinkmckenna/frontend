import { createAction } from '@ngrx/store';

export const sortByTitle = createAction(
  '[books] sort by title'
);

export const sortByAuthor = createAction(
  '[books] sort by author'
);
