import { createContext, useEffect, useMemo, useState } from "react";
import { productsData } from "../../database/productsData";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [estoque, setEstoque] = useState(productsData);

  const [cart, setCart] = useState([]);

  const cartItemsNumber = useMemo(
    () => cart.reduce((prev, current) => current.qty + prev, 0),
    [cart]
  );

  useEffect(() => {
    window.localStorage.setItem("imacart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (window.localStorage.getItem("imacart")) {
      const localCartStorage = JSON.parse(
        window.localStorage.getItem("imacart")
      );
      setCart([...localCartStorage]);
    }
  }, []);

  function handleAddItemToCart(id, img, name, price, qty, size) {
    const itemObject = { id, img, name, price, qty, size };

    const existingProduct = cart.find(
      (product) => product.id === id && product.size === size
    );

    if (existingProduct) {
      // alert("Este produto já existe no carrinho!")
      setCart(
        cart.map((product) => {
          if (product.id === existingProduct.id && product.size === size) {
            return {
              ...existingProduct,
              qty: qty + existingProduct.qty,
            };
          }
          return product;
        })
      );
    } else {
      setCart([...cart, itemObject]);
    }
  }

  const totalPrice = cart?.reduce(
    (acumulator, product) => acumulator + product.price * product.qty,
    0
  );

  function onRemove(id) {
    setCart(cart?.filter((produto) => produto.id !== id));
  }

  function onIncrease(productId, size) {
    setCart(
      cart?.map((product) =>
        product?.id === productId && product.size === size
          ? { ...product, qty: product?.qty + 1 }
          : { ...product }
      )
    );
  }

  function onDecrease(productId, size) {
    if (
      cart?.find(
        (product) =>
          product.id === productId && product.qty === 1 && product.size === size
      )
    )
      return;

    setCart(
      cart?.map((product) =>
        product?.id === productId && product.size === size
          ? { ...product, qty: product?.qty - 1 }
          : { ...product }
      )
    );
  }

  function limparCarrinho() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        estoque,
        cart,
        handleAddItemToCart,
        totalPrice,
        onIncrease,
        onDecrease,
        onRemove,
        cartItemsNumber,
        limparCarrinho,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
