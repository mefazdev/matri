import Image from "next/image";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import otpImg from "../../asset/image/otp.jpg";
import Link from "next/link";
import OtpInput from 'react-otp-input';
 
import EditIcon from '@mui/icons-material/Edit';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged, multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator,
  RecaptchaVerifier,
  sendEmailVerification
} from "firebase/auth";
import { auth, db } from "../../firebase";
import Router, { useRouter } from "next/router";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
// import {
//   multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator,
//   RecaptchaVerifier
// } from "firebase/auth";
export default function VerifyNumber () { 
    const [otp,setOtp] = useState('')
    const [doneOtp,setDoneOtp] = useState(false)
    const [user, setUser] = useState({})
    const [member, setMember] = useState([])
    const [otpDoc, setOtpDoc] = useState({})

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
    await setMember(data.docs.map((doc) => doc));
    
      }

    };




    
    const addOtp = async () => {
      
      if(member.length){
        const id = member[0].id;
        const docRef = doc(db, "member", id);
        const updateRef = await updateDoc(docRef, {
          otp:123456
       
        });
        fetchOtp()
      }
     
    
      // router.push('/profilecreation/Education')
    };
    const fetchOtp = async () => {
      const id = member[0].id;
      const docRef = doc(db, "member", id);
      const docSnap = await getDoc(docRef);
  
      setOtpDoc(docSnap.data());
    };
  
  const matchOtp = async()=>{
   if(otp == otpDoc.otp){
    const id = member[0].id;
        const docRef = doc(db, "member", id);
        const updateRef = await updateDoc(docRef, {
          phoneStatus:'verified'
       
        });
    setDoneOtp(true)
   }
  }

    useEffect(()=>{
      getUser()
    },[])
    useEffect(() => {
      fetchMember();
    }, [user]);
  
    useEffect(()=>{
      addOtp()
    },[member])

    
    
    const number  = member[0]?.data().phone
   
   
   
    

     

    const phoneNumber='+918594025204';
  
    
    // const auth = getAuth();

    const captcha = ()=>{
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          
        },
         
      },auth);
    }



    const r = ()=>{
    

     captcha()
     const appVerifier = window.recaptchaVerifier;

     signInWithPhoneNumber(auth,phoneNumber,appVerifier).
     then(confiromationResult =>{
      window.confiromationResult = confiromationResult;
console.log('yess>>',confiromationResult)
     }).catch((error)=>{
      alert(error)
     })
    }
  

    // const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container-id', undefined, auth);

    

     

  return ( 
    <div> 
      <Header />    
      <div className="otp">
        <div className="otp__div grid md:grid-cols-3 gap-10" id='recaptcha-container-id'>
          <div className="photo__upload__left">
            <div className="otp__left__img">
              <Image src={otpImg} />
              {/* <button onClick={verifyEmail}>Verify email</button> */}
            </div>
            {/* <button onClick={signin}>Check</button> */}
          </div>
{/* <button onClick={()=>console.log(otpDoc.otp)}>Check</button>   */}
          <div className="otp__right md:col-span-2">
             {/* <button onClick={test}>Test</button> */}
            <h4>Verify your phone number</h4>

            {!doneOtp ? <div className="otp__box">
              <div className="otp__box__row  ">
           <h6>PLease enter the verifiction code sent to  </h6>
           <p> {member[0]?.data().phone}   <EditIcon id='opt__phone__edit'/></p>
    
           
           <div className="otp__row">
           <OtpInput
        value={ otp}
        onChange={setOtp}
        numInputs={6}
        // separator={<span>-</span>}
        inputStyle='otp__inpt__style'
        isInputNum={true}
        shouldAutoFocus={true}
        hasErrored={true}
      />


      </div>
      <div className="otp__div__btn" id='sign'>
        <button className="otp__div__btn__left">Resend</button>
        <button className="otp__div__btn__right"
        onClick={matchOtp}
        >Submit</button>
        <button id='recaptcha-container' onClick={r}>OK</button>
        {/* <button onClick={t}>Ot</button> */}
      </div>
              </div>
             
      
            </div> : <div className="otpDone">
               <div className="otpDone__row">
                <h6><span style={{color:'rgb(0, 128, 64)',fontWeight:'bold'}}>Congartulations!</span> You have successfully verified your contact number</h6>
              <div className="otpDone__row__btn">
                <Link href='/account/Home'><button>Continue</button></Link>
                
              </div>
               </div>
            </div>}
            

            
          </div>
        </div>
      </div>
    </div>
  );
}
