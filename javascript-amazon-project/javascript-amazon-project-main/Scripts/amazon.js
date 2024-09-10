import {cart, addToCart} from '../data/cart.js'
import {products} from '../data/products.js'
import { formatCurrency } from "../Scripts/utils/money.js"


// DATA STUCTURE
// Loaded products from products.js by putting it above amazon.js

// 2. Combining all the HTML together into one string

let productsHTML = ''

// Generating the HTML for multiple products using 
// forEach loop

products.forEach( (product) => {
    productsHTML +=  `                   
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">  
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}    
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button JS-add-to-cart-btn button-primary"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`
    })
    
// 3. putting the products on a webpage --> DOM

document.querySelector('.JS-products-grid').innerHTML = productsHTML




// 5. Making cart button interactive by looping through array and summing quantity.

function updateCartQuantity() {
  let cartQuantity = 0

  cart.forEach( (cartItem) => {
    cartQuantity += cartItem.quantity
  })
  document.querySelector('.JS-cart-quantity').textContent = cartQuantity
      
}

// 4. Adding JS for add to cart button

document.querySelectorAll('.JS-add-to-cart-btn').forEach( (button) => {
    button.addEventListener('click', () => {
       
      // data attribute (just another HTML attribute)
      // allows us to attach any information to an element
      // adding it to all cart buttons

      // Fetching the products name and putting it in productName variable
      const productId =  button.dataset.productId
      addToCart(productId)
      updateCartQuantity()
      
        
    })
})