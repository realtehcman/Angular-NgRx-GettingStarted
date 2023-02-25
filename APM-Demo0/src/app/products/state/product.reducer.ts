import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Product } from '../product';

export interface State extends AppState {
  products: ProductState;
}

const initialProductState: ProductState = {
  showProductCode: false,
  currentProduct: null,
  products: [],
};
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);


export const getCurrentProduct = createSelector(
  getProductFeatureState,
  (state) => state.currentProduct
);

export const productReducer = createReducer(
  initialProductState,
  on(createAction('[Product] Toggle Product Code'), (state): ProductState => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  })
);
