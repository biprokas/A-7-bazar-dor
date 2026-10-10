const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();
  return data;
};

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
};

export const getProductsByCategory = async (category) => {
  const response = await fetch(`${BASE_URL}/products?category=${category}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products by category");
  }

  const data = await response.json();
  return data;
};

export const getProduct = async (productId) => {
  const response = await fetch(`${BASE_URL}/products/${productId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await response.json();
  return data;
};
