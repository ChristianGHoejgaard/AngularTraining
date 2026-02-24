import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product} from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { SortPipe } from '../Pipes/sort.pipe';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-product-list',
  imports: [ProductDetailComponent, SortPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {  
  products = toSignal(inject(ProductsService).getProducts(), {
    initialValue: []
  });
  
  selectedProduct: Product | undefined;

  onAdded() {
    alert(`${this.selectedProduct?.title} added to the cart!`);
  }
}
