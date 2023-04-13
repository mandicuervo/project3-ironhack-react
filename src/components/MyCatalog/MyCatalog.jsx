import { useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import { editBeat, getOneBeat, postBeat } from "../../services/BeatsService";
import ListBeats from "../ListBeats/ListBeats";
import Tags from "../Tags/Tags";

const keysOptions =  ['None', 'Cm', 'Dm', 'Em', 'Fm', 'Am', 'Gm', 'F#M', 'Bm', 'D#M', 'A#M', 'EbM', 'AbM', 'BbM', 'C#M', 'DbM', 'GbM', 'CbM', 'G#M', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const genreOptions = ['None','Cinematic','Hip-Hop', 'Trap', 'RnB', 'Pop', 'Electronic', 'Reggae', 'Underground', 'Old School', 'West Coast', 'East Cost', 'Drill', 'Reaggaeton', 'Rock', 'Soul', 'Club', 'New Soul', 'Pop Hip-Hop', 'Afro Beat', 'Gangsta', 'Dirty South', 'Dance Hall', 'Orchestral', 'World', 'Pop-Rap', 'Hyperpop', 'Alternative', 'Alternative RnB', 'Grime', 'Alternative Hip-Hop', 'House', 'Pop-Electronic', 'Indie Rock', 'Downtempo', 'Pop-Rock', 'Lo-Fi', 'Country', 'Hip-Hop Soul', 'Beats', 'Ambient', 'Indie', 'Dance', 'Funk', 'Funk Brazil', 'Boom Bap', 'Class Soul', 'Break Beat', 'K-Pop', 'Crunk', 'Instrumental Hip-Hop', 'Underground Hip-Hop', 'Drum and Bass', 'Rage Beats', 'Latin', 'Chill', 'Alternative Rock', 'Afro', 'Afro Pop', 'Freestyle Rap', 'Gangsta Rap', 'Uk Grime', 'Trip Hop', 'Old School Hip-Hop', 'Roots', 'Emo Hip-Hop', 'Lo-Fi Hip-Hop', 'Experimental Hip-Hop', 'Two Step', 'Pop Country', 'Cloud Rap', 'Dub', 'Contemporany Rb', 'Dubstep', 'Jersey Club', 'Smooth Rnb', 'California Sound', 'Synthwave', 'Jazz', 'Conscious Hip-Hop', 'Classical', 'Hardcore Hip-Hop', 'Folk', 'Classical Rock', 'Country Rock', 'Tropical House', 'Edm', 'Chillwave', 'Dance RnB', 'Pop 80s', 'Industrial', 'Metal', 'Latin Trap', 'G funk', 'Latin Pop', 'Jazz Rap', 'Electro Pop', 'Trance', 'Mumble Rap', 'Jazz Fusion', 'Samba', 'Bossa Nova', 'Cumbia']
const moodOptions = ['None', 'Bouncy', 'Dark', 'Energetic', 'Confident', 'Calm', 'Sad', 'Soulful', 'Inspiring', 'Angry', 'Relaxes', 'Quirky', 'Mellow', 'Accomplished', 'Crazy', 'Happy', 'Determoned', 'Powerful', 'Epic', 'Intense', 'Loved', 'Dirty', 'Depressed', 'Lonely', 'Evil', 'Hyper', 'Peaceful', 'Anxious', 'Flirty', 'Gloomy', 'Rebellious', 'Grateful', 'Adored', 'Eccentric', 'Neutral', 'Romantic', 'Crunk', 'Enraged', 'Annoyed', 'Lazy', 'Disappointed', 'Exciting', 'Tense', 'Giddy', 'Scared', 'Dramatic', 'Frantic', 'Silly', 'Majestic']
const instrumentOptions = ['None', 'Percussion', 'Piano', 'Bass Guitar', 'Electric Guitar', 'Acoustic Guitar', 'Strings', 'Violin', 'Brass', 'Flute', 'Cymbals', 'Organ', 'Trumpet', 'Viola', 'Cello', 'Saxophone', 'Double Bass', 'Recorder', 'Banjo', 'Tambourine', 'Triangle', 'French HOrn', 'Ukulele', 'Trombone', 'Sitar', 'Harmonica', 'Piccolo', 'Harpsichord', 'Bassoon', 'Maracas', 'Clarinet', 'Mnadolin', 'Tuba', 'Oboe', 'Lute', 'Castanets', 'Bugle', 'Gong']
const initialValues = {
    name: '',
    key: 'None',
    scale: 'None',
    bpm: '',
    genre: 'None',
    price: '',
    instrument: 'None',
    mood: 'None'
};

export default function MyCatalog() {
    const [error, setError] = useState(false);
    const [audio, setAudio] = useState([]);
    const [image, setImage] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [idToEdit, setIdToEdit] = useState(null);
    const [infoBeat, setInfoBeat] = useState(initialValues)
    
    const { currentUser } = useContext(AuthContext);

    const handleEdit = (id) => {
        setIsEdit(true)
        setIdToEdit(id)

        getOneBeat(id)
        .then(res => {
            setInfoBeat({
                name: res.name,
                key: res.key,
                scale: res.scale,
                bpm: res.bpm,
                genre: res.genre,
                price: res.price,
                instrument: res.instrument,
                mood: res.mood
            })

        })
        .catch(err => console.log(err))
    }

    const handleOnChange = (e) => {
        const { name, value, type, files } = e.target;

        if(type !== 'file') {
            setInfoBeat({...infoBeat, [name]: value });
        } else {
            if(name === 'image') {
                setImage(files)
            } else {
                setError(false)
                setAudio(files);
            }
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        
        for (let data in infoBeat) {
            formData.append(data, infoBeat[data]);
        }
        
        if(!isEdit) {
            formData.append("_id", currentUser["_id"]);

            if(audio.length > 0){
                for (let beat of audio) {
                    formData.append("beat", beat);
                }
            } else {
             setError(true);
             return;
            }

            postBeat(formData)
            .then(response => {
                getBeatsList()
            })
            .catch(err => console.log(err))

        } else {
            if(image.length > 0) {
                for (let img of image) {
                    formData.append("image", img);
                }
            }

            editBeat(idToEdit, formData)
            .then((res) => {
                setIsEdit(false);
                setInfoBeat(initialValues)
                setIdToEdit(null)
            })
            .catch(err => console.log(err))
        }


    }


    return(
        <div className="MyCatalog">
            <h1>{!isEdit ? 'New beat' : 'Edit beat'}</h1>
            <form onSubmit={ handleOnSubmit }>
                {
                    !isEdit ?
                    <div className="upload-beat">
                        <label><strong>Upload your beat here</strong></label>
                        <input name= 'beat' type='file' onChange={ handleOnChange }/>
                        {
                            error && <p>This field is required!</p>
                        }
                    </div>
                    :
                    <div className="upload-image">
                        <label><strong>Choose an image for your beat</strong></label>
                        <input name= 'image' type='file' onChange={ handleOnChange }/>
                    </div>
                }
            
                <div className="description-beat">
                    <label>Name:</label>
                    <input name= 'name' type='text' value={infoBeat.name} onChange={ handleOnChange } required/>

                    <label>BPM:</label>
                    <input name= 'bpm' type='number' value={infoBeat.bpm} onChange={ handleOnChange } required/>
                    
                    <label>Key:</label>
                    <select name= 'key' type='text' value={infoBeat.key} onChange={ handleOnChange }>
                        {
                            keysOptions.map((option) => (
                                <option value={option} key={option}>{option}</option>
                            ))
                        }
                    </select>

                    <label>Scale:</label>
                    <select name= 'scale' type='text' value={infoBeat.scale} onChange={ handleOnChange } required>
                        <option value='None'>None</option>
                        <option value='Minor'>Minor</option>
                        <option value='Major'>Major</option>
                    </select>

                    <label>Genre:</label>
                    <select name= 'genre' type='text' value={infoBeat.genre} onChange={ handleOnChange } required>
                        {
                            genreOptions.map((genre) => (
                                <option value={genre} key={genre}>{genre}</option>
                            ))
                        }
                    </select>

                    <label>Mood:</label>
                    <select name='mood' type='text' value={infoBeat.mood} onChange={ handleOnChange } required>
                        {
                            moodOptions.map((mood) => (
                                <option value={mood} key={mood}>{mood}</option>
                            ))
                        }
                    </select>

                    <label>Instrument:</label>
                    <select name='instrument' type='text' value={infoBeat.instrument} onChange={ handleOnChange } required>
                        {
                            instrumentOptions.map((instrument) => (
                                <option value={instrument} key={instrument}>{instrument}</option>
                            ))
                        }
                    </select>
{/* 
                    <label>Tags:</label>
                    <input></input> */}

                    <label>Price:</label>
                    <input name= 'price' type='number' value={infoBeat.price} step='0.01' placeholder='50.00' onChange={ handleOnChange } required/>
                </div>

                Tags:<Tags/>

                <button type="submit">Submit</button>
            </form>
            
            <div className="list-beats">
                <ListBeats
                    handleEdit={handleEdit}
                />
            </div>
        </div>
    )
}