import React, { useState } from 'react'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../firebase';
 
export default function Test() {





const auth = getAuth();
const generateRecaptch = ()=>{
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
       
        }
      }, auth);
}


const reqOtp = (e)=>{
    const phone = '+918594025204'
    e.preventDefault()
    generateRecaptch()

    let appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth,phone,appVerifier)
    .then(conformResult =>{
        window.confirmationResult = conformResult
        alert(conformResult)
        console.log(conformResult)
    }).catch((er)=>{
        alert(er)
    })
}

const [otp,setOtp] = useState('')
const verify = ()=>{
if(otp.length === 6 ){
    let confirmationResult = window.confirmationResult
    confirmationResult.confirm(otp).then((result)=>{
        alert("sucesss")
    }).catch((err)=>{
        alert(err)
    })
}
}
  return (
    <div>Test

        <button id='sign-in-button' onClick={reqOtp}>CHECK</button>

        <input  style={{border:'solid'}} onChange={(e)=>{
      setOtp(e.target.value)
        }}/>
        <button onClick={verify}> Verify</button>
    </div>
  )
}
