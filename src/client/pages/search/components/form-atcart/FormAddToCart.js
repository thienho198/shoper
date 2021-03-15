import React,{useState} from 'react';
import '../../styles/form-add-to-cart.scss';
import currency from 'currency.js';
import {addProductToCart} from '../../../../store/actions/default';
import {connect} from 'react-redux';

const FormAddToCart = props=>{
    const {name, price, stars, sold, url, tags} = props.product;
    const [quantity,setQuantity] =  useState(1);
    
    const onSubtractHandler = ()=>{
        if(quantity>1){
            const newQuantity = quantity - 1;
            setQuantity(newQuantity)
        }
    }
    const onPlusHandler = ()=>{
        const newQuantity = quantity + 1;
        setQuantity(newQuantity)
    }

    const onAddHandler = ()=>{
        props.addProductToCart({...props.product},quantity);
        props.onCloseModal && props.onCloseModal();
    }

    return (
        <div className="shoper-form-add-to-cart">
            <div className="shoper-form-add-to-cart__image">
                <img src={url} alt="product-photo" />
            </div>
            <div className="shoper-form-add-to-cart__content">
                <div className="shoper-form-add-to-cart__content__name">
                    {name}
                </div>
                <div className="shoper-form-add-to-cart__content__price">
                    <span>Price:</span> {currency(price * quantity).format()}
                </div>
                <div className="shoper-form-add-to-cart__content__quantity">
                    <span className="shoper-form-add-to-cart__content__quantity__label">Quantity:</span> 
                    <div className="shoper-form-add-to-cart__content__quantity__counter">
                        <span onClick={onSubtractHandler} className="shoper-form-add-to-cart__content__quantity__counter__subtract">
                            -
                        </span>
                        <span className="shoper-form-add-to-cart__content__quantity__counter__number">
                            {quantity}
                        </span>
                        <span onClick={onPlusHandler} className="shoper-form-add-to-cart__content__quantity__counter__plus">
                            +
                        </span>
                    </div>
                </div>
                <div onClick={onAddHandler} className="shoper-form-add-to-cart__content__buttonadd">
                    Add To Cart
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps = (dispatch)=>{
    return {
        addProductToCart:(product, quantity)=>dispatch(addProductToCart(product, quantity))
    }
}
export default connect(null, mapDispatchToProps)(FormAddToCart);