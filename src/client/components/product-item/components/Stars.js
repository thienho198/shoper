import React from 'react';
import {ReactComponent as StarIcon} from '../icons/StarIcon.svg';
import '../styles/stars.scss';

const Stars = ({number})=>{
    const arr = new Array(number);
    for(let i=0; i<=number; i++){
        arr[i] = (<div key={i} className="shoper-list-stars__star"><StarIcon width="8" height="8" /></div>)
    }
    return (
        <div className="shoper-list-stars">
            {arr}
        </div>
    )
}

export default Stars;