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
    const { currentUser } = useContext(AuthContext);
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
            navigate(`/profile/${currentUser.username}`)
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="EditProfile">
            <form onSubmit={ handleOnSubmit }>
                <div className="form-edit-profile">
                    <label>Image:</label>
                    <input name= 'image' type='file' onChange={handleOnChange} />
                
                    <label>Name:</label>
                    <input name= 'name' value={user.name} type='text' onChange={handleOnChange} />

                    <label>Bio:</label>
                    <input name= 'bio' value={user.bio} type='text' onChange={handleOnChange} />
                
                    <label>Username:</label>
                    <input name='username' value={user.username} type='text' onChange={handleOnChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}