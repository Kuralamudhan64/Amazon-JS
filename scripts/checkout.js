import { cart, saveCarttoStorage } from '../scripts/cart.js';
import { products } from '../data/products.js';


function renderCart(){
    console.log("Checkout Page Fully Loaded");
    console.log(cart.length);
  let cartHTML = '';

  cart.forEach((cartItem) => {
    const product = products.find(p => p.id === cartItem.productId);
    if (product) {
      cartHTML += `
        <div class="cart-item-container">
          <div class="delivery-date">Delivery date: Tuesday, June 21</div>
          <div class="cart-item-details-grid">
            <img class="product-image" src="${product.image}">
            <div class="cart-item-details">
              <div class="product-name">${product.name}</div>
              <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
              <div class="product-quantity">
                <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
                <span class="update-quantity-link link-primary">Update</span>
                <span class="delete-quantity-link link-primary" data-product-id=${product.id} >Delete</span>
              </div>
            </div>
            <div class="delivery-options">
              <div class="delivery-options-title">Choose a delivery option:</div>
              <div class="delivery-option">
                <input type="radio" checked class="delivery-option-input" name="delivery-option-${product.id}">
                <div><div class="delivery-option-date">Tuesday, June 21</div><div class="delivery-option-price">FREE Shipping</div></div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${product.id}">
                <div><div class="delivery-option-date">Wednesday, June 15</div><div class="delivery-option-price">$4.99 - Shipping</div></div>
              </div>
              <div class="delivery-option">
                <input type="radio" class="delivery-option-input" name="delivery-option-${product.id}">
                <div><div class="delivery-option-date">Monday, June 13</div><div class="delivery-option-price">$9.99 - Shipping</div></div>
              </div>
            </div>
          </div>
        </div>`;
    }
  });
  const orderSummary = document.querySelector('.js-order-summary');
  if (orderSummary) {
    orderSummary.innerHTML = cartHTML || '<div>No orders yet</div>';
  } else {
    console.error('Element with class .js-order-summary not found.');
  }
  bindDeleteItems();
}


function bindDeleteItems(){
let delete_cartItem = document.querySelectorAll('.delete-quantity-link');
delete_cartItem.forEach((cartItem) => {
    cartItem.addEventListener('click', () => {
        let id_delete = cartItem.dataset.productId;
        const index=cart.findIndex(c=>c.productId === id_delete);
        if(index!=-1)
        {
            cart.splice(index,1);
        }
        saveCarttoStorage();
        renderCart();

    });
});
}

window.addEventListener('DOMContentLoaded',()=>{
    renderCart();
})