import { createContext, useEffect, useMemo, useState } from "react";
import { getOneBeat } from "../services/BeatsService";

const CartContext = createContext();
export default CartContext;

export const CartProvider = ({ children }) => {
    const [beatToAdd, setBeatToAdd] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addItemToCart = () => {
        setIsModalOpen(false);
        
        if(!cartItems.includes(beatToAdd)) {
            setCartItems([...cartItems, beatToAdd])
            let sum = 0;
            cartItems.map(item => {
                sum += item.price
            })
            setTotalPrice(sum)
        }

        setBeatToAdd(null)


        console.log(cartItems, totalPrice)
    };

    const deleteItemFromCart = (id) => {
        let filtered = [...cartItems].filter(item => item.id !== id);
        setCartItems(filtered)
        let sum = 0;
        filtered.map(item => {
            sum += item.price
        })
        setTotalPrice(sum)
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
          cartItems,
          totalPrice,
          addItemToCart,
          deleteItemFromCart,
          isModalOpen,
          setContextBeat,
          beatToAdd,
          closeModal
        }
    }, [cartItems, totalPrice, addItemToCart, deleteItemFromCart, isModalOpen, setContextBeat, beatToAdd, closeModal]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
