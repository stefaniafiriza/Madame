import { firestore } from 'firebase';
import { Product } from '../../models/product';

export function getProducts(snapshot: firestore.DocumentData, products: Product[]){

    Object.keys(snapshot).forEach((key)=>{
      let value = snapshot[key];
      products.push(
        {
          name: value.name,
          price: value.price,
          photo: value.photo,
          description: value.description,
          rating: value.rating
        }
      )
    });
}
