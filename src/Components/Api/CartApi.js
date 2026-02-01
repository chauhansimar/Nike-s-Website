export const fetchCarts = () => {
  return fetch("https://fakestoreapi.com/carts")
    .then((res) => res.json());
};
