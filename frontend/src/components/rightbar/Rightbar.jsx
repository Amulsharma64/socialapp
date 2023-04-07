import './rightbar.css';
import Online from '../online/Online';
import {Users} from "../../myData";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add } from '@mui/icons-material';

function Rightbar({user}) {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user:currentUser,dispatch} = useContext(AuthContext);
  const [Followed, setFollowed] = useState(currentUser.followings.includes(user?._id));
  useEffect(()=>{
    setFollowed(currentUser.followings.includes(user?._id));
  },[currentUser,user]);
  
  useEffect(()=>{
    const getFriend = async () =>{
      try {
        const friendsList = await axios.get("/user/friends/" + user._id);
        setFriends(friendsList.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFriend();
  },[user]);

  const handleClick = async() =>{
    try {
      if(Followed){
        await axios.put("/user/"+user._id+"/unfollow"
        ,{userId:currentUser._id,
        });
        dispatch({type:"UNFOLLOW",payload:user._id})
      }else{
        await axios.put("/user/"+user._id+"/follow"
        ,{userId:currentUser._id,
        });
        dispatch({type:"FOLLOW",payload:user._id})
      }
      setFollowed(!Followed);
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightbar = () =>{
    return (
    <>
      <div className='birthadayContainer'>
        <img className='birthddayImg' src={`${publicFolder}gift.png`} alt=''/>
        <span className='birthdayText'>
        <b>Akash Pathak</b> and <b>3 other friends</b> have birthday today
        </span>
      </div>
      <img className='rightbarAd' src={`${publicFolder}ad.png`} alt=''/>
      <h4 className='rightbarTitle'>Online Friends</h4>
      <ul className='rightbarfriendList'>
        {
          Users.map((u) => (
            <Online 
            key={u.id} 
            picture = {u.profilePicture} 
            name = {u.username} />
            ))
        }      
      </ul>
    </>
  )};
  
  const ProfileRightbar = () =>{
    return (
      <>
      {
        user.username !== currentUser.username && (
          <button className='rightbarFollowButton' onClick={handleClick}>
             {Followed?" Following ":"Follow"}
             {Followed?"":<Add/>}
          </button>
        )
      }
        <h4 className='rightbarTitle'>User infomation</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City:</span>
            <span className='rightbarInfoValue'>{user.city ? user.city: "Greater Noida"}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From:</span>
            <span className='rightbarInfoValue'>{user.add ? user.add: "Gopalganj(Bihar)"}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship:</span>
            <span className='rightbarInfoValue'>{user.relation ? user.relation : "Commited"}</span>
          </div>
        </div>
        <h4 className='rightbarTitle'>User friends</h4>
        <div className='rightbarFollowings'>
          {
            friends.map( (friend) =>(
              <Link key={friend._id} to={"/profile/"+ friend.username}  style={{ textDecoration: "none", color:"black"}}>
              <div className='rightbarFollowing'>
              <img 
              src={friend.profilePicture ? publicFolder+friend.profilePicture: publicFolder+"noAvtar.png"} 
              alt='' 
              className='rightbarFollowingImg'/>
              <span className='rightbarFollowingName'>{friend.username}</span>
          </div>
          </Link>
            ))}
        </div>
        

      </>
    )
  }

  return (
    <div className='rightbar'>
        <div className="rightbarWrapper">
            
              {user
              ? <ProfileRightbar/>
              : <HomeRightbar/>
              }
                        
        </div>
    </div>  
  )
}

export default Rightbar
