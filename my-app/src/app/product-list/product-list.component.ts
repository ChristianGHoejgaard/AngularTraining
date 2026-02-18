import { OnInit, Component, inject } from '@angular/core';
import { Product} from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../Pipes/sort.pipe';
import { ProductsService } from '../Services/products.service';
import { FavoritesComponent } from '../favorites/favorites.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe, FavoritesComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [ProductsService]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  
  selectedProduct: Product | undefined;

  private productService = inject(ProductsService);

  onAdded(product: Product) {
    alert(`${product.title} added to the cart!`);
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
}
