import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import './Cart.css';

export default function Cart() {
    const [showCart, setShowCart] = useState(false);
    const [cartList, setCartList] = useState([]);
    const { beatToAdd, cartIcon, setCartIcon } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const listFromStorage = JSON.parse(localStorage.getItem('cart'));
        setCartList(listFromStorage);
    }, [beatToAdd, showCart])

    const toggleCart = () => {
        setShowCart(!showCart);
    }

    const goToCart = () => {
        navigate('/checkout');
        setShowCart(false);
    }

    const goToBeats = () => {
        navigate('/search');
        setShowCart(false);
    }

    return(
        <div className="Cart">
            {
                cartIcon ? 
                <i class='bx bxs-cart-add bx-sm' onClick={toggleCart}></i>
                :
                <i className='bx bxs-cart bx-sm' onClick={toggleCart}></i>
            }
            {
                showCart && 
                <div className="cart-list">
                    {
                        cartList?.map(item => (
                            <div>
                                <span>{item.name}</span>
                                <span>$ {item.price}</span>
                            </div>
                        ))
                    }
                    {
                        cartList?.length > 0 ?
                        <div className="checkout-btn" onClick={goToCart}>
                            GO TO CHECKOUT
                        </div>
                        :
                        <div className="checkout-btn" onClick={goToBeats}>
                            FIND YOUR BEAT
                        </div>
                    }
                </div>
            }
        </div>
    )
}