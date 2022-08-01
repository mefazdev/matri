import React from 'react'
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import {  closeLocEdit } from '../../redux/actions';
import cities from '../../asset/data/cities'
import districts from '../../asset/data/districts'
import PhoneInput from 'react-phone-number-input'

export default function LocEdit() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.locEditControl);
  return (
    <div>  <Modal
    id="search__modal"
    open={open }
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="edit__modal">
      <div className="edit__desc__modal">
        <h6>Edit Location & Contact</h6>

        <div className="basic__edit__content">
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>District</p>
            <select>
              
               {districts?.map((district)=>{
                return(
                  <option>{district}</option>
                )
               })}
            </select>
          </div>

          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>City</p>
            
            <select>
            {
              cities?.map((city)=>{
                return(
                  <option>{city}</option>
                )
              })

            }
            </select>
          </div>
          <div className="basic__edit__row__phone grid md:grid-cols-3 lg:grid-cols-4">
            <p>Primary Number</p>
            
            <div className='phone__input '>
           <PhoneInput
          name='phone'
          className='pl-2'
          placeholder="Phone"
          
          required
          defaultCountry='IN'
  />
  
            </div>
          </div>
          <div className="basic__edit__row__phone grid md:grid-cols-3 lg:grid-cols-4">
            <p>Seceondary Number</p>
            
            <div className='phone__input '>
           <PhoneInput
          name='phone'
          className='pl-2'
          placeholder="Phone"
          
          required
          defaultCountry='IN'
  />
  
            </div>
          </div>
          <div className="basic__edit__row__phone grid md:grid-cols-3 lg:grid-cols-4">
            <p>Whatsapp Number</p>
            
            <div className='phone__input '>
           <PhoneInput
          name='phone'
          className='pl-2'
          placeholder="Phone"
          
          required
          defaultCountry='IN'
  />
  
            </div>
          </div>
          
        </div>
      
          
         <div className="basic__edit__content">
         <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Convenient time to call</p>
            
            <input />
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Contact Person & Relationship</p>
            
            <input />
          </div><div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Email Address</p>
            
            <input />
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Full Address</p>
            
            <textarea rows={4}/>
          </div>
         </div>
        <div className="edit__desc__modal__btn">
          <button className="edit__save__button">Save</button>
          <button
            className="edit__cancel__button"
            onClick={() =>dispatch(closeLocEdit())}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Modal></div>
  )
}
