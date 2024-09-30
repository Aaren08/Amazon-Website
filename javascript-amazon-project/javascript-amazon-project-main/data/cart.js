// 5. Separate file for cart

// Created function to re-run code in cartTests.js for testing 
export let cart
loadFromStorage()

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'))
  if (!cart) {
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }]
    saveToStorage()
  }
}


// 9.  Setting localStorage to store items in cart

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

 
export function addToCart(productId, quantity, deliveryOptionId) {
    let matchingItem
    cart.forEach( (cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem
      }
    })
    if (matchingItem) {
      matchingItem.quantity += quantity
    } else {
      // Putting products into an array
      cart.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: deliveryOptionId
      })
    }
    saveToStorage()
}


// Removing Items from checkout page

export function removeFromCart(productId) {
  const newCart = []
  cart.forEach( (cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem)
    }
  })
  cart = newCart
  saveToStorage()
}


// 12. Updating the product value by its ID and saving into localStorage.

export function updateQuantity(productId, newQuantity) {
  let matchingItem
  cart.forEach( (cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem
    }
  })
  matchingItem.quantity = newQuantity
  saveToStorage()
}


// 16. Function to update the delivery id in the cart

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem
    cart.forEach( (cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem
      }
    })
    if(matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId
      saveToStorage()
    }
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response)
    fun()
  })
  
  xhr.open('GET', 'https://supersimplebackend.dev/cart')
  xhr.send()
}