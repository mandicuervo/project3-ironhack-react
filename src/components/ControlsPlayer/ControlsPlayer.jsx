import { useState, useEffect, useRef, useCallback } from 'react';

// icons
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';

export default function ControlsPlayer({ audioRef, progressBarRef, duration, setTimeProgress, tracks, trackIndex, setTrackIndex, setCurrentTrack }) {
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [volume, setVolume] = useState(60);

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const skipForward = () => {
        audioRef.current.currentTime += 15;
    };
    const skipBackward = () => {
        audioRef.current.currentTime -= 15;
    };

    const handlePrevious = () => {
        if (trackIndex === 0) {
            let lastTrackIndex = tracks.length - 1;
            setTrackIndex(lastTrackIndex);
            setCurrentTrack(tracks[lastTrackIndex]);
          } else {
            setTrackIndex((prev) => prev - 1);
            setCurrentTrack(tracks[trackIndex - 1]);
          }
    };

    const handleNext = () => {
        if (trackIndex >= tracks?.length - 1) {
            setTrackIndex(0);
            setCurrentTrack(tracks[0]);
          } else {
            setTrackIndex((prev) => prev + 1);
            setCurrentTrack(tracks[trackIndex + 1]);
          }
    };

    const playAnimationRef = useRef();

    const repeat = useCallback (() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
        );

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    useEffect(() => {
        if(isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat]);
    
    useEffect(() => {
        if (audioRef) {
          audioRef.current.volume = volume / 100;
        }
      }, [volume, audioRef]);

    return (
        <div className='controls-wrapper'>
            <div className='controls'>
                <button onClick={handlePrevious}>
                    <IoPlaySkipBackSharp />
                </button>

                <button onClick={skipBackward}>
                    <IoPlayBackSharp />
                </button>

                <button onClick= {togglePlayPause}>
                    {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
                </button>
                
                <button onClick={skipForward}>
                    <IoPlayForwardSharp />
                </button>

                <button onClick={handleNext}>
                    <IoPlaySkipForwardSharp />
                </button>

                <div className="volume">
                    <button>icons</button>
                    <input 
                        type="range" 
                        min={0} 
                        max={100} 
                        value={volume} 
                        onChange={(e) => setVolume(e.target.value)} 
                    />
                </div>
            </div>
        </div>
    );
};