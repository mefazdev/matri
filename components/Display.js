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
import girlHolder from '../asset/image/girls-place.png'
import {
  FacebookShareButton,
  InstapaperShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import CancelIcon from '@mui/icons-material/Cancel';

import TelegramIcon from '@mui/icons-material/Telegram';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
export default function Display({
  name,
  height,
  maritialStatus,
  gender,
  city,
  community,
  highEdu,
  occupation,
  photo,
  wtspNumber,
  phone,
  age,
  id,
  userId,
  eduCourse,
  district

}) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [user, setUser] = useState({});
  const [member, setMember] = useState([]);
  const [addedToShort, setAddedToShort] = useState(false);
  // const [starIcon,setStarIcon] = useState(false)
  const [docRefId, setDocRefId] = useState("");
  const notifyAdded = () => toast("This profile is shortlisted!");
  const notifyRemoved = () => toast("This profile is removed from shortlist!");
  
  const notifyInterest = () => toast("Interest sent!");
  const notifyCantInterest = () => toast("You can't sent to your own profile!");
  const [memberAge, setMemberAge] = useState('')
  const [interest,setInterest] = useState([])

  const [send,setSend] = useState(false)
  const [ignored,setIgnored] = useState(false)
  const [accepted,setAccepted] = useState(false)
  const getUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  };

  
  const fetchMember = async () => {
    const userId = (await user) ? user.uid : null;

    if (userId) {
      const q = await query(
        collection(db, "member"),
        where("userId", "==", user?.uid)
      );
      onSnapshot(q, (snapshot) => {
        const data = snapshot;
        setMember(data.docs.map((doc) => doc));
      });
    }
  };
  const controlShortList = () => {
    if (addedToShort) {
      removeFromShort();
    } else {
      addToShortList();
    }
  };

  const addToShortList = async () => {
    setAddedToShort(true);
    notifyAdded();

    await addDoc(collection(db, "shortList"), {
      userId:user.uid,
      shortList:{
        userId:userId,
        brideName:name,
        age:age,
        maritialStatus:maritialStatus,
        height:height,
        highEdu:highEdu,
        eduCourse:eduCourse,
        city:city,
        district:district,
        occupation:occupation,
        photo: photo,
        id:id
      }
      ,       timestamp :serverTimestamp()
    })
  };

  const fetchInterest = async () => {
    
    const q = await query(
      collection(db, "interest"),
      // orderBy("timestamp", "desc")
      
    );
    onSnapshot(q, (snapshot) => {
      setInterest(snapshot.docs.map((doc) => doc));
 
       
    });
 
  };

  const checkInterest = async ()=>{
    {interest.map((data)=>{
      
      if(data.data().from.userId == user.uid){
        if(data.data().to.userId == userId){
          if(data.data().status == 'accepted'){
            setAccepted(true)
          }else if(data.data().status == 'ignored'){
            setIgnored(true)
          }else{
            setSend(true)
          }
     
    //  console.log('kkk')
        }else{
          
        }
      }
    })}
  }
  useEffect(() => {
    getUser();
    fetchInterest()
  }, []);

  useEffect(() => {
    fetchMember();
  }, [user]);

  useEffect(()=>{
    checkInterest()
  },)

  const removeFromShort = async () => {
    // notifyRemoved();
    // setAddedToShort(false);
     
      // await deleteDoc(doc(db, "shortList", id));
  
  

     
  };

  const addToVisited = async ()=>{

   
    await addDoc(collection(db, "visited"), {
      userId:user.uid,
      visitedProfile:{
        userId:userId,
        brideName:name,
        age:age,
        maritialStatus:maritialStatus,
        height:height,
        highEdu:highEdu,
        eduCourse:eduCourse,
        city:city,
        district:district,
        occupation:occupation,
        photo: photo,
        id:id
      }
      ,       timestamp :serverTimestamp()
    })
    
  }

  const sentInterest = async ()=>{
    if(userId != user.uid){
      notifyInterest()
      await addDoc(collection(db, "interest"), {
       to : {
        userId:userId,
       brideName:name,
       age:age,
       maritialStatus:maritialStatus,
       height:height,
       highEdu:highEdu,
       eduCourse:eduCourse,
       city:city,
       district:district,
       occupation:occupation,
       photo: photo,
       id:id
       },
       from: {
        userId: user.uid,
        brideName:member[0].data().brideName,
        age:memberAge,
        maritialStatus:member[0].data().maritialStatus,
        height:member[0].data().height,
        highEdu:member[0].data().highEdu,
        eduCourse:member[0].data().eduCourse ? member[0].data().eduCourse : '',
        city:member[0].data().city,
        district:member[0].data().district,
        occupation:member[0].data().profession ? member[0].data().profession : '',
        photo:member[0].data().photo ? member[0].data().photo:'',
        id:member[0].id
       },
       status:'sent',
      
       timestamp :serverTimestamp()
       
      });
    }else{
      notifyCantInterest()
    }
   
   
  }
   
 const calculate_member_age = () => {
    var today = new Date();
    // var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - member[0]?.data().bYear ;
    var m = today.getMonth() - member[0]?.data().bMonth ;
    if (m < 0 || (m === 0 && today.getDate() < member[0]?.data().bday)) 
    {
        age_now--;
      
    }
     
    setMemberAge(age_now)
  }
  useEffect(()=>{
    calculate_member_age()
  },[member])
   return (
    <div className="dpy">
      {/* <button onClick={()=>console.log(memberAge)}>Notify!</button> */}
      {/* <button onClick={check}>func!</button> */}
      <ToastContainer />
      <div className="flex">
        <div className="dpy__img">
          {photo ? (<img src={photo} alt="" />
          ) : (
            
            gender == 'Male' ?  <Image src={photoHolder} alt="" /> :
            <Image src={girlHolder} alt="" />
          )}
        </div>
        <div className="dpy__right">
          <Link href={`/viewProfile/${encodeURIComponent(id)}`}><a target='_blank'><h6 onClick={addToVisited}>{name}</h6></a></Link>
                      {/* <h6 onClick={addToVisited}>{name}</h6> */}

          <p>
            {age} Yrs, {height} cm, {gender}
          </p>
          <p >{city}, {district}, Kerala </p>
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
            id={addedToShort ? "star__active" : "dpy__icon"}
            onClick={controlShortList}
          />
          <ShareIcon
            onClick={() => setShow(!show)}
            ref={target}
            id="dpy__icon"
            className="ml-5"
          />
          <Overlay target={target.current} show={show} placement="right">
          <div className="dis__share__div">
        
        <div >
        <WhatsappShareButton
          url={`https://www.marrysunni.com/shareView/${id}`}
          // children={}
          ><WhatsAppIcon id='dis__share__wtsp'/></WhatsappShareButton>
          {/* <FacebookShareButton
          children={<FacebookOutlinedIcon
            id='mob__share__fb'
           
          />}
          url={`https://www.marrysunni.com/viewProfile/${id}`}
          /> */}

          <TelegramShareButton
          // children={}
          url={`https://www.marrysunni.com/shareView/${id}`}
          ><TelegramIcon id='dis__share__tg'/></TelegramShareButton>
        </div>
          
        </div>
           
            
          </Overlay>
    
 
        </div>
         
         {send ? <button id='intr__send__btn'> Sent Interest</button> :  accepted ? <button id='intr__acc__btn'>Interest Accepted </button>
         : ignored ? 
         <button id='intr__igno__btn'>Interest Ignored</button>
        
          :
         
         <div className="dpy__foot__right flex">
         <p>Like this profile? </p>
         
         <div className="dpy__fav__div">
           {" "}
           <FavoriteIcon id="dpy__fav__icon"
           onClick={sentInterest}
           />
         </div>
       </div>
         }
       
       
      </div>
    
      
    </div>
  );
}





// key id = rzp_test_TKJroRBJf9pJH6

// key secret = whPyoQ6w6y6EvEUMaIc417GZ




// const mid = member[0].id;
// let vList = member[0].data().visited
//   ? [...member[0].data().visited, id]
//   : [id];
// //  await sList.push(id)
// const docRef = doc(db, "member", mid);
// const updateRef = await updateDoc(docRef, {
//   visited: vList,
// });