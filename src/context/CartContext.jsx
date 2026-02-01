import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/carts")
      .then(res => res.json())
      .then(data => {
        setCart(data[0]?.products || []);
      });
  }, []);

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.productId !== id));
  };

  return (
    <CartContext.Provider value={{ cart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
