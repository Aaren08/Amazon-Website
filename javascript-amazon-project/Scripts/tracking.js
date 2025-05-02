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
    const orders = ordersData ? JSON.parse(ordersData) : [];

    // Parse URL parameters to get orderId and productId
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("orderId");
    const productId = urlParams.get("productId");

    // Find the specific order and product
    const order = orders.find((o) => o.id === orderId);
    if (!order) {
      console.error("Order not found");
      return;
    }

    const product = order.products.find((p) => p.productId === productId);
    if (!product) {
      console.error("Product not found");
      return;
    }

    const orderTracking = document.createElement("div");
    orderTracking.className = "order-tracking-container";

    const productInfo = productDetails[product.productId];

    if (productInfo) {
      const productElement = document.createElement("div");
      productElement.className = "product-info";

      productElement.innerHTML = `
                <div class="order-tracking JS-order-tracking">
                  <a class="back-to-orders-link link-primary" href="orders.html">
                    View all orders
                  </a>
          
                  <div class="delivery-date">Arriving on ${new Date(
                    product.estimatedDeliveryTime
                  ).toLocaleDateString()}</div>
          
                  <div class="product-info">
                    ${productInfo.name}
                  </div>
          
                  <div class="product-info">Quantity: ${product.quantity}</div>
          
                  <img
                    class="product-image"
                    src="${productInfo.image}"
                  />
          
                  <div class="progress-labels-container">
                    <div class="progress-label">Preparing</div>
                    <div class="progress-label current-status">Shipped</div>
                    <div class="progress-label">Delivered</div>
                  </div>
          
                  <div class="progress-bar-container">
                    <div class="progress-bar"></div>
                  </div>
                </div>`;

      orderTracking.appendChild(productElement);
    }

    // Append the order tracking element to the body or a specific container
    document.body.appendChild(orderTracking);
  })

  .catch((error) => {
    console.error("Error fetching product data:", error);
  });
