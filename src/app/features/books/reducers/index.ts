import * as fromBooks from './books.reducers';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { BookListItem } from '../models/book-list-item';

export const featureName = 'booksFeature';

export interface BooksState {
  list: fromBooks.BookListState;
}

export const reducers: ActionReducerMap<BooksState> = {
  list: fromBooks.reducer
};

const selectFeature = createFeatureSelector<BooksState>(featureName);
const selectListBranch = createSelector(selectFeature, f => f.list);
const { selectAll: selectBooksArray } = fromBooks.adapter.getSelectors(selectListBranch);
export const selectBookListItems = createSelector(selectBooksArray, b => b as BookListItem[]);
