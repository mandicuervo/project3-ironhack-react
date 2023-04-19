import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import About from '../../components/About/About';
import Comments from '../../components/Comments/Comments';
import AuthContext from '../../contexts/AuthContext';
import './Profile.css'
import { getUserByUsername } from '../../services/UserService';
import ListBeats from '../../components/ListBeats/ListBeats';
import { getAllBeatsFromUser } from '../../services/BeatsService';


export default function Profile() {
    const [componentToShow, setComponentToShow] = useState('beats');
    const [user, setUser] = useState(null);
    const [playSum, setPlaySum] = useState(0);
    const [favSum, setFavSum] = useState(0);
    const { username, component } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(username){
            getUserByUsername(username)
            .then(res => {
                setUser(res)
                getAllBeatsFromUser(res.id)
                .then(list => {
                    let plays = 0;
                    let favorites = 0;
                    list.map(beat => {
                        plays += beat.playingCount
                        favorites += beat.favoriteCount
                    }) 
                    setPlaySum(plays)
                    setFavSum(favorites)
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
    },[username]);

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
        <>
            {
                user && 
                <div className='MyProfile'>
                    <div className='header-profile'> 
                        <img className="image-profile img" style={{backgroundImage: `url(${user.image})`}}/>
                        <div className='user-info'>
                            <h3>{user.username}</h3>
                            <h3>{user.email}</h3>
                        </div>
                        <div className='beat-user-info'>
                            <i className='bx bx-play-circle bx-md'></i>
                            <p>{playSum} plays</p>
                            <i class='bx bxs-heart-circle bx-md'></i>
                            <p>{favSum} favorites</p>
                        </div>
                    </div>

                    <div className='links-profile'>
                        <Link to={`/profile/${username}/beats`}>BEATS</Link>
                        <Link to={`/profile/${username}/about`}>ABOUT</Link>
                    </div>
                    <div className='components-profile'>
                        {
                            componentToShow === 'beats' && <ListBeats userId={user.id}/>
                        }
                        {
                            componentToShow === 'comments' && <Comments />
                        }
                        {
                            componentToShow === 'about' && <About user={user} />
                        }
                    </div>
                </div>
            }
        </>
    )
}