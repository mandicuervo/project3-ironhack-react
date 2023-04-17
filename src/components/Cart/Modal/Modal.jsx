import './Modal.css';
import { useContext, useEffect, useState } from "react";
import CartContext from "../../../contexts/CartContext";

export default function Modal() {
    const { isModalOpen, beatToAdd, closeModal, addItemToCart } = useContext(CartContext);

    return (
        <>
            { beatToAdd && isModalOpen &&
                <div className="Modal">
                    <i onClick={ closeModal }className='bx bxs-x-square'></i>
                    <p><b>EXCLUSIVE LICENSE</b></p>
                    <div className='info-user-beat'>
                        <h2>{ beatToAdd.name }</h2>
                        <h6>{ beatToAdd.owner.username }</h6>
                        <img src={beatToAdd.image} alt={beatToAdd.name}/>
                    </div>
                    <div className='formats'>
                        <p>MP3</p>
                        <p>WAV</p>
                    </div>
                    <div className='info-contract'>
                        <div className='time-use'>
                            <i className='bx bxs-time-five bx-sm'></i>
                            <h6>Unlimited</h6>
                            <p>Period of use</p>
                        </div>

                        <div className='distribution'>
                            <i className='bx bx-album bx-sm'></i>
                            <h6>Unlimited</h6>
                            <p>Distribution</p>
                        </div>

                        <div className='videos'>
                            <i className='bx bxs-video bx-sm'></i>
                            <h6>Unlimited</h6>
                            <p>Music Videos</p>
                        </div>

                        <div className='streamings'>
                            <i className='bx bx-broadcast bx-sm'></i>
                            <h6>Unlimited</h6>
                            <p>Audio Streamings</p>
                        </div>

                        <div className='radio'>
                            <i className='bx bxs-radio'></i>
                            <p>Radio</p>
                        </div>

                        <div className='tv'>
                            <i className='bx bxs-tv'></i>
                            <p>Television</p>
                        </div>
                    </div>
                    
                    <div className='observation-contract'>
                        <p>Unlimited non-profit.</p>
                        <p>Unlimited for-profit performances and 20% royalty share.</p>
                    </div>

                    <button onClick={ addItemToCart }>Comprar</button>
                </div>
            }
        </>
    )
}