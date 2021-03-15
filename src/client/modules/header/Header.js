import React from 'react';
import './styles/header.scss';
import {ReactComponent as SearchIcon} from './icons/SearchIcon.svg';
import {ReactComponent as CartIcon} from './icons/CartIcon.svg';
import {withRouter} from 'react-router-dom';

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
            search: `?keyword=${this.state.keyword}`,
        })
    }
    //#region lifecycle 
    componentDidMount(){
        const ojParams = this.covertUrlStringToObj(this.props.history.location.search.replace('?', '') || '')
        console.log(ojParams)
        this.setState({keyword:ojParams.keyword})
    }
    //#region funcs
    covertUrlStringToObj = (url)=>{
        if(url === '') return {}
        return JSON.parse('{"' + decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
     }
    render() {
        return (
            <div className="header-fluid">
                <div className="shoper-header container">
                    <div className="shoper-header__tools">
                        <div className="shoper-header__tools__left">
                            {TOOLS_LEFT.map(item=><div className="shoper-header__tools__left__item">{item}</div>)}
                        </div>
                        <div className="shoper-header__tools__right">
                            {TOOLS_RIGHT.map(item=><div className="shoper-header__tools__right__item">{item}</div>)}
                        </div>
                    </div>
                    <div className="shoper-header__search-area">
                        <div className="shoper-header__search-area__logo">
                            Shoper
                        </div>
                        <div className="shoper-header__search-area__search">
                            <input className="shoper-header__search-area__search__input" type="text" placeholder="Search for products" value={this.state.keyword || ''} onChange={this.onSearchInputChange}/>
                            <div className="shoper-header__search-area__search__button" onClick={this.onSearchHandler}><SearchIcon width="16" height="16"/></div>
                        </div>
                        <div className="shoper-header__search-area__cart">
                            <CartIcon width="30" height="30"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);