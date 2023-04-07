import "../online/online.css";


export default function Online({picture,name}) {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className='rightbarFriend'>
    <div className='rightbarProfileImgContainer'>
    <img className='rightbarProfileImg'
      src={publicFolder+picture}
      alt=''
    />
    <span className='rightbarOnline'></span>
    </div>
    <span className='rightbarUserName'>{name}</span>
  </li>
  )
}
