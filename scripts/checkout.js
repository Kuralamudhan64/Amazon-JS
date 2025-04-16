import { cart, saveCarttoStorage, updateCartQuantity } from '../scripts/cart.js';
import { products } from '../data/products.js';
import { replaceQuantity } from '../scripts/cart.js';
import {getPrice} from '../scripts/ordersummary.js';

function renderCart(){
    
  let cartHTML = '';

  cart.forEach((cartItem) => {
    const product = products.find(p => p.id === cartItem.productId);
    if (product) {
      cartHTML += `
        <div class="cart-item-container js-cart-item-container-${product.id}" data-product-id=${product.id}>
          <div class="delivery-date js-delivery-date-${product.id}">Delivery date: <span class="delivery-span">Tuesday, June 21<span></div>
          <div class="cart-item-details-grid">
            <img class="product-image" src="${product.image}">
            <div class="cart-item-details">
              <div class="product-name">${product.name}</div>
              <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
              <div class="product-quantity">
                <span>Quantity: <span class="quantity-label js-quantity-label-${product.id}">${cartItem.quantity}</span></span>
                <span class="update-quantity-link link-primary" data-product-id=${product.id}>Update</span>
                <input class="quantity-input js-quantity-input-${product.id}">
                <span class="save-quantity-link link-primary js-save-quantity-link-${product.id}">Save</span>
                <span class="delete-quantity-link link-primary" data-product-id=${product.id} >Delete</span>
              </div>
            </div>
            <div class="delivery-options">
              <div class="delivery-options-title">Choose a delivery option:</div>
              <div class="delivery-option" data-item-id=1 data-product-id=${product.id}>
                <input type="radio" checked class="delivery-option-input" name="delivery-option-${product.id}">
                <div><div class="delivery-option-date delivery-option-date-1">Tuesday, June 21</div><div class="delivery-option-price">FREE Shipping</div></div>
              </div>
              <div class="delivery-option" data-item-id=2 data-product-id=${product.id}>
                <input type="radio" class="delivery-option-input" name="delivery-option-${product.id}">
                <div><div class="delivery-option-date delivery-option-date-2">Wednesday, June 15</div><div class="delivery-option-price">$4.99 - Shipping</div></div>
              </div>
              <div class="delivery-option" data-item-id=3 data-product-id=${product.id}>
                <input type="radio" class="delivery-option-input" name="delivery-option-${product.id}">
                <div><div class="delivery-option-date delivery-option-date-3">Monday, June 13</div><div class="delivery-option-price">$9.99 - Shipping</div></div>
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
  
  const returnToHomeLink = document.querySelector('.return-to-home-link');
  
  if (returnToHomeLink) {
    returnToHomeLink.textContent = `${cart.length} items`;
  }
  bindUpdateItems();
  bindDeleteItems();
  updateDeliveryDate();
  updateOrderSummary();
}

function updateDeliveryDate() {
  const radioButtons = document.querySelectorAll('.delivery-option-input');

  radioButtons.forEach((radio) => {
    radio.addEventListener('click', () => {
      const parentOption = radio.closest('.delivery-option');
      const itemId = parentOption.dataset.itemId;
      const productId = parentOption.dataset.productId;

      const dateElement = parentOption.querySelector(`.delivery-option-date-${itemId}`);
      const selectedDate = dateElement.textContent;

      const deliveryDateContainer = document.querySelector(`.js-delivery-date-${productId}`);
      const deliverySpan = deliveryDateContainer.querySelector('.delivery-span');

      if (deliverySpan && selectedDate) {
        deliverySpan.textContent = selectedDate;
      }
    });
  });
}

function bindUpdateItems(){
  let UpdateButtons=document.querySelectorAll('.update-quantity-link');
  UpdateButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
      const container=document.querySelector(`.js-cart-item-container-${button.dataset.productId}`);
      container.classList.add('is-editing-quantity');
      let saveButton=document.querySelector(`.js-save-quantity-link-${button.dataset.productId}`);
      let inputField=document.querySelector(`.js-quantity-input-${button.dataset.productId}`);
      
      function saveQuantity(){
        let quantity=Number(document.querySelector(`.js-quantity-input-${button.dataset.productId}`).value);
        replaceQuantity(button.dataset.productId ,quantity);
        document.querySelector(`.js-quantity-label-${button.dataset.productId}`).textContent=quantity;        
        container.classList.remove('is-editing-quantity');
      }
      saveButton.addEventListener('click',saveQuantity);

      inputField.addEventListener('keydown',(event)=>{
        if(event.key === 'Enter')
          saveQuantity();
      })


    })
  })
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


function updateOrderSummary(){
  let cartItemContainerAll=document.querySelectorAll('.cart-item-container');
  let totalamount=0;
  cartItemContainerAll.forEach((cartItem)=>{

    let itemId=cartItem.dataset.productId;
    totalamount+=getPrice(itemId);
  })
  document.querySelector('.item-amount').textContent=`$${totalamount}`;
}


window.addEventListener('DOMContentLoaded',()=>{
    renderCart();
})

