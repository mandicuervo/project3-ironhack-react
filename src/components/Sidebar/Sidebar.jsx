import { useContext, useState, useEffect} from 'react'
import AuthContext from '../../contexts/AuthContext'
import { logout } from '../../stores/AccessTokenStore'
import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar({ closeSideBar }) {
    const [bgImage, setBgImage] = useState('https://res.cloudinary.com/dgnace8dp/image/upload/v1676728201/profile-default_zk16xw.jpg')
    const {currentUser} = useContext(AuthContext);

    const styles = {
        backgroundImage: `Url(${bgImage})`
    }

    useEffect(() => {
        if(currentUser) {
            setBgImage(currentUser.image)
        }
    }, [currentUser])

    const userLogout = () => {
        logout();
    }

    return(
        <div className="Sidebar">
            <div className='sidebar-container'>
                { currentUser && <Link to="/account/edit">
                <div className="image-profile" style={styles}></div>
                </Link> }
                { currentUser && <Link to="/account/downloads"><h5>Downloads</h5></Link>}
                { currentUser && <Link to="/account/favorites"><h5>Favorites</h5></Link>}
                { currentUser && <Link to="/account/my-catalog"><h5>My catalog</h5></Link>}
                { currentUser && <Link onClick={userLogout}><span>Logout</span></Link> }
            </div>
            <div className='transparent-layer' onClick={closeSideBar}></div>
        </div>
    )
}