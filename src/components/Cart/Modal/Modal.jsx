import './Modal.css';
import { useContext, useEffect, useState } from "react";
import CartContext from "../../../contexts/CartContext";

export default function Modal() {
    const { isModalOpen, beatToAdd, closeModal, addItemToCart } = useContext(CartContext);

    return (
        <>
            { beatToAdd && isModalOpen &&
                <div className="Modal">
                    <p onClick={ closeModal }>close modal</p>
                    <h2>{ beatToAdd.name }</h2>
                    <button onClick={ addItemToCart }>Comprar</button>
                </div>
            }
        </>
    )
}