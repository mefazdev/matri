import { doc, updateDoc } from 'firebase/firestore';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React from 'react'
import logo from '../asset/image/logo.png'
import { db } from '../firebase';
import Cookies from "universal-cookie";
export default function AdminHeader() {
  const cookies = new Cookies();
    const router = useRouter()
    const logout = async () =>{
        const docRef = doc(db, 'admin','EcJ56nx8OgfacXrUBkHg' );
        const updateRef=  await updateDoc (docRef,  {
            admin:false
           })
           cookies.set('admin', false ,{ path: '/' });
           router.push('/admin/Login')
     }

  return (
    <div className='ad__nav'>
        <div className='ad__nav__content'>
        <div className='ad__logo'><Image src={logo} alt=''/></div>

<button onClick={logout}>LOGOUT</button>

        </div>
       
    </div>
  )
}
