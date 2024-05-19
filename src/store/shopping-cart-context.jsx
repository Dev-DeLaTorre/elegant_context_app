import { createContext, useState, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateCartItem: () => {},
});

function ShoppingCartReducer(state, action){
    if(action.type === "ADD_ITEM"){
        const updatedItems = [...state.items];
    
          const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload.id
          );
          const existingCartItem = updatedItems[existingCartItemIndex];
    
          if (existingCartItem) {
            const updatedItem = {
              ...existingCartItem,
              quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
          } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload.id);
            updatedItems.push({
              id: action.payload.id,
              name: product.title,
              price: product.price,
              quantity: 1,
            });
          }
    
          return {
            items: updatedItems,
          };
    }
    if(action.type === "UPDATE_ITEM"){
        const updatedItems = [...state.items];
          const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
          );
    
          const updatedItem = {
            ...updatedItems[updatedItemIndex],
          };
    
          updatedItem.quantity += action.payload.amount;
    
          if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
          } else {
            updatedItems[updatedItemIndex] = updatedItem;
          }
    
          return {
            items: updatedItems,
          };
    }
    
    return state;
}

export default function ContextProviderComponent({ children }){
    /*const [shoppingCart, setShoppingCart] = useState({
        items: [],
      });*/
    
      const [ shoppingCart, shoppingCartDispatcher] = useReducer(ShoppingCartReducer, {
        items: [],
      });
    
      function handleAddItemToCart(id) {
        shoppingCartDispatcher({
            type: "ADD_ITEM",
            payload: {
                id,
            }
        });
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatcher({
            type: "UPDATE_ITEM",
            payload: {
                productId,
                amount,
            }
        });
      }
    
      const contextValues = {items: shoppingCart.items,
         addItemToCart: handleAddItemToCart,
         updateCartItem: handleUpdateCartItemQuantity}

    return <CartContext.Provider value={contextValues}>
        {children}
    </CartContext.Provider>;
}