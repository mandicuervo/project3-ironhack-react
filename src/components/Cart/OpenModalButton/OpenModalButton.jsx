import { useContext, useEffect, useState } from "react";
import CartContext from "../../../contexts/CartContext";
import { getOneBeat } from "../../../services/BeatsService";

export default function OpenModalButton({ id }) {
    const [beat, setBeat] = useState(null);
    const { setContextBeat } = useContext(CartContext);

    useEffect(() => {
        if(id) {
            getOneBeat(id)
            .then(res => {
                setBeat(res)
            })
            .catch(err => console.log(err))
        }
    }, [id])

    return (
        <>
            { beat &&
                <div className="OpenModalButton" onClick={ () => setContextBeat(beat) }>
                    <i className='bx bxs-cart bx-sm'></i>
                    <span>$ { beat.price }</span>
                </div>
            }
        </>
    );
}