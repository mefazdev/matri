import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'; 
import Login from './Login';
import { useSelector, useDispatch } from "react-redux";
import {  openLogin,   } from '../redux/actions';
import Link from 'next/link';
import logo from '../asset/image/logo.png'
import Image from 'next/image';
export default function Header() {
  const dispatch = useDispatch();
    // const open = useSelector((state) => state.searchControl);
 
  const [mobileView,setMobileView] = useState(false)


  const [changeNav, setChangeNav] = useState(false)
  const changeNavBar = () => {
    if (window.scrollY >= 5) {
      setChangeNav(true);
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
          <Link href='/'>
            <div className='nav__logo'><Image src={logo} alt=''/></div>
            
          </Link>
        
        <div className='header__left__right'>
        <Link href='/'><h4>Home</h4></Link>
    <Link href='/About'><h4>About</h4></Link>
    <Link href='/Contact'><h4>Contact</h4></Link>
    
        </div>
        </div>  
         
         <div className='header__right'>
            <div className='header__right__div flex'>
                <p>Already a member?</p>

                <button onClick={()=>dispatch(openLogin())}>Login</button>

            </div>
         </div>
         <button id='mob__login__btn' onClick={()=>dispatch(openLogin())}>Login</button>

<MenuIcon 
onClick={()=>setMobileView(!mobileView)}
id='header__menu'/>
      </div>

 
    </div>
  {mobileView  ? <div className='header__collapse'>
    <div className='collapse__row'>
      <Link href='/'><p>Home</p></Link>
      
    </div>
    <div className='collapse__row'>
      <Link href='/About'><p>About</p></Link>
      
    </div>
    <div className='collapse__row'>
      <Link href='/Contact'><p>Contact</p></Link>
      
    </div>

  </div> : ''}
  <Login/>
    </>
  )
}
 