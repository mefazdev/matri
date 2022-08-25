import React, { useEffect, useState } from 'react'
import Modal from "@mui/material/Modal";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase';
import { useRouter } from 'next/router';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useSelector, useDispatch } from "react-redux";
import { closeLogin } from '../redux/actions';
import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Login() {

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const router = useRouter()

const dispatch = useDispatch();
const open = useSelector((state) => state.loginControl);
const [member,setMember] = useState([])
const [user,setUser] = useState({})
    const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(auth, email, password);
 
       
  
          navigate()
          dispatch(closeLogin())
        // router.push('/account/Home')
        } catch (error) {
          alert(error);
          
        }
      };


 
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
 
  const navigate = ()=>{

      // if(member[0].data().basic !== true){
      //   console.log(member[0]?.data().basic)
      // }
      if(member[0]){
        if(member[0]?.data().basic !== true ){
 
          router.push('/profilecreation/Basic')
       }else if(member[0]?.data().accEdu !== true ){
         router.push('/profilecreation/Education')
       
       
     }else if(member[0]?.data().accDesc !== true   ){
       router.push('/profilecreation/Description')
     } else if (member[0]?.data().accDesc == true) {
       router.push('/account/Home')
     }
      }
    

}
useEffect(()=>{
  getUser()
},[])

useEffect(()=>{
  fetchMember()
},[user])
  
 
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
               <p>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className='login__row'>
               <p>Password</p>
                <input
                onChange={(e)=>setPassword(e.target.value)}
                type='password' />
            </div>
            <h6>Forgot password?</h6>

            <button 
            // onClick={navigate}
            onClick={login}            
            >Login</button>

            <div>
                <Link href='/'><h5 onClick={()=>dispatch(closeLogin())}>New Here? <span style={{color:'rgb(10, 65, 127)'}}>Register Free</span> </h5></Link>
                
            </div>
        </div>
      </Modal>
    </div>
  )
}
