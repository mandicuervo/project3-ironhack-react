import './Favorites.css'
import AuthContext from '../../contexts/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { getFavoriteBeats } from '../../services/BeatsService';

export default function Favorites() {
    const { currentUser } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if(currentUser) {
            getFavoriteBeats(currentUser.id)
            .then(res => setFavorites(res))
            .catch(err => console.log(err))
        }
    }, [currentUser])

    return (
        <>
        {
            favorites?.length > 0 &&
            <div className="Favorites">
                <h1>Favorites</h1>
                <div className='favorites-container'>
                    {
                        favorites.map(favorite => (
                            <div className='favorite'>
                                <h5>{favorite.beat.name}</h5>
                                <p>{favorite.beat.genre}</p>
                                <p>{favorite.beat.key}</p>
                                <p>{favorite.beat.mood}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        }
        </>
    )
}