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
                    <Link to="/account/edit"><div className="image-profile" style={styles} onClick={closeSideBar} width='100px'></div></Link> 
                    <h5>Hi, {currentUser.username}</h5>
                    <div className='links-sidebar'>
                        <Link to="/account/my-catalog" onClick={closeSideBar}><h6>My account</h6></Link>
                        <Link to={`/profile/${currentUser.username}/beats`} onClick={closeSideBar}><h6>My Profile</h6></Link>
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