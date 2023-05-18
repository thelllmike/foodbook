import React, { Component } from "react";
import "./PostContainer.css";
import { Paper, Avatar } from "@material-ui/core";
import post from "../../../../images/post.jpeg";
import like from "../../../../images/like.png";
import likebutton from "../../../../images/likebutton.png";
import commentbutton from "../../../../images/comment.png";
import sharebutton from "../../../../images/share.png";
import editicon from "../../../../images/pen-to-square-regular.svg";
import deleteicon from "../../../../images/trash-can-regular.svg";
import { getImage } from "../../../../GetImage.js";
// import axios from "axios";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: null,
    };
  }

  //delete

  deletePost = () => {
    const postID = this.props.object.postID;
    fetch(`http://localhost:8080/api/postService/delete/${postID}`, {
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          // Post deletion was successful
          // Perform necessary actions here, such as updating state or navigating to a different page
          // For example, you can update the state to trigger a re-render of the component
          this.setState({ postDeleted: true });
          
          // Alternatively, you can navigate to a different page
          // Replace '/posts' with the desired route to navigate to
          // this.props.history.push('/posts');
        } else {
          // Post deletion failed
          // Handle the error case accordingly
          throw new Error('Post deletion failed.');
        }
      })
      .catch(error => {
        // Error occurred during the deletion process
        // Handle the error case accordingly
        console.error(error);
      });
  };


  deleteComment = (commentID) => {
    fetch(`http://localhost:8080/api/commentService/delete/${commentID}`, {
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          // Comment deletion was successful
          // Perform necessary actions here, such as updating state or fetching updated comments
          this.getData();
        } else {
          // Comment deletion failed
          // Handle the error case accordingly
          throw new Error('Comment deletion failed.');
        }
      })
      .catch(error => {
        // Error occurred during the deletion process
        // Handle the error case accordingly
        console.error(error);
      });
  };
  
  

  getData = () => {
    const thisContext = this;
    fetch(
      "http://localhost:8080/api/commentService/getAllComments/" +
        this.props.object.postID
    )
      .then((response) => response.json())
      .then((json) => {
        thisContext.setState({ comments: json });
      })
      .catch((error) => {});
  };
  componentDidMount() {
    this.getData();
  }

  isImageAvailable = (data) => {
    return data == "" ? false : true;
  };

  submitComment = (event) => {
    if (event.key == "Enter") {
      const thisContext = this;
      let payload = {
        postID: this.props.object.postID,
        userID: JSON.parse(localStorage.getItem("user")).userID,
        userImage: JSON.parse(localStorage.getItem("user")).userImage,
        userName: JSON.parse(localStorage.getItem("user")).userName,
        comment: this.state.comment,
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };

      fetch("http://localhost:8080/api/commentService/save", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          thisContext.getData();
        })
        .catch((error) => {});
    }
  };
  render() {
    return (
      <div>
        <Paper className="post__container">
          {/* header */}
          <div className="post__header">
            <div className="post__header_img">
              <Avatar src={getImage("dp1")} className="post_img" />
            </div>
            <div className="post__header_text">
              {this.props.object.userName}
            </div>
          </div>

          {/* description */}
          <div className="post__description">
            {this.props.object.description}
          </div>
          {/* image */}
          <div className="post__image">
            {this.isImageAvailable(this.props.object.postImgURL) ? (
              <img src={this.props.object.postImgURL} width="600px" />
            ) : (
              <span></span>
            )}
          </div>
          {/* like count */}
          <div className="post__likeCountContainer">
            <div className="post__like">
              <img className="post__img" src={like} />
            </div>
            <div className="post__likecount">{this.props.object.likes}</div>
            <div className="post__commentcount">
              {this.state.comments.length} comments
            </div>
          </div>
          {/* like share box */}
          <div className="post__likeShare">
            <div className="post__tab">
              <div className="post__tabfirst">
                <img className="post__tabimg" src={likebutton} />
              </div>
              <div className="post__tabtext">Like</div>
            </div>

            <div className="post__tab">
              <div className="post__tabfirst">
                <img className="post__tabimg" src={commentbutton} />
              </div>
              <div className="post__tabtext">Comment</div>
            </div>

            <div className="post__tab">
              <div className="post__tabfirst">
                <img className="post__tabimg" src={sharebutton} />
              </div>
              <div className="post__tabtext">Share</div>
            </div>

            <div className="post__tab">
              <button>
                {" "}
                <a>
                  <div className="post__tabfirst">
                    <img className="post__tabimg icons" src={editicon} />
                  </div>
                  <div className="post__tabtext">Edit</div>
                </a>
              </button>
            </div>

                    <div className="post__tab">
                <button onClick={this.deletePost}>
                <div className="post__tabfirst">
                    <img className="post__tabimg icons" src={deleteicon} alt="Delete Icon" />
                </div>
                <div className="post__tabtext">Delete</div>
                </button>
            </div>

            {/* <div className="post__tab">
              <button>
                <div className="post__tabfirst">
                  <img className="post__tabimg icons" src={deleteicon} />
                </div>
                <div className="post__tabtext">Delete</div>
              </button>
            </div> */}
          </div>
          {/* comment box */}
          <div className="upload__comment">
            <div className="comment__section">
            {this.state.comments.map((item, index) =>
  index > this.state.comments.length - 4 ? (
    <div className="comment" key={item.commentID}>
      <Avatar
        src={getImage(item.userImage)}
        className="comment_img"
      />
      <div className="comment_text">{item.comment}</div>
      <div className="post__tab">
        <button onClick={() => this.deleteComment(item.commentID)}>
          <div className="post__tabfirst">
            <img className="post__tabimg icons" src={deleteicon} alt="Delete Icon" />
          </div>
          <div className="post__tabtext">Delete</div>
        </button>
      </div>
    </div>
  ) : (
    <span key={item.commentID}></span>
  )
)}

            </div>
            <div className="upload__top">
              <div>
                <Avatar
                  src={getImage(
                    JSON.parse(localStorage.getItem("user")).userImage
                  )}
                  className="upload_img"
                />
              </div>
              <div>
                <input
                  onKeyDown={this.submitComment}
                  onChange={(event) => {
                    this.state.comment = event.currentTarget.value;
                  }}
                  className="upload__box"
                  placeholder="What's on your mind ?"
                  type="text"
                />
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Post;
