import * as actionTypes from './actionTypes';

export const sayHello = () => {
  return {
    type: actionTypes.DEFAULT_REDUCER_HELLO,
  };
};

export const addProductToCart = (product,quantity) => {
  return {
    type: actionTypes.ADD_PRODUCT_TO_CART,
    product: product,
    quantity: quantity
  }
}
