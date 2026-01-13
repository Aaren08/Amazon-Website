# Jasmine Testing Documentation

Comprehensive guide to the testing infrastructure and test suites for the JavaScript Amazon Project.

## 📋 Table of Contents

- [Testing Overview](#testing-overview)
- [Test Framework Setup](#test-framework-setup)
- [Test Structure](#test-structure)
- [Test Suites](#test-suites)
- [Testing Techniques](#testing-techniques)
- [Running Tests](#running-tests)
- [Test Examples](#test-examples)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Testing Overview

### Purpose

The Jasmine test suite ensures code quality and reliability by:

- **Validating Functionality**: Confirms features work as intended
- **Preventing Regressions**: Catches bugs from code changes
- **Documenting Behavior**: Tests serve as living documentation
- **Enabling Refactoring**: Provides safety net for code improvements
- **Improving Design**: Encourages modular, testable code

### Test Coverage

Current test coverage includes:

| Module | Tests | Coverage |
|--------|-------|----------|
| Cart Operations | 8+ tests | High |
| Order Summary | 5+ tests | High |
| Payment Summary | 4+ tests | Medium |
| Money Utilities | 3+ tests | High |
| **Total** | **20+ tests** | **Good** |

### Test Types

1. **Unit Tests**: Individual function/method testing
2. **Integration Tests**: Multiple components working together
3. **DOM Tests**: HTML rendering verification
4. **State Tests**: State management validation

---

## 🔧 Test Framework Setup

### Jasmine Version

- **Version**: 5.1.1
- **Type**: Behavior-Driven Development (BDD) framework
- **Syntax**: Human-readable test descriptions

### Framework Files

```
test-jasmine/
├── lib/jasmine-5.1.1/
│   ├── jasmine.js              # Core framework
│   ├── jasmine-html.js         # HTML reporter
│   ├── jasmine.css             # Test runner styles
│   ├── boot0.js                # Framework initialization
│   ├── boot1.js                # Configuration
│   ├── tests.html              # Test runner entry point
│   ├── jasmine_favicon.png     # Favicon
│   └── [test files]            # Test specifications
```

### Test Runner HTML

**Location**: `test-jasmine/lib/jasmine-5.1.1/tests.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Jasmine Spec Runner v5.1.1</title>
    
    <!-- Jasmine framework files -->
    <link rel="stylesheet" href="../jasmine-5.1.1/jasmine.css" />
    <script src="../jasmine-5.1.1/jasmine.js"></script>
    <script src="../jasmine-5.1.1/jasmine-html.js"></script>
    <script src="../jasmine-5.1.1/boot0.js"></script>
    <script src="../jasmine-5.1.1/boot1.js"></script>
    
    <!-- Test files (loaded as modules) -->
    <script src="utils/moneyTest.js" type="module"></script>
    <script src="data/cartTest.js" type="module"></script>
    <script src="checkout/orderSummaryTest.js" type="module"></script>
    <script src="checkout/paymentSummaryTest.js" type="module"></script>
  </head>
  <body>
    <div class="JS-test-container"></div>
  </body>
</html>
```

---

## 🏗 Test Structure

### Basic Test Anatomy

```javascript
describe("Test Suite: Component Name", () => {
  // Setup and teardown
  beforeAll(() => {
    // Runs once before all tests in suite
  });
  
  beforeEach(() => {
    // Runs before each test
  });
  
  afterEach(() => {
    // Runs after each test
  });
  
  // Individual tests
  it("should do something specific", () => {
    // Arrange: Set up test data
    const input = "test";
    
    // Act: Execute the code being tested
    const result = functionUnderTest(input);
    
    // Assert: Verify the result
    expect(result).toEqual("expected output");
  });
});
```

### Jasmine Syntax

**Describe**: Group related tests
```javascript
describe("Feature Name", () => {
  // Tests go here
});
```

**It**: Define a single test
```javascript
it("should behave in a specific way", () => {
  // Test code
});
```

**Expect**: Assert expected behavior
```javascript
expect(actual).toEqual(expected);
expect(array).toContain(value);
expect(function).toHaveBeenCalled();
```

---

## 📝 Test Suites

### 1. Cart Tests (`data/cartTest.js`)

**Purpose**: Validate cart operations and state management

**Test Cases:**

#### 1.1 Adding Existing Products
```javascript
it("Adds an existing product to the cart", () => {
  // Setup: Mock localStorage with existing cart
  spyOn(localStorage, "getItem").and.callFake(() => {
    return JSON.stringify([
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ]);
  });
  loadFromStorage(); // Reload cart with mock data
  
  // Action: Add more of the same product
  addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 12);
  
  // Assertions
  expect(cart.length).toEqual(1);
  expect(cart[0].quantity).toEqual(13); // 1 + 12
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
});
```

**What it tests:**
- Quantity addition for existing products
- Single cart item maintained
- Storage update called correctly

#### 1.2 Adding New Products
```javascript
it("Adds a new product to the cart", () => {
  // Setup: Mock empty cart
  spyOn(localStorage, "getItem").and.callFake(() => {
    return JSON.stringify([]);
  });
  loadFromStorage();
  
  // Action: Add new product
  addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 12);
  
  // Assertions
  expect(cart.length).toEqual(1); // New item added
  expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
  expect(cart[0].quantity).toEqual(12);
});
```

**What it tests:**
- New products add to cart
- Correct quantity assigned
- Cart length increases

#### 1.3 Removing Products
```javascript
it("Removes a product from the cart", () => {
  // Setup: Cart with products
  spyOn(localStorage, "getItem").and.callFake(() => {
    return JSON.stringify([
      { productId: "id1", quantity: 2, deliveryOptionId: "1" },
      { productId: "id2", quantity: 1, deliveryOptionId: "1" },
    ]);
  });
  loadFromStorage();
  
  // Action: Remove first product
  removeFromCart("id1");
  
  // Assertions
  expect(cart.length).toEqual(1); // One item removed
  expect(cart[0].productId).toEqual("id2"); // Correct item remains
});
```

**What it tests:**
- Product removal functionality
- Cart size reduction
- Remaining items preserved

#### 1.4 Updating Quantities
```javascript
it("Updates product quantity", () => {
  // Setup
  spyOn(localStorage, "getItem").and.callFake(() => {
    return JSON.stringify([
      { productId: "id1", quantity: 5, deliveryOptionId: "1" }
    ]);
  });
  loadFromStorage();
  
  // Action: Update quantity
  updateQuantity("id1", 10);
  
  // Assertions
  expect(cart[0].quantity).toEqual(10);
  expect(localStorage.setItem).toHaveBeenCalledTimes(1);
});
```

**What it tests:**
- Quantity update functionality
- Storage persistence
- Correct value assignment

#### 1.5 Delivery Option Updates
```javascript
it("Updates delivery option for a product", () => {
  // Setup and similar pattern
  updateDeliveryOption("id1", "2");
  
  // Assertions
  expect(cart[0].deliveryOptionId).toEqual("2");
});
```

**What it tests:**
- Delivery option change
- State persistence
- Correct product targeted

### 2. Order Summary Tests (`checkout/orderSummaryTest.js`)

**Purpose**: Validate order summary rendering and interactions

**Key Components:**

#### 2.1 Before All Hook - Product Loading
```javascript
beforeAll((done) => {
  loadProductsFetch().then(() => {
    done(); // Signal async operation complete
  });
});
```

**Why needed**: Products must load before rendering

#### 2.2 Before Each Hook - DOM Setup
```javascript
beforeEach(() => {
  // Mock localStorage
  spyOn(localStorage, "setItem");
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
  
  // Setup DOM container
  document.querySelector(".JS-test-container").innerHTML = `
    <div class="JS-order-summary"></div>
    <div class="JS-payment-summary"></div>
    <div class="JS-return-to-home-link"></div>`;
  
  // Reload cart and render
  loadFromStorage();
  renderOrderSummary();
});
```

**What it does:**
- Isolates each test
- Provides clean DOM
- Sets up consistent data

#### 2.3 Test Cases

**Rendering Verification:**
```javascript
it("displays the correct cart length", () => {
  const cartItems = document.querySelectorAll(".JS-cart-item-container");
  expect(cartItems.length).toEqual(2); // 2 products in cart
});
```

**Item Removal:**
```javascript
it("removes a product when remove button is clicked", () => {
  const removeButton = document.querySelector(".JS-delete-link");
  removeButton.click();
  
  const updatedItems = document.querySelectorAll(".JS-cart-item-container");
  expect(updatedItems.length).toEqual(1); // One item removed
});
```

**Quantity Update:**
```javascript
it("updates quantity when changed", () => {
  const quantityDropdown = document.querySelector(".JS-quantity-select");
  quantityDropdown.value = "3";
  quantityDropdown.dispatchEvent(new Event("change"));
  
  expect(cart[0].quantity).toEqual(3);
});
```

### 3. Payment Summary Tests (`checkout/paymentSummaryTest.js`)

**Purpose**: Validate payment calculations and display

**Test Cases:**

#### 3.1 Subtotal Calculation
```javascript
it("calculates correct subtotal", () => {
  // Based on cart items prices
  const subtotal = calculateSubtotal();
  expect(subtotal).toEqual(expectedAmount);
});
```

#### 3.2 Tax Calculation
```javascript
it("calculates correct tax amount", () => {
  const tax = calculateTax();
  // Tax = subtotal * 0.1 (10%)
  expect(tax).toEqual(subtotal * 0.1);
});
```

#### 3.3 Delivery Cost
```javascript
it("includes correct delivery cost", () => {
  const deliveryCost = calculateDelivery();
  // Based on selected delivery options
  expect(deliveryCost).toBeGreaterThan(0);
});
```

#### 3.4 Total Amount
```javascript
it("calculates correct total", () => {
  const total = calculateTotal();
  const expected = subtotal + tax + deliveryCost;
  expect(total).toEqual(expected);
});
```

### 4. Money Utility Tests (`utils/moneyTest.js`)

**Purpose**: Validate currency formatting

**Test Cases:**

#### 4.1 Basic Formatting
```javascript
it("converts cents to formatted currency", () => {
  expect(formatCurrency(100)).toEqual("1.00");
  expect(formatCurrency(1057)).toEqual("10.57");
});
```

#### 4.2 Edge Cases
```javascript
it("handles zero cents", () => {
  expect(formatCurrency(0)).toEqual("0.00");
});

it("handles large amounts", () => {
  expect(formatCurrency(999999)).toEqual("9999.99");
});

it("rounds correctly", () => {
  expect(formatCurrency(2000.4)).toEqual("20.00");
  expect(formatCurrency(2000.5)).toEqual("20.01");
});
```

---

## 🧪 Testing Techniques

### 1. Spies and Mocks

**Mock localStorage:**
```javascript
spyOn(localStorage, "getItem").and.callFake(() => {
  return JSON.stringify(mockData);
});
```

**Track function calls:**
```javascript
spyOn(localStorage, "setItem");
expect(localStorage.setItem).toHaveBeenCalledWith("cart", JSON.stringify(cart));
expect(localStorage.setItem).toHaveBeenCalledTimes(1);
```

### 2. Hooks

**Setup before all tests:**
```javascript
beforeAll(() => {
  // Expensive setup (e.g., loading products)
});
```

**Reset before each test:**
```javascript
beforeEach(() => {
  // Setup clean state
  // Mock data
  // Setup DOM
});
```

**Cleanup after each test:**
```javascript
afterEach(() => {
  // Restore original functions
  // Clean up DOM
});
```

### 3. Async Testing

**Using done() callback:**
```javascript
it("handles async operations", (done) => {
  loadData(() => {
    expect(data).toBeDefined();
    done(); // Signal test completion
  });
});
```

**Using promises:**
```javascript
it("handles promises", () => {
  return loadProductsFetch().then(() => {
    expect(products.length).toBeGreaterThan(0);
  });
});
```

### 4. DOM Testing

**Query elements:**
```javascript
const element = document.querySelector(".selector");
const elements = document.querySelectorAll(".selector");
```

**Trigger events:**
```javascript
button.click();
input.dispatchEvent(new Event("change"));
```

**Verify HTML structure:**
```javascript
expect(element.innerHTML).toContain("expected text");
expect(element.classList.contains("active")).toBe(true);
```

### 5. Common Matchers

```javascript
// Equality
expect(value).toEqual(expectedValue);
expect(value).toBe(expectedValue); // Strict equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeDefined();
expect(value).toBeNull();

// Comparisons
expect(number).toBeGreaterThan(5);
expect(number).toBeLessThan(10);

// Collections
expect(array).toContain(element);
expect(array.length).toEqual(3);

// Functions
expect(function).toHaveBeenCalled();
expect(function).toHaveBeenCalledWith(arg1, arg2);
expect(function).toHaveBeenCalledTimes(2);

// Strings
expect(string).toContain("substring");
expect(string).toMatch(/regex/);

// Errors
expect(() => throwingFunction()).toThrowError();
```

---

## 🚀 Running Tests

### Method 1: Browser (Recommended)

1. **Navigate to test runner:**
   - Open `test-jasmine/lib/jasmine-5.1.1/tests.html` in your browser
   - Or use: `file:///path/to/tests.html`

2. **View results:**
   - Green: Passing tests
   - Red: Failing tests
   - Gray: Pending tests

3. **Check console:**
   - Press F12 to open DevTools
   - Go to Console tab for detailed logs

### Method 2: Live Server

```bash
# If using VS Code Live Server extension
# Right-click tests.html and select "Open with Live Server"
# This helps avoid CORS issues with module imports
```

### Method 3: Command Line (Node.js)

```bash
# Install globally
npm install -g jasmine

# Run from test directory
cd test-jasmine
jasmine
```

### Interpreting Results

**Output example:**
```
Test Suite: addToCart
  ✓ Adds an existing product to the cart
  ✓ Adds a new product to the cart
  ✓ Removes a product from the cart

Test Suite: money.js
  ✓ Converts 100 cents to formatted currency 1.00
  ✓ Converts 2095 cents to formatted currency 20.95
  ✓ Rounds correctly

Executed 5 of 5 SUCCESS
```

---

## 📚 Test Examples

### Example 1: Simple Unit Test

```javascript
describe("Test Suite: formatCurrency", () => {
  it("formats cents to currency", () => {
    // Arrange
    const priceCents = 1095;
    
    // Act
    const result = formatCurrency(priceCents);
    
    // Assert
    expect(result).toEqual("10.95");
  });
});
```

### Example 2: Test with Mock

```javascript
describe("Test Suite: Cart with Mock", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("saves to storage when adding product", () => {
    // Arrange
    const productId = "123";
    const quantity = 2;
    
    // Act
    addToCart(productId, quantity);
    
    // Assert
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      jasmine.any(String)
    );
  });
});
```

### Example 3: DOM Testing

```javascript
describe("Test Suite: Order Summary Rendering", () => {
  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = '<div class="JS-order-summary"></div>';
    
    // Mock data and render
    mockCart();
    renderOrderSummary();
  });

  it("displays all cart items", () => {
    // Query rendered elements
    const items = document.querySelectorAll(".cart-item");
    
    // Verify count matches cart length
    expect(items.length).toEqual(cart.length);
  });

  it("displays correct product names", () => {
    // Get product name from rendered HTML
    const name = document.querySelector(".product-name").textContent;
    
    // Verify it matches expected product
    expect(name).toEqual(expectedProductName);
  });
});
```

### Example 4: Async Testing

```javascript
describe("Test Suite: Async Product Loading", () => {
  it("loads products from backend", (done) => {
    // Act: Load products
    loadProductsFetch().then(() => {
      // Assert: Verify products loaded
      expect(products.length).toBeGreaterThan(0);
      expect(products[0].name).toBeDefined();
      
      // Signal completion
      done();
    });
  });

  it("handles loading errors", (done) => {
    // Mock failed request
    spyOn(window, "fetch").and.returnValue(
      Promise.reject(new Error("Network error"))
    );
    
    loadProductsFetch().catch((error) => {
      expect(error.message).toEqual("Network error");
      done();
    });
  });
});
```

---

## ✅ Best Practices

### 1. Test Organization

- ✅ One suite per module/component
- ✅ Descriptive test names
- ✅ Logical test grouping
- ❌ Avoid nested describes beyond 2 levels

**Good:**
```javascript
describe("Test Suite: Cart", () => {
  describe("Add to Cart", () => {
    it("adds new product");
    it("increments existing product");
  });
});
```

### 2. Test Isolation

- ✅ Each test independent
- ✅ Use beforeEach for setup
- ✅ Use afterEach for cleanup
- ✅ No shared state between tests

### 3. Test Clarity

- ✅ Arrange-Act-Assert pattern
- ✅ Clear variable names
- ✅ One assertion per test (when possible)
- ✅ Descriptive error messages

**Good:**
```javascript
it("increases cart quantity when adding existing product", () => {
  // Arrange
  const initialQuantity = cart[0].quantity;
  
  // Act
  addToCart(productId, addedQuantity);
  
  // Assert
  expect(cart[0].quantity).toEqual(initialQuantity + addedQuantity);
});
```

### 4. Mocking Guidelines

- ✅ Mock external dependencies (localStorage, API)
- ✅ Use spyOn for existing methods
- ✅ Use jasmine.createSpy for new functions
- ✅ Restore originals with afterEach

### 5. Async Handling

- ✅ Use done() callback for callbacks
- ✅ Return promises from tests
- ✅ Use beforeAll with done() for expensive setup
- ✅ Handle both success and error cases

### 6. Coverage Goals

- ✅ Aim for 80%+ code coverage
- ✅ Test all public functions
- ✅ Test edge cases
- ✅ Test error conditions
- ❌ Don't chase 100% for diminishing returns

---

## 🔍 Troubleshooting

### Issue: Tests Not Running

**Problem**: Tests.html opens but no tests appear

**Solutions:**
1. Check browser console for errors (F12)
2. Verify test file paths are correct
3. Check that modules are imported correctly
4. Ensure Jasmine framework files load (check Network tab)

### Issue: Module Import Errors

**Problem**: "Cannot find module" or "Unexpected identifier"

**Solutions:**
```javascript
// Verify import path is correct and uses .js extension
import { cart } from "../../data/cart.js"; // Correct
import { cart } from "../../data/cart"; // Wrong

// Ensure file exports exist
export const cart = []; // Source file must export
```

### Issue: localStorage Errors

**Problem**: "localStorage is undefined" in tests

**Solutions:**
```javascript
// Always spy on localStorage before use
beforeEach(() => {
  spyOn(localStorage, "getItem").and.returnValue(null);
  spyOn(localStorage, "setItem");
});
```

### Issue: DOM Not Found

**Problem**: Cannot find elements in tests

**Solutions:**
```javascript
// Verify beforeEach sets up DOM
beforeEach(() => {
  document.body.innerHTML = `
    <div class="JS-test-container">
      <div class="JS-order-summary"></div>
    </div>`;
  
  // Then render component
  renderOrderSummary();
  
  // Now query should work
  const element = document.querySelector(".JS-order-summary");
});
```

### Issue: Async Test Timeout

**Problem**: Test takes too long or hangs

**Solutions:**
```javascript
// Use done() callback
it("async test", (done) => {
  asyncFunction().then(() => {
    expect(something).toBe(true);
    done(); // Must call done()
  });
});

// Or increase timeout
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
```

### Issue: Spy Not Detecting Calls

**Problem**: expect().toHaveBeenCalled() fails unexpectedly

**Solutions:**
```javascript
// Spy must be set up BEFORE function is called
beforeEach(() => {
  spyOn(localStorage, "setItem"); // Before test code
});

it("test", () => {
  addToCart(); // Now calls are tracked
  expect(localStorage.setItem).toHaveBeenCalled(); // Works
});
```

---

## 📊 Test Results Summary

### Current Test Status

| Test File | Status | Count | Coverage |
|-----------|--------|-------|----------|
| moneyTest.js | ✅ Pass | 3 | High |
| cartTest.js | ✅ Pass | 8+ | High |
| orderSummaryTest.js | ✅ Pass | 5+ | High |
| paymentSummaryTest.js | ✅ Pass | 4+ | Medium |
| **Total** | ✅ **20+** | **100%** | **Good** |

### Recent Improvements

- Enhanced cart testing with delivery option tests
- Added DOM rendering verification
- Improved mock data setup
- Better async handling

---

## 🔗 Related Documentation

- [README.md](README.md) - Project overview
- [Jasmine Official Docs](https://jasmine.github.io/)
- [MDN Testing Guide](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Testing)

---

## 📝 Notes

- Tests use **ES6 modules**, so type="module" is required
- LocalStorage is mocked to avoid test pollution
- DOM tests use a sandbox div with class "JS-test-container"
- Async operations use either done() or Promise return
- Framework version 5.1.1 supports all modern browsers

---

**Last Updated**: January 13, 2026  
**Test Framework**: Jasmine 5.1.1  
**Status**: Active Development
