import React, { useEffect, useRef, useState } from 'react'
import AccoundSidebar from './AccountSidebar'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Display from './Display';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase';
import { useSelector, useDispatch } from "react-redux";
import { closeSearch, openSearch } from '../redux/actions';

export default function AccDesktopHome() {

  const dispatch = useDispatch();
    const open = useSelector((state) => state.searchControl);
 
  // const [openSearch, setOpenSearch] = useState(false)
  const [deatailSearch,setDetailSearch] = useState(true)
  const [idSearch,setIdSearch] = useState(false)
  const [members,setMembers] = useState([])
  
  const enableDeatailSearch = ()=>{
 setDetailSearch(true)
 setIdSearch(false)
  }
  const enableIdSearch = ()=>{
 setDetailSearch(false)
 setIdSearch(true)
  }
 
  const fetchData = async () => {
    const q = await query(
      collection(db, "member"),
      // orderBy("name")
       orderBy('timesTamp', "desc")
    );
    const data = await getDocs(q);
    setMembers(data.docs.map((doc) => doc));
  };
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className='acc__desk'>
        <div className='acc__desk__content flex'>
        <AccoundSidebar/>

<div className='acc__desk__right '>
<div className='acc__desk__right__header flex'>
    <button id='acc__left__btn'
  
  onClick={()=>dispatch(openSearch())}
    >Modify Preference <KeyboardDoubleArrowRightIcon/></button>
    {/* <button onClick={notify}>Notify!</button>
        <ToastContainer /> */}
       
        
  {/* <button   onClick={()=>setShow(!show)}>TeST</button> */}
<div className='acc__desk__right__header__right flex'>
    <button  >Prev</button>
    <div className='acc__desk__right__header__right__div'>2</div>
    <button  >Next</button>
</div>
</div>
 
<div className='acc__desk__right__row grid lg:grid-cols-2 gap-2    '>
     {members.map((data,index)=>{
      // calculate_age = (dob1) => {
        var today = new Date();
        // var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - data.data().bYear ;
        var m = today.getMonth() - data.data().bMonth ;
        if (m < 0 || (m === 0 && today.getDate() < data.data().bday)) 
        {
            age_now--;
        }
        // console.log(age_now);
       
      // }
      return(
        <Display
        key={index}
        name={data.data().brideName}
        height={data.data().height}
        weight={data.data().weight}
        city={data.data().city}
        community={data.data().community}
        highEdu = {data.data().highEdu}
        occupation={data.data().profession}
        gender={data.data().gender}
        photo={data.data().photo}
       wtspNumber={data.data().wtspNumber}
       phone={data.data().phone}
       age={age_now}
       id={data.id}
        />
      )
     })}
   
</div>
</div>
        </div>
        
        <Modal
        id='search__modal'
        open={open }
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='search'>
<div className='search__head flex'>
  <div className='flex'><div className='search__btn' id= {deatailSearch? 'search__btn__active':''}
  onClick={ enableDeatailSearch}
  >Search Profile</div>
  <div className='search__btn'
  id= {idSearch? 'search__btn__active':''}
  onClick={enableIdSearch}
  >ID Search</div></div>
  

<HighlightOffIcon id='search__head__close'
onClick={()=>dispatch(closeSearch())}
/>
  {/* <div className='search__btn'>Saved Search</div> */}
</div>

<div className='search__content'>

  {deatailSearch ? <div>
  <div className='search__row flex'>
    <p>Age</p>
    <div className='flex search__row__right'>
         <input type='number' placeholder='18' />
         to
         <input type='number' placeholder='18' />
    </div>
  </div>

  <div className='search__row flex'>
    <p>Height (cm)</p>
    <div className='flex search__row__right'>
         <input type='number'   />
         to
         <input type='number'   />
    </div>
  </div>

  <div className='search__row flex'>
    <p>Maritial Status</p>
    <div className='  search__row__maritial grid lg:grid-cols-6'>
         <div  className='flex search__row__maritial__item'>Any  <input type='checkbox'/></div>
         <div  className='flex search__row__maritial__item'>Never Married <input type='checkbox'/></div>
         <div  className='flex search__row__maritial__item'>Widowed  <input type='checkbox'/></div>
         <div  className='flex search__row__maritial__item'>Divorced  <input type='checkbox'/></div>
         <div  className='flex search__row__maritial__item'>Nikah Divorce  <input type='checkbox'/></div>
         <div  className='flex search__row__maritial__item'>Awaiting Divorce  <input type='checkbox'/></div>
    </div>
  </div>

  <div className='search__row flex'>
    <p>Organization/Madhab</p>
    <div className=' search__madhab'>
         <select>
          <option>select</option>
          <option>AP</option>
          <option>EK</option>
          <option>Samsthana</option>
          <option>Dakshina</option>
          <option>Shafi</option>
          <option>Hanafi</option>

          <option>Maliki</option>
          <option>Hambali</option>
          <option>Other</option>

         </select>
         
    </div>
  </div>

  <div className='search__row flex'>
    <p>Education</p>
    <div className=' search__madhab'>
         <select>
          <option>select</option>
          <option>Any</option>
          <option>Graduation and above</option>
          <option>Pg and above</option>
          <option>Doctorate and above</option>
          <option>Engineering/Technology</option>
          <option>Masters in  Engineering</option>
          <option>Medicine-Allopathic</option>
          <option>Masters in Medicine-Allopathic</option>
          <option>Medicine-Dental,Homeo,Ayurveda</option>
          <option> Masters in  Medicine-Dental,Homeo,Ayurveda</option>
          <option>Arts/Science/Commerce</option>
          <option>Paramedical / Nursing</option>
          <option>Diploma / Associate Degree</option>
          <option>Management/Administration</option>
          <option>Finance/CA</option>
          <option>Bachlors / Masters/ Law</option>
          <option>Religious Education</option>
          <option>Higher Secondary School</option>
         
         


         </select>
         
    </div>
  </div>
   <div className='search__row flex'>
    <p>Religious Education</p>
    <div className=' search__madhab'>
         <select>
          <option>select</option>
          <option>Any</option>
          <option>Secondary</option>
          <option>Higher Secondary</option>
          <option>Graduation</option>
          <option>Saqafi</option>
          <option>Faizy</option>
          <option>Nurani</option>
          <option>Hudawi</option>
          <option>Wafi</option>
          <option>Saadi</option>
          <option>Musliyar</option>
         


         </select>
         
    </div>
  </div>
<div className='search__btn__div'><button>Search</button></div>
  
  </div> : 
  <div className='id__search'>
  <div className='grid lg:grid-cols-5'>
  <p>Id Search</p>
  
  <div className='flex'>
    <input placeholder='Enter the key' />
    <button>Search</button>
  </div>
  </div>
    </div>
  }
      



  
</div>
        </div>
      </Modal>
    </div>
  )
}
