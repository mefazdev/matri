import React, { Profiler, useEffect, useState } from 'react'
import { closeRelgsEdit } from '../../redux/actions'
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
 
 
export default function RelgsEdit({id}) {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.relgsEditControl);
   
    const [community, setCommunity] = useState('')
    const [religiousness, setReligiousness] = useState('')
    const [namaz, setNamaz] = useState('')
    const [relgsEdu, setRelgsEdu] = useState('')
    const [relgsGraduation, setRelgsGraduation] = useState()
 const [hijab, setHijab] = useState('')
const [madhab,setMadhab] = useState('')
const [profiel,setProfile] = useState('')
const [saving,setSaving] = useState(false)

 const fetchProfile = async () => {
  if(open){
    if(id){
      const docRef = doc(db, "member", id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data()
       
     setCommunity(data.community)
     setReligiousness(data.religiousness)
     setNamaz(data.namaz ? data.namaz : '') 
     setRelgsEdu(data.relgsEdu ? data.relgsEdu : '')
     setRelgsGraduation(data.relgsGraduation ? data.relgsGraduation : '')
     setMadhab(data.madhab? data.madhab :'')
     setHijab(data.preferHijab ? data.preferHijab : '')
     
      
    }
  }
      
      
    };

    const editProfile = async ()=>{
      setSaving(true)
      const docRef = doc(db, "member", id);
      const updateRef = await updateDoc(docRef, {
       community:community,
       religiousness:religiousness,
       namaz:namaz,
       relgsEdu:relgsEdu,
       relgsGraduation:relgsGraduation,
       madhab:madhab,
       preferHijab:hijab
      });
      dispatch(closeRelgsEdit())
      setSaving(false)
    }

    useEffect(()=>{
      fetchProfile()
    },[open])
  return (
    <div> <Modal
    id="search__modal"
    open={open}
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="edit__modal">
      <div className="edit__desc__modal">
        <h6>Edit Religious Infromatoin</h6>

        <div className="basic__edit__content">
        <h5 id='prof__warn__text'>Please make sure you have completed your religious details to see other's.</h5>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Community</p>
            <select onChange={(e)=>setCommunity(e.target.value)}>
              
              <option selected={community == 'Ap'?true : false}>AP</option>
              <option selected={community == 'Ek'?true : false}>EK</option>
              <option selected={community == 'Samsthana'?true : false}>Samsthana</option>
              <option selected={community == 'Daskshina'?true : false}>Dakshina</option>
              <option selected={community == 'Other'?true : false}>Other</option>
              {/* <option selected={community == 'No Groupe'?true : false}>No Groupe </option> */}
            </select>
          </div>

          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Religiousness</p>
            <select onChange={(e)=>setReligiousness(true)}>
              <option selected={religiousness == 'Very Religious'?true : false}>Very Religious</option>
              <option selected={religiousness == 'Religious'?true : false}>Religious</option>
              <option selected={religiousness == 'Not Religious'?true : false}>Not Religious</option>
              <option selected={religiousness == 'Prefer not to say'?true : false}>Prefer not to say</option>
            </select>
          </div>

          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Perform namaz</p>
            <select onChange={(e)=>setNamaz(e.target.value)}>
              <option>Please select</option>
              <option selected={namaz == 'Always'?true : false}>Always</option>
              <option selected={namaz == 'Sometimes'?true : false}>Sometimes</option>
              <option selected={namaz == 'Never'?true : false}>Never</option>
              <option selected={namaz == 'Prefer not to say'?true : false}>Prefer not to say</option>
            </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Religious Education</p>
            <select onChange={(e)=>setRelgsEdu(e.target.value)}>
              <option value=''>Please select</option>
              <option  selected={relgsEdu == 'Basic'? true : false}>Basic</option>
              <option selected={relgsEdu == '10'? true : false}>10</option>
              <option selected={relgsEdu == '12'? true : false}>+2</option>
              <option selected={relgsEdu == 'Graduation'? true : false}>Graduation</option>
              <option selected={relgsEdu == 'Scholar'? true : false}>Scholar</option>
            </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Religious Graduation</p>
            <select onChange={(e)=>setRelgsGraduation(e.target.value)}>
              <option value=''>Please select</option>
              <option selected={relgsGraduation == 'Saqafi'? true : false}>Saqafi</option>
              <option selected={relgsGraduation == 'Faizy'? true : false}>Faizy</option>
              <option selected={relgsGraduation == 'Nurani'? true : false}>Nurani</option>
              <option selected={relgsGraduation == 'Hudawi'? true : false}>Hudawi</option>
              <option selected={relgsGraduation == "Sa'di"? true : false}>Sa&apos;adi</option>
              <option selected={relgsGraduation == 'Latheefi'? true : false}>Latheefi</option>
              <option selected={relgsGraduation == 'Baqavi'? true : false}>Baqavi</option>
              <option selected={relgsGraduation == 'Darimi'? true : false}>Darimi</option>
              <option selected={relgsGraduation == 'Wafi'? true : false}>Wafi</option>
              <option selected={relgsGraduation == 'Hadiya'? true : false}>Hadiya</option>
              <option selected={relgsGraduation == 'Wafiyya'? true : false}>Wafiyya</option>
              <option selected={relgsGraduation == 'Other'? true : false}>Other</option>
              <option selected={relgsGraduation == 'No graduation'? true : false}>No graduation</option>
            </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Religious Education</p>
            <select onChange={(e)=>setRelgsEdu(e.target.value)}>
              <option value=''>Please select</option>
              <option  selected={relgsEdu == 'Basic'? true : false}>Basic</option>
              <option selected={relgsEdu == '10'? true : false}>10</option>
              <option selected={relgsEdu == '12'? true : false}>+2</option>
              <option selected={relgsEdu == 'Graduation'? true : false}>Graduation</option>
              <option selected={relgsEdu == 'Scholar'? true : false}>Scholar</option>
            </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Madhab</p>
            <select onChange={(e)=>setMadhab(e.target.value)}>
              <option value=''>Select</option>
              <option selected={madhab == 'Shafi'? true : false}>Shafi</option>
              <option selected={madhab == 'Hanafi'? true : false}>Hanafi</option>
              <option selected={madhab == 'Maliki'? true : false}>Maliki</option>
              <option selected={madhab == 'Hambali'? true : false}>Hambali</option>

                         </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Prefer Hijab?</p>
            <select onChange={(e)=>setHijab(e.target.value)}>
              <option value=''>Select</option>
              <option selected={hijab == 'Yes'? true : false}>Yes</option>
              <option selected={hijab == 'No'? true : false}>No</option>
              <option selected={hijab == 'Prefer not to say'? true : false}>Prefer not to say</option>
                         </select>
          </div>
        </div>
        <div className="edit__desc__modal__btn">
          <button className="edit__save__button"
          onClick={editProfile}
          >
          {saving ? 'Saving' : 'Save'}
          </button>
          <button
            className="edit__cancel__button"
            onClick={()=>dispatch(closeRelgsEdit())}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Modal></div>
  )
}
