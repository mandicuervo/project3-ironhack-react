import { useContext, useEffect, useState } from "react"
import { getTopBeats } from '../../services/BeatsService';
import './TopBeats.css';
import { Tilt } from "react-tilt";
import MusicContext from "../../contexts/MusicContext";
import { useNavigate } from "react-router-dom";

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

export default function TopBeats() {
    const [topBeats, setTopBeats] = useState([]);
    const { changeMusic } = useContext(MusicContext);
    const navigate = useNavigate()

    useEffect(() => {
        getTopBeats()
        .then(res => {
            setTopBeats(res)
        })
        .catch(err => console.log(err));
    }, [])

    const handleOnPlay = (id) => {
        changeMusic(id)
    }

    const goToBeatDetail = (id) => {
        navigate(`/beats/${id}`)
    }
    
    return(
        <div className="TopBeats">
            <h1>Tranding Beats</h1>
            <p>Discover the most played beats!</p>
            <div className="card-top-beats-container">
                {
                    topBeats.length > 0 &&
                    topBeats.map(beat => (
                                    <Tilt options={defaultOptions} key={ beat._id } className='img-cards'>
                        <div className="trending-beat-card">
                            <div className="info-trending-beats">
                                <div onClick={()=>handleOnPlay(beat._id)}>
                                        <img src={ beat.image } alt={ beat.name }/> 
                                </div>
                                <div onClick={()=>goToBeatDetail(beat._id)}className="info-trending-beats-text">
                                    <h3>{ beat.name }</h3>
                                    <p>{ beat.playingCount } plays</p>
                                    <p>{ beat.genre }</p>
                                </div>
                            </div>
                        </div>
                                    </Tilt>
                    ))
                }
            </div>
        </div>
    )
}