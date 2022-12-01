import './sidebar.css';
import {RssFeed, Chat, PlayCircle, Group, Bookmark, HelpOutline, WorkOutline, Event, School} from "@mui/icons-material";
import Friend from '../closeFriend/Friend';
import {Users} from "../../myData";
function Sidebar() {
  return (
    <div className='sidebar'>
    <div className='sidebarWrapper'>
        <ul className='sidebarList' >
            <li className='sidebarListItem'>
              <RssFeed/>
              <span className='sidebarItemText'>Feed</span>
            </li>

            <li className='sidebarListItem'>
              <Chat/>
              <span className='sidebarItemText'>Chats</span>
            </li>

            <li className='sidebarListItem'>
              <PlayCircle/>
              <span className='sidebarItemText'>videos</span>
            </li>

            <li className='sidebarListItem'>
              <Group/>
              <span className='sidebarItemText'>Groups</span>
            </li>
            <li className='sidebarListItem'>
              <Bookmark/>
              <span className='sidebarItemText'>Bookmarks</span>
            </li>

            <li className='sidebarListItem'>
              <HelpOutline/>
              <span className='sidebarItemText'>Questions</span>
            </li>

            <li className='sidebarListItem'>
              <WorkOutline/>
              <span className='sidebarItemText'>Job</span>
            </li>

            <li className='sidebarListItem'>
              <Event/>
              <span className='sidebarItemText'>Events</span>
            </li>

            <li className='sidebarListItem'>
              <School/>
              <span className='sidebarItemText'>Course</span>
            </li>
        </ul>     
        <button className='sidebarButton'>Show More</button>
        <hr className='sidehr'></hr>
        <ul className='sidebarFreindList'>
        {
                Users.map((u) => (<Friend key={u.id} picture = {u.profilePicture} name = {u.username}/>))
        }
        </ul>
    </div>
    </div>
  )
}

export default Sidebar
