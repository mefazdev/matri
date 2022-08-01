import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'; 
export default function Header() {

  const [mobileView,setMobileView] = useState(false)

  const [changeNav, setChangeNav] = useState(false)
  const changeNavBar = () => {
    if (window.scrollY >= 5) {
      // setChangeNav(true);
    }
    // if (window.scrollY < 5) {
    //   setChangeNav(false);
    // }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeNavBar);
  });
  return (
    <>
    <div className='header'>
      <div className='header__content flex'>
        <div className='header__left'>
        <h1>Marry sunni</h1>
        <div className='header__left__right'>
    <h4>Home</h4>
    <h4>About</h4>
    <h4>Contact</h4>
        </div>
        </div>
         
         <div className='header__right'>
            <div className='header__right__div flex'>
                <p>Already a member?</p>

                <button>Login</button>

            </div>
         </div>
<MenuIcon 
onClick={()=>setMobileView(!mobileView)}
id='header__menu'/>
      </div>

 
    </div>
  {mobileView  ? <div className='header__collapse'>
    <div className='collapse__row'>
      <p>Home</p>
    </div>
    <div className='collapse__row'>
      <p>About</p>
    </div>
    <div className='collapse__row'>
      <p>Contact</p>
    </div>

  </div> : ''}
    
    </>
  )
}
 