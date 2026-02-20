import { OnInit, Component, inject, DestroyRef } from '@angular/core';
import { Product} from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../Pipes/sort.pipe';
import { ProductsService } from '../Services/products.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductsService],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  
  selectedProduct: Product | undefined;

  private productService = inject(ProductsService);

  onAdded(product: Product) {
    alert(`${product.title} added to the cart!`);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.products$ = this.productService.getProducts();
  }
}
