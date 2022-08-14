import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import photo_holder from '../../asset/image/photo-holder.png'
import Image from 'next/image';
export default function Contact() {
  return (
    <div className='s__list'>
         <div className="interest__content">
              <h5>Saved Contacts</h5>

              

              <div className="interest__row">
                <div className="interest__row__left grid grid-cols-2" >
                    <div className="intrest__row__img"> <Image src={photo_holder} /></div>
                   
<div className="interest__row__left__text">
    <h6>Fathima</h6>
    <p>18 Yrs, 140 cm, Never Married</p>
    <p>Bachlors (B Com), Student</p>
    <p>Kootilangadi, Malappuram</p>
</div>
                </div>
                 
                <div
                  className="interest__row__right"
                >
                    <div className="interest__row__right__div">
                        <button id='intr__acc__btn'>Accept</button>
                        <button id='intr__dec__btn'>Decline</button>
                    </div>
                </div>
                <HighlightOffIcon id='intr__close'/>
              </div>
            </div>  
    </div>
  )
}
