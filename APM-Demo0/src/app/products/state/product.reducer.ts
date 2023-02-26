import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Product } from '../product';
import * as ProductAction from './product.actions';

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
  on(ProductAction.toggleProductCode, (state): ProductState => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductAction.setCurrentProduct, (state, action): ProductState => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      currentProduct: action.product,
    };
  }),
  on(ProductAction.clearCurrentProduct, (state): ProductState => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      currentProduct: null,
    };
  }),
  on(ProductAction.initNewProduct, (state): ProductState => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: '',
        description: '',
        starRating: null,
      },
    };
  }),
  on(ProductAction.loadProductsSuccess, (state, action): ProductState => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      products: action.products,
    };
  })
);
