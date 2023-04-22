import { useNavigate, useParams } from "react-router-dom";
import Comments from "../../components/Comments/Comments";
import OpenModalButton from "../../components/Cart/OpenModalButton/OpenModalButton";
import { useContext, useEffect, useState } from "react";
import { getOneBeat } from '../../services/BeatsService'
import './BeatView.css'
import { Tilt } from "react-tilt";
import MusicContext from "../../contexts/MusicContext";
import { getIsFavorited, toggleFavorite } from "../../services/CommentService";
import AuthContext from "../../contexts/AuthContext";

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

export default function BeatView() {
    const [fullHeart, setFullHeart] = useState(false); 
    const [beatInfo, setBeatInfo] = useState(null);
    const { id } = useParams();
    const { changeMusic } = useContext(MusicContext);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(id && currentUser){
            getOneBeat(id)
            .then(res => {
                setBeatInfo(res)
                getIsFavorited(id, currentUser.id)
                .then(res => {
                    if(res) {
                        setFullHeart(true)
                    } else {
                        setFullHeart(false)
                    }
                })
            })
            .catch(err => console.log(err))
        }
    },[id]);

    const handleOnPlay = () => {
        changeMusic(id)
    }

    const handleToggleFavorite = () => {
        if(currentUser && beatInfo) {
            toggleFavorite(beatInfo._id, currentUser.id)
            .then(res => {
                if(res === 'OK') {
                    setFullHeart(false)
                } else {
                    setFullHeart(true)
                }
            })
            .catch(err => console.log(err))
        }
    }

    const goToProfile = (username) => {
        navigate(`/profile/${username}/beats`)
    }

    return(
        <>
            {
                beatInfo && 
                <div className="BeatView">
                    <div className="beat-info-play">
                        <div className="tilt-play" onClick={()=>handleOnPlay(beatInfo._id)}>
                                <Tilt options={defaultOptions} className='image-container'>
                                    <img src={ beatInfo.image } alt={ beatInfo.name } width='200px'/>
                                </Tilt>
                        </div>
                        <div className="info">
                            <div className="info-user">
                                <h5 onClick={()=>goToProfile(beatInfo.owner.username)} >{beatInfo.name}</h5>
                                <h6>{beatInfo.owner.username}</h6>
                                <i className={fullHeart ? 'bx bxs-heart' : 'bx bx-heart'} onClick={handleToggleFavorite}></i>
                            </div>
                            <div className="info-beat">
                                <p>{beatInfo.bpm}bpm</p>
                                <p>{beatInfo.key}</p>
                                <p>{beatInfo.scale}</p>
                                <p>{beatInfo.genre}</p>
                                <p>{beatInfo.tags}</p>
                                <p>{beatInfo.instrument}</p>
                            </div>
                                <Tilt options={defaultOptions}>
                                    {
                                        currentUser &&
                                        <OpenModalButton id={beatInfo._id} />
                                    }
                                </Tilt>
                            {/* <p>{beatInfo.playingCount}</p> */}
                        </div>
                    </div>
                    <div className="comments-beat">
                      <Comments beatId={beatInfo._id}/>
                    </div>
                </div>
            }
        </>
    )
}