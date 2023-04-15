import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import About from '../../components/About/About';
import Beats from '../../components/Beats/Beats';
import Comments from '../../components/Comments/Comments';
import AuthContext from '../../contexts/AuthContext';
import './Profile.css'


export default function Profile() {
    const [componentToShow, setComponentToShow] = useState('beats')
    const { username, component } = useParams();
    const [bgImage, setBgImage] = useState('https://res.cloudinary.com/dgnace8dp/image/upload/v1676728201/profile-default_zk16xw.jpg')
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();


    const styles = {
        backgroundImage: `url(${bgImage})`
    }

    useEffect(() => {
        if(currentUser) {
            setBgImage(currentUser.image)
        }
    }, [currentUser])

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
                <img className="image-profile img" style={styles}/>
                
                <h3>{currentUser?.username}</h3>
                <h3>{currentUser?.email}</h3>
            </div>

            <div className='links-profile'>
                <Link to={`/profile/${username}/beats`}>BEATS</Link>
                <Link to={`/profile/${username}/comments`}>COMMENTS</Link>
                <Link to={`/profile/${username}/about`}>ABOUT</Link>
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