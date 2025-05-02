import { renderOrderSummary } from "../../../../javascript-amazon-project/javascript-amazon-project-main/Scripts/checkout/orderSummary.js";
import {
  loadFromStorage,
  cart,
} from "../../../../javascript-amazon-project/javascript-amazon-project-main/data/cart.js";
import { loadProductsFetch } from "../../../../javascript-amazon-project/javascript-amazon-project-main/data/products.js";

// Testing 2 parts
// 1. How the page looks
// 2. How the page behaves

// PART I
describe("Test Suite: renderOrderSummary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  // done is a function provided by jasmine,
  // when added, beforeAll will not automatically go to next step.
  beforeAll((done) => {
    loadProductsFetch().then(() => {
      done();
    });
    // (() => {
    //   done();         // now it will go to next step
    // });
  });

  // Jasmine shortcut "Hooks" --> Lets us run some code for each test
  // beforeEach hook
  beforeEach(() => {
    spyOn(localStorage, "setItem");

    document.querySelector(".JS-test-container").innerHTML = `
        <div class="JS-order-summary"></div>
        <div class="JS-payment-summary"></div>
        <div class="JS-return-to-home-link"></div>`;

    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();
    renderOrderSummary();
  });

  it("Displays the cart", () => {
    // document.querySelector('.JS-test-container').innerHTML = `
    // <div class="JS-order-summary"></div>
    // <div class="JS-return-to-home-link"></div>`

    // spyOn(localStorage, 'setItem')

    // spyOn(localStorage, 'getItem').and.callFake( () => {
    //     return JSON.stringify([{
    //         productId: productId1,
    //         quantity: 2,
    //         deliveryOptionId: '1'
    //       }, {
    //         productId: productId2,
    //         quantity: 1,
    //         deliveryOptionId: '2'
    //       }])
    // })
    // loadFromStorage()
    // renderOrderSummary()

    expect(document.querySelectorAll(".JS-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.JS-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.JS-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");
    expect(
      document
        .querySelector(`.JS-product-name-${productId1}`)
        .innerText.toLowerCase()
    ).toContain("black and gray athletic cotton socks - 6 pairs");
    expect(
      document
        .querySelector(`.JS-product-name-${productId2}`)
        .innerText.toLowerCase()
    ).toContain("intermediate size basketball");
    expect(
      document.querySelector(`.JS-product-price-${productId1}`).innerText
    ).toMatch(/^\$\d+(\.\d{2})?$/);
    expect(
      document.querySelector(`.JS-product-price-${productId2}`).innerText
    ).toMatch(/^\$\d+(\.\d{2})?$/);

    document.querySelector(".JS-test-container").innerHTML = "";
  });

  // PART II
  it("Removes a product", () => {
    // spyOn(localStorage, 'setItem')

    // document.querySelector('.JS-test-container').innerHTML = `
    //   <div class="JS-order-summary"></div>
    //   <div class="JS-payment-summary"></div>
    //   <div class="JS-return-to-home-link"></div>`

    //   const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    //   const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'
    //   spyOn(localStorage, 'getItem').and.callFake( () => {
    //       return JSON.stringify([{
    //           productId: productId1,
    //           quantity: 2,
    //           deliveryOptionId: '1'
    //         }, {
    //           productId: productId2,
    //           quantity: 1,
    //           deliveryOptionId: '2'
    //         }])
    //   })
    //   loadFromStorage()
    //   renderOrderSummary()

    document.querySelector(`.JS-delete-link-${productId1}`).click();
    expect(document.querySelectorAll(".JS-cart-item-container").length).toEqual(
      1
    );
    expect(
      document.querySelector(`.JS-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.JS-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);

    document.querySelector(".JS-test-container").innerHTML = "";
  });
});

// Code commented out due to hook functionality

//Promises => A better way to handle asynchronous code similar to done() function
