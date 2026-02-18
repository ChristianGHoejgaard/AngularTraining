import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../Services/products.service';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  products: Product[] = [];

  constructor(private readonly productService: ProductsService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

}
