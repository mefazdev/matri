import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import couples from '../../asset/image/couples.png'
import Image from 'next/image'
import Footer from '../../components/Footer'
import PhoneInput from 'react-phone-number-input'
import Link from 'next/link' 
import { languages } from '../../asset/data/languages'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import Router, { useRouter } from "next/router";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

export default function Description() {
  
    const [motherTongue, setmotherTongue] = useState('')
  const [community, setCommunity] = useState('')
  const [religiousness, setReligiousness] = useState('')
  const [financialStatus, setFinancialStatus] = useState('')
  const [scndNumber, setScndNumber] = useState('')
  const [wtspNumber, setWtspNumber] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [callTime, setCallTime] = useState('')
  const [description, setDescription] = useState('')
 const  [member,setMember] = useState([])
 const [saving,setSaving] = useState(false)
const [user,setUser] = useState({})
  const router  = useRouter()
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
  const submitForm = async (e) => {
    e.preventDefault();
    setSaving(true)
    const id = member[0].id;
    const docRef = doc(db, "member", id);
    const updateRef = await updateDoc(docRef, {
      motherTongue:motherTongue,
      community:community,
      religiousness:religiousness,
      financialStatus:financialStatus,
      scndNumber:scndNumber,
      wtspNumber:wtspNumber,
      contactPerson:contactPerson,
      callTime:callTime,
      description:description
     
    });

    router.push('/profilecreation/PhotoUpload')
    setSaving(false)
  };

  useEffect(()=>{
    getUser()
  },[])
  useEffect(() => {
    fetchMember();
  }, [user]);

  return (
    <div>
        <Header/>
        <div className='edu'>
        <div className= 'edu__div grid md:grid-cols-3'>
        <div className='edu__left'>
            <h3>Tell us about your Details</h3>
            {/* <p>Greate you have completed <span style={{color:'rgb(0, 128, 51)'}}> 70%</span> </p> */}
         <div className='edu__left__img'><Image src={couples} /></div>
                
         </div>

         <div className='edu__right md:col-span-2'>
          <form
          onSubmit={submitForm}
          >
            <div className='edu__row  gap-2 md:gap-5 grid md:grid-cols-2 '>
                <div>
                <p>Mother Tongue<span style={{color:'red'}}>*</span></p>
                <select required onChange={(e)=>setmotherTongue(e.target.value)}>
                <option value=''>PleaseSelect</option>
                {languages.map((data,index)=>{
                  return(
                    <option key={index}>{data}</option>
                  )
                })} 
              </select>
                </div>
             
             <div >
             <p>Community<span style={{color:'red'}}>*</span></p>
              <select required onChange={(e)=>setCommunity(e.target.value)}>
                <option value=''>Select</option>
                <option>AP</option>
                <option>EK</option>
                <option>Samsthana</option>
                <option>Dakshina</option>
                <option>Other</option>

              </select>
              
              </div>  
             
            </div>
            <div className='edu__row  gap-2 md:gap-5 grid md:grid-cols-2 mt-5'>
                <div>
                <p>Religiousness<span style={{color:'red'}}>*</span></p>
                <select required onChange={(e)=>setReligiousness(e.target.value)}>
                  <option value=''>Please Select</option>
              <option>Very Religious</option>
              <option>Religious</option>
              <option>Not Religious</option>
              <option>Prefer not to say</option>
            </select>
                </div>
             
             <div >
             <p>Financial Status<span style={{color:'red'}}>*</span></p>
             <select required onChange={(e)=>setFinancialStatus(e.target.value)}>
              <option value=''>Please select</option>
              <option>Rich</option>
              <option>Upper Middle Class</option>
              <option>Middle Class</option>
              <option>Lower Middle Class</option>
              <option>Poor Family</option>
              <option>Do not want to tell   now</option>
              <option></option>
            </select>
              
              </div>  
             
            </div>
            <div className='edu__phone__row gap-2 md:gap-5 grid md:grid-cols-2 mt-5'>
            <div>
             <p>Secondary Number<span style={{color:'red'}}>*</span></p>
               <div className='phone__input '>
               <PhoneInput
              name='phone'
              className='pl-2'
              placeholder="Phone"
              value={scndNumber}
              onChange={setScndNumber}
              // required
              defaultCountry='IN'
      />
     
               </div>

             </div>
             
                <div>
             <p>WhatsApp Number </p>
               <div className='phone__input '>
               <PhoneInput
              name='phone'
              className='pl-2'
              placeholder="Phone"
              value={wtspNumber}
              onChange={setWtspNumber}
              // required
              defaultCountry='IN'
      />
     
               </div>

             </div>  

             
             
            </div>

            <div className='edu__row gap-2 md:gap-5 grid md:grid-cols-2 mt-5'>
                <div>
                <p>Contact Person & Relationship<span style={{color:'red'}}>*</span></p>
                <input
                required
                onChange={(e)=>setContactPerson(e.target.value)}
                placeholder='Eg: Ahmed, Father'/>
                </div>
             
             <div >
             <p>Convenient time to call</p>
              <input
              // required
              onChange={(e)=>setCallTime(e.target.value)}
              placeholder='Eg: 10 AM - 05 PM'
              />
              
              </div>  
             
            </div>  
            
            <div className='edu__row    mt-5'>
                <div>
                <p>Description<span style={{color:'red'}}>*</span></p>
                <textarea
                required
                onChange={(e)=>setDescription(e.target.value)}
                placeholder='Describe about the Bride / Groom'
                rows='3'/>
                </div>
             
              
             
            </div> 
                 

               
            
               
               <div className='pr__crtn__third__row'>
                <Link href='/profilecreation/Education'><button id='pr__crtn__btn__one' >Prev</button></Link>
                {/* <Link href='/profilecreation/PhotoUpload'> */}
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
