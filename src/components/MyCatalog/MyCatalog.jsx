import { useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import { getBeatsFromUser, postBeat } from "../../services/BeatsService";
import ListBeats from "../ListBeats/ListBeats";

const keysOptions =  ['None', 'Cm', 'Dm', 'Em', 'Fm', 'Am', 'Gm', 'F#M', 'Bm', 'D#M', 'A#M', 'EbM', 'AbM', 'BbM', 'C#M', 'DbM', 'GbM', 'CbM', 'G#M', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const genreOptions = ['Hip-Hop', 'Trap', 'RnB', 'Pop', 'Electronic', 'Reggae', 'Underground', 'Old School', 'West Coast', 'East Cost', 'Drill', 'Reaggaeton', 'Rock', 'Soul', 'Club', 'New Soul', 'Pop Hip-Hop', 'Afro Beat', 'Gangsta', 'Dirty South', 'Dance Hall', 'Orchestral', 'World', 'Pop-Rap', 'Hyperpop', 'Alternative', 'Alternative RnB', 'Grime', 'Alternative Hip-Hop', 'House', 'Pop-Electronic', 'Indie Rock', 'Downtempo', 'Pop-Rock', 'Lo-Fi', 'Country', 'Hip-Hop Soul', 'Beats', 'Ambient', 'Indie', 'Dance', 'Funk', 'Funk Brazil', 'Boom Bap', 'Class Soul', 'Break Beat', 'K-Pop', 'Crunk', 'Instrumental Hip-Hop', 'Underground Hip-Hop', 'Drum and Bass', 'Rage Beats', 'Latin', 'Chill', 'Alternative Rock', 'Afro', 'Afro Pop', 'Freestyle Rap', 'Gangsta Rap', 'Uk Grime', 'Trip Hop', 'Old School Hip-Hop', 'Roots', 'Emo Hip-Hop', 'Lo-Fi Hip-Hop', 'Experimental Hip-Hop', 'Two Step', 'Pop Country', 'Cloud Rap', 'Dub', 'Contemporany Rb', 'Dubstep', 'Jersey Club', 'Smooth Rnb', 'California Sound', 'Synthwave', 'Jazz', 'Conscious Hip-Hop', 'Classical', 'Hardcore Hip-Hop', 'Folk', 'Classical Rock', 'Country Rock', 'Tropical House', 'Edm', 'Chillwave', 'Dance RnB', 'Pop 80s', 'Industrial', 'Metal', 'Latin Trap', 'G funk', 'Latin Pop', 'Jazz Rap', 'Electro Pop', 'Trance', 'Mumble Rap', 'Jazz Fusion', 'Samba', 'Bossa Nova', 'Cumbia']
const moodOptions = ['Bouncy', 'Dark', 'Energetic', 'Confident', 'Calm', 'Sad', 'Soulful', 'Inspiring', 'Angry', 'Relaxes', 'Quirky', 'Mellow', 'Accomplished', 'Crazy', 'Happy', 'Determoned', 'Powerful', 'Epic', 'Intense', 'Loved', 'Dirty', 'Depressed', 'Lonely', 'Evil', 'Hyper', 'Peaceful', 'Anxious', 'Flirty', 'Gloomy', 'Rebellious', 'Grateful', 'Adored', 'Eccentric', 'Neutral', 'Romantic', 'Crunk', 'Enraged', 'Annoyed', 'Lazy', 'Disappointed', 'Exciting', 'Tense', 'Giddy', 'Scared', 'Dramatic', 'Frantic', 'Silly', 'Majestic']
const instrumentOptions = ['Percussion', 'Piano', 'Bass Guitar', 'Electric Guitar', 'Acoustic Guitar', 'Strings', 'Violin', 'Brass', 'Flute', 'Cymbals', 'Organ', 'Trumpet', 'Viola', 'Cello', 'Saxophone', 'Double Bass', 'Recorder', 'Banjo', 'Tambourine', 'Triangle', 'French HOrn', 'Ukulele', 'Trombone', 'Sitar', 'Harmonica', 'Piccolo', 'Harpsichord', 'Bassoon', 'Maracas', 'Clarinet', 'Mnadolin', 'Tuba', 'Oboe', 'Lute', 'Castanets', 'Bugle', 'Gong']

export default function MyCatalog() {
    const [beatsList, setBeatsList] = useState([]);
    const [audio, setAudio] = useState([]);
    //const [image, setImage] = useState([]);
    const [infoBeat, setInfoBeat] = useState({
        name: '',
        key: '',
        scale: '',
        bpm: '',
        genre: '',
        price: '',
        instrument: ''
    })
    const { currentUser } = useContext(AuthContext);

    const getBeatsList = () => {
        getBeatsFromUser(currentUser.id)
        .then(response => setBeatsList(response))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if(currentUser) {
            getBeatsList()
        }
    }, [currentUser])

    const handleOnChange = (e) => {
        const { name, value, type, files } = e.target;

        if(type !== 'file') {
            setInfoBeat({...infoBeat, [name]: value });
        } else {
            if(name === 'image') {
                setImage(files)
            } else {
                setAudio(files);
            }
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();

        formData.append("_id", currentUser["_id"]);
    
        for (let data in infoBeat) {
            formData.append(data, infoBeat[data]);
        }
    
        for (let beat of audio) {
            formData.append("beat", beat);
        }

        // for (let img of image) {
        //     formData.append("image", img);
        // }
        
        postBeat(formData)
        .then(response => {
            getBeatsList()
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="MyCatalog">
            <h1>New Beat</h1>
            <form onSubmit={ handleOnSubmit }>
                <div className="upload-beat">
                    <label><strong>Upload your beat here</strong></label>
                    <input name= 'beat' type='file' onChange={ handleOnChange }/>
                </div>

                {/* <div className="img-beat">
                    <label>Image</label>
                    <input name= 'image' type='file' onChange={handleOnChange} />
                </div> */}
            
                <div className="description-beat">
                    <label>Name:</label>
                    <input name= 'name' type='text' onChange={ handleOnChange } />

                    <label>BPM:</label>
                    <input name= 'bpm' type='number' onChange={ handleOnChange } />
                    
                    <label>Key:</label>
                    <select name= 'key' type='text' onChange={ handleOnChange }>
                        {
                            keysOptions.map((option) => (
                                <option value={option} key={option}>{option}</option>
                            ))
                        }
                    </select>

                    <label>Scale:</label>
                    <select name= 'scale' type='text' onChange={ handleOnChange }>
                        <option value='minor'>minor</option>
                        <option value='major'>major</option>
                    </select>

                    <label>Genre:</label>
                    <select name= 'genre' type='text' onChange={ handleOnChange }>
                        {
                            genreOptions.map((genre) => (
                                <option value={genre} key={genre}>{genre}</option>
                            ))
                        }
                    </select>

                    <label>Mood:</label>
                    <select name='mood' type='text' onChange={ handleOnChange }>
                        {
                            moodOptions.map((mood) => (
                                <option value={mood} key={mood}>{mood}</option>
                            ))
                        }
                    </select>

                    <label>Instrument:</label>
                    <select name='instrument' type='text' onChange={ handleOnChange }>
                        {
                            instrumentOptions.map((instrument) => (
                                <option value={instrument} key={instrument}>{instrument}</option>
                            ))
                        }
                    </select>

                    <label>Price:</label>
                    <input name= 'price' type='number' onChange={ handleOnChange } />
                </div>
                <button type="submit">Submit</button>
            </form>
            
            <div className="list-beats">
                <ListBeats list={beatsList} />
            </div>
        </div>
    )
}