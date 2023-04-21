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
        closeSideBar();
    }

    return(
        <div className="Sidebar">
            <div className='sidebar-container'>
                { currentUser &&
                    <>
                    <div className='sidebar-top-container'>
                        <div className="image-profile-sidebar" style={styles} onClick={closeSideBar}></div>
                        <h5>Hi {currentUser.username}</h5>
                    </div>
                    <div className='links-sidebar'>
                        <Link to="/account/my-catalog" onClick={closeSideBar}>My account</Link>
                        <Link to={`/profile/${currentUser.username}/beats`} onClick={closeSideBar}>My Profile</Link>
                    </div>
                    <div className='logout'>
                        <Link onClick={userLogout}><span>Logout</span></Link> 
                    </div>
                    </>
                }
            </div>
            <div className='transparent-layer' onClick={closeSideBar}></div>
        </div>
    )
}