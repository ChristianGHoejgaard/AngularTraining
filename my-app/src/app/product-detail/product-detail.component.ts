import { CommonModule } from '@angular/common';
import { Component, input, output, OnChanges, SimpleChanges } from '@angular/core';
import { Product} from '../product';
import { Observable } from 'rxjs';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnChanges {
  product$: Observable<Product> | undefined;
  added = output();
  id = input<number>();
  
  constructor(private productsService: ProductsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.product$ = this.productsService.getProduct(this.id()!);
  }
  
  addToCart() {
    this.added.emit();
  }
}
