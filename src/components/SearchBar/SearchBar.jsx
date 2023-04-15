import React, {useState} from 'react'
import './SearchBar.css';

export default function SearchBar({onChange, value, placeholder }) {
    
    return(
        <div className='SearchBar'>
            <form>
            <input  
                type="text"
                onChange={onChange}
                value={value}
                placeholder={placeholder} />
            </form>
        </div>
    )
}
