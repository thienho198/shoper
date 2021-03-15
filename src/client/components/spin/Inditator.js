import React from 'react'
import './styles/indicator.css'

const CustomIndicator = props => {
    return (
        <div class="spinner" style={{paddingTop: props.paddingTop}}>
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    )
}

export default CustomIndicator