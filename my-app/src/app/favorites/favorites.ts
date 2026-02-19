import { FavoritesService} from '../Services/favorites.service';
import { ProductsService } from '../Services/products.service';

export function favoritesFactory(isFavorites: boolean) {
    return () => {    
        if(isFavorites) {
            return new FavoritesService();
        }
        return new ProductsService();
    }
}