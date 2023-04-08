import { useRef, useState } from "react";
import { tracks } from "../../data/tracks";

import ControlsPlayer from "../ControlsPlayer/ControlsPlayer";
import DisplayTrack from "../DisplayTrack/DisplayTrack";
import ProgressBar from "../ProgressBar/ProgressBar";

export default function AudioPlayer() {
  const [ trackIndex, setTrackIndex ] = useState(0);
  const [ currentTrack, setCurrentTrack ] = useState(tracks[trackIndex]);
  const [ timeProgress, setTimeProgress ] = useState(0);
  const [ duration, setDuration ] = useState(0);
  
  const audioRef = useRef();
  
  const progressBarRef = useRef();

  return(
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack
          {...{ currentTrack, audioRef, setDuration, progressBarRef }}
        />

        <ControlsPlayer 
          {...{ audioRef, progressBarRef, duration, setTimeProgress, setTrackIndex, setCurrentTrack }} 
        />

        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />

      </div>
    </div>
  )
}
