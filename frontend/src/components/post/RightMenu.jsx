import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MoreVert } from '@mui/icons-material';
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';

export default function PositionedMenu({post}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {user:currentUser} = React.useContext(AuthContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = async (value) => {
    setAnchorEl(null);    
    if(value==="delete"){
      try {
          await axios.delete("/posts/"+post._id,{
            "userId":post.userId,
            "desc":post.desc,
            "img":post.img
        });
          window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else if(value==="edit"){
      try {
        await axios.get() ;
      } catch (error) {
        console.log(error);       
      }
    }
  };


  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVert/>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
      {
        currentUser._id===post.userId &&       
        <MenuItem onClick={() => {
            handleClose("edit");
          } }>Edit</MenuItem>
      }
      
        {
        currentUser._id===post.userId &&       
          <MenuItem onClick={() => {
            handleClose("delete");
          } }>Delete</MenuItem>
      }

        <MenuItem onClick={()=>{
          handleClose("share");
        }}>Share</MenuItem>
      </Menu>
    </div>
  );
}