import React, { useEffect, useState } from "react"; 
import PlaceIcon from "@mui/icons-material/Place";
import imageHolder from "../../asset/image/photo-holder.png";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
 
import { useRouter } from 'next/router'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import {  db } from "../../firebase";
import { useDispatch } from "react-redux";
 
import { openProfielHide } from "../../redux/actions";
 
import logo from '../../asset/image/logo.png'
import Link from "next/link";
export default function ShareView() {
   
  const router = useRouter()
  const id  = router.query.slug 
 
  const [profile,setProfile] = useState({})
  const [age,setAge] = useState('')
 
  const [member,setMember] = useState([])
  


  

  
  const fetchData = async () => {
    if(id){
      
      const q = await doc(db, "member", id);
      onSnapshot(q, (snapshot) => {
        setProfile(snapshot.data());
      });
    }

  };

  
  useEffect(()=>{
    fetchData()
  },[id])
 
 
  
const calculate_age = ()=>{
 
  var today = new Date();
  var age_now = today.getFullYear() - profile?.bYear   ;
  var m = today.getMonth() - profile?.bMonth ;
  if (m < 0 || (m === 0 && today.getDate() < profile?.bday)){
    
    age_now--;
  }
  // console.log(age_now);
setAge(age_now)
}
 

  
 
useEffect(()=>{
  calculate_age()
 
},[profile])
 
 
const check = ()=>{
if(profile?.status == 'Inactive'){
  dispatch(openProfielHide()) 
}


  
}



   return (
    <div className="view">
        <div className='header'>
        <div className="share__logo__div"> <Image src = {logo}/></div>
   </div>
      <div className="view__content flex">
         
    
          {profile?.status == "Active" ? <div className="view__right">
            <div className="view__head flex">
              <div className="flex view__head__left ">
                <h6 >{profile.brideName}</h6>
                <p>({profile.profileId})</p>
              </div>
          
              <div className="view__head__right flex">
                <PlaceIcon id="view__loc__icon" />
                <p>{profile.city}, {profile.district}</p>
              </div>
            </div>
  
            <div className="view__main grid md:grid-cols-3">
              <div className="view__main__img">
               
  
                {profile.photo ? <img src={profile.photo} alt=''/>:   <Image alt="" src={imageHolder} />}
              </div>
              <div className="md:col-span-2 view__main__right">
                <div className="view__main__first__row  flex">
                  <PersonIcon className="view__main__icons" id='view__peron' />
                  <p>{age} yrs, {profile.height} cm, {profile.maritialStatus}</p>
                </div>
                <div className="view__main__first__row flex ">
                  <SettingsAccessibilityIcon
                  id='sett__icon'
                  className="view__main__icons"/>
                  <p>{profile.community}</p>
                </div>
                <div className="view__main__first__row flex ">
                  <AutoAwesomeIcon className="view__main__icons"
                  id='auto__icon'
                  />
                  <p>{profile.maritialStatus}</p>
                </div>
                <div className="view__main__first__row flex ">
                  <SchoolIcon className="view__main__icons"
                  id='school__icon'
                  />
                  <p>{profile.eduCourse}</p>
                </div>
                <div className="view__main__first__row flex ">
                  <PlaceIcon id='place__icon' className="view__main__icons"/>
                  <p>{profile.city}, {profile.district}</p>
                </div>
  
  
                 
              </div>
            </div>
  
            <div className="view__desc">
              <h6> Description</h6>
              <p>{profile.description}</p>
            </div>
  
            <div className="view__desc">
              <h6>Location & Contact</h6>
             <div className="view__loc__row  ">
               
              {/* <h5>Cherukulam, Manjeri</h5>
               
              <h5>Malappuram</h5>
              <h5>Kerala</h5> */}
              <div className= 'blur__address'>
              <h5>{profile.address}</h5>  
              
  
              <p>Phone: {profile.phone}</p>
              <p>Secondary No : {profile.scndNumber}</p>
              <p>Whatsapp : {profile.wtspNumber}</p>
             </div>
             </div>
             <Link href='/'><button className="share__view__button">Please login to view </button></Link>
             
            </div>
  
            <div className="view__desc">
              <h6>Basic Information</h6>
              <div className="view__desc__columns grid grid-cols-2">
              <div>
                  <div className="flex mt-1"><p>Name : </p>
                   <h5 className="ml-2">{profile.brideName}</h5>
                  </div>
                  <div className="flex  "><p>Age : </p>
                   <h5 className="ml-2">{age}</h5>
                  </div>
                  <div className="flex  "><p>Maritial Status : </p>
                   <h5 className="ml-2">{profile.maritialStatus}</h5>
                  </div>
                  <div className="flex mt-1"><p>Marriage Plan : </p>
                   <h5 className="ml-2">{profile.mariPlan?mariPlan : 'Never Provided'}</h5>
                  </div>
                  <div className="flex mt-1"><p>Physical Challenged? : </p>
                   <h5 className="ml-2">{profile.physically}</h5>
                  </div>
  
                  
              </div>
              <div>
              <div className="flex mt-1"><p>Profile ID : </p>
                   <h5 className="ml-2">{profile.profileId}</h5>
                  </div>
                  <div className="flex  "><p>Gender : </p>
                   <h5 className="ml-2">{profile.gender}</h5>
                  </div>
                  <div className="flex  "><p>Profile created by : </p>
                   <h5 className="ml-2">
                     
                   </h5>
                  </div>
                  <div className="flex mt-1"><p>Languages known : </p>
                   <h5 className="ml-2">{profile.language ? language :'Never Provided'}</h5>
                  </div>
                  <div className="flex mt-1"><p>Physical Status : </p>
                   <h5 className="ml-2">{profile.physicalStatus?physicalStatus :'Never Provided'}</h5>
                  </div>
              </div>
              </div>
            </div>
  
            <div className="view__desc">
              <h6> Religious Information</h6>
              <div className="view__desc__columns grid grid-cols-2">
              <div>
                  <div className="flex mt-1"><p>Groupe : </p>
                   <h5 className="ml-2">{profile.community}</h5>
                  </div>
                  <div className="flex  "><p>Perform Namaz : </p>
                   <h5 className="ml-2">{profile.namaz ? profile.namaz :"Never Provided"}</h5>
  
                  </div>
                  <div className="flex  "><p>Madhab : </p>
                   <h5 className="ml-2">{profile.madhab? profile.madhab :'Never provided'}</h5>
                   
                  </div>
                   {profile.relgsGraduation ? <div className="flex  "><p>Religious Graduation : </p>
                   <h5 className="ml-2">{profile.relgsGraduation }</h5>
                  </div> : ''}
                  
                  
              </div>
              <div>
              
                  <div className="flex  "><p>Religious Education : </p>
                   <h5 className="ml-2">{profile.relgsEdu? profile.relgsEdu:'Not Provided'}</h5>
                  </div>
                  <div className="flex mt-1"><p>Religiousness : </p>
                   <h5 className="ml-2">{profile.religiousness}</h5>
                  </div>
                  <div className="flex mt-1"><p>Hijab : </p>
                   <h5 className="ml-2">{profile.preferHijab? profile.preferHijab:'Not Provided'}</h5>
                  </div>
              </div>
              </div>
            </div>
  
            <div className="view__desc">
              <h6> Educational & Professional Information</h6>
              <div className="view__desc__columns grid grid-cols-2">
              <div>
                  <div className="flex mt-1"><p>Education : </p>
                   <h5 className="ml-2">{profile.highEdu}({profile.eduCourse})</h5>
                  </div>
                  <div className="flex  "><p>Edu Details : </p>
                   <h5 className="ml-2">{profile.eduDetails? profile.eduDetails:"Not Provided"}</h5>
  
                  </div>
                  
                   
  
                  
              </div>
              <div>
              
                  <div className="flex  "><p>Profession : </p>
                   <h5 className="ml-2">{profile.profession}</h5>
                  </div>
                  <div className="flex  "><p>Professional type : </p>
                   <h5 className="ml-2">{profile.profType}</h5>
                   
                  </div>
              </div>
              </div>
            </div>
  
            <div className="view__desc">
              <h6>Physical Attributes</h6>
              <div className="view__desc__columns grid grid-cols-2">
              <div>
                  <div className="flex mt-1"><p>Height : </p>
                   <h5 className="ml-2">{profile.height} cm</h5>
                  </div>
                  <div className="flex  "><p>Weight : </p>
                   <h5 className="ml-2">{profile.weight} kgs</h5>
  
                  </div>
                  
                   
                  <div className="flex  "><p>Complexion : </p>
                   <h5 className="ml-2">{profile.skinTone}</h5>
                  </div>
                  
              </div>
              <div>
              
                  
                  <div className="flex  "><p>Body type : </p>
                   <h5 className="ml-2">{profile.bodyType}</h5>
                   
                  </div>
                  <div className="flex  "><p>Hair Color : </p>
                   <h5 className="ml-2">{profile.hailColor?hailColor:"Not Provided"}</h5>
                   
                  </div>
              </div>
              </div>
            </div>
  
            <div className="view__desc">
              <h6>Family Details</h6>
              <div className="view__desc__columns grid grid-cols-2">
              <div>
                  <div className="flex mt-1"><p>Family Type : </p>
                   <h5 className="ml-2">{profile.famType? profile.famType:"Not Provided"}</h5>
                  </div>
                  <div className="flex  "><p>Financial Status : </p>
                   <h5 className="ml-2">{profile.financialStatus}</h5>
  
                  </div>
                  
                   
                  
                  {/* <div className="flex  "><p>Living Situation : </p>
                   <h5 className="ml-2">{profile.liveWith?liveWith:'Not Provided'}</h5>
                   
                  </div> */}
                  {profile.youngerBro? <div className="flex  "><p>No of younger brother : </p>
                   <h5 className="ml-2">{profile.youngerBro}</h5>
                   
                  </div> : ''}
                  {profile.youngerSis ? <div className="flex  "><p>No of younger sister : </p>
                   <h5 className="ml-2">{profile.youngerSis}</h5>
                   
                  </div> : ''}
                  
              </div>
              <div>
              <div className="flex  "><p>Father : </p>
                   <h5 className="ml-2">{profile.father? profile.father:'Not Provided'}({profile.fatherProf?fatherProf:''})</h5>
                  </div>
                  
                  <div className="flex  "><p>Mother : </p>
                   <h5 className="ml-2">{profile.mother?fmother:'Not Provided'}({profile.motherProf?motherProf:''})</h5>
                   
                  </div>
                  
  
                  <div className="flex  "><p>Family Value : </p>
                   <h5 className="ml-2">{profile.famValue?profile.famValue:'Not Provided'}</h5>
                   
                  </div>
                  {profile.elderBro?<div className="flex  "><p>No of elder brother : </p>
                   <h5 className="ml-2">{profile.elderBro?profile.elderBro:''}</h5>
                   
                  </div>:''}
                  {profile.elderSis?  <div className="flex  "><p>No of elder sister : </p>
                   <h5 className="ml-2">{profile.elderBro ? profile.elderBro :''}</h5>
                   
                  </div> : ''}
                 
                  
              </div>
              </div>
              
  
            </div>
  
            <div className="view__desc">
              <h6>Iam looking for</h6>
              <h5>{profile.lookingFor ? lookingFor :'Not Provided'}</h5>
        </div>
  
        
          </div> :
        check()
         }    
        
     
        
      </div>
    </div>
  );
}




