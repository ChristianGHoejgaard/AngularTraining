import { CanDeactivateFn } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { inject } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from '../checkout/checkout.component';

export const checkoutGuard: CanDeactivateFn<CartComponent> = () => {
  const dialog = inject(MatDialog);
  const cartService = inject(CartService);
  if(cartService.cart) {
    const confirmation = dialog.open(CheckoutComponent, {data: cartService.cart.products.length }).afterClosed();
    return confirmation;
  }
  return true;
};
