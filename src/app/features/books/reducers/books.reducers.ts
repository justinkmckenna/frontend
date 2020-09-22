import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action } from '@ngrx/store';

export interface BookEntity {
  id: string;
  title: string;
  author: string;
  numberOfPages: number;
}

export interface BookListState extends EntityState<BookEntity> {

}

export const adapter = createEntityAdapter<BookEntity>();

// const initialState = adapter.getInitialState();
const initialState: BookListState = {
  ids: ['1', '2', '3'],
  entities: {
    1: {id: '1', title: 'AHHHHHHHHHH', author: 'Justin', numberOfPages: 14},
    2: {id: '2', title: 'AHHHHHHHHHH2', author: 'Not Justin', numberOfPages: 11},
    3: {id: '3', title: 'AHHHHHHHHHH3', author: 'My Mom', numberOfPages: 19}
  }
}

const reducerFunction = createReducer(
  initialState
);

export function reducer(state: BookListState = initialState, action: Action) {
  return reducerFunction(state, action);
}
