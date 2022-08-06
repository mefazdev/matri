import React, { useState } from 'react'
import Modal from "@mui/material/Modal";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useRouter } from 'next/router';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useSelector, useDispatch } from "react-redux";
import { closeLogin } from '../redux/actions';
import Link from 'next/link';

export default function Login() {

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const router = useRouter()

const dispatch = useDispatch();
const open = useSelector((state) => state.loginControl);

    const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(auth, email, password);
 
       
         
          
        router.push('/account/Home')
        } catch (error) {
          alert(error);
          
        }
      };
  return (
    <div>
        <Modal
        id="search__modal"
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='login'>
        <HighlightOffIcon 
        onClick={()=>dispatch(closeLogin())}
        id='login__close'/>
            <h4>Welcome Back </h4>
            
            <div className='login__row'>
               <p>Username</p>
                <input onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className='login__row'>
               <p>Password</p>
                <input
                onChange={(e)=>setPassword(e.target.value)}
                type='password' />
            </div>
            <h6>Forgot password?</h6>

            <button onClick={login}>Login</button>

            <div>
                <Link href='/'><h5 onClick={()=>dispatch(closeLogin())}>New Here? <span style={{color:'rgb(10, 65, 127)'}}>Register Free</span> </h5></Link>
                
            </div>
        </div>
      </Modal>
    </div>
  )
}
