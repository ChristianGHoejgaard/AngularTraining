import { CommonModule } from '@angular/common';
import { Component, input, output, OnChanges, SimpleChanges } from '@angular/core';
import { Product} from '../product';
import { Observable } from 'rxjs';
import { ProductsService } from '../Services/products.service';
import { AuthService } from '../Services/auth.service';

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
  deleted = output();

  constructor(private productsService: ProductsService, public authService: AuthService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.product$ = this.productsService.getProduct(this.id()!);
  }
  
  addToCart() {
    this.added.emit();
  }

  changePrice(product: Product, price: string) {
    this.productsService.updateProduct(product.id, Number(price)).subscribe();
  }

  remove(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe(() => {
      this.deleted.emit();
    });
  }
}
