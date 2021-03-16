import React from 'react';
import './styles/header.scss';
import {ReactComponent as SearchIcon} from './icons/SearchIcon.svg';
import {ReactComponent as CartIcon} from './icons/CartIcon.svg';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const TOOLS_LEFT = ['Seller Centre','Sell on Shoper', 'Download'];
const TOOLS_RIGHT = ['Notifications', 'Help'];

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    //#region event
    onSearchInputChange = (event)=>{
        this.setState({keyword:event.target.value})
    }
    onSearchHandler = ()=>{
        this.props.history.push({
            pathname: '/search',
            search: `?keyword=${this.state.keyword || ''}`,
        })
    }
    onKeyDownHandler = (e)=>{
        if (e.key === 'Enter') {
            this.onSearchHandler()
        }
    }
    //#region lifecycle 
    componentDidMount(){
        const ojParams = this.covertUrlStringToObj(this.props.history.location.search.replace('?', '') || '')
        this.setState({keyword:ojParams.keyword || ''})
    }
    //#region funcs
    covertUrlStringToObj = (url)=>{
        if(url === '') return {}
        return JSON.parse('{"' + decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
     }
    render() {
        const numberProducts =  this.props.cart.length
        return (
            <div className="header-fluid">
                <div className="shoper-header container">
                    <div className="shoper-header__tools">
                        <div className="shoper-header__tools__left">
                            {TOOLS_LEFT.map(item=><div key={item} className="shoper-header__tools__left__item">{item}</div>)}
                        </div>
                        <div className="shoper-header__tools__right">
                            {TOOLS_RIGHT.map(item=><div key={item} className="shoper-header__tools__right__item">{item}</div>)}
                        </div>
                    </div>
                    <div className="shoper-header__search-area">
                        <div className="shoper-header__search-area__logo">
                            Shoper
                        </div>
                        <div className="shoper-header__search-area__search">
                            <input onKeyDown={this.onKeyDownHandler} className="shoper-header__search-area__search__input" type="text" placeholder="Search for products" value={this.state.keyword || ''} onChange={this.onSearchInputChange}/>
                            <div className="shoper-header__search-area__search__button" onClick={this.onSearchHandler}><SearchIcon width="16" height="16"/></div>
                        </div>
                        <div onClick={()=>{this.props.history.push('/cart')}} className="shoper-header__search-area__cart">
                            <CartIcon width="30" height="30"/>
                            <div className="shoper-header__search-area__cart__badge">
                                {numberProducts}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        cart: state.default.cart
    }
}
export default connect(mapStateToProps)(withRouter(Header));