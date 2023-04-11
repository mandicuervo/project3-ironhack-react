import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import About from '../../components/About/About';
import Beats from '../../components/Beats/Beats';
import Comments from '../../components/Comments/Comments';
import './Profile.css'


export default function Profile() {
    const [componentToShow, setComponentToShow] = useState('beats')
    const navigate = useNavigate();
    const { username, component } = useParams();

    useEffect(() => {
        if (component === 'beats') {
            setComponentToShow('beats')
        } else if(component === 'comments') {
            setComponentToShow('comments')
        } else if(component === 'about') {
            setComponentToShow('about')
        } else {
            navigate('beats')
        }
    })
    
    return (
        <div className='MyProfile'>
            <div className='header-profile'>
                <h1>Your Profile</h1>
            </div>

            <div className='links-profile'>
                <Link to={`/profile/${username}/beats`}>Beats</Link>
                <Link to={`/profile/${username}/comments`}>Comments</Link>
                <Link to={`/profile/${username}/about`}>About</Link>
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