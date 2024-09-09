// 5. Separate file for cart

export const cart = []

export function addToCart(productId) {
    let matchingItem
  
    cart.forEach( (cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem
      }
    })
  
    if (matchingItem) {
      matchingItem.quantity += 1
    } else {
      // Putting products into an array
      cart.push({
        productId: productId,
        quantity: 1
      })
    }
  }