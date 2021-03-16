import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
   cart:[]
};

const subtractProductNumber = (state,action)=>{
  const updateCart = [...state.cart];
  const indexItem = updateCart.findIndex(item => item.product.id===action.id)
  const updateItem = {...updateCart[indexItem]};
  if(updateItem.quantity > 1) updateItem.quantity = updateItem.quantity -1;
  updateCart[indexItem] = updateItem;
  return updateCart;
}
const plusProductNumber = (state,action)=>{
  const updateCart = [...state.cart];
  const indexItem = updateCart.findIndex(item => item.product.id===action.id)
  const updateItem = {...updateCart[indexItem]};
  updateItem.quantity = updateItem.quantity + 1;
  updateCart[indexItem] = updateItem;
  return updateCart;
}
const removeProduct = (state,action)=>{
  const updateCart = [...state.cart];
  const indexItem = updateCart.findIndex(item => item.product.id===action.id);
  updateCart.splice(indexItem,1);
  return updateCart;
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEFAULT_REDUCER_HELLO:
      return updateObject(state, { sayHello: true });
    case actionTypes.ADD_PRODUCT_TO_CART:
      const updateCart = [...state.cart];
      const itemIndex = updateCart.findIndex(item => item.product.id===action.product.id);
      if(itemIndex>=0){
        const updateItem = {...updateCart[itemIndex]}
        updateItem.quantity = updateItem.quantity + action.quantity
        updateCart[itemIndex] = updateItem;
      }
      else{
        updateCart.push({product:action.product, quantity:action.quantity});
      }
      return updateObject(state, {cart: updateCart});
    case actionTypes.SUBTRACT_PRODUCT_NUMBER:
      return updateObject(state, {cart: subtractProductNumber(state,action)});
    case actionTypes.PLUS_PRODUCT_NUMBER:
      return updateObject(state, {cart: plusProductNumber(state,action)});
    case actionTypes.REMOVE_PRODUCT:
      return updateObject(state, {cart: removeProduct(state,action)})
    default:
      return state;
  }
};

export default reducer;
