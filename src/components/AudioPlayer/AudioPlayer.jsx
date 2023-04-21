import { useContext, useEffect, useRef, useState } from "react";
import MusicContext from "../../contexts/MusicContext";
import { Link } from 'react-router-dom';

import ControlsPlayer from "../ControlsPlayer/ControlsPlayer";
import DisplayTrack from "../DisplayTrack/DisplayTrack";
import ProgressBar from "../ProgressBar/ProgressBar";

export default function AudioPlayer() {
  const [ tracks, setTracks ] = useState([]);
  const [ currentTrack, setCurrentTrack ] = useState(tracks[0]);
  const [ timeProgress, setTimeProgress ] = useState(0);
  const [ duration, setDuration ] = useState(0);
  
  const audioRef = useRef();
  const progressBarRef = useRef();

  const { currentMusic, stopMusic } = useContext(MusicContext);

  useEffect(() => {
    if(currentMusic) {
      setTracks([{
        'title': currentMusic.name,
        'src': currentMusic.beat,
        'author': currentMusic._id,
        'thumbnail': currentMusic.image,
      }])
    }
  }, [currentMusic])

  useEffect(() => {
    if(tracks.length > 0) {
      setCurrentTrack(tracks[0]);
    }
  }, [tracks])
  
  const handleClose = () => {
    stopMusic()
  }

  return(
    <div className="audio-player blur">
      <div className="inner">
        <div className="player-top">
          <DisplayTrack
            {...{ currentTrack, audioRef, setDuration, progressBarRef }}
          />

          <div>
            <Link to={`/beats/${currentMusic._id}`}><h5>{currentMusic?.name}</h5></Link>
            <div>
              <ControlsPlayer 
                {...{ audioRef, progressBarRef, duration, setTimeProgress }} 
              />
            </div>
          </div>
        </div>

        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />

      </div>
      <span onClick={ handleClose }><i className='bx bxs-x-square bx-sm'></i></span>
    </div>
  )
}
