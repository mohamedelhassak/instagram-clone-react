import React,{useState, useEffect} from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import {db} from '../config/fire'
import firebase from 'firebase'

function Post({ imageUrl,user, username, caption,postId }) {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  
  useEffect(() => {
    let unsubscribe;
    if(postId){
    unsubscribe = db 
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) =>{
      setComments(snapshot.docs.map((doc) => doc.data()))
    })
    }
    return () =>{
      unsubscribe()
    }
    
  }, [postId])

const postComment = (e) =>{
  db.collection('posts').doc(postId).collection('comments').add({
    text:comment,
    username:user.displayName,
    timestamp:firebase.firestore.FieldValue.serverTimestamp()
  });
  setComment('')
}

  return (
    <div className="post">
      {/* header > username + avatar */}
      <div className="post__header">
        <Avatar className="pos t__avatar" src="" alt="" />
        <h3 className="post__username">{username}</h3>
      </div>

      {/* imagee */}
      <img className="post__image" src={imageUrl} />

      {/* username + caption */}
      <h4 className="post__text">
        <strong>{username} </strong> {caption}
      </h4>

      <div>
        {
          comments.map((comment) =>(
            <p className="comment__text">
            <strong>{comment.username}</strong>{comment.text}
            </p>
          ))
        }
      </div>

      {user?.displayName?(

      <form className="post__comment">
        <input 
          className="post__input"
          type="text"
          placeholder="commenr on this post ..."
          value={comment} 
          onChange={(e) =>setComment(e.target.value)}/>
          <button
          className="post__button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
        publish
        </button>
      </form>
      ):
      (<div>
      </div>)}
    </div>
  );
}

export default Post;
