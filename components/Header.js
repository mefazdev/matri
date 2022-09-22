import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'; 
import Login from './Login';
import { useSelector, useDispatch } from "react-redux";
import {  openLogin,   } from '../redux/actions';
import Link from 'next/link';
import logo from '../asset/image/logo.png'
import Image from 'next/image';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
export default function Header({name,avatar}) {
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
<div className='home__avatar__div'
id='header__menu'/>
onClick={()=>dispatch(openLogin())}
type="button"
>
  {avatar ?  <img alt='' src={avatar} /> : <AccountCircleSharpIcon id='home__avatar'/>}
  

<p>{name  ? name : "Login"}</p>   
</div>
         {/* <button id='mob__login__btn' onClick={()=>dispatch(openLogin())}>Login</button> */}

{/* <MenuIcon 
onClick={()=>setMobileView(!mobileView)}
id='header__menu'/> */}
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
 