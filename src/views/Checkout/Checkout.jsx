import { useEffect, useState } from "react";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import './Checkout.css';
import CheckoutContainer from "../../components/CheckoutForm/CheckoutContainer/CheckoutContainer";

export default function Checkout() {
    const [orderList, setOrderList] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const copyOfCart = JSON.parse(localStorage.getItem('cart'));
        setOrderList(copyOfCart);
    }, [])

    useEffect(() => {
        let sum = 0;
        if(orderList?.length > 0) {
            orderList.map(item => {
                sum += item.price
            })
        }
        setTotalPrice(sum);
    }, [orderList])

    return(
        <div className="Checkout">
            <h1>CHECKOUT</h1> 
            {
                orderList && orderList.length > 0 ?
                <div>
                    <h2>Your order</h2>
                    {
                        orderList.map(item => (
                            <div key={item._id}>
                                <p>{item.name}</p>
                                <span>$ {item.price}</span>
                            </div>
                        ))
                    }
                    <div>
                        TOTAL: $ {totalPrice}
                    </div>
                    <CheckoutContainer />
                </div>
                :
                <div>
                    <h2>You haven't added anything to your cart. Come back later.</h2>
                </div>
            }
        </div>
    )
}