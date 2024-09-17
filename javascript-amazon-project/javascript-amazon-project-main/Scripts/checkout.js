import { cart, removeFromCart, updateQuantity } from "../data/cart.js"
import { products } from "../data/products.js"
import { formatCurrency } from "../Scripts/utils/money.js"

let cartSummaryHTML = ''

cart.forEach( (cartItem) => {
    const productId = cartItem.productId

    // 6. Duplicating the addition of products

    let matchingProduct

    products.forEach( (product) => {
        if (product.id === productId) {
            matchingProduct = product
        }
    })
    
    cartSummaryHTML +=`
        <div class="cart-item-container 
        JS-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label JS-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link JS-update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input JS-quantity-input-${matchingProduct.id}">
                  <span class="save-quantity-link JS-save-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                    Save
                  </span>
                  <span class="delete-quantity-link link-primary JS-delete-link" 
                    data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>  
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`  
})
document.querySelector('.JS-order-summary').innerHTML = cartSummaryHTML


// 8. Adding eventListener to delete 

document.querySelectorAll('.JS-delete-link')
.forEach( (link) => {
  link.addEventListener('click', () => {
    const { productId } = link.dataset
    removeFromCart(productId)

    // Using DOM to remove item from cart
    
    const container = document.querySelector(`.JS-cart-item-container-${productId}`)
    container.remove()
    updateCheckoutList()
  })
})



// 9. Update the checkout list for adding items in it.

function updateCheckoutList() {
  let cartQuantity = 0
  cart.forEach( (cartItem) => {
    cartQuantity += cartItem.quantity
  })
  document.querySelector('.JS-return-to-home-link').textContent = `${cartQuantity} items`
}
updateCheckoutList()


// 10. Updating the items in checkout list

document.querySelectorAll('.JS-update-quantity-link')
.forEach( (link) => {
  link.addEventListener('click', () => {
    const { productId } = link.dataset
    const checkoutContainer = document.querySelector(`.JS-cart-item-container-${productId}`)
    checkoutContainer.classList.add('is-editing-quantity')
  })
})


// 11. Saving and updating the quantity for orders

document.querySelectorAll('.JS-save-quantity-link')
.forEach( (link) => {
  link.addEventListener('click', () => {
    const { productId } = link.dataset

    // Taking the product value as input and updating it
    const quantityInput = document.querySelector(`.JS-quantity-input-${productId}`)
    const newQuantity = Number(quantityInput.value)
    if (newQuantity < 0 || newQuantity >= 1000) {
      alert('Quantity must be at least 0 and less than 1000');
      return;
    }
    updateQuantity(productId, newQuantity)

    const saveContainer = document.querySelector(`.JS-cart-item-container-${productId}`)
    saveContainer.classList.remove('is-editing-quantity')

    // Updating the value on DOM (Checkout and Quantity)
    const quantityLabel = document.querySelector(`.JS-quantity-label-${matchingProduct.id}`)
    quantityLabel.textContent = newQuantity
    updateCheckoutList()
  })
})

