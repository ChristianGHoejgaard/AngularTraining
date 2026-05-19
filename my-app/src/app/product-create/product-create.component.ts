import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { priceMaximumValidator } from '../price-maximum.validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit, OnDestroy {

  productForm: FormGroup<{
    title: FormControl<string>,
    price: FormControl<number|undefined>,
    category: FormControl<string>
  }> | undefined;

  constructor(private productsService: ProductsService, private router: Router, private builder: FormBuilder) {}
  valueChangedSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.buildForm();
    this.valueChangedSubscription = this.productForm?.controls.category.valueChanges.subscribe(() => {
      this.productForm?.controls.price.reset();
    });
  }

  private buildForm() {
    this.productForm = this.builder.nonNullable.group({
      title: ['', [Validators.required]],
      price: this.builder.nonNullable.control<number|undefined>(undefined, [Validators.required, Validators.min(1), priceMaximumValidator(1000)]),
      category: ['']
    });
  }

  createProduct() {
    this.productsService.addProduct(this.productForm!.value)
      .subscribe(() => this.router.navigate(['/products']));
  }

  ngOnDestroy(): void {
    this.valueChangedSubscription?.unsubscribe();
  }
}
