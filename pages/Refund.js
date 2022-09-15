import React from 'react'
import Header from '../components/Header'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase';
import Footer from '../components/Footer';
export default function Refund() {

  const provider = new GoogleAuthProvider();
  // auth.languageCode = 'it';


  const signIn = ()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }
 
  return (
    <div>
    <Header />
    <div className="terms">
      <div className="terms__main">
        <h2>REFUND POLICY</h2>
         
         <p>The payments made by any marrysunni.com members by way of fee to get address and contacts   are treated as non-refundable</p>
   
   {/* <button onClick={signIn}>SIGNIN</button> */}
      </div>
    </div>
    <Footer/>
  </div>
  )
}
