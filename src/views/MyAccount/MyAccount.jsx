import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import EditProfile from '../../components/EditProfile/EditProfile';
import './MyAccount.css'

export default function MyAccount() {
    const [componentToShow, setComponentToShow] = useState('edit')
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/account/edit') {
            setComponentToShow('edit')
        } else if(location.pathname === '/account/downloads') {
            setComponentToShow('downloads')
        } else if(location.pathname === '/account/favorites') {
            setComponentToShow('favorites')
        } else if(location.pathname === '/account/my-beats') {
            setComponentToShow('my-beats') 
        } else {
            navigate('/account/edit')
        }
    })

    return(
        <div className='MyAccount'>
            <h1>My Account</h1>
            <Link to='/account/edit'>Edit Profile</Link>
            <Link to='/account/downloads'>Downloads</Link>
            <Link to='/account/favorites'>Favorites</Link>
            {
                componentToShow === 'edit' && <EditProfile />
            }
        </div>
    )
}