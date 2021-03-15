import React from 'react';
import {ReactComponent as SearchIcon} from '../../modules/header/icons/SearchIcon.svg';
import  './styles/cart-page.scss';
import _ from 'lodash';
import currency from 'currency.js'
import TableView from '../../components/mytableview';
import {store} from '../../store';
import {subtractProductNumber, plusProductNumber} from '../../store/actions/default';
import { Helmet } from 'react-helmet';

const TOOLS_LEFT = ['Seller Centre','Sell on Shoper', 'Download'];
const TOOLS_RIGHT = ['Notifications', 'Help'];

class CartPage extends React.Component {
    constructor(props) {
        super(props);
    }



    handleChange = ()=> {
        this.previousValue = this.currentValue || null;
        this.currentValue = store.getState().default.cart
        if (this.previousValue !== this.currentValue) {
            this.tableViewRef.setValues(this.currentValue.map(product =>{return{...product.product, quantity:product.quantity}}))
        }
      }

    componentDidMount(){
       this.currentValue = store.getState().default.cart
       this.unscribe = store.subscribe(this.handleChange)
    }
    componentWillUnmount(){
        this.unscribe()
    }
    renderQuantity(quantity, id) {
        const onSubtractHandler = ()=>{
            store.dispatch(subtractProductNumber(id))
        }
        const onPlusHandler = ()=>{
            store.dispatch(plusProductNumber(id))
        }
        return (
            <div className="shoper-form-add-to-cart__content__quantity" style={{marginBottom:'0'}}>
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
        )
    }
    render() {
        const cart = _.get(store.getState(),'default.cart')
        return (
            <React.Fragment>
            <Helmet>
                <title>Shoper Cart</title>
            </Helmet>
            <div className="shoper-cart-page">
                <div className="shoper-cart-page__header">
                    <div className="shoper-cart-page__header__tools__wrapper">
                        <div className="shoper-cart-page__header__tools container">
                            <div className="shoper-cart-page__header__tools__left">
                                {TOOLS_LEFT.map(item=><div key={item} className="shoper-header__tools__left__item">{item}</div>)}
                            </div>
                            <div className="shoper-cart-page__header__tools__right">
                                {TOOLS_RIGHT.map(item=><div key={item} className="shoper-header__tools__right__item">{item}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className="shoper-cart-page__header__container container">
                        <div className="shoper-cart-page__header__container__logo">
                            <span className="shoper-cart-page__header__container__logo__left" >Shoper</span> <span className="shoper-cart-page__header__container__logo__linebreak"/> <span className="shoper-cart-page__header__container__logo__right">Cart</span>
                        </div>
                        <div className="shoper-cart-page__header__container__search">
                            <input className="shoper-cart-page__header__container__search__input" type="text" placeholder="Search for products"/>
                            <div className="shoper-cart-page__header__container__search__button">
                                <SearchIcon width="16" height="16"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shoper-cart-page__body">
                    <div className="container">
                                <TableView 
                                    linkRef={ref=>this.tableViewRef = ref}
                                    columnsDef={
                                        [
                                        {field: 'stt', label:'STT', width:'50px', textAlign:'center'},
                                        {field: 'name', label:'Product', minWidth:'250px', width:'auto', renderer:(dataRow)=><div className="product-name"><img className="product-name__image" src={dataRow.url} alt="photo-product"/><div className="product-name__name">{dataRow.name}</div></div>},
                                        {field: 'price', label:'Price', width:'100px', renderer:(dataRow)=><div>{currency(dataRow.price).format()}</div>},
                                        {field: 'quantity', label:'Quantity', width:'100px', renderer:dataRow=>this.renderQuantity(dataRow.quantity, dataRow.id)},
                                        {field: 'sum', label:'Sum', width:'100px',renderer:(dataRow)=>{return <div>{currency(dataRow.price * dataRow.quantity).format()}</div>}},
                                        {field: 'action', label:'Action', width:'200px'}
                                    ]}  
                                    rowsData={cart.map(product =>{return{...product.product, quantity:product.quantity}})}                                   
                                />

                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default {component:CartPage};