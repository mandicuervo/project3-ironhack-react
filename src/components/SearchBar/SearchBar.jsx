import React, {useState} from 'react'
import './SearchBar.css';
import { getSearchResults } from '../../services/BeatsService';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const handleOnChage = (e) => {
        const { value } = e.target;
        setSearchText(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getSearchResults(searchText)
        .then(res => {
            setSearchText('')
            navigate('/browse', { state: { searchResults: res }} )
        })
        .catch(err => console.log(err))
    }
    
    return(
        <div className='SearchBar'>
            <form onSubmit={handleSubmit}>
                <input  
                    type="text"
                    onChange={handleOnChage}
                    value={searchText}
                    placeholder='What are you looking for?'
                />
                <i className='bx bx-search-alt-2 bx-flashing bx-md' ></i>
            </form>
        </div>
    )
}
