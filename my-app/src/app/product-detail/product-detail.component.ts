import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product} from '../product';
import { Observable, switchMap } from 'rxjs';
import { ProductsService } from '../Services/products.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product> | undefined;
  id = input<string>();

  constructor(
    private productsService: ProductsService, 
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.product$ = this.productsService.getProduct(Number(this.id()!));
    // this.product$ = this.route.paramMap.pipe(switchMap(params => { 
    //   return this.productsService.getProduct(Number(params.get('id')));
    //   })
    // );
  }
  
  addToCart() {
  }

  changePrice(product: Product, price: string) {
    this.productsService.updateProduct(product.id, Number(price)).subscribe(() => {
        this.router.navigate(['/products']);
      });
  }

  remove(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}
