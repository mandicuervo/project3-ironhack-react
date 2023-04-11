import './PlayerView.css'
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import { useContext } from 'react';
import MusicContext from '../../contexts/MusicContext';

export default function PlayerView() {
    const { currentMusic } = useContext(MusicContext);

    return(
        <>
        {
            currentMusic && 
            <div className="PlayerView">
                <AudioPlayer />
            </div>
        }
        </>
    )
}