import React from "react";
import './_product-card.scss';

export default function ProductCard(props) {
    return (
        <div className='block'>
            <div className='block__wrapper'>
                <h4 className='block__category'>{props.category}</h4>
                <h2 className='block__title'>{props.name}</h2>
                <div className='row'>
                    <h3 className='block__price'><span>$</span>{props.price}</h3>
                    <button className='btn' onClick={props.onBuyCallback} >buy</button>
                </div>
            </div>
        </div>
    );
}