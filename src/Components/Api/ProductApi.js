import { request } from "./http";

// Get all products
export const getAllProducts = () => request("/products");

// Get single product
export const getProductById = (id) => request(`/products/${id}`);

// Get products by category
export const getProductsByCategory = (category) =>
  request(`/products/category/${category}`);
