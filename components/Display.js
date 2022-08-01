import React from 'react'
import Image from 'next/image'
import photoHolder from '../asset/image/photo-holder.png'
import StarIcon from '@mui/icons-material/Star';
import ShareIcon from '@mui/icons-material/Share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function Display() {
  return (
    <div className='dpy'>
        <div className='flex'>
        <div className='dpy__img'>
          <Image src={photoHolder} alt='' />
        </div>
        <div className='dpy__right'>
   <h6>Salah</h6>
   <p>19 Yrs, 162 cm, Male</p>
   <p>Vadakar, Kerala, India</p>
   <p>App Sunni</p>
   <p><span style={{color:'gray'}}>Education : </span> Higher Secondary</p>
   <p><span style={{color:'gray'}}>Occupation : </span> Web Developer</p>
        </div>

        
        </div>
        <div className='dpy__footer flex'>
          <div className='dpy__foot__left flex'>
           <StarIcon id='dpy__icon'/>
           <ShareIcon id='dpy__icon'/>
           <CallIcon id='dpy__icon'/>
           <WhatsAppIcon id='dpy__icon'/>
          </div>
          <div className='dpy__foot__right flex'>
            <p>Like this profile? </p>
            <div className='dpy__close__div'><CloseIcon id='dpy__close__icon'/></div>
            <div className='dpy__fav__div'> <FavoriteIcon id='dpy__fav__icon'/></div>
           
          </div>
        </div>
    </div>
  )
}
