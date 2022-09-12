import React, { useEffect, useState } from "react";
import AccoundSidebar from "../../../components/AccountSidebar";
import AccountNav from "../../../components/AccountNav";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import photo_holder from '../../../asset/image/photo-holder.png'
import Interest from "../../../components/explore/Interest";
import ShortList from "../../../components/explore/ShortList";
import Contact from "../../../components/explore/Contact";
import ProfVisit from "../../../components/explore/ProfVisit";
import { useRouter } from "next/router";
export default function Explore() {
  const router = useRouter();
  const id = router.query.slug;
  const [interest,setInterest] = useState(true)
  const [visit, setVisit] = useState(false)
  const [contact, setContact] = useState(false)
  const [shortList, setShortList] = useState(false)
  // const [blocked, setBlocked] = useState(false)
  // const [skipped, setSkipped] = useState(false)


  const interestControl = ()=>{
    setInterest(true)
    setVisit(false)
    setContact(false)
    setShortList(false)
   
  }
  const visitControl = ()=>{
    setInterest(false)
    setVisit(true)
    setContact(false)
    setShortList(false)
    // setBlocked(false)
    // setSkipped(false)
  }

  const contactControl = ()=>{
    setInterest(false)
    setVisit(false)
    setContact(true)
    setShortList(false)
    // setBlocked(false)
    // setSkipped(false)
  }
  const shortListControl = ()=>{
    setInterest(false)
    setVisit(false)
    setContact(false)
    setShortList(true)
    // setBlocked(false)
    // setSkipped(false)
  }



  return (
    <div className="explore">
      <AccountNav />
      <div className="explore__content flex gap-5">
        {" "}
        <div className="explore__sidebar"><AccoundSidebar /></div>
        
        <div className="explore__right">
          <div className="explore__head ">
            <div onClick={interestControl} className={interest? "explore__head__div__active" :"explore__head__div"}>
              {/* <FavoriteIcon id='explore__head__icons'/> */}
              <p>INTERESTS</p>
            </div>
            <div  onClick={visitControl} className={visit? "explore__head__div__active" :"explore__head__div"}>
              {/* <PersonIcon id='explore__head__icons'/>  */}
              <p>PROFILE VISITS</p>
            </div>
            <div onClick={contactControl} className={contact? "explore__head__div__active" :"explore__head__div"}>
              <p>CONTACTS</p>
            </div>
            <div onClick={shortListControl} className={shortList? "explore__head__div__active" :"explore__head__div"}>
              <p>SHORTLIST</p>
            </div>

          </div>

         
        {interest ?   <Interest id={id} /> : ''}

        {shortList ? <ShortList id={id}/>  :''}
        {contact ? <Contact id={id}/> : ''}
        {visit ? <ProfVisit id={id}/> : ''}

        </div>
      </div>
    </div>
  );
}



  // const blockedControl = ()=>{
  //   setInterest(false)
  //   setVisit(false)
  //   setContact(false)
  //   setShortList(false)
  //   setBlocked(true)
  //   setSkipped(false)
  // }
  // const skippedControl = ()=>{
  //   setInterest(false)
  //   setVisit(false)
  //   setContact(false)
  //   setShortList(false)
  //   setBlocked(false)
  //   setSkipped(true)
  // }

  // <div
  // onClick={blockedControl}
  // className={blocked? "explore__head__div__active" :"explore__head__div"}>
  //   <p>BLOCKED</p>
  // </div>
  // <div 
  // onClick={skippedControl}
  // className={skipped? "explore__head__div__active" :"explore__head__div"}>
  //   <p>SKIPPED</p>
  // </div>