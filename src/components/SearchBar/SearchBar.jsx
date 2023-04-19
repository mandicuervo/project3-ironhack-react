import React, {useState} from 'react'
import './SearchBar.css';
import { getSearchResults } from '../../services/BeatsService';

export default function SearchBar() {
    const [searchText, setSearchText] = useState('');

    const handleOnChage = (e) => {
        const { value } = e.target;
        setSearchText(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getSearchResults(searchText)
        .then(res => console.log(res))
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
