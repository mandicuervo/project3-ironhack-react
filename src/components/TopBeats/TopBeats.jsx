import { useEffect, useState } from "react"
import { getTopBeats } from '../../services/BeatsService';
import './TopBeats.css';

export default function TopBeats() {
    const [topBeats, setTopBeats] = useState([]);

    useEffect(() => {
        getTopBeats()
        .then(res => {
            setTopBeats(res)
        })
        .catch(err => console.log(err));
    }, [])

    return(
        <div className="TopBeats">
            <h1>Tranding Beats</h1>
            <p>Discover the most played beats!</p>
            <div className="card-top-beats-container">
                {
                    topBeats.length > 0 &&
                    topBeats.map(beat => (
                        <div className="trending-beat-card" key={ beat._id }>
                            <h3>{ beat.name }</h3>
                            <img src={ beat.image } alt={ beat.name }/>
                            <p>{ beat.playingCount }</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}