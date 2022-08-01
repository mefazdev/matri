import React from 'react'
import imageHolder from '../asset/image/photo-holder.png'
import Image from 'next/image'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email'; 
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneIcon from '@mui/icons-material/Phone';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; 
export default function AccoundSidebar() {
  return (
    <div className='acc__sbar'>
        <div className='sbar__first__row flex '>
 <div className='sbar__first__row__left'>
 <Image src={imageHolder} alt='' />
 </div>
 <div className='sbar__first__row__right'>

    <h6> <span style={{fontWeight:"bold"}}>SALAHUDDE</span>(WR433454) </h6>
    <p>Account : Free</p>
    <button>Upgrade</button>
 </div>

 

 
        </div>
        <div className='sbar__second__row '>
        <div className='sbar__second__row__div  flex'>
            <button id='sbar__second__row__btn1'>Profiles</button>
            <button id='sbar__second__row__btn2'>Search</button>
            
  
</div>
<div className='sbar__second__row__div  flex'>
<button id='sbar__second__row__btn3' >Explore</button>
            <button id='sbar__second__row__btn4'>Logout</button>
</div>
</div>

<div className='sbar__third__row '>
    <div className='sbar__third__row__div'>
<h5>My Profile</h5>
    </div>
    <div className='sbar__third__row__bottom flex'>
        <div className='sbar__third__row__left flex'>
      <CameraAltIcon id='sbar__third__row__bottom__icon'/>
      <p>Manage Photos</p>
        </div>
        <div className='sbar__third__row__right flex'>
            <EditIcon id='sbar__third__row__bottom__icon'/>
            <p>Edit Profile</p>
        </div>
    </div>
</div>

<div className='sbar__settings'>
<div className='sbar__third__row__div'>
<h5>Account Settings</h5>
    </div>

    <div className='sbar__setings__row mt-3 grid grid-cols-2 gap-4'>
        <div className='sbar__setings__left flex'>
            <EmailIcon id='sbar__third__row__bottom__icon'/>
            <p>SMS/Email Alerts</p>
        </div>
        <div className='sbar__setings__right flex'>
            <VisibilityOffIcon id='sbar__third__row__bottom__icon'/>
            <p>Hide Profile</p>
        </div>
         </div>
         <div className='sbar__setings__row grid grid-cols-2 gap-4'>
        <div className='sbar__setings__left flex'>
            <LockIcon id='sbar__third__row__bottom__icon'/>
            <p>Edit Password</p>
        </div>
        <div className='sbar__setings__right flex'>
            <DeleteIcon id='sbar__third__row__bottom__icon'/>
            <p>Delete Profile</p>
        </div>
         </div>
         <div className='sbar__setings__row grid grid-cols-2 gap-4'>
        <div className='sbar__setings__left flex'>
            <PowerSettingsNewIcon id='sbar__third__row__bottom__icon'/>
            <p>Logout</p>
        </div>
       
         </div>
</div>

<div className='sbar__help flex'>
  <div className='sbar__help__circle'>
    <PhoneIcon/>
  </div>
  <div className='sbar__help__right'>
    <p>Call us</p>
    <h6>+91234434343</h6>
  </div>
</div>
         
    </div>
  ) 
}
  