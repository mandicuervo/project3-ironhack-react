import './Favorites.css'
import AuthContext from '../../contexts/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { getFavoriteBeats } from '../../services/BeatsService';
import { useNavigate } from 'react-router-dom';

export default function Favorites() {
    const { currentUser } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser) {
            getFavoriteBeats(currentUser.id)
            .then(res => setFavorites(res))
            .catch(err => console.log(err))
        }
    }, [currentUser])

    const goToBeatDetail = (id) => {
        navigate(`/beats/${id}`)
    }

    return (
        <>
        {
            favorites?.length > 0 &&
            <div className="Favorites">
                <h1>Favorites</h1>
                <div className='favorites-container'>
                    {
                        favorites.map(favorite => (
                            <div className='favorite-content'>
                                <h5>{favorite.beat.name}</h5>
                                <p>genre: {favorite.beat.genre}</p>
                                <p>key: {favorite.beat.key}</p>
                                <p>mood: {favorite.beat.mood}</p>
                                <p>instrument: {favorite.beat.instrument}</p>
                                <p>scale: {favorite.beat.scale}</p>
                                <p>bpm: {favorite.beat.bpm}</p>
                                <button onClick={()=>goToBeatDetail(favorite.beat._id)}>See Beat</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        }
        </>
    )
}