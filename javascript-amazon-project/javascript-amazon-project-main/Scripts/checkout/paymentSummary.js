import { cart } from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryoptions.js";
import { formatCurrency } from '../utils/money.js';
import { addOrder } from "../../data/orders.js";

// 18. Loop through cart. For each product: price*quantity. Add everything together.

export function renderPaymentSummary() {
    //For part 1

    let productPriceCents = 0
    let shippingPriceCents = 0

    cart.cartItems.forEach( (cartItem) => {
        const product = getProduct(cartItem.productId)
        productPriceCents += product.priceCents * cartItem.quantity
        
    // For part 2 -> Loop through cart. Add all shipping costs together.
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
        shippingPriceCents += deliveryOption.priceCents
    })
    
    // For part 3 & 4
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents
    const taxCents = totalBeforeTaxCents * 0.1
    const totalCents = totalBeforeTaxCents + taxCents


    // Display on webpage --> DOM

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button JS-place-order-btn button-primary ">
        Place your order
        </button>
    `
    document.querySelector('.JS-payment-summary').innerHTML = paymentSummaryHTML

    document.querySelector('.JS-place-order-btn').addEventListener('click', async () => {
        try {
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart
                })
            })
            const order = await response.json()
            addOrder(order)
        } catch(error) {
            console.log('Unexpected Error. Please try again later!')
        }
        window.location.href = 'orders.html'
    })
}

// Headers gives backend more information about our request!