import React from 'react';
import './styles/product-item.scss';
import currency from 'currency.js';
import Stars from './components/Stars';

const ProductItem = props=>{
    const {name, price, stars, sold, url, tags} = props;
    console.log(price, price)
    return (
        <div className="shoper-product-item">
            <div className="shoper-product-item__image">
                <img src={url} alt="image-product"/>
            </div>
            <div className="shoper-product-item__content">
                <div className="shoper-product-item__content__name">
                    {name}
                </div>
                <div className="shoper-product-item__content__tags">
                    {tags && tags.map(tag =><div className="shoper-product-item__content__tags__tag">{tag}</div>)}
                </div>
                <div className="shoper-product-item__content__price">
                    {currency(price).format()}
                    {/* {currency(price || '')} */}
                </div>
                <div className="shoper-product-item__content__evaluate">
                    <div className="shoper-product-item__content__evaluate__stars">
                        <Stars number={stars}/>
                    </div>
                    <div className="shoper-product-item__content__evaluate__sold">
                        {sold} sold
                    </div>
                </div>
                <div className="shoper-product-item__content__position">Singapore</div>
            </div>

        </div>
    )
}

export default ProductItem;