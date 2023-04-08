import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import About from '../../components/About/About';
import Beats from '../../components/Beats/Beats';
import Comments from '../../components/Comments/Comments';
import './Profile.css'


export default function Profile() {
    const [componentToShow, setComponentToShow] = useState('beats')
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/profile/beats') {
            setComponentToShow('beats')
        } else if(location.pathname === '/profile/comments') {
            setComponentToShow('comments')
        } else if(location.pathname === '/profile/about') {
            setComponentToShow('about')
        } else {
            navigate('profile/beats')
        }
    })
    
    return (
        <div className='MyProfile'>
            <div className='header-profile'>
                <h1>Your Profile</h1>
            </div>

            <div className='links-profile'>
                <Link to='/profile/beats'>Beats</Link>
                <Link to='/profile/comments'>Comments</Link>
                <Link to='/profile/about'>About</Link>
                {
                    componentToShow === 'beats' && <Beats />
                }
                {
                    componentToShow === 'comments' && <Comments />
                }
                {
                    componentToShow === 'about' && <About />
                }
            </div>
        </div>
    )
}