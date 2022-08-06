import React, { useEffect, useState } from 'react'
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import {   closeFamEdit } from '../../redux/actions';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function FamEdit({id}) {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.famEditControl);

    const [elderBro, setelderBro] = useState('')
    const [youngerBro, setyoungerBro] = useState('')
    const [elderSis, setelderSis] = useState('')
    const [youngerSis, setyoungerSis] = useState('')
    const [marriedBro, setmarriedBro] = useState('')
    const [marriedSis, setmarriedSis] = useState('')
    const [famType, setfamType] = useState('')
    const [financialStatus, setfinancialStatus] = useState()
    const [homeType, sethomeType] = useState()
    const [famValue, setfamValue] = useState('')
    const [father, setfather] = useState('')
    const [fathersProf, setfathersProf] = useState('')
    const [mother, setmother] = useState('')
    const [mothersProf, setmothersProf] = useState('')
const [saving, setSaving] = useState(false)
 


    const fetchProfile = async () => {
      if(id){
        const docRef = doc(db, "member", id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data()
        

        setelderBro(data.elderBro ? data.elderBro : '')
        setyoungerBro(data.youngerBro ? data.youngerBro : '')
        setelderSis(data.elderSis ? data.elderSis: '')
        setyoungerBro(data.youngerBro ? data.youngerBro : '')
        setmarriedBro(data.marriedBro ? data.marriedBro : '')
        setelderBro(data.marriedBro ? data.marriedBro : '')
        setfamType(data.famType ? data.famType : '')
        setfamValue(data.famValue ? data.famValue : '')
        sethomeType(data.homeType ? data.homeType : '')
        setfinancialStatus(data.financialStatus)
        setfather(data.father  ? data.father: '')
        setmother(data.mother ? data.mother : '')
        setfathersProf(data.fathersProf ? data.fathersProf : '')
        setmothersProf(data.mothersProf ? data.mothersProf :'')
      
       
        
      }
      
    };

    const editProfile = async ()=>{
      setSaving(true)
      const docRef = doc(db, "member", id);
      const updateRef = await updateDoc(docRef, {

        elderBro:elderBro,
        youngerBro:youngerBro,
        elderSis:elderSis,
        youngerSis:youngerSis,
        marriedBro:marriedBro,
        marriedSis:marriedSis,
        famType:famType,
        financialStatus:financialStatus,
        homeType:homeType,
        famValue:famValue,
        father:father,
        mother:mother,
        fathersProf:fathersProf,
        mothersProf:mothersProf

      
      });
      dispatch(closeFamEdit())
      setSaving(false)
    }

    useEffect(()=>{
      fetchProfile()
    },[id])
  return (
    <div><Modal
    id="search__modal"
    open={open }
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="edit__modal">
      <div className="edit__desc__modal">
        <h6>Edit Family Details</h6>

        <div className="basic__edit__content">
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>No. Elder Brothers</p>
             <input type='number'
             value={elderBro}
             onChange={(e)=>setelderBro(e.target.value)}
             />
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>No. Younger Brothers</p>
             <input type='number'
             value={youngerBro}
             onChange={(e)=>setyoungerBro(e.target.value)}
             />
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>No. Married Brothers</p>
             <input type='number'
             value={marriedBro}
             onChange={(e)=>setmarriedBro(e.target.value)}
             />
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>No.Elder Sisters</p>
             <input type='number'
             value={elderSis}
             onChange={(e)=>setelderSis(e.target.value)}
             />
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>No.Younger Sisters</p>
             <input type='number'
             value={youngerSis}
             onChange={(e)=>setyoungerSis(e.target.value)}
             />
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>No. Married Sisters</p>
             <input type='number'
             value={marriedSis}
             onChange={(e)=>setmarriedSis(e.target.value)}
             />
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Family Type</p>
            <select onChange={(e)=>setfamType(e.target.value)}>
              <option>Please Select</option>
              <option selected={famType == 'Nuclear Family' ?true :''}>Nuclear Family</option>
              <option selected={famType == 'Joint Family' ? true : false}>Joint Family</option>
            </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Financial Status</p>
            
            <select onChange={(e)=>setfinancialStatus(e.target.value)}>
              <option>Please select</option>
              <option  selected={financialStatus == 'Rich' ? true :false} >Rich</option>
              <option selected={financialStatus == 'Upper Middle Class' ? true : false}>Upper Middle Class</option>
              <option selected={financialStatus == 'Middle Class' ? true :false}>Middle Class</option>
              <option selected={financialStatus == 'Lower Middle Class' ? true :false}>Lower Middle Class</option>
              <option selected={financialStatus == 'Poor Family' ? true :false}>Poor Family</option>
              <option selected={financialStatus == 'Do not want to tell   now' ? true :false}>Do not want to tell   now</option>
              
            </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Home Type</p>
           <select onChange={(e)=>sethomeType(e.target.value)}>
            <option>Please Select</option>
            <option selected={homeType == 'House' ? true : false}>House</option>
            <option selected={homeType == 'Rent House' ? true : false}>Rent House</option>
            <option selected={homeType == 'Apartment' ? true : false}>Apartment / Flat</option>
            <option selected={homeType == 'Rent Apartment' ? true : false}>Rent Apartment / Flat</option>
            <option selected={homeType == 'Farm' ? true : false}>Farm</option>
            <option selected={homeType == 'Town House' ? true : false}>Town House</option>
            <option selected={homeType == 'Other' ? true : false}>Other</option>
            <option selected={homeType == 'Prefer not to say' ? true : false}>Prefer not to say</option>
           </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Family Values</p>
           <select onChange={(e)=>setfamValue(e.target.value)}>
             <option  value=''>Please Select</option>
             <option selected={famValue == 'Conservative' ? true : false}>Conservative</option>
             <option selected={famValue == 'Moderate' ? true : false}>Moderate</option>
             <option selected={famValue == 'Liberal' ? true : false}>Liberal</option>
             <option selected={famValue == 'Prefer not to sat' ? true : false}>Prefer not to sat</option>
            
           </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Father</p>
           <select onChange={(e)=>setfather(e.target.value)}>
            <option value=''>Please Select</option>
             <option selected={father == 'Alive' ? true : false}>Alive</option>
            <option  selected={father == 'Died' ? true : false} >Died</option>
           </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Father&apos;s Profession</p>
          <input onChange={(e)=>setfathersProf(e.target.value)} value={fathersProf}/>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Mother</p>
           <select onChange={(e)=>setmother(e.target.value)}>
             <option  selected={mother == 'Alive'? true : false} >Alive</option>
            <option selected={mother == 'Died' ? true : false}>Died</option>
           </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Mothers's Profession</p>
          <input onChange={(e)=>setmothersProf(e.target.value)} value={mothersProf}/>
          </div>
          </div>
          
          
        <div className="edit__desc__modal__btn">
          <button className="edit__save__button" onClick={editProfile}>
            {saving ? 'Saving' : 'Save'}
          </button>
          <button
            className="edit__cancel__button"
            onClick={() =>  dispatch(closeFamEdit())}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Modal> </div>
  )
}
