import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component'
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { authGuard } from './Guards/auth.guard';
import { checkoutGuard } from './Guards/checkout.guard';
import { productsResolver } from './Resolvers/products.resolver';

export const routes: Routes = [
    {        
        path: 'products', component: ProductListComponent,
        resolve: { 
            products: productsResolver 
        }
    },
    { 
        path: 'cart', 
        component: CartComponent, 
        canActivate: [authGuard],
        canDeactivate: [checkoutGuard]
    },
    { path: 'products/new', component: ProductCreateComponent },
    { path: 'products/:id', component: ProductDetailComponent},
    { 
        path: 'user', 
        loadChildren: () => import('./user.routes'),
        canMatch: [authGuard]
    },
    { path: '', redirectTo: 'products', pathMatch: 'full'},
    { path: '**', redirectTo: 'products' }
];
