import * as fromBooks from './books.reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { BookListItem } from '../models/book-list-item';
import * as fromUiHints from './ui-hints.reducer';

export const featureName = 'booksFeature';

export interface BooksState {
  list: fromBooks.BookListState;
  uiHints: fromUiHints.UiHintsState;
}

export const reducers: ActionReducerMap<BooksState> = {
  list: fromBooks.reducer,
  uiHints: fromUiHints.reducer
};

// Feature Selectors
const selectFeature = createFeatureSelector<BooksState>(featureName);

// Branch Selectors
const selectListBranch = createSelector(selectFeature, f => f.list);
const selectUiHintsBranch = createSelector(selectFeature, f => f.uiHints);

// Helpers
const { selectAll: selectBooksArray } = fromBooks.adapter.getSelectors(selectListBranch);
const selectSortingBy = createSelector(selectUiHintsBranch, b => b.sortBooksBy);
const selectBookListItemsUnsorted = createSelector(selectBooksArray, b => b as BookListItem[]);

// State Selectors
export const selectBookListItems = createSelector(selectBookListItemsUnsorted, selectSortingBy,
  (list, by) => [...list.sort((a, b) => {
    if (a[by] < b[by]) {
      return -1;
    }
    if (a[by] > b[by]) {
      return 1;
    }
    return 0;
  })]);
export const selectSortByTitle = createSelector(selectSortingBy, b => b === 'title');
export const selectSortByAuthor = createSelector(selectSortingBy, b => b === 'author');
