import React, { useState } from 'react'
import AccoundSidebar from './AccountSidebar'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Display from './Display';
import Modal from '@mui/material/Modal';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
export default function AccDesktopHome() {
  const [openSearch, setOpenSearch] = useState(false)
  const [deatailSearch,setDetailSearch] = useState(true)
  const [idSearch,setIdSearch] = useState(false)
  
  const enableDeatailSearch = ()=>{
 setDetailSearch(true)
 setIdSearch(false)
  }
  const enableIdSearch = ()=>{
 setDetailSearch(false)
 setIdSearch(true)
  }
  return (
    <div className='acc__desk'>
        <div className='acc__desk__content flex'>
        <AccoundSidebar/>

<div className='acc__desk__right '>
<div className='acc__desk__right__header flex'>
    <button id='acc__left__btn'
    onClick={()=>setOpenSearch(true)}
    >Modify Preference <KeyboardDoubleArrowRightIcon/></button>

<div className='acc__desk__right__header__right flex'>
    <button  >Prev</button>
    <div className='acc__desk__right__header__right__div'>2</div>
    <button  >Next</button>
</div>
</div>

<div className='acc__desk__right__row grid lg:grid-cols-2 gap-2    '>
    <Display/>
    <Display/>
    <Display/>
    <Display/>
    <Display/>
    <Display/>
</div>
</div>
        </div>
        
        <Modal
        id='search__modal'
        open={openSearch}
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
onClick={()=>setOpenSearch(false)}
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
