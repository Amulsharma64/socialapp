import "../closeFriend/friend.css";

export default function Friend({picture,name}) {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className='sidebarfriend'>
        <img className='sidebarFriendImage' src={publicFolder+picture} alt=''></img>
        <span className='sidebarFriendName'>{name}</span>
    </li>
  )
}
