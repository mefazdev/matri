import React, { useEffect, useState } from 'react'
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeDescEdit } from '../../redux/actions';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import Router, { useRouter } from "next/router";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

export default function DescEdit({id}) {

    const dispatch = useDispatch();
    const open = useSelector((state) => state.descEditControl);
    const [profile, setProfile] = useState({})  
    const [description,setDescription] = useState('')
    
    const fetchProfile = async () => {
      if(id){
        const docRef = doc(db, "member", id);
        const docSnap = await getDoc(docRef);
    
        setProfile(docSnap.data());
        setDescription(docSnap.data().description)
      }
      
    };

    const editProfile = async ()=>{
      const docRef = doc(db, "member", id);
      const updateRef = await updateDoc(docRef, {
       description:description
      });
      dispatch(closeDescEdit())
    }

    useEffect(()=>{
      fetchProfile()
    },[id])
    return (
    <div>
         <Modal
        id="search__modal"
        open={open}


        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="edit__modal">
          <div className="edit__desc__modal">
            <h6>Edit Description</h6>
            <textarea
              rows={3}
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />
            <div className="edit__desc__modal__btn">
              <button className="edit__save__button"
              onClick={editProfile}
              >Save</button>
              <button
                className="edit__cancel__button"
                onClick={() => dispatch(closeDescEdit())}

              >
                Cancel
              </button>

              {/* <button onClick={()=>console.log(id)}>TEST</button> */}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
