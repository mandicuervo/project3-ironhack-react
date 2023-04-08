import { useContext, useState} from "react";
import AuthContext from "../../contexts/AuthContext";
import { postBeat } from "../../services/UserService";

export default function MyCatalog() {
    const [audio, setAudio] = useState([]);
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

    const handleOnChange = (e) => {
        const { name, value, type, files } = e.target;

        if(type !== 'file') {
            setInfoBeat({...infoBeat, [name]: value });
        } else {
            setAudio(files);
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
        
        postBeat(formData)
        .then(response => {
            console.log(response)
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
            
                <div className="description-beat">
                    <label>Name:</label>
                    <input name= 'name' type='text' onChange={ handleOnChange } />

                    <label>BPM:</label>
                    <input name= 'bpm' type='number' onChange={ handleOnChange } />

                    <label>Key:</label>
                    <input name= 'key' type='text' onChange={ handleOnChange } />

                    <label>Scale:</label>
                    <select name= 'scale' type='text' onChange={ handleOnChange }>
                        <option value='minor'>minor</option>
                        <option value='major'>major</option>
                    </select>

                    <label>Genre:</label>
                    <input name= 'genre' type='text' onChange={ handleOnChange } />

                    <label>Price:</label>
                    <input name= 'price' type='number' onChange={ handleOnChange } />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}