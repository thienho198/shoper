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

export const subtractProductNumber = (id) =>{
  return {
    type: actionTypes.SUBTRACT_PRODUCT_NUMBER,
    id: id
  }
}

export const plusProductNumber = (id) =>{
  return {
    type: actionTypes.PLUS_PRODUCT_NUMBER,
    id: id
  }
}

export const removeProduct = (id) =>{
  return {
    type: actionTypes.REMOVE_PRODUCT,
    id: id
  }
}