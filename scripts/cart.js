import { products } from "../data/products.js";


export const cart=JSON.parse(localStorage.getItem('cart')) || [];

export function saveCarttoStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}


export function updateQuantity(tempid){
    cart.forEach((cartItem)=>{
        if(cartItem.productId===tempid)
        {
            let quantity=document.querySelector(`.product-quantity-${tempid}`).value;
            cartItem.quantity+=Number(quantity);
        }
    })
}

export function updateCartQuantity(){

    let totalQuantity=0;
    cart.forEach((cartItem)=>{
        totalQuantity+=cartItem.quantity;
    })

    document.querySelector('.cart-quantity').textContent=totalQuantity;

    saveCarttoStorage();

}

console.log("partially Loaded");
