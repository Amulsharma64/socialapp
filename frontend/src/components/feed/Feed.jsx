import { useContext, useEffect, useState } from 'react';
import Post from '../post/Post';
import './feed.css';
import Share from '../share/Share';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';

function Feed({username}) {
  const [posts,setPost] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(()=>{
    const fetchData = async () =>{
      const res = username ? 
      await axios.get("/posts/profile/"+username) 
      : await axios.get("posts/timeline/"+user._id);
      setPost(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }
    fetchData();
  },[username, user._id])
  return (
    <div className='feed'>
        <div className='feedWrapper'>
         {(!username || username === user.username) && <Share/>}
          {
          posts.map((p) => (
              <Post key={p._id} post = {p} />
            ))
          }
          
        </div>
    </div>
  )
}

export default Feed
