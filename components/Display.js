import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import photoHolder from "../asset/image/photo-holder.png";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Overlay from "react-bootstrap/Overlay";
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  
  onAuthStateChanged,
} from "firebase/auth";
import Link from "next/link";
export default function Display({
  name,
  height,
  weight,
  gender,
  city,
  community,
  highEdu,
  occupation,
  photo,
  wtspNumber,
  phone,
  age,
  id
})

{

   
const [show, setShow] = useState(false);
const target = useRef(null);
const [user,setUser] = useState({})
const [addedToShort,setAddedToShort] = useState(false)
// const [starIcon,setStarIcon] = useState(false)
const [docRefId, setDocRedId] = useState('')
const notifyAdded = () => toast("This profile is shortlisted!");
const notifyRemoved = () => toast("This profile is removed from shortlist!");
const getUser = ()=>{
  onAuthStateChanged(auth, (currentUser) => {
     setUser(currentUser);
   
   });
   }

   const controlShortList = ()=>{
    if(addedToShort){
    removeFromShort()
    }
   else {
    addToShortList()
     }
   }
   

   const addToShortList = async() =>{
    setAddedToShort(true)
      notifyAdded()
    const docRef  = await addDoc(collection(db, "shortList"), {
        userId:user.uid,
        profileId : id,
        timestamp: serverTimestamp(),
      
      });
    
      
      setDocRedId(docRef.id)
    }

    const removeFromShort =async ()=>{
      notifyRemoved()
      setAddedToShort(false)
        await deleteDoc(doc(db, "shortList", docRefId));
      
     
     
    }
useEffect(()=>{
  getUser()
},[])
  return (


    <div className="dpy">
      {/* <button onClick={notify}>Notify!</button> */}
        <ToastContainer />
      <div className="flex">
        <div className="dpy__img">
          {photo ? (
            <img src={photo} alt="" />
          ) : (
            <Image src={photoHolder} alt="" />
          )}
        </div>
        <div className="dpy__right">
          <Link href={`/viewProfile/${encodeURIComponent(id)}`}><h6>{name} </h6></Link>
          
          <p>
            {age} Yrs, {height} cm, {gender}
          </p>
          <p>{city}, Kerala, India</p>
          <p>{community}</p>
          <p>
            <span style={{ color: "gray" }}>Education : </span> {highEdu}
          </p>
          <p>
            <span style={{ color: "gray" }}>Occupation : </span> {occupation}
          </p>
        </div>
      </div>
      <div className="dpy__footer flex">
        <div className="dpy__foot__left flex">
          <StarIcon  
          id={addedToShort ? 'star__active': 'dpy__icon'}
           onClick={controlShortList}
          />
          <ShareIcon onClick={()=>setShow(!show)} ref={target} id="dpy__icon" />
          <Overlay target={target.current} show={show} placement="right">
            <div className="share__overlay">
              Share on Whatsapp
            </div>
          </Overlay>
          <a href={`tel:${phone}`}>
            <CallIcon id="dpy__icon" />{" "}
          </a>

          <a
            href={`whatsapp://send?phone=${wtspNumber}`}
            data-action="share/whatsapp/share"
          >
            <WhatsAppIcon id="dpy__icon" />
          </a>
        </div>
        <div className="dpy__foot__right flex">
          <p>Like this profile? </p>
          <div className="dpy__close__div">
            <CloseIcon id="dpy__close__icon" />
          </div>
          <div className="dpy__fav__div">
            {" "}
            <FavoriteIcon id="dpy__fav__icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
