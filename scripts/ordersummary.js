import {products} from '../data/products.js';
import {cart} from '../scripts/cart.js';

export function getPrice(itemId){
    let quantity=0;
    let price=0;
    products.forEach((product)=>{
        if(product.id===itemId)
        {
            
            cart.forEach((cartItem)=>{
                if(cartItem.productId===itemId){
                    quantity=cartItem.quantity;
                    price=product.priceCents;
                }
            })
           
            
        }
    })
    return((product.priceCents)*quantity);
}

