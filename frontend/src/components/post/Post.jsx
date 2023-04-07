import React, { useContext,useState, useEffect } from "react";
import "./post.css";
import axios from "axios";
import moment from "moment";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import RightMenu from "./RightMenu";
function Post({ post }) {
    const [likes,setLike] = useState(post.likes.length);
    const [islikes,setisLike] = useState(false);
    const [user,setUser] = useState({});
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);
    
    useEffect(()=>{
       setisLike(post.likes.includes(currentUser._id));
    },[currentUser._id, post.likes]);

    useEffect(()=>{
        const fetchUser = async () =>{
          const res = await axios.get(`/user?userId=${post.userId}`);
          setUser(res.data);
        //   console.log(res.data);
        }
        fetchUser();
      },[post.userId]);


  
    const likeHandler = () => {
        try{
            axios.put("/posts/"+post._id + "/like",{userId:currentUser._id});
        }catch(e){}
        setLike( islikes ? likes-1 : likes+1 );
        setisLike(!islikes);  
    }
    

  return (
    <div className='post'>
        <div className="postWrapper">
            <div className='postTop'>
                <div className='postTopLeft'>
                    <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>
                    <img className='postProfileImg' 
                     src={
                  user.profilePicture
                    ? publicFolder + user.profilePicture
                    : publicFolder + "person/noAvatar.png"
                }
                    alt=''/>
                    </Link>
                    <span className='postUserName'>{user.username}</span>
                    <span className='postDate'>{moment(`${post.createdAt}`).startOf('hour').fromNow()}</span>
                </div>
                <div className="postTopRight">
                <RightMenu post={post}/>
                </div>
            </div>     
            <div className='postCenter'>
                <span className="posttext">{post.desc}</span>
                <img className="postImg" src={`${publicFolder}${post.img || ""}`}  alt=""/>
            </div>
            <div className='postBotton'>
                <div className="postBottomLeft">
                    <img className="likeIcon" onClick={likeHandler} src={`${publicFolder}like.png`} alt=""></img>
                    <img className="likeIcon" onClick={likeHandler} src={`${publicFolder}heart.png`} alt=""></img>
                    <span className="postLikeCounter">{likes}</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{}</span>
                </div>
            </div>
        </div>        
    </div>
  )
}

export default Post
