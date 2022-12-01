import {PermMedia, Label, Room, EmojiEmotions} from "@mui/icons-material";
import { useContext, useRef, useState  } from "react";
import  './share.css'
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Share() {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user} = useContext(AuthContext);
  const desc = useRef();
  const [file,setFile] = useState(null); 

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.img = filename;
      console.log(newPost);
      try {
        await axios.post("/upload",data);
      } catch (error) {}
    }
    
    try {
      if(newPost.desc || newPost.img){
        await axios.post("/posts",newPost);
      window.location.reload();
    }
    } catch (error) {}
  };

  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
            <img className='shareProfileImg' 
            src={
              user.profilePicture
              ?publicFolder + user.profilePicture
              :publicFolder+"noAvtar.png"
            }
                alt=''
            />
            <input 
                placeholder = {"What's in your mind "+user.username+"?"}
                className='shareInput'
                ref={desc}
            />
        </div>
        <hr className="shareHr"/>

        <form onSubmit={submitHandler} className='sharebutton'>
            <label htmlFor="file" className='shareOptions'>
            <PermMedia htmlColor="tomato" className="shareIcon"/>
                <span className="ShareOptionText">Photo or Video</span>
                <input 
                style={{display:"none"}}
                type={"file"}
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) =>{setFile(e.target.files[0])}}
                />
            </label>
            <div className='shareOptions'>
            <Label htmlColor="blue" className="shareIcon"/>
                <span className="ShareOptionText">Tag</span>
            </div>
            <div className='shareOptions'>
            <Room htmlColor="green" className="shareIcon"/>
                <span className="ShareOptionText">Location</span>
            </div>
            <div className='shareOptions'>
            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                <span className="ShareOptionText">Feelings</span>
            </div>
            <button type="submit" className="shareButton">Share</button>
        </form>
      </div>
    </div>
  );
}

export default Share
