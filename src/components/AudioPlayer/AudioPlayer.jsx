import { useContext, useEffect, useRef, useState } from "react";
import MusicContext from "../../contexts/MusicContext";
// import { tracks } from "../../data/tracks";

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
    console.log('entra en handle')
    stopMusic()
  }

  return(
    <div className="audio-player">
      <div className="inner">
        <span onClick={ handleClose }>CLOSE</span>
        <DisplayTrack
          {...{ currentTrack, audioRef, setDuration, progressBarRef }}
        />

        <ControlsPlayer 
          {...{ audioRef, progressBarRef, duration, setTimeProgress }} 
        />

        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />

      </div>
    </div>
  )
}
