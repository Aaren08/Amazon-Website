import { addToCart, cart, loadFromStorage } from '../../../../javascript-amazon-project/javascript-amazon-project-main/data/cart.js'

describe('Test Suite: addToCart', () => {
    it('Adds an existing product to the cart', () => {
        spyOn(localStorage, 'setItem')

        spyOn(localStorage, 'getItem').and.callFake( () => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }])
        })
        loadFromStorage()   //reload

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 12)
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(13)
    })

    it('Adds a new product to the cart', () => {

        //to solve this problem, we're going to use a
        //feature of jasmine called MOCK --> replace a method
        // with a fake version and do anything we want to

        spyOn(localStorage, 'setItem')
        
        spyOn(localStorage, 'getItem').and.callFake( () => {
            return JSON.stringify([])
        })
        loadFromStorage()   //reload 
        
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 12)
        expect(cart.length).toEqual(1)

        // to check if set item was called
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
        
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(12)
        

    })
})