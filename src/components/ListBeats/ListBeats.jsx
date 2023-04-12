import { useContext, useEffect, useState } from 'react'
import MusicContext from '../../contexts/MusicContext'
import AuthContext from '../../contexts/AuthContext'
import './ListBeats.css'
import { deleteBeat, getBeatsFromUser } from '../../services/BeatsService';
import OpenModalButton from '../Cart/OpenModalButton/OpenModalButton';

export default function ListBeats({handleEdit}) {
    const [beatsList, setBeatsList] = useState([])
    const { changeMusic } = useContext(MusicContext);
    const { currentUser } = useContext(AuthContext);
    
    const getList = () => {
        getBeatsFromUser(currentUser.id)
        .then(response => setBeatsList(response))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if(currentUser) {
            getList()
        }
    }, [currentUser])

    const handleOnPlay = (id) => {
        changeMusic(id)
    }

    const handleDelete = (id) => {
        deleteBeat(id)
        .then(res => getList())
        .catch(err => console.log(err))
    }

    return(
        <div className='ListBeats'>
            {
                beatsList && beatsList.length > 0 && beatsList.map((beat) => ( 
                    <div className='list' key={beat._id}>
                        <div>
                            <h5>title:{beat.name}</h5>
                            <h6>bpm:{beat.bpm}</h6>
                        </div>
                        <div>
                            <button onClick={ ()=>handleOnPlay(beat._id) }>PLAY</button>
                            {
                                currentUser.id === beat.owner && 
                                <>
                                <button onClick={ ()=>handleDelete(beat._id) }>DELETE</button>
                                <button onClick={ ()=>handleEdit(beat._id) }>EDIT</button>
                                </>
                            }
                            {
                                currentUser &&
                                <OpenModalButton id={beat._id} />
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}