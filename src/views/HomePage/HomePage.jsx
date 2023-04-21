import './HomePage.css'
import SearchBar from '../../components/SearchBar/SearchBar'
import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import TopBeats from '../../components/TopBeats/TopBeats'

export default function HomePage() {
    const { currentUser } = useContext(AuthContext)
    return (
        <div className="HomePage">
            <div className='home-page-content'>
                <div className='text-home-page'>
                    <h1>Find the perfect beat</h1>
                    <h1>for your project!</h1>
                    <p>Collaboration between artists and beatmakers has never been easier.</p>
                </div>
                <div className='search-bar-home-page'>
                    <SearchBar />
                    { !currentUser && <Link to="/register">Start Selling</Link> } 
                </div>
            </div>

            <div className='home-page-tranding-beats'>
                <TopBeats />
            </div>

            <div className="home-page-info">
               <div className="home-page-divs">
                <div className="home-page-div">
                    <h3 className="home-page-number">1</h3>
                    <div>
                        <h3>FIND YOUR BEAT</h3>
                        <p>Find your beat easily using the filters in several catalogues of the best independences producers.</p>
                    </div>
                </div>
                <div className="home-page-div">
                    <h3 className="home-page-number">2</h3>
                    <div>
                        <h3>CREATE YOUR ACOUNT</h3>
                        <p>Easily complete your registration by entering Google, Facebook or filling out a simple form.</p>
                    </div>
                </div>
                <div className="home-page-div">
                    <h3 className="home-page-number">3</h3>
                    <div>
                        <h3>FINALIZE THE PAYMENT</h3>
                        <p>Finalize the purchase of your beat by  Credit Card and create your new Hit!</p>
                    </div>
                </div>                            
               </div>
            </div>


        </div>
    )
}