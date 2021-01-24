import React, {useState, useEffect} from 'react';
import ProductCard from "../product-card/ProductCard";
import Modal from "../modal/Modal";
import OrderForm from "../orderForm/OrderForm";
import './_main.scss';

export default function Main() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [orderItem, setOrderItem] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e")
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                    setIsLoading(false);
                },
                (error) => {
                    setError(error);
                    setIsLoading(false);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (isLoading) {
        return <div className='preloader'>Loading...</div>;
    }
    return (
        <div className='wrapper'>
            <div className='board'>
                {items.map((item, idx) =>
                    <ProductCard key={idx} {...item} onBuyCallback={()=>setOrderItem(item)}/>
                )}
            </div>
            {orderItem && <Modal onOrderCallback={()=>setOrderItem(null)}><OrderForm {...orderItem} onOrderCallback={()=>setOrderItem(null)} /></Modal>}
            <button className='btn btn_large' onClick={()=>{
                setOrderItem(items.reduce((min, item)=> min = min.price < item.price ? min : item));
            }}>Buy cheapest</button>
        </div>
    );
}