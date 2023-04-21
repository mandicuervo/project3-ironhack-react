import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FilterContainer from "../../components/FilterContainer/FilterContainer";
import './Browse.css';

export default function BrowseView() {
    const [usersList, setUsersList] = useState([]);
    const [beatsList, seatBeatsList] = useState([]);
    const [filteredBeats, setFilteredBeats] = useState([]);
    const { state } = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(state) {
            const { users, beats } = state.searchResults;
            setUsersList(users)
            seatBeatsList(beats)
        } 
    }, [state]);

    useEffect(() => {
        setFilteredBeats([...beatsList])
    }, [beatsList]);
    
    const goToBeatDetail = (id) => {
        navigate(`/beats/${id}`)
    }

    
    const goToProfile = (username) => {
        navigate(`/profile/${username}/about`)
    }

    const handleFilter = (keyFilter, genreFilter, instrumentFilter) => {
        setFilteredBeats([...beatsList])

        if(keyFilter && keyFilter !== 'Do not filter by key') {
            setFilteredBeats([...beatsList].filter(x => x.key === keyFilter))
        }
        
        if(genreFilter && genreFilter !== 'Do not filter by genre') {
            setFilteredBeats([...filteredBeats].filter(x => x.genre == genreFilter))
        }
        
        if(instrumentFilter && instrumentFilter !== 'Do not filter by instrument') {
            setFilteredBeats([...filteredBeats].filter(x => x.instrument === instrumentFilter))
        }
    }

    return(
        <div className="BrowseView">
            <FilterContainer handleFilter={handleFilter}/>
            { filteredBeats.length > 0 && <h3>Beats:</h3>}
            {
                filteredBeats.length > 0 &&
                filteredBeats.map(beat => (
                    <div key={beat._id} className="search-beats-list" onClick={()=>goToBeatDetail(beat._id)}>
                        <img src={beat.image} alt={beat.name} width="20px"/>
                        <h5>{beat.name}</h5>
                        <h6>{beat.owner.username}</h6>
                    </div>
                ))
            }
            { usersList.length > 0 && <h3>Users:</h3> }
            {
                usersList.length > 0 && 
                usersList.map(user => (
                    <div key={user.id} className="search-users-list" onClick={()=>goToProfile(user.username)}>
                        <img src={user.image} alt={user.name}></img>
                        <h5>{user.username}</h5>
                        <h6>{user.name}</h6>
                    </div>
                ))
            }
        </div>
    )
}