import './Navbar.css'
import { Link } from 'react-router-dom'
import AuthContext  from '../../contexts/AuthContext'
import { useContext, useEffect, useState } from 'react';
import { logout } from '../../stores/AccessTokenStore'


export default function Navbar() {
    const [bgImage, setBgImage] = useState('https://res.cloudinary.com/dgnace8dp/image/upload/v1676728201/profile-default_zk16xw.jpg')
    const [isSidearOpen, setIsSidebarOpen] = useState(false)

    const { currentUser } = useContext(AuthContext);
    
    const styles = {
        backgroundImage: `url(${bgImage})`
    }

    useEffect(() => {
        if(currentUser) {
            setBgImage(currentUser.image)
        }
    }, [currentUser])

    
    const userLogOut = () => {
        logout();
    };

    const openSidebar = () => {
        setIsSidebarOpen(true)
    }
    
    const closeSideBar = () => {
        setIsSidebarOpen(false)
    }

    return(
        <div className="Navbar">
            <div className="navbar-container">
                <div className='title-navbar'>
                    <Link to="/feed"><h3>B E A T S</h3></Link>
                </div>
                <div className='links-navbar'>
                    { !currentUser && <Link to="/login">Login</Link> }
                    { !currentUser && <Link to="/register">Register</Link> }  
                    { currentUser && <Link onClick={userLogOut}><span>Logout</span></Link> }
                    { currentUser && <Link to="/account">
                        <div className="image-profile" style={styles} onClick={openSidebar}></div>
                    </Link>}
                </div>
            </div>
            {
                isSidearOpen && 
                <>
                    <div className='sidebar-container'>
                        Hola
                    </div>
                    <div className='transparent-layer' onClick={closeSideBar}></div>
                </>
            }
        </div>
    )
}

