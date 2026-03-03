import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SortPipe } from '../Pipes/sort.pipe';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  imports: [SortPipe, AsyncPipe, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {  
  products$: Observable<Product[]> | undefined;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.products$ = this.route.data.pipe(
      switchMap(data => of(data['products']))
    );
  }

  // onAdded() {
  //   alert(`${this.selectedProduct?.title} added to the cart!`);
  // }
}
