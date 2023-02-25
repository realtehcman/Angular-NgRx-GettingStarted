import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { toggleProductCode } from '../state/product.actions';
import { getShowProductCode } from '../state/product.reducer';

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

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(
    private store: Store<any>,
    private productService: ProductService
  ) {}

  checkChanged(): void {
    this.store.dispatch(toggleProductCode());
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }
}
