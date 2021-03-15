import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
   cart:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEFAULT_REDUCER_HELLO:
      return updateObject(state, { sayHello: true });
    case actionTypes.ADD_PRODUCT_TO_CART:
      const updateCart = [...state.cart];
      updateCart.push({product:action.product, quantity:action.quantity});
      return updateObject(state, {cart: updateCart});
    default:
      return state;
  }
};

export default reducer;
