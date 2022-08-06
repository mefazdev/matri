import React, { useEffect, useState } from 'react'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import photoHolder from '../asset/image/photo-holder.png'
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu';
import Login from './Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function AccountNav() {
  const [user,setUser] = useState({})
  const [member,setMember] = useState([])
  const getUser = ()=>{
    onAuthStateChanged(auth, (currentUser) => {
       setUser(currentUser);
     
     });
     }
  const fetchMember = async () => {
    const userId = await user ? user.uid : null;

    if (userId) {
      const q = await query(
        collection(db, "member"),
        where("userId", "==", user?.uid)
      );

      const data = await getDocs(q);
      setMember(data.docs.map((doc) => doc));
    }
  };
useEffect(()=>{
  getUser()
})
  useEffect(()=>{
    fetchMember()

  },[user])
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
          {member[0]?.data().photo ? <img src={member[0].data().photo} alt=''/>:  <Image src={photoHolder} alt='' />}
        
        </div>
        {/* <img src={member[0]?.data().photo} /> */}
        <h6>{user.email?.slice(0,8)}

          ({member[0]?.data().profileId})
        </h6>
        <MenuIcon id='acc__nav__menu__icon' />
       </div>
        </div>
    
    </div>
  )
}
 