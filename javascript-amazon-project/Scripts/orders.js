import { deliveryOptions } from "../data/deliveryOptions.js";

// Fetch product data from backend/products.json
fetch("backend/products.json")
  .then((response) => response.json())
  .then((products) => {
    // Create a mapping of product ID to product details
    const productDetails = {};
    products.forEach((product) => {
      productDetails[product.id] = {
        name: product.name,
        image: product.image,
      };
    });

    // Retrieve orders data from localStorage
    const ordersData = localStorage.getItem("orders");

    // Selecting the DOM element
    const ordersContainer = document.querySelector(".JS-orders-grid");

    // Clear any existing content in the orders container
    ordersContainer.innerHTML = "";

    if (ordersData) {
      // Parse the JSON string into a JavaScript object/array
      const orders = JSON.parse(ordersData);

      // Check if all orders are empty or have no products
      const allOrdersEmpty = orders.every(
        (order) => !order || !order.products || order.products.length === 0
      );

      // If no orders exist, display the "no-order-found" image
      if (allOrdersEmpty) {
        const noOrderFoundElement = document.createElement("div");
        noOrderFoundElement.className = "no-order-found-container";
        noOrderFoundElement.innerHTML = `
          <img src="images/icons/no-order-found.png" alt="No Order Found" />
        `;
        ordersContainer.appendChild(noOrderFoundElement);
        return;
      }

      // Loop through the orders and display them
      orders.forEach((order) => {
        if (!order || !order.products || order.products.length === 0) {
          return;
        }

        // Create a new DOM element for each order
        const orderElement = document.createElement("div");
        orderElement.className = "order-container";

        orderElement.innerHTML = `
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${new Date(order.orderTime).toLocaleDateString()}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${(order.totalCostCents / 100).toFixed(2)}</div>
              </div>
            </div>
            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>
        `;

        // Create a container for order details
        const orderDetailsGrid = document.createElement("div");
        orderDetailsGrid.className = "orders-grid-container";

        // Loop through the products in the order
        order.products.forEach((product) => {
          const productInfo = productDetails[product.productId];

          // Create a product element
          const productElement = document.createElement("div");
          productElement.className = "order-details-grid-container";

          productElement.innerHTML = `
            <div class="order-container">
              <div class="order-details-grid">
                <div class="product-image-container">
                  <img src="${productInfo.image}">
                </div>
                <div class="product-details">
                  <div class="product-name">${productInfo.name}</div>
                  <div class="product-delivery-date">
                    Arriving on: ${new Date(
                      product.estimatedDeliveryTime
                    ).toLocaleDateString()}
                  </div>
                  <div class="product-quantity">
                    Quantity: ${product.quantity}
                  </div>
                  <button class="buy-again-button JS-buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                  </button>
                </div>
                <div class="product-actions">
                  <a href="tracking.html?orderId=${order.id}&productId=${
            product.productId
          }">
                    <button class="track-package-button button-secondary">
                      Track package
                    </button>
                  </a>
                </div>
              </div>
            </div>
          `;

          // Attach event listener to the "Buy it again" button
          const buyAgainButton = productElement.querySelector(
            ".JS-buy-again-button"
          );
          buyAgainButton.addEventListener("click", () => {
            // Retrieve the cart from localStorage
            const cartData = localStorage.getItem("cart");
            const cart = cartData ? JSON.parse(cartData) : [];

            // Add the product to the cart
            cart.push({
              productId: product.productId,
              quantity: 1,
              deliveryOption: deliveryOptions[0].id,
            });

            // Save the updated cart back to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Optionally, show a confirmation message
            alert(`${productInfo.name} has been added to your cart.`);
          });

          // Append the product element to the order details grid
          orderDetailsGrid.appendChild(productElement);
        });

        // Append the order details grid to the order container
        orderElement.appendChild(orderDetailsGrid);

        // Append the order container to the main orders container
        ordersContainer.appendChild(orderElement);
      });
    } else {
      // If no orders data exists, display the "no-order-found" image
      const noOrderFoundElement = document.createElement("div");
      noOrderFoundElement.className = "no-order-found-container";
      noOrderFoundElement.innerHTML = `
        <img src="images/icons/no-order-found.png" alt="No Order Found" />
      `;
      ordersContainer.appendChild(noOrderFoundElement);
    }
  })
  .catch((error) => {
    console.error("Error fetching product data:", error);
  });
