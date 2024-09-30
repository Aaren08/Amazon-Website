import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import '../data/cart-class.js'
//import '../data/backend-practice.js'
import { loadProducts, loadProductsFetch } from "../data/products.js"
import { loadCart } from "../data/cart.js";


// Async -> makes a function return a promise

async function loadPage() {
    try {
        //throw 'error1'

        await loadProductsFetch();

        await new Promise( (resolve, reject) => {
        //throw 'error2'

            loadCart( () => {
                //reject('error3')
                resolve()       // similar to done()
            })
        });
    } catch(error) {
        console.log('Unexpected Error. Please try again later!')
    }    

    renderOrderSummary()
    renderPaymentSummary()
}
loadPage()


// PROMISES
// Just an example
/*
Promise.all([
    loadProductsFetch(),
    // new Promise( (resolve) => {
    //     loadProducts( () => {
    //         resolve('value1')       // similar to done()
    //     })
    // }),
    
    new Promise( (resolve) => {
        loadCart( () => {
            resolve()       // similar to done()
        })
    })
]).then( () => {
    renderOrderSummary()
    renderPaymentSummary()
})
*/
/*
new Promise( (resolve) => {
    loadProducts( () => {
        resolve('value1')       // similar to done()
    })
}).then( (value) => {
    return new Promise( (resolve) => {
        loadCart( () => {
            resolve()
        })
    })
}).then( () => {
    renderOrderSummary()
    renderPaymentSummary()
})
*/



// loadProducts(() => {
//     loadCart( () => {
//         renderOrderSummary()
//         renderPaymentSummary()
//     })
// })


