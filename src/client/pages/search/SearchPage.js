import React from 'react';
import {ReactComponent as FilterIcon} from './icons/FilterIcon.svg';
import './styles/search-page.scss';
import products from '../../modules/mock/products';
import ProductItem from '../../components/product-item/ProductItem';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
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
    componentDidMount(){ 
       this.fetchData();
    }
    componentDidUpdate(prevProps) {
        const newParams = this.covertUrlStringToObj(this.props.history.location.search.replace('?', '') || '');
        if(newParams.keyword && this.currentKeyword !== newParams.keyword){
            this.fetchData()
        }
    }
    //#region funcs
    covertUrlStringToObj = (url)=>{
        if(url === '') return {}
        return JSON.parse('{"' + decodeURI(url).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
     }
    render() {
        const ojParams = this.covertUrlStringToObj(this.props.history.location.search.replace('?', '') || '');
        return (
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
                                {this.state.data.map(product =><ProductItem key={product.id} {...product}/>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default {
    component: SearchPage
}