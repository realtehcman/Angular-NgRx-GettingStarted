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
  currentProductId: null,
  products: [],
};
export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
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

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: 'New ',
        productCode: '',
        description: '',
        starRating: 0,
      };
    } else
      return currentProductId
        ? state.products.find((p) => p.id === currentProductId)
        : null;
  }
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
      currentProductId: action.currentProductId,
    };
  }),
  on(ProductAction.clearCurrentProduct, (state): ProductState => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(ProductAction.initNewProduct, (state): ProductState => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductAction.loadProductsSuccess, (state, action): ProductState => {
    console.log('original state: ' + JSON.stringify(state));
    return {
      ...state,
      products: action.products,
    };
  }),

  on(ProductAction.updateProductSuccess, (state, action): ProductState => {
    console.log('original state: ' + JSON.stringify(state));

    const updatedProducts = state.products.map((item) =>
      action.product.id === item.id ? action.product : item
    );
    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
    };
  })

  //hnadling error
  // on(ProductAction.updateProductsFailure, (state, action): ProductState => {
  //   console.log('original state: ' + JSON.stringify(state));
  //   return {
  //     ...state,
  //     error: action.error,
  //   };
  // })
);
