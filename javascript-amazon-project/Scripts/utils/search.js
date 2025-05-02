// Get references to the search bar and button
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");

// Function to handle the search action
const handleSearch = () => {
  const searchQuery = searchBar.value.trim(); // Get the search input value
  if (searchQuery) {
    // Redirect to the same page with the search query as a URL parameter
    window.location.href = `amazon.html?search=${encodeURIComponent(
      searchQuery
    )}`;
  }
};

searchButton.addEventListener("click", handleSearch);

searchBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

// Function to filter products based on the search query
const filterProducts = (searchQuery) => {
  const products = document.querySelectorAll(".product-container"); // Assuming products have a class 'product'

  products.forEach((product) => {
    const productName = product.querySelector(".product-name").textContent; // Assuming product name is in an element with class 'product-name'

    if (!productName.toLowerCase().includes(searchQuery.toLowerCase())) {
      product.style.display = "none"; // Hide products that don't match the search query
    } else {
      product.style.display = ""; // Show matching products
    }
  });
};

// Step 1: Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get("search"); // Retrieve the 'search' parameter

if (searchQuery) {
  // Step 2: Wait for products to be rendered before filtering
  document.addEventListener("productsRendered", () => {
    filterProducts(searchQuery);
  });
}
