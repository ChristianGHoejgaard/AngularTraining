import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../Services/products.service';

export const productsResolver: ResolveFn<Product[]> = (route, state) => {
  const productsService = inject(ProductsService);
  const limit = Number(route.queryParamMap.get('limit'));
  return productsService.getProducts(limit);
};
