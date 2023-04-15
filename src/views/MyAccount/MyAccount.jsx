import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import EditProfile from '../../components/EditProfile/EditProfile';
import MyCatalog from '../../components/MyCatalog/MyCatalog';
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
        } else if(location.pathname === '/account/my-catalog') {
            setComponentToShow('my-catalog') 
        } else {
            navigate('/account/edit')
        } 
    })

    return(
        <div className='MyAccount'>
            <div className='links-account'>
                <Link to='/account/edit'>Edit Profile</Link>
                <Link to='/account/downloads'>Downloads</Link>
                <Link to='/account/favorites'>Favorites</Link>
                <Link to='/account/my-catalog'>My Beats</Link>
            </div>
            <div className='components-account'>
                {
                    componentToShow === 'edit' && <EditProfile />
                }
                {
                    componentToShow === 'my-catalog' && <MyCatalog />
                }
            </div>
        </div>
    )
}