import { useContext } from 'react'
import MusicContext from '../../contexts/MusicContext'
import './ListBeats.css'

export default function ListBeats({list}) {
    const { changeMusic } = useContext(MusicContext);

    const handleOnPlay = (id) => {
        changeMusic(id)
    }

    return(
        <div className='ListBeats'>
            {
                list && list.length > 0 && list.map((beat) => ( 
                    <div className='list' key={beat._id}>
                        <h5>{beat.name}</h5>
                        <span onClick={ () => handleOnPlay(beat._id) }>PLAY</span>
                    </div>
                ))
            }
        </div>
    )
}