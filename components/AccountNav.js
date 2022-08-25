import React, { useEffect, useState } from 'react'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import photoHolder from '../asset/image/photo-holder.png'
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu';
import Login from './Login';
import { deleteUser, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

import Modal from "@mui/material/Modal";
import { closePotoEdit, closeProfielDelete, closeProfielHide, openPotoEdit, openSearch } from '../redux/actions';
import { Placeholder } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getAuth } from "firebase/auth";
import { async } from '@firebase/util';
import Link from 'next/link';
import logo from '../asset/image/logo.png'

export default function AccountNav( ) {
  
const [collapse,setCollapse] = useState(false)
//   const auth = getAuth();
// const users = auth.currentUser;


  const [member,setMember] = useState([])
  const dispatch = useDispatch();
  const [user, setUser] = useState({})
  const [uploading,setUploading] = useState(false)
  const [viewUplaod,setViewUpload] = useState(false)
  const [photo,setPhoto] = useState('') 
  const [modal,setModal] = useState(false)
  const open = useSelector((state) => state.photoEditControl);
  const openHide = useSelector((state) => state.profileHideControl);
  const openDelete = useSelector((state) => state.profileDeleteControl);

  
  const router = useRouter()
  const [deleting,setDeleting] = useState(false)
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
      onSnapshot(q, (snapshot) =>{
        setMember(snapshot.docs.map((doc) => doc));
      })
      // const data = await getDocs(q);
      // setMember(data.docs.map((doc) => doc));
    }
    console.log('heee')
  };
  const handlePhoto = (e)=>{
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  
    reader.onload = (readerEvent) => {
      setPhoto(readerEvent.target.result);
     setViewUpload(true)
    };
  }
  const uploadPhoto = async ()=>{
    setUploading(true)
    const id = member[0].id;
    const photoRef = ref(storage, `upload/${id}/photo`);
    await uploadString(photoRef, photo, "data_url").then(async (snapshot) => {
      const downloadURL1 = await getDownloadURL(photoRef);
    await updateDoc(doc(db, "member", id), {
        photo: downloadURL1,
      });
   });
  setViewUpload(false)
  dispatch(closePotoEdit())
  }


  const hideProfile = async ()=>{
    await updateDoc(doc(db, "member", member[0]?.id), {
      status:'Inactive'
    });

  }

  const unHideProfile = async ()=>{
    await updateDoc(doc(db, "member", member[0]?.id), {
      status:'Active'
    });
    
  }

  const deleteProfile = async ()=>{
    setDeleting(true)
    // deleteUser(user)
    deleteDoc(doc(db, "member", member[0]?.id));
    deleteUser(user).then(async() => {
      // alert('user deleted')
    //  await deleteDoc(doc(db, "member", member[0]?.id));
      router.push('/')
    }).catch((error) => {
      // An error ocurred
      alert(error)
      // ...
    });
   
  
   
  }
  const logOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  const controlSearchCollapse = ()=>{
    setCollapse(false)
    dispatch(openSearch())
    
  }
