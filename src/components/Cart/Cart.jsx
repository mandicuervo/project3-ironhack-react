import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import './Cart.css';

export default function Cart() {
    const [updateCart, setUpdateCart] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [cartList, setCartList] = useState([]);
    const { beatToAdd, deleteItemFromCart } = useContext(CartContext);
    const [icon, setIcon] = useState('emptyCart');
    const navigate = useNavigate();

    useEffect(() => {
        const listFromStorage = JSON.parse(localStorage.getItem('cart'));
        setCartList(listFromStorage);
    }, [beatToAdd, showCart, updateCart])

    useEffect(() => {
        if(cartList && cartList.length > 0) {
            setIcon('fullCart')
        } else {
            setIcon('emptyCart')
        }
    }, [cartList])

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

    const deleteItem = (id) => {
        deleteItemFromCart(id);
        setUpdateCart(!updateCart);
    }

    return(
        <div className="Cart">
            {
                icon === 'fullCart' ? 
                <i className='bx bxs-cart-add bx-sm' onClick={toggleCart}></i>
                :
                <i className='bx bxs-cart bx-sm' onClick={toggleCart}></i>
            }
            {
                showCart && 
                <div className="cart-list">
                    {
                        cartList?.map(item => (
                            <div className="cart-items" key={item._id}>
                                <p>{item.name}</p>
                                <span>$ {item.price}</span>
                                <i className='bx bxs-x-circle' onClick={() => deleteItem(item._id)}></i>
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