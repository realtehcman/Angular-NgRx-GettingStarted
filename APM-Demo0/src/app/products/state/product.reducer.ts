import { createAction, createReducer, on } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Product } from '../product';

export interface State extends AppState {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

export const productReducer = createReducer(
  {
    showProductCode: false,
  },
  on(createAction('[Product] Toggle Product Code'), (state) => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  })
);