useEffect(()=>{
  getUser()
},[])
  useEffect(()=>{
    fetchMember()

  },[user])

  useEffect(()=>{
    setPhoto(member[0]?.data().photo)
  },[member])
  return (
    <div className='acc__nav'>
        <div className='acc__nav__cnt flex'>
      

       <div className='acc__nav__left flex'>
        <div className='acc__nav__logo'><Image src={logo} alt=''/></div>
     
       <Link href='/account/Home'><p>HOME</p></Link>
        
        <p onClick={()=>dispatch(openSearch())}>SEARCH</p>
        <Link href={`/account/explore/${encodeURIComponent(  member[0]?.id )}`}>
        <p>EXPLORE</p></Link>
        
        {/* <p>UPGRADE</p> */}
        <p>HELP</p>
       
       </div>

       <div className='acc__nav__right flex'>
        <div className='acc__nav__img'
        onClick={()=>dispatch(openPotoEdit())}
        >
          {member[0]?.data().photo ? <img src={ member[0].data().photo  } alt=''/>:  <Image src={photoHolder} alt='' />}
        
        </div>
        {/* <img src={member[0]?.data().photo} /> */}
        <h6>{member[0]?.data().brideName}

          ({member[0]?.data().profileId})
        </h6>
       
       </div>
      {collapse ?  <CancelPresentationIcon onClick={()=>setCollapse(false)} id='acc__nav__menu__icon' />
        :     <MenuIcon onClick={()=>setCollapse(true)} id='acc__nav__menu__icon' />
      }
       </div>


        
       {collapse ? <div className='acc__nav__collapse'>
          <div className='acc__nav__collapse__row'>
            <Link href='/account/Home'><p>HOME</p></Link>
             
             </div>
             <div className='acc__nav__collapse__row'>

             <p onClick={controlSearchCollapse}>SEARCH</p>
             </div>
             <div className='acc__nav__collapse__row'>
             <Link href={`/account/explore/${encodeURIComponent(member[0]?.id)}`}>
        <p>EXPLORE</p></Link>
             </div>
             <div className='acc__nav__collapse__row'>
             <p>UPGRADE</p>
             </div>
             <div className='acc__nav__collapse__row'>
             <p>HELP</p>
             </div>
             <div className='acc__nav__collapse__row'>

            <p onClick={logOut}>LOGOUT</p>
          </div>
        </div> : ''}



          {/* <<<<<<<<<<<<<<< PROFIEL DELETE MODAL >>>>>>>>>>>>>>> */}
          <Modal
        id="search__modal"
        open={openHide}
 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <div className="hide__profiel__modal">
          <CloseIcon id='edit__phot__close' 
          onClick={()=>dispatch(closeProfielHide())}
          />


          <div className='hide__profiel__head'>
            <h6>Deactivate your profile ?</h6>
          </div>

          <div className='hide__profiel__content'>
            <p>You can temporarily Hide/Deactivate your profile if you don’t want to delete. Once you deactivated, your profile will be hidden from our members and you will not be able to contact any member until you activate</p>
        <div className='hide__status flex'>
          <h5>Current Status : </h5>
          <h6>{member[0]?.data().status == 'Inactive' ? <span style={{color:'red'}}>Inactive</span>:'Active'}</h6>
        </div>

        <p className='mt-5'>
        {member[0]?.data().status == 'Inactive' ? 'Are   you wish to Activate Your   Profile?':'          Are  you wish to Deactivate Your  Profile?'}
</p>
         
         <div className='hide__prof__button'>
          {member[0]?.data().status == 'Inactive' ? <button id='unhide__btn' onClick={unHideProfile}>UNHIDE YOUR PROFILE</button>:
          <button onClick={hideProfile}>HIDE YOUR PROFILE</button>
          }
          
         </div>
          </div>
          <div>
               
       
       

          </div>

      
      
          </div>
          </Modal>



          {/* <<<<<<<<<<<<<<< PROFIEL HIDE MODAL >>>>>>>>>>>>>>> */}
          <Modal
        id="search__modal"
        open={openDelete}
 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <div className="hide__profiel__modal">
          <CloseIcon id='edit__phot__close' 
          onClick={()=>dispatch(closeProfielDelete())}
          />


          <div className='hide__profiel__head'>
            <h6>Delete your profile?</h6>
          </div>

          <div className='hide__profiel__content'>
            <p>
            Note: Deleted profiles cannot be restored and all the details of your interactions with other members will also be lost.</p>
        

        <p className='mt-5'>
       Are   you wish to delete your   profile?
</p>
         
         <div className='hide__prof__button'>
         
          <button   id='delete__prof__btn' onClick={deleteProfile}>
            {deleting ? 'DELETING' : 'DELETE PROFILE' }
            </button>
        
         
         </div>
          </div>
          <div>
               
       
       

          </div>

      
      
          </div>
          </Modal>
          <Modal
id="search__modal"
open={open}
 
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description"
>
 
<div className="photo__edit__modal">
  <CloseIcon id='edit__phot__close' 
  onClick={()=>dispatch(closePotoEdit())}
  />
  <div>
   <img src={photo} />    
  <div className="file-input">
              <input
                type="file"
                id="img3"
                onChange={handlePhoto}
              />
                      {member[0]?.data().photo  ? <label htmlFor="img3">CHANGE PHOTO</label>: <label htmlFor="img3">ADD PHOTO</label>}
{viewUplaod? <button onClick={uploadPhoto}>{uploading ? 'UPLOADING':'UPLOAD'}</button>:''}
            </div>
 

  </div>
 

  </div>
  </Modal>  

    </div>
  )
}
 