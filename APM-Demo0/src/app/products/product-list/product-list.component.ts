import { Component } from '@angular/core';
import { State, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { getCurrentProduct, getShowProductCode, ProductState } from '../state/product.reducer';
import * as ProductAction from '../state/product.actions';
@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode$: Observable<boolean> = this.store.select(getShowProductCode);

  products$: Observable<Product[] | any> = this.productService
    .getProducts()
    .pipe(catchError((err) => (this.errorMessage = err)));
  // products$: Observable<Product[] | any> = this.store.select(getCurrentProduct)

  // Used to highlight the selected product in the list
  selectedProduct$: Observable<Product | null> =
    this.store.select(getCurrentProduct);

  constructor(
    private store: Store<ProductState>,
    private productService: ProductService
  ) {}

  checkChanged(): void {
    this.store.dispatch(ProductAction.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductAction.initNewProduct());
    // this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductAction.setCurrentProduct({ product }));
    // this.productService.changeSelectedProduct(product);
  }
}
