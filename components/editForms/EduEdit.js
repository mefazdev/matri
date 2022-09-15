import React, { useEffect, useState } from 'react'
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeDescEdit, closeEduEdit } from '../../redux/actions';
import {courses} from '../../asset/data/courses'
import {professions} from '../../asset/data/profession'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
export default function EduEdit({id}) {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.eduEditControl);
 
const [saving,setSaving] = useState(false)
    const [highEdu,setHighEdu] = useState('')
    const [eduCourse,setEduCourse] = useState('')
    const [eduDetails,setEduDetails] = useState('')
    const [profession, setProfession] = useState('')
    const [profType, setProfType] = useState('')
    const [jobDetails, setJobDetails] = useState('')
     

    
 const fetchProfile = async () => {
  if(open){
    if(id){
      const docRef = doc(db, "member", id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data()
  
      setHighEdu(data.highEdu)
      setEduCourse(data.eduCourse)
      setEduDetails(data.eduDetails ? data.eduDetails : '')
      setProfession(data.profession)
      setProfType(data.profType)
     setJobDetails(data.jobDetails ? data.jobDetails : '')
     
     
      
    }
  }
  
  
};

const editProfile = async ()=>{
  setSaving(true)
  const docRef = doc(db, "member", id);
  const updateRef = await updateDoc(docRef, {
   highEdu :highEdu,
   eduCourse:eduCourse,
   eduDetails :eduDetails,
   profession:profession,
   profType:profType,
   jobDetails:jobDetails
  });
  dispatch(closeEduEdit())
  setSaving(false)
}

useEffect(()=>{
  fetchProfile()
},[open])
  return (
    <div>      <Modal
    id="search__modal"
    open={open }
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="edit__modal">
      <div className="edit__desc__modal">
        <h6>Edit Educational Infromatoin</h6>

        <div className="basic__edit__content">
        <h5 id='prof__warn__text'>Please make sure you have completed your educational details to see other&apos;s.</h5>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Highest Education</p>
            <div className="flex edu__row">
              <select onChange={(e)=>setHighEdu(e.target.value)}>
                <option value=''>Select</option>
                <option selected={highEdu == 'Bachlors'? true :false}>Bachlors</option>
                <option selected={highEdu == 'Masters'? true :false}>Masters</option>
                <option selected={highEdu == 'Doctorate'? true :false}>Doctorate</option>
                <option selected={highEdu == 'Diploma'? true :false}>Dipoloma</option>
                <option selected={highEdu == 'Trade School/TTC/ITI'? true :false}>Trade School/TTC/ITI</option>
                <option selected={highEdu == 'Islamic Education'? true :false}>Islamic Education</option>
                <option selected={highEdu == 'High/Seceondary school'? true :false}>High/Seceondary school</option>
                <option selected={highEdu == 'Less than high school'? true :false}>Less than high school</option>
              </select>
              <select className="ml-4" onChange={(e)=>setEduCourse(e.target.value)}>
                {courses?.map((course,index)=>{
                  return(
                    <option selected={eduCourse == course ? true :false} key={index}>{course}</option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Education Details</p>
            <input 
            value={eduDetails}
            onChange={(e)=>setEduDetails(e.target.value)}
            />
          </div>

          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Profession</p>
         <select 
         onChange={(e)=>setProfession(e.target.value)}
         >
          {professions.map((prof,index)=>{
            return(
              <option selected={profession == prof ? true :false} key={index}>{prof}</option>
            )
          })}
         </select>
          </div>

          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Profesion Type</p>
            <select onChange={(e)=>setProfType(e.target.value)}>
              <option value=''>Please Select</option>
              <option selected={profType == 'Student' ? true : false}>Student</option>
              <option selected={profType == 'Part Time' ? true : false}>Part Time</option>
              <option selected={profType == 'Full Time' ? true : false}>Full Time</option>
              <option selected={profType == 'Government ' ? true : false}>Government</option>
              <option selected={profType == 'Private' ? true : false}>Private</option>
              <option selected={profType == 'Home Maker' ? true : false}>Home Maker</option>
              <option selected={profType == 'Business' ? true : false}>Business</option>
              <option selected={profType == 'Self Employed' ? true : false}>Self Employed</option>
              <option selected={profType == 'Retired' ? true : false}>Retired</option>
              <option selected={profType == 'Not Employed' ? true : false}>Not Employed</option>
              <option selected={profType == 'Other' ? true : false}>Other</option>
              <option selected={profType == 'Prefer Not to Say' ? true : false}>Prefer Not to Say</option>
            </select>
          </div>
          {/* <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Job Details</p>
            <input value={jobDetails} 
            onChange={(e)=>setJobDetails(e.target.value)}

            />
          </div> */}
        </div>
        <div className="edit__desc__modal__btn">
          <button className="edit__save__button"
          onClick={editProfile}
          >
            {saving ? "Saving" : "Save"}
             </button>
          <button
            className="edit__cancel__button"
            onClick={() => dispatch(closeEduEdit())}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Modal> </div>
  )
}
