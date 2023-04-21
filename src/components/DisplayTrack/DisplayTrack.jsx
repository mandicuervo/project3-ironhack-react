import { BsMusicNoteBeamed } from 'react-icons/bs'

const DisplayTrack = ({ currentTrack, audioRef, setDuration, ProgressBarRef }) => {

    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        if(ProgressBarRef) {
            ProgressBarRef.current.max = seconds;
        }
    };

    return (
        <div>
            <audio 
                src={currentTrack?.src} 
                ref={audioRef} 
                onLoadedMetadata={onLoadedMetadata}
            />
        </div>
    )
};

export default DisplayTrack;