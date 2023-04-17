import { useContext, useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import { createComment, deleteComment, getBeatComments } from "../../services/CommentService";
import AuthContext from '../../contexts/AuthContext';

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
};

export default function Comments({ beatId }) {
    const [update, setUpdate] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if(beatId) {
            getBeatComments(beatId)
            .then(res => {
                let reversed = res.reverse();
                setComments(reversed)
            })
            .catch(err => console.log(err))
        }
    }, [beatId, update])

    const handleOnChange = (e) => {
        const { value } = e.target;
        setNewComment(value);
    }
    
    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(currentUser) {
            createComment(beatId, {currentUserId: currentUser.id, comment: newComment})
            .then(res => setUpdate(!update))
            .catch(err => console.log(err))
        }

        setNewComment('');
    }

    const handleDeleteComment = (id) => {
        deleteComment(id)
        .then(res => {
            let filtered = comments.filter(comment => comment.id !== id);
            setComments(filtered)
        })
        .catch(err => console.log(err))
    }
    
    return(
        <div className="Comments">
            {
                currentUser &&
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="comment" className="form-label">Let us know what you think about this beat!</label>
                        <textarea className="form-control" id="comment" name="comment" rows="2" value={newComment} onChange={handleOnChange}></textarea>
                    </div>
                    {/* <Tilt options={defaultOptions}> */}
                        <button type="submit">Submit</button>
                    {/* </Tilt>/ */}
                </form>
            }
            {
                comments?.length > 0 &&
                comments.map(comment => (
                    <div key={ comment.id }>
                        <h4>{ comment.user.username }</h4>
                        <p>{ comment.comment }</p>
                        {
                            currentUser.id === comment.user._id &&
                            <i className='bx bxs-x-square' onClick={() => handleDeleteComment(comment.id)}></i>
                        }
                    </div>
                ))
            }
        </div>
    )
}
