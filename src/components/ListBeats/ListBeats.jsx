import { useContext, useEffect, useState } from 'react'
import MusicContext from '../../contexts/MusicContext'
import AuthContext from '../../contexts/AuthContext'
import './ListBeats.css'
import { deleteBeat, getBeatsFromUser } from '../../services/BeatsService';
import OpenModalButton from '../Cart/OpenModalButton/OpenModalButton';
import { Tilt } from 'react-tilt';
import { useNavigate } from 'react-router-dom';

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
};

export default function ListBeats({handleEdit, reloadPage, userId = null}) {
    const [beatsList, setBeatsList] = useState([])
    const { changeMusic } = useContext(MusicContext);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const getList = (userId) => {
        if(userId) {
            getBeatsFromUser(userId)
            .then(response => setBeatsList(response))
            .catch(err => console.log(err))
        } else  {
            getBeatsFromUser(currentUser.id)
            .then(response => setBeatsList(response))
            .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        if(currentUser) {
            if(userId) {
                getList(userId)
            } else {
                getList()
            }
        }
    }, [currentUser, reloadPage, userId])

    const handleOnPlay = (id) => {
        changeMusic(id)
    }

    const handleDelete = (id) => {
        deleteBeat(id)
        .then(res => getList())
        .catch(err => console.log(err))
    }

    const goToDetail = (id) => {
        navigate(`/beats/${id}`)
    }

    return(
        <div className='ListBeats'>
            {
                beatsList && beatsList.length > 0 && beatsList.map((beat) => ( 
                    <div className='list' key={beat._id}>
                        <div onClick={()=>handleOnPlay(beat._id)}>
                            <Tilt options={defaultOptions} className='image-container'>
                                <img src={ beat.image } alt={ beat.name }/>
                                <span className='icon-container'><i className='bx bx-play-circle'></i></span>
                            </Tilt>
                        </div>
                        <div className='description-beat' onClick={()=>goToDetail(beat._id)}>
                            <p>{beat.name}</p>
                            <p>{beat.bpm}bpm</p>
                            <p>{beat.owner.username}</p>
                        </div>
                        <div className='edit-trash-btn'>
                            {
                                currentUser.id === beat.owner.id && 
                                <>
                                <i onClick={ ()=>handleEdit(beat._id) } className='bx bxs-message-square-edit bx-md'></i>
                                <i className='bx bxs-x-square bx-md' onClick={ ()=>handleDelete(beat._id) }></i>
                                </>
                            }
                        </div>
                        <Tilt options={defaultOptions}>
                            {
                                currentUser &&
                                <OpenModalButton id={beat._id} />
                            }
                        </Tilt>
                    </div>
                ))
            }
        </div>
    )
}