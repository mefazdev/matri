import React from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged, multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator,
  RecaptchaVerifier
} from "firebase/auth";
import { auth, db } from "../firebase";
export default function Test() {



  // const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container-id', undefined, auth);
  
  
  
  const verify = ()=>{
      multiFactor(user).getSession()
      .then(function (multiFactorSession) {
          // Specify the phone number and pass the MFA session.
          const phoneInfoOptions = {
              phoneNumber: member[0]?.data().phone,
              session: multiFactorSession
          };
  
          const phoneAuthProvider = new PhoneAuthProvider(auth);
  
          // Send SMS verification code.
          return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
      })
      
      // .
      
      // then(function (verificationId) {
      //     // Ask user for the verification code. Then:
      //     const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
      //     const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
  
      //     // Complete enrollment.
      //     // return multiFactor(user).enroll(multiFactorAssertion, mfaDisplayName);
      // }
      
      
      // );
    }
   
  return (
    <div>
      
      Test
      <button  id='recaptcha-container' onClick={verify}>Verifies</button>
      </div>
  )
}
