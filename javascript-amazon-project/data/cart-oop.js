// 5. Separate file for cart

// Created function to re-run code in cartTests.js for testing 

// A function to generate multiple objects
function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,
    
        // 9.  Setting localStorage to store items in cart
    
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey))
            if (!this.cartItems) {
              this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
              }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
              }]
            }
        },
    
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems))
        },
    
        addToCart(productId, quantity, deliveryOptionId) {
            let matchingItem
            this.cartItems.forEach( (cartItem) => {
              if (productId === cartItem.productId) {
                matchingItem = cartItem
              }
            })
            if (matchingItem) {
              matchingItem.quantity += quantity
            } else {
              // Putting products into an array
              this.cartItems.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionId: deliveryOptionId
              })
            }
            this.saveToStorage()
        },
    
        // Removing Items from checkout page
    
        removeFromCart(productId) {
            const newCart = []
            this.cartItems.forEach( (cartItem) => {
              if (cartItem.productId !== productId) {
                newCart.push(cartItem)
              }
            })
            this.cartItems = newCart
            this.saveToStorage()
        },
    
        // 12. Updating the product value by its ID and saving into localStorage.
    
        updateQuantity(productId, newQuantity) {
            let matchingItem
            this.cartItems.forEach( (cartItem) => {
              if (productId === cartItem.productId) {
                matchingItem = cartItem
              }
            })
            matchingItem.quantity = newQuantity
            this.saveToStorage()
        },
    
        // 16. Function to update the delivery id in the cart
    
        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem
              this.cartItems.forEach( (cartItem) => {
                if (productId === cartItem.productId) {
                  matchingItem = cartItem
                }
              })
              if(matchingItem) {
                matchingItem.deliveryOptionId = deliveryOptionId
                this.saveToStorage()
            }
        }
    }
    return cart
}

const cart = Cart('cart-oop')
cart.loadFromStorage()

const businessCart = Cart('cart-business')
businessCart.loadFromStorage()

console.log(cart)
console.log(businessCart)