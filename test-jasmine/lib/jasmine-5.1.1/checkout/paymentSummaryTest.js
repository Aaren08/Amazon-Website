import { renderOrderSummary } from "../../../../javascript-amazon-project/javascript-amazon-project-main/Scripts/checkout/orderSummary.js";
import { deliveryOptions } from "../../../../javascript-amazon-project/javascript-amazon-project-main/data/deliveryOptions.js";
import { formatCurrency } from "../../../../javascript-amazon-project/javascript-amazon-project-main/Scripts/utils/money.js";
import {
  loadFromStorage,
  cart,
} from "../../../../javascript-amazon-project/javascript-amazon-project-main/data/cart.js";

describe("Test Suite: renderPaymentSummary", () => {
  beforeEach(() => {
    // Clear the cart before each test
    cart.cartItems = [];
  });

  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  // a general function to calculate the total product price
  const calculateTotalProductPrice = (a, b) => {
    let total = 0;
    a.forEach((item) => {
      const product = b(item.productId);
      total += product.priceCents * item.quantity;
    });
    return total;
  };

  // a general function to calculate the total shipping price
  const calculateTotalShippingPrice = (c, d) => {
    let total = 0;
    c.forEach((item) => {
      const deliveryOption = d(item.deliveryOptionId);
      total += deliveryOption.priceCents;
    });
    return total;
  };

  // 1. CALCULATION LOGIC TESTS

  // 1.1 Product Price Calculation

  // 1.1a. Should correctly calculate total product price by summing (price * quantity) for all cart items
  it("Should correctly calculate total product price by summing (price * quantity) for all cart items", () => {
    const mockCart = [
      { productId: productId1, quantity: 2 },
      { productId: productId2, quantity: 1 },
    ];
    const getProductMock = (id) => {
      if (id === productId1) return { priceCents: 1090 };
      if (id === productId2) return { priceCents: 2095 };
    };
    const total = calculateTotalProductPrice(mockCart, getProductMock);
    expect(total).toBe(4275);
  });

  // 1.1b. Should handle empty cart (return 0)
  it("Should handle empty cart (return 0)", () => {
    const mockCart = [];
    const getProductMock = () => ({ priceCents: 1090 }); // won't be called
    const total = calculateTotalProductPrice(mockCart, getProductMock);
    expect(total).toBe(0);
  });

  // 1.1c. Should handle multiple items with different quantities
  it("Should handle multiple items with different quantities", () => {
    const mockCart = [
      { productId: productId1, quantity: 2 },
      { productId: productId2, quantity: 3 },
    ];
    const getProductMock = (id) => {
      if (id === productId1) return { priceCents: 1090 };
      if (id === productId2) return { priceCents: 2095 };
    };

    const total = calculateTotalProductPrice(mockCart, getProductMock);
    expect(total).toBe(1090 * 2 + 2095 * 3);
  });

  // ****************************************************
  // 1.2 Shipping price calculation

  // 1.2a. Should correctly sum shipping costs for all cart items
  it("Should correctly sum shipping costs for all cart items", () => {
    const mockCart = [
      { productId: productId1, deliveryOptionId: "1" },
      { productId: productId2, deliveryOptionId: "2" },
    ];
    const getDeliveryOptionMock = (id) => {
      if (id === "1") return { priceCents: 0 };
      if (id === "2") return { priceCents: 499 };
    };
    const total = calculateTotalShippingPrice(mockCart, getDeliveryOptionMock);
    expect(total).toBe(499);
  });

  // 1.2b. Should handle different delivery options for different items
  it("Should handle different delivery options for different items", () => {
    const mockCart = [
      { productId: productId1, deliveryOptionId: "1" },
      { productId: productId2, deliveryOptionId: "3" },
    ];
    const getDeliveryOptionMock = (id) => {
      if (id === "1") return { priceCents: 0 };
      if (id === "3") return { priceCents: 546 };
    };
    const total = calculateTotalShippingPrice(mockCart, getDeliveryOptionMock);
    expect(total).toBe(546);
  });

  // 1.2c. Should return 0 for empty cart
  it("Should return 0 for empty cart", () => {
    const mockCart = [];
    const getDeliveryOptionMock = () => ({ priceCents: 0 }); // won't be called
    const total = calculateTotalShippingPrice(mockCart, getDeliveryOptionMock);
    expect(total).toBe(0);
  });

  // ***********************************************************
  // 1.3 Tax Calculation

  // 1.3a. Should calculate tax as 10% of (product total + shipping)
  it("Should calculate tax as 10% of (product total + shipping)", () => {
    const productTotal = 4275;
    const shippingTotal = 499;
    const tax = (productTotal + shippingTotal) * 0.1;
    expect(formatCurrency(tax)).toEqual("4.77");
  });

  // 1.3b. Should handle edge cases (0 values)
  it("Should handle edge cases (0 values)", () => {
    const productTotal = 0;
    const shippingTotal = 0;
    const tax = (productTotal + shippingTotal) * 0.1;
    expect(tax).toBe(0);
  });

  // ***********************************************************
  // 1.4 Total Calculation

  // 1.4a. Should correctly sum product, shipping, and tax
  it("Should correctly sum product, shipping, and tax", () => {
    const productTotal = 4275;
    const shippingTotal = 499;
    const tax = (productTotal + shippingTotal) * 0.1;
    const total = productTotal + shippingTotal + tax;
    expect(total).toBe(4275 + 499 + tax);
  });

  // 1.4b. Should handle various combinations of values
  it("Should handle various combinations of values", () => {
    const mockCart = [
      { productId: productId1, quantity: 2, deliveryOptionId: "3" },
      { productId: productId2, quantity: 3, deliveryOptionId: "2" },
    ];
    const getProductMock = (id) => {
      if (id === productId1) return { priceCents: 1090 };
      if (id === productId2) return { priceCents: 2095 };
    };
    const getDeliveryOptionMock = (id) => {
      if (id === "3") return { priceCents: 546 };
      if (id === "2") return { priceCents: 499 };
    };
    const shippingTotal = calculateTotalShippingPrice(
      mockCart,
      getDeliveryOptionMock
    );
    const productTotal = calculateTotalProductPrice(mockCart, getProductMock);
    const totalBeforeTax = productTotal + shippingTotal;
    const tax = (productTotal + shippingTotal) * 0.1;
    const totalAmount = productTotal + shippingTotal + tax;

    expect(productTotal).toBe(1090 * 2 + 2095 * 3); // 1090 * 2 + 2095 * 3
    expect(shippingTotal).toBe(546 + 499); // 546 + 499
    expect(totalBeforeTax).toBe(1090 * 2 + 2095 * 3 + 1045); // 8465 + 1045
    expect(formatCurrency(tax)).toEqual("9.51"); // 10% of 9510
    expect(totalAmount).toBe(1090 * 2 + 2095 * 3 + 1045 + 951); // 9510 + 951
  });
});
