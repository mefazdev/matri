import React from 'react'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import photoHolder from '../asset/image/photo-holder.png'
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu';
export default function AccountNav() {
  return (
    <div className='acc__nav'>
        <div className='acc__nav__cnt flex'>
      

       <div className='acc__nav__left flex'>
       <AccountTreeIcon id='logo' />
        <p>HOME</p>
        <p>SEARCH</p>
        <p>EXPLORE</p>
        
        <p>UPGRADE</p>
        <p>HELP</p>
       </div>

       <div className='acc__nav__right flex'>
        <div className='acc__nav__img'>
          <Image src={photoHolder} alt='' />
        </div>
        <h6>Swalah

          (XR343455)
        </h6>
        <MenuIcon id='acc__nav__menu__icon' />
       </div>
        </div>
    </div>
  )
}
 