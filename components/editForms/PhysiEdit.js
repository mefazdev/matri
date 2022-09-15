import React, { useEffect, useState } from 'react'
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import {   closePhysiEdit } from '../../redux/actions';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function PhysiEdit({id}) {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.physiEditControl);
const [saving,setSaving] = useState(false)
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [complexion, setComplexion] = useState('')
    const [bodyType, setBodyType] = useState('')
    const [appearence, setAppearence] = useState('')
    const [hairColor,setHairColor] = useState('')

  
    const fetchProfile = async () => {
      if(open){
        if(id){
          const docRef = doc(db, "member", id);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data()
          setHeight(data.height)
          setWeight(data.weight)
          setComplexion(data.skinTone)
          setBodyType(data.bodyType)
          setAppearence(data.appearence ? data.appearence : '')
  
          
        }
      }
      
      
    };

    const editProfile = async ()=>{
      setSaving(true)
      const docRef = doc(db, "member", id);
      const updateRef = await updateDoc(docRef, {
      height:height,
      weight:weight,
      skinTone:complexion,
      bodyType:bodyType,
      appearence:appearence,
      hairColor:hairColor
      });
      dispatch(closePhysiEdit())
      setSaving(false)
    }

    useEffect(()=>{
      fetchProfile()
    },[open])
  return (
    <div><Modal
    id="search__modal"
    open={open}
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="edit__modal">
      
      <div className="edit__desc__modal">
        
        <h6>Edit Physical Attributes</h6>

        <div className="basic__edit__content">
        <h5 id='prof__warn__text'>Please make sure you have completed your physical details to see other&apos;s.</h5>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Hight & Weight</p>
            <div className="flex edu__row">
              <input placeholder="In cm" type="number" value={height}
              onChange={()=>setheight(e.target.value)}
              />
              <input placeholder="In kg" type="number" className="ml-4"
              value={weight}   onChange={(e)=>setweight(e.target.value)}
              />
            </div>
          </div>

          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Complexion</p>
            <select onChange={(e)=>setComplexion(e.target.value)}>
             
              <option selected={complexion == 'Very Fair' ? true : false}>Very Fair</option>
              <option selected={complexion == 'Fair' ? true : false}>Fair</option>
              <option selected={complexion == 'Wheatish' ? true : false}>Wheatish</option>
              <option selected={complexion == 'Wheatish Brown' ? true : false}>Wheatish Brown</option>
              <option selected={complexion == 'Dark' ? true : false}>Dark</option>
              <option selected={complexion == 'Prefer not to say' ? true : false}>Prefer not to say</option>
            </select>
          </div>
            
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Body Type</p>
            <select onChange={(e)=>setBodyType(e.target.value)}>
               
              <option selected={bodyType == 'Slim' ? true : false}>Slim</option>
              <option selected={bodyType == 'Average' ? true : false}>Average</option>
              <option selected={bodyType == 'Athletic' ? true : false}>Athletic</option>
              <option selected={bodyType == 'Heavy' ? true : false}>Heavy</option>
            </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Appearence</p>
            <select onChange={(e)=>setAppearence(e.target.value)}>
              <option value=''>Please Select</option>
              <option selected={appearence == 'Below Average' ? true : false}>Below Average</option>
              <option selected={appearence == 'Average' ? true : false}>Average</option>
              <option selected={appearence == 'Attractive' ? true : false}>Attractive</option>
              <option selected={appearence == 'Very Attractive' ? true : false}>Very Attractive</option>
              <option selected={appearence == 'Prefer not say' ? true : false}>Prefer not say</option>
            </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Hair Color</p>
            <select onChange={(e)=>setHairColor(e.target.value)}>
              <option value=''>Please Select</option>
                <option selected={hairColor == 'Bald / Shaved' ? true : false}>Bald / Shaved</option>
                <option selected={hairColor == 'Black' ? true : false}>Black</option>
                <option selected={hairColor == 'Blonde' ? true : false}>Blonde</option>
                <option selected={hairColor == 'Brown' ? true : false}>Brown</option>
                <option selected={hairColor == 'Grey / White' ? true : false}>Grey / White</option>
                <option selected={hairColor == 'Light Brown' ? true : false}>Light Brown</option>
                <option selected={hairColor == 'Red' ? true : false}>Red</option>
                <option selected={hairColor == 'Changes Frequently' ? true : false}>Changes Frequently</option>
                <option selected={hairColor == 'Other' ? true : false} >Other</option>
                <option selected={hairColor == 'Prefer not to say' ? true : false}>Prefer not to say</option>
            </select>
          </div>
        </div>
        <div className="edit__desc__modal__btn">
          <button className="edit__save__button" onClick={editProfile}>
            {saving ? "Saving" : 'Save'}
            </button>
          <button
            className="edit__cancel__button"
            onClick={() => dispatch(closePhysiEdit())}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Modal> </div>
  )
}
