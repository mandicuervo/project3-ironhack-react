import { useContext, useEffect, useState } from 'react'
import MusicContext from '../../contexts/MusicContext'
import AuthContext from '../../contexts/AuthContext'
import './ListBeats.css'
import { deleteBeat, getBeatsFromUser } from '../../services/BeatsService';
import OpenModalButton from '../Cart/OpenModalButton/OpenModalButton';

export default function ListBeats({handleEdit, reloadPage}) {
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
    }, [currentUser, reloadPage])

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
                        <img src={ beat.image } alt={ beat.name }/>
                        <div>
                            <p>{beat.name}</p>
                            <p>{beat.bpm}bpm</p>
                            <p>{beat.owner}</p>
                        </div>
                        <div>
                            <button onClick={ ()=>handleOnPlay(beat._id) }>PLAY</button>
                            {
                                currentUser.id === beat.owner && 
                                <>
                                <button onClick={ ()=>handleEdit(beat._id) }>EDIT</button>
                                <i className='bx bxs-trash' onClick={ ()=>handleDelete(beat._id) }></i>
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