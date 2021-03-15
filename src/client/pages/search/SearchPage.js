import React from 'react';
import {ReactComponent as FilterIcon} from './icons/FilterIcon.svg';
import './styles/search-page.scss';
import products from '../../modules/mock/products';
import ProductItem from '../../components/product-item/ProductItem';
import Modal from '../../components/mymodal';
import FormAddToCart from './components/form-atcart/FormAddToCart';
import { Helmet } from 'react-helmet';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    //#region events
    addToCartOpenModal = (idProduct) =>{
        const product = this.state.data.find(item => item.id === idProduct)
        this.modalRef.onShow(<FormAddToCart product={product} onCloseModal={()=>this.modalRef.onBlur()}/>);
    }
    //#region life cycle
    componentDidMount(){ 
       this.fetchData();
    }
    componentDidUpdate() {
        const newParams = this.covertUrlStringToObj(this.props.history.location.search.replace('?', '') || '');
        if(newParams.keyword && this.currentKeyword !== newParams.keyword){
            this.fetchData()
        }
    }
    //#region funcs
    fetchData() {
        const ojParams = this.covertUrlStringToObj(this.props.history.location.search.replace('?', '') || ''); 
        if(ojParams.keyword){
            const matchProducts =  products.filter(product =>{
                const regex = new RegExp(ojParams.keyword ,"g");
                return regex.test(product.name);
            });
            this.currentKeyword = ojParams.keyword;
            this.setState({data:matchProducts})
        }
        else{
            this.setState({data:products})
        }
    }
    covertUrlStringToObj = (url)=>{
        if(url === '') return {}
        return JSON.parse('{"' + decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
     }
     //#region render
    render() {
        const ojParams = this.covertUrlStringToObj(this.props.history.location.search.replace('?', '') || '');
        return (
            <React.Fragment>
                <Helmet>
                    <title>Shoper Searching</title>
                </Helmet>
                <div className="shoper-body">
                    <div className="shoper-body-container container">
                        <div className="shoper-body-container__content">
                            <div className="shoper-body-container__content__filterwraper">
                                <div className="shoper-body-container__content__filterwraper__title">
                                    <div className="shoper-body-container__content__filterwraper__title__icon">
                                        <FilterIcon width="14" height="14"/>
                                    </div>
                                    <div className="shoper-body-container__content__filterwraper__title__name">
                                        SEARCH FILTER
                                    </div>
                                </div>
                            </div>
                            <div className="shoper-body-container__content__searchresults">
                                <div className="shoper-body-container__content__searchresults__keyword">
                                    Search result for <span className="shoper-body-container__content__searchresults__keyword__innerspan" >'{ojParams.keyword || 'All'}'</span>
                                </div>
                                <div className="shoper-body-container__content__searchresults__listproduct">
                                    {this.state.data.map(product =><ProductItem key={product.id} product={product} addToCartOpenModal={(id)=>this.addToCartOpenModal(id)}/>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal getRef={(ref)=>{this.modalRef = ref}}/>
                </div>
            </React.Fragment>
        )
    }
}

export default {
    component: SearchPage
}