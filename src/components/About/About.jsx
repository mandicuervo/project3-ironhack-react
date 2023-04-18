export default function About({user}) {
    return(
        <div className="About">
            {
                user.bio?
                <div>
                    <p>{user.bio}</p>
                </div>
                :
                <div>
                    <p>This beatmaker still dont have a bio</p>
                </div>
            }
        </div>
    )
}