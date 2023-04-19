import './About.css'

export default function About({user}) {
    return(
        <div className="About">
            {
                user.bio?
                <div className='bio'>
                    <i className='bx bxs-user-pin bx-lg'></i>
                    <p>"{user.bio}"</p>
                </div>
                :
                <div>
                    <p>This beatmaker still dont have a bio</p>
                </div>
            }
        </div>
    )
}