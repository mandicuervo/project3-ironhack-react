import { createContext, useEffect, useMemo, useState } from "react";
import { getOneBeat } from "../services/BeatsService";

const CartContext = createContext();
export default CartContext;

export const CartProvider = ({ children }) => {
    const [beatToAdd, setBeatToAdd] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cartIcon, setCartIcon] = useState(false);

    const addItemToCart = () => {
        setIsModalOpen(false);
        setCartIcon(true);

        let totalCart = JSON.parse(localStorage.getItem('cart')) || [];

        if(totalCart) {
            let alreadyInCart = false;
            totalCart.map(item => {
                if(item._id === beatToAdd._id) alreadyInCart = true;
            })
            if(!alreadyInCart) {
                let cartToAdd = [...totalCart, beatToAdd];
                localStorage.setItem('cart', [JSON.stringify(cartToAdd)]);
            }
        }

        totalCart = JSON.parse(localStorage.getItem('cart'));

        setBeatToAdd(null)
    };

    const deleteItemFromCart = (id) => {
        let totalCart = JSON.parse(localStorage.getItem('cart')) || [];
        let filtered = [...totalCart].filter(item => item.id !== id);
        localStorage.setItem('cart', [JSON.stringify(filtered)])
    };

    const setContextBeat = (beat) => {
        setBeatToAdd(beat)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setBeatToAdd(null);
    }

    useEffect(() => {
        if(beatToAdd) {
            openModal()
        }
    }, [beatToAdd])
    
    const value = useMemo(() => {
        return {
          addItemToCart,
          deleteItemFromCart,
          isModalOpen,
          setContextBeat,
          beatToAdd,
          closeModal,
          cartIcon,
          setCartIcon
        }
    }, [setCartIcon, cartIcon, addItemToCart, deleteItemFromCart, isModalOpen, setContextBeat, beatToAdd, closeModal]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
