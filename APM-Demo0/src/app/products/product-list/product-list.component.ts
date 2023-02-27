import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Product } from '../product';
import {
  getCurrentProduct,
  getProducts,
  getShowProductCode,
  ProductState,
} from '../state/product.reducer';
import * as ProductAction from '../state/product.actions';
@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode$: Observable<boolean>;

  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<ProductState>) {}
  ngOnInit(): void {
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.store.dispatch(ProductAction.loadProducts());
    this.products$ = this.store.select(getProducts);
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductAction.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductAction.initNewProduct());
    // this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(
      ProductAction.setCurrentProduct({ currentProductId: product.id })
    );
    // this.productService.changeSelectedProduct(product);
  }
}
