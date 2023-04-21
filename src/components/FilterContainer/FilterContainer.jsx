import { useEffect, useState } from 'react';
import './FilterContainer.css';

const keys = ['Do not filter by key', 'Cm', 'Dm', 'Em', 'Fm', 'Am', 'Gm', 'F#M', 'Bm', 'D#M', 'A#M', 'EbM', 'AbM', 'BbM', 'C#M', 'DbM', 'GbM', 'CbM', 'G#M', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const genres = ['Do not filter by genre', 'Cinematic', 'Hip-Hop', 'Trap', 'RnB', 'Pop', 'Electronic', 'Reggae', 'Underground', 'Old School', 'West Coast', 'East Cost', 'Drill', 'Reaggaeton', 'Rock', 'Soul', 'Club', 'New Soul', 'Pop Hip-Hop', 'Afro Beat', 'Gangsta', 'Dirty South', 'Dance Hall', 'Orchestral', 'World', 'Pop-Rap', 'Hyperpop', 'Alternative', 'Alternative RnB', 'Grime', 'Alternative Hip-Hop', 'House', 'Pop-Electronic', 'Indie Rock', 'Downtempo', 'Pop-Rock', 'Lo-Fi', 'Country', 'Hip-Hop Soul', 'Beats', 'Ambient', 'Indie', 'Dance', 'Funk', 'Funk Brazil', 'Boom Bap', 'Class Soul', 'Break Beat', 'K-Pop', 'Crunk', 'Instrumental Hip-Hop', 'Underground Hip-Hop', 'Drum and Bass', 'Rage Beats', 'Latin', 'Chill', 'Alternative Rock', 'Afro', 'Afro Pop', 'Freestyle Rap', 'Gangsta Rap', 'Uk Grime', 'Trip Hop', 'Old School Hip-Hop', 'Roots', 'Emo Hip-Hop', 'Lo-Fi Hip-Hop', 'Experimental Hip-Hop', 'Two Step', 'Pop Country', 'Cloud Rap', 'Dub', 'Contemporany Rb', 'Dubstep', 'Jersey Club', 'Smooth Rnb', 'California Sound', 'Synthwave', 'Jazz', 'Conscious Hip-Hop', 'Classical', 'Hardcore Hip-Hop', 'Folk', 'Classical Rock', 'Country Rock', 'Tropical House', 'Edm', 'Chillwave', 'Dance RnB', 'Pop 80s', 'Industrial', 'Metal', 'Latin Trap', 'G funk', 'Latin Pop', 'Jazz Rap', 'Electro Pop', 'Trance', 'Mumble Rap', 'Jazz Fusion', 'Samba', 'Bossa Nova', 'Cumbia'];
const instruments = ['Do not filter by instrument', 'Percussion', 'Piano', 'Bass Guitar', 'Electric Guitar', 'Acoustic Guitar', 'Strings', 'Violin', 'Brass', 'Flute', 'Cymbals', 'Organ', 'Trumpet', 'Viola', 'Cello', 'Saxophone', 'Double Bass', 'Recorder', 'Banjo', 'Tambourine', 'Triangle', 'French HOrn', 'Ukulele', 'Trombone', 'Sitar', 'Harmonica', 'Piccolo', 'Harpsichord', 'Bassoon', 'Maracas', 'Clarinet', 'Mnadolin', 'Tuba', 'Oboe', 'Lute', 'Castanets', 'Bugle', 'Gong'];

export default function FilterContainer({handleFilter}) {
    const [keyFilter, setKeyFilter] = useState('Do not filter by key')
    const [genreFilter, setGenreFilter] = useState('Do not filter by genre')
    const [instrumentFilter, setInstrumentFilter] = useState('Do not filter by instrument')

    const handleFilterSelect = (e) => {
        if(keys.includes(e.target.value)) {
            setKeyFilter(e.target.value)
        } else if (genres.includes(e.target.value)) {
            setGenreFilter(e.target.value) 
        } else if (instruments.includes(e.target.value)) {
            setInstrumentFilter(e.target.value) 
        }
    }
    
    useEffect(() => {
        handleFilter(keyFilter, genreFilter, instrumentFilter)
    }, [keyFilter, genreFilter, instrumentFilter])

    return(
        <div className='Filter'>
            <h2>Filter beat by:</h2>
            <div className="FilterContainer">
                <div className='filters'>
                    <h3>Keys</h3>
                    <select name="keys" className='key' onChange={handleFilterSelect}>
                        {
                            keys.map(key => (
                                <option key={key} className='key' value={key}>{key}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='filters'>
                    <h3>Genres</h3>
                    <select name="genres" onChange={handleFilterSelect}>
                        {
                            genres.map(genre => (
                                <option key={genre} className='genre' value={genre}>{genre}</option>
                            ))
                        }
                    </select>
                </div >
                <div className='filters'>
                    <h3>Instruments</h3>
                    <select name="instruments" onChange={handleFilterSelect}>
                        {
                            instruments.map(instrument => (
                                <option key={instrument} className='instrument' value={instrument}>{instrument}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

        </div>
    )
}