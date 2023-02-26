import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';
import { Store } from '@ngrx/store';
import { getCurrentProduct, ProductState } from '../state/product.reducer';
import {
  clearCurrentProduct,
  setCurrentProduct,
} from '../state/product.actions';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit {
  pageTitle = 'Product Edit';
  errorMessage = '';
  productForm: FormGroup;

  private productSubject = new Subject<Product | null>();
  product$: Observable<Product | null> = this.productSubject.asObservable();

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private store: Store<ProductState>,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.',
      },
      productCode: {
        required: 'Product code is required.',
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).',
      },
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.productForm = this.fb.group({
      productName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: '',
    });

    // Watch for changes to the currently selected product
    this.store
      .select(getCurrentProduct)
      .pipe(tap((selectedProduct) => this.displayProduct(selectedProduct)))
      .subscribe();

    // Watch for value changes
    this.productForm.valueChanges.pipe(
      map(
        () =>
          (this.displayMessage = this.genericValidator.processMessages(
            this.productForm
          ))
      )
    );
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(
      this.productForm
    );
  }

  displayProduct(product: Product | null): void {
    // Set the local product property
    this.productSubject.next(product);

    if (product) {
      // Reset the form back to pristine
      this.productForm.reset();

      // Display the appropriate page title
      if (product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${product.productName}`;
      }

      // Update the data on the form
      this.productForm.patchValue({
        productName: product.productName,
        productCode: product.productCode,
        starRating: product.starRating,
        description: product.description,
      });
    }
  }

  cancelEdit(product: Product): void {
    // Redisplay the currently selected product
    // replacing any edits made
    this.displayProduct(product);
  }

  deleteProduct(product: Product): void {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.productName}?`)) {
        this.productService
          .deleteProduct(product.id)
          .pipe(
            map(() => this.store.dispatch(clearCurrentProduct())),
            catchError((err) => (this.errorMessage = err))
          )
          .subscribe();
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(clearCurrentProduct());
    }
  }

  saveProduct(originalProduct: Product): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const product = { ...originalProduct, ...this.productForm.value };

        if (product.id === 0) {
          this.productService
            .createProduct(product)
            .pipe(
              map((product) =>
                this.store.dispatch(setCurrentProduct({ product }))
              ),
              catchError((err) => (this.errorMessage = err))
            )
            .subscribe();
        } else {
          this.productService
            .updateProduct(product)
            .pipe(
              map((product) =>
                this.store.dispatch(setCurrentProduct({ product }))
              ),
              catchError((err) => (this.errorMessage = err))
            )
            .subscribe();
        }
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
}

function changeSelectedProduct(arg0: null): any {
  throw new Error('Function not implemented.');
}
