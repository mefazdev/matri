import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import couples from '../../asset/image/couples.png'
import Image from 'next/image'
import Footer from '../../components/Footer'
import Link from 'next/link'
 import { courses } from '../../asset/data/courses'
 import { professions } from '../../asset/data/profession'
import { cities } from '../../asset/data/cities'
import {districts} from '../../asset/data/districts'
import {
   
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import Router, { useRouter } from "next/router";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

function Education() {

  const [highEdu, setHighEdu] = useState('')
  const [eduCourse, setEduCourse] = useState('')
  const [profession, setProfession] = useState('')
  const [profType, setProfType] = useState('')
  const [city, setCity] = useState('')
 const [district,setDistrict] = useState('')
 const [address,setAddress] = useState('')

  const [user, setUser] = useState({})
  const [member, setMember] = useState([])
  const [saving,setSaving] = useState(false)


const router = useRouter()
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
  
  const submitForm = async (e)=>{
  
    e.preventDefault();
    setSaving(true)
    const id = member[0].id;
    const docRef = doc(db, "member", id);
    const updateRef = await updateDoc(docRef, {
    highEdu : highEdu,
    eduCourse:eduCourse,
    profession:profession,
    profType:profType,
    city:city,
   district:district,
   address:address
    });
    
    router.push('/profilecreation/Description')
    setSaving(false)
  };

  useEffect(() => {
     getUser()
  },)
  
  useEffect(()=>{
    fetchMember()
  },[user])
  return (
    <div >
      <Header/>
      <div className='edu'>
        <div className= 'edu__div grid md:grid-cols-3'>
        <div className='edu__left'>
            <h3>Tell us about your education & location</h3>
            {/* <p>Greate you have completed <span style={{color:'rgb(0, 128, 51)'}}> 90%</span> </p> */}
         <div className='edu__left__img'><Image src={couples} /></div>
                
         </div>

         <div className='edu__right md:col-span-2'>
          <form
          onSubmit={submitForm}
          >
            <div className='edu__row '>
               <p>Highest Education<span style={{color:'red'}}>*</span></p>
             <div className='gap-2 md:gap-5 grid md:grid-cols-2'>
             <select onChange={(e)=>setHighEdu(e.target.value)} required>
                <option value=''>Please Select</option>
                <option>Bachlors</option>
                <option>Masters</option>
                <option>Doctorate</option>
                <option>Dipoloma</option>
                <option>Trade School/TTC/ITI</option>
                <option>Islamic Education</option>
                <option>High/Seceondary school</option>
                <option>Less than high school</option>
              </select>
              <select  onChange={(e)=>setEduCourse(e.target.value)} >
              <option value=''>Please Select</option>
              {courses.map((course,index)=>{
               
                return(
                  <option key={index}>{course}</option>
                )
              })}
              </select>
              
              </div>  
             
            </div>

            <div className='edu__second__row   gap-2 md:gap-10 grid md:grid-cols-2'>
              <div >
                <p>Profession<span style={{color:'red'}}>*</span></p>
              
               <select onChange={(e)=>setProfession(e.target.value)} required>
                <option value=''>Please Select</option>
               {professions.map((prof,index)=>{
                return(
                  <option key={index}>{prof}</option>
                )
               })}
               </select>
              </div>
              <div>
             <p>Profession Type<span style={{color:'red'}}>*</span></p>
             <select onChange={(e)=>setProfType(e.target.value)} required>
              <option value=''>Please Select</option>
              <option>Student</option>
              <option>Part Time</option>
              <option>Full Time</option>
              <option>Government</option>
              <option>Private</option>
              <option>Home Maker</option>
              <option>Business</option>
              <option>Self Employed</option>
              <option>Retired</option>
              <option>Not Employed</option>
              <option>Other</option>
              <option>Prefer Not to Say</option>
            </select>
              </div>
              
               </div>
                <div className='edu__location'>
                  <div className='edu__location__row '>
                   <p>Location</p>
                  <div className='grid md:grid-cols-3 gap-2 md:gap-5'>
                    <select>
                      <option>Kerala</option>
                    </select>
                    <select required
                    onChange={(e)=>setDistrict(e.target.value)}
                    >
                      <option value='' >District</option>
                      {districts.map((dist,index)=>{
                        return(
                          <option key={index}>{dist}</option>
                        )
                      })} 
                    </select>
                    <select onChange={(e)=>setCity(e.target.value)} required>
                      <option value=''>City</option>
                      {cities.map((city,index )=>{
                        return(
                          <option key={index}>{city}</option>
                        )
                      })}
                    </select>
                    </div>
                    
                  </div>
                  <div className='edu__location__row mt-5'>
                   <p>Full Address</p>
                 
                 
                      <textarea
                      required
                      rows={4}
                      onChange={(e)=>setAddress(e.target.value)}
                      id='address__area'/>
                    </div>
                    
 
                  {/* <div className='edu__location__row mt-5'>
                   <p>Present location</p>
                   <div className='grid grid-cols-3 gap-5'>
                    <select>
                      <option>Country</option>
                    </select>
                    <select>
                      <option>State</option>
                    </select>
                    <select>
                      <option>City</option>
                    </select>
</div>
                  </div> */}
                </div>

               

               
               <div className='pr__crtn__third__row'>
                <Link href='/profilecreation/Basic'><button id='pr__crtn__btn__one' >Prev</button></Link>
                {/* <Link href='/profilecreation/Description'> */}
                  <button type='submit' id='pr__crtn__btn__two'>{saving ? 'Saving' : 'Next'}</button>
                  {/* </Link> */}
                
               </div>
          </form>
         </div>
        </div>
        
    
   </div>
    </div>
  )
}

export default Education