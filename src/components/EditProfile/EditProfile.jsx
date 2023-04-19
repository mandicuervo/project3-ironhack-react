import './EditProfile.css'
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext"
import { editUser } from "../../services/UserService";

export default function EditProfile() {
    const [image, setImage] = useState([]);
    const [user, setUser] = useState({
        name: "",
        bio: "",
        username: ""
    })
    const { currentUser, setUpdateImageNavbar, updateImageNavbar } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser) {
            setUser({
                name: currentUser.name,
                bio: currentUser.bio,
                username: currentUser.username
            })
        }
    }, [currentUser])


    const handleOnChange = (e) => {
        const { name, value, type, files } = e.target;
        if(type !== 'file') {
            setUser({ ...user, [name]: value });
        } else {
            setImage(files);
        }
    };
    
    const handleOnSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();

        formData.append("_id", currentUser["_id"]);
    
        for (let data in user) {
            formData.append(data, user[data]);
        }
    
        for (let img of image) {
            formData.append("image", img);
        }
        
        editUser(formData)
        .then(response => {
            setUpdateImageNavbar(!updateImageNavbar);
            if(user.username) {
                navigate(`/profile/${user.username}/beats`)
            } else {
                navigate(`/profile/${currentUser.username}/beats`)
            }
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="EditProfile">
            <h1>Edit Your Profile Here</h1>
            <form onSubmit={ handleOnSubmit } className="form-control profile">
                <div className="form-edit-profile">
                    <label className="form-label">Image:</label>
                    <input className='form-control' name= 'image' type='file' onChange={handleOnChange} />
                
                    <label className="form-label">Name:</label>
                    <input className='form-control' name= 'name' value={user.name} type='text' onChange={handleOnChange} />

                    <label className="form-label">Bio:</label>
                    <input className='form-control' name= 'bio' value={user.bio} type='text' onChange={handleOnChange} />
                
                    <label className="form-label">Username:</label>
                    <input className='form-control' name='username' value={user.username} type='text' onChange={handleOnChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}