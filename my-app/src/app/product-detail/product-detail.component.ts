import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product} from '../product';
import { Observable } from 'rxjs';
import { ProductsService } from '../Services/products.service';
import { AuthService } from '../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product> | undefined;
  id = input<string>();
  price: number | undefined;

  constructor(
    private productsService: ProductsService, 
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.product$ = this.productsService.getProduct(Number(this.id()!));
  }
  
  addToCart(id: number) {
    this.cartService.addProduct(id).subscribe();
  }

  changePrice(product: Product) {
    this.productsService.updateProduct(product.id, this.price!).subscribe(() => {
        this.router.navigate(['/products']);
      });
  }

  remove(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
