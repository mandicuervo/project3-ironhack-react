import { createContext, useState, useMemo, useEffect } from "react";
import { addCountPlay, getOneBeat } from "../services/BeatsService";

const MusicContext = createContext()
export default MusicContext;

export const MusicProvider = ({ children }) => {
    const [idMusic, setIdMusic] = useState(null);
    const [currentMusic, setCurrentMusic] = useState(null);

    useEffect(() => {
        if(idMusic) {
            getOneBeat(idMusic)
            .then((res) => {
                setCurrentMusic(res)
                addCountPlay(idMusic)
            }) 
            .catch(err => console.log(err))
        }
    }, [idMusic])


    const changeMusic = (id) => {
        setIdMusic(id)
    }



    const stopMusic = () => {
        setCurrentMusic(null)
        setIdMusic(null)
    }
    
    const value = useMemo(() => {
        return {
        currentMusic, 
        idMusic,
        changeMusic,
        stopMusic
        }
    }, [currentMusic, idMusic, changeMusic, stopMusic])

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    )
}