import {
  addToCart,
  cart,
  removeFromCart,
  loadFromStorage,
  updateDeliveryOption,
} from "../../../../javascript-amazon-project/javascript-amazon-project-main/data/cart.js";

describe("Test Suite: addToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("Adds an existing product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromStorage(); //reload

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 12);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(13);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });

  it("Adds a new product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage(); //reload

    //to solve this problem, we're going to use a
    //feature of jasmine called MOCK --> replace a method
    // with a fake version and do anything we want to

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 12);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(12);
    // to check if set item was called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });
});

describe("Test Suite: removeFromCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ]);
    });
    loadFromStorage();
  });

  it("Removes a productId that is in the cart", () => {
    removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    // Cart should now have only the second product
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });

  it("Tries to remove a productId that is not in the cart", () => {
    removeFromCart("nonexistent-product");

    // Cart should remain unchanged
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[1].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });
});

describe("Test Suite: updateDeliveryOption", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });

    loadFromStorage();
  });

  it("Updates delivery option of a product in the cart", () => {
    updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "3");

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].deliveryOptionId).toEqual("3");

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart)
    );
  });

  it("Does not update delivery option if productId is not in the cart", () => {
    updateDeliveryOption("non-existent-id", "2");

    expect(cart.length).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual("1"); // unchanged

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it("Does not update if deliveryOptionId does not exist", () => {
    updateDeliveryOption(
      "27723489-5555-6666-7777-e1d07eb678c6",
      "invalid-option"
    );

    // Should not update the delivery option
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].deliveryOptionId).toEqual("1"); // original stays the same

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});

// Simple tests are called unit tests
// Hard tests are called integration tests
