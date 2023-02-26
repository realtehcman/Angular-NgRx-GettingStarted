import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction('[Product] Toggle Product Code');
export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
  props<{ product: Product }>()
);
export const clearCurrentProduct = createAction(
  '[Product] Clear Current Product'
);
export const initNewProduct = createAction('[Product] Init New Product');
//issues the http request
export const loadProducts = createAction('[Product] Loading Products');
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[]}>()
);
export const loadProductsFailure = createAction(
  '[Product] Load Products Fail',
  props<{ error: string }>()
);
