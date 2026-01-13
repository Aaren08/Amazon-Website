# JavaScript Amazon Project

A comprehensive full-stack e-commerce project built with vanilla JavaScript, HTML, and CSS. This project demonstrates modern web development practices including object-oriented programming, asynchronous operations, state management, and automated testing with Jasmine.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Key Components](#key-components)
- [Architecture](#architecture)
- [Testing](#testing)
- [Git Integration](#git-integration)

---

## 🎯 Project Overview

This is an Amazon-like e-commerce web application that allows users to:

- Browse a product catalog
- Add/remove items from shopping cart
- Select delivery options
- View order summary and payment details
- Process orders
- Track order history

The project demonstrates professional JavaScript development practices with modular code, separation of concerns, and comprehensive test coverage using the Jasmine testing framework.

---

## ✨ Features

### Core Functionality

- **Product Catalog**: Display products with images, ratings, and pricing
- **Shopping Cart**: Add, remove, and update product quantities with persistent storage
- **Product Classes**: Supports different product types (Clothing, Appliance) with inheritance
- **Delivery Options**: Multiple delivery methods with different pricing and timeframes
- **Order Management**: Create and track orders with detailed summaries
- **Search Functionality**: Filter and search products by name
- **Price Formatting**: Accurate currency conversion and display
- **Persistent Storage**: LocalStorage for cart and order data
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Async Operations**: Fetch products from backend/API with promises

### Technical Features

- **Object-Oriented Design**: Class-based architecture with inheritance
- **Module System**: ES6 modules for code organization
- **State Management**: Centralized cart and order state
- **Event-Driven Architecture**: Custom events for component communication
- **API Integration**: Support for backend data loading via XMLHttpRequest and Fetch API
- **Automated Testing**: Comprehensive Jasmine test suite with mocks and spies

---

## 📁 Project Structure

```
javascript-amazon-project/
├── amazon.html                    # Main product catalog page
├── checkout.html                  # Checkout page
├── orders.html                    # Order history page
├── tracking.html                  # Order tracking page
│
├── data/                          # Data layer and state management
│   ├── products.js               # Product data, classes, and loader
│   ├── cart.js                   # Cart state (functional approach)
│   ├── cart-class.js             # Cart state (OOP approach)
│   ├── cart-oop.js               # Alternative OOP implementation
│   ├── orders.js                 # Order management and storage
│   ├── deliveryOptions.js        # Delivery method definitions
│   └── backend-practice.js       # Backend integration examples
│
├── Scripts/                       # Business logic and UI rendering
│   ├── amazon.js                 # Product grid rendering and cart interactions
│   ├── checkout.js               # Checkout page orchestration
│   ├── orders.js                 # Order history rendering
│   ├── tracking.js               # Order tracking display
│   ├── checkout/                 # Checkout-specific modules
│   │   ├── orderSummary.js      # Order summary rendering
│   │   └── paymentSummary.js    # Payment calculations and display
│   └── utils/                    # Utility functions
│       ├── money.js             # Currency formatting
│       └── search.js            # Search functionality
│
├── styles/                        # CSS styling
│   ├── pages/                    # Page-specific styles
│   │   ├── amazon.css           # Product catalog styles
│   │   ├── orders.css           # Orders page styles
│   │   ├── tracking.css         # Tracking page styles
│   │   └── checkout/            # Checkout page styles
│   │       ├── checkout.css
│   │       └── checkout-header.css
│   └── shared/                   # Shared styles
│       ├── general.css          # Global styles
│       └── amazon-header.css    # Header component styles
│
├── images/                        # Image assets
│   ├── icons/                   # Icon images
│   ├── products/                # Product images
│   │   └── variations/          # Product variant images
│   └── ratings/                 # Star rating images
│
└── backend/
    └── products.json            # JSON data for products

test-jasmine/
├── lib/jasmine-5.1.1/          # Jasmine testing framework
│   ├── tests.html              # Test runner HTML
│   ├── utils/                  # Utility tests
│   │   └── moneyTest.js       # Currency formatting tests
│   ├── data/                   # Data layer tests
│   │   └── cartTest.js        # Cart functionality tests
│   └── checkout/               # Checkout module tests
│       ├── orderSummaryTest.js # Order summary tests
│       └── paymentSummaryTest.js # Payment calculation tests
└── MIT.LICENSE                 # Jasmine framework license
```

---

## 🛠 Technologies Used

### Frontend
- **HTML5**: Semantic markup and form handling
- **CSS3**: Responsive design, flexbox, grid layouts
- **JavaScript (ES6+)**: Classes, modules, arrow functions, destructuring
- **DOM APIs**: Element selection, event handling, manipulation

### Data & Storage
- **LocalStorage API**: Client-side persistent storage for cart and orders
- **JSON**: Data serialization and transmission
- **XMLHttpRequest & Fetch API**: Backend communication

### Development & Testing
- **Jasmine 5.1.1**: Testing framework and test runner
- **Git**: Version control system
- **Modules**: ES6 import/export for code organization

### Architecture Patterns
- **Object-Oriented Programming**: Class-based design with inheritance
- **Functional Programming**: Pure functions for utilities
- **Module Pattern**: Encapsulation and namespace management
- **Observer Pattern**: Event-driven component communication

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of JavaScript, HTML, and CSS

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/javascript-amazon-project.git
   cd javascript-amazon-project
   ```

2. **Open the main page**
   ```bash
   # On Windows
   start amazon.html
   
   # On macOS
   open amazon.html
   
   # Or open in your browser directly
   ```

### Running Tests

1. **Open the test runner**
   ```bash
   # Navigate to the test runner
   open test-jasmine/lib/jasmine-5.1.1/tests.html
   
   # Or open in your browser
   ```

2. **View test results**
   - The page will display all test suites and their results
   - Green checkmarks indicate passing tests
   - Red X marks indicate failing tests
   - Console shows detailed error messages

### Usage

1. **Browse Products**: View the product catalog on the main page
2. **Add to Cart**: Select quantity and click "Add to Cart"
3. **View Cart**: Click the cart icon in the header
4. **Checkout**: Proceed to checkout and select delivery options
5. **Review Order**: View order summary and payment details
6. **Place Order**: Complete the purchase
7. **Track Orders**: View order history and delivery status

---

## 🏗 Key Components

### 1. Product System (`data/products.js`)

**Classes:**
- `Product`: Base class with common properties (id, name, price, rating, image)
- `Clothing`: Extends Product with size chart link
- `Appliance`: Extends Product with instructions and warranty links

**Key Methods:**
- `getProduct(productId)`: Find product by ID
- `getStarsUrl()`: Generate rating star image URL
- `getPrice()`: Format price in currency
- `extraInfoHTML()`: Generate product-specific HTML

**Features:**
- Product inheritance and polymorphism
- Dynamic product loading from backend
- Support for product variations

### 2. Cart System (`data/cart.js` and `data/cart-class.js`)

**Two implementations available:**

**Functional Approach (`cart.js`):**
- Uses module pattern with closures
- Export cart array and functions
- Functions: addToCart, removeFromCart, updateQuantity, updateDeliveryOption

**Object-Oriented Approach (`cart-class.js`):**
- Cart class with private properties (#localStorageKey)
- Instance methods for all operations
- Multiple cart instances support (e.g., business cart, personal cart)

**Key Features:**
- Persistent storage via LocalStorage
- Product quantity management
- Delivery option selection
- Cart state management

### 3. Order System (`data/orders.js`)

**Functionality:**
- Create and store orders
- Order history tracking
- Persistent storage
- Order retrieval for display

### 4. Delivery Options (`data/deliveryOptions.js`)

**Features:**
- Multiple delivery methods
- Pricing for each option
- Delivery date calculation
- Cost included in order summary

### 5. Checkout Module (`Scripts/checkout/`)

**orderSummary.js:**
- Renders cart items with prices
- Handles item removal
- Quantity updates
- Product details display

**paymentSummary.js:**
- Calculates subtotal
- Applies taxes
- Includes delivery costs
- Shows total amount due

### 6. Utility Functions (`Scripts/utils/`)

**money.js:**
```javascript
formatCurrency(priceCents) // Converts cents to formatted currency string
```

**search.js:**
- Product search and filtering functionality

---

## 🎨 Architecture

### Data Flow

```
[User Interaction]
        ↓
[Event Listeners in Scripts]
        ↓
[Cart/Orders State Management (data/)]
        ↓
[LocalStorage Persistence]
        ↓
[DOM Rendering via Scripts]
        ↓
[Visual Display]
```

### Module Organization

**Data Layer** (`data/` folder):
- Manages application state
- Handles storage persistence
- Provides data access functions

**Business Logic** (`Scripts/` folder):
- Implements features using data
- Handles user interactions
- Renders UI components

**Presentation Layer** (`styles/` folder):
- CSS for visual presentation
- Responsive design rules
- Component styling

### State Management

1. **Cart State**: Stored in LocalStorage, managed by cart module
2. **Products**: Loaded from backend, cached in memory
3. **Orders**: Persisted in LocalStorage
4. **Delivery Options**: Static data with computed properties

---

## 🧪 Testing

### Test Coverage

The project includes comprehensive Jasmine tests for:

1. **Cart Operations** (`cartTest.js`)
   - Adding existing products
   - Adding new products
   - Removing products
   - Updating quantities
   - Delivery option updates

2. **Money Utilities** (`moneyTest.js`)
   - Currency formatting
   - Edge cases (zero, decimals)

3. **Order Summary** (`orderSummaryTest.js`)
   - Rendering cart items
   - Item removal functionality
   - Quantity updates
   - HTML structure verification

4. **Payment Summary** (`paymentSummaryTest.js`)
   - Payment calculation accuracy
   - Tax computation
   - Delivery cost inclusion

### Testing Features Used

- **Spies**: Mock localStorage methods
- **Hooks**: beforeEach, beforeAll for setup
- **Matchers**: toEqual, toHaveBeenCalled, toHaveBeenCalledWith
- **Async Testing**: Handle promises with done()
- **DOM Testing**: Verify HTML rendering

### Running Tests

```bash
# Open the test runner in browser
test-jasmine/lib/jasmine-5.1.1/tests.html

# Tests will automatically run and display results
# Check browser console for detailed logs
```

---

## 📦 LocalStorage Schema

### Cart Storage
```json
[
  {
    "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    "quantity": 2,
    "deliveryOptionId": "1"
  }
]
```

### Orders Storage
```json
[
  {
    "id": "unique-order-id",
    "orderTime": 1234567890,
    "totalCents": 9999,
    "products": [...]
  }
]
```

---

## 🔄 Git Integration

This project uses Git for version control:

- **.git/**: Git repository with full history
- **Commit history**: Track all changes and development progress
- **Branching**: Organize features and experiments

### Common Git Commands

```bash
# View commit history
git log --oneline

# Check current status
git status

# Stage and commit changes
git add .
git commit -m "Description of changes"

# Push to remote
git push origin main
```

---

## 🎓 Learning Concepts

This project demonstrates:

1. **Object-Oriented Programming**
   - Classes and inheritance
   - Private properties (#)
   - Method overriding

2. **Functional Programming**
   - Pure functions
   - Module closures
   - Higher-order functions

3. **Asynchronous JavaScript**
   - Promises
   - Async/await
   - XMLHttpRequest vs Fetch

4. **DOM Manipulation**
   - querySelector/querySelectorAll
   - Event listeners
   - Dynamic HTML generation

5. **State Management**
   - Centralized state
   - State persistence
   - State updates and notifications

6. **Testing & Quality**
   - Unit testing
   - Test-driven development
   - Mocking and spying

7. **Responsive Design**
   - Mobile-first approach
   - Flexbox layouts
   - Media queries

---

## 📄 License

This project is part of a learning course. See `MIT.LICENSE` in the test-jasmine folder for testing framework license information.

---

## 🤝 Contributing

This is a learning project. Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make improvements
4. Submit pull requests

---

## 💡 Future Enhancements

Potential improvements:

- [ ] User authentication system
- [ ] Real backend API integration
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Order filters and sorting
- [ ] Admin dashboard
- [ ] Advanced search and filtering
- [ ] Performance optimization

---

## 📚 References

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Jasmine Testing Framework](https://jasmine.github.io/)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

---

**Created**: January 2026  
**Last Updated**: January 13, 2026
