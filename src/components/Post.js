import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post({ imageUrl, username, caption }) {
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
    </div>
  );
}

export default Post;
