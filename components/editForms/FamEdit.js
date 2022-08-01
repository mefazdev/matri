import React from 'react'
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import {   closeFamEdit } from '../../redux/actions';

export default function FamEdit() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.famEditControl);
 
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
             <input type='number'/>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>No. Younger Brothers</p>
             <input type='number'/>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>No. Married Brothers</p>
             <input type='number'/>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>No.Elder Sisters</p>
             <input type='number'/>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>No.Younger Sisters</p>
             <input type='number'/>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>No. Married Sisters</p>
             <input type='number'/>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Family Type</p>
            <select>
              <option>Please Select</option>
              <option>Nuclear Family</option>
              <option>Joint Family</option>
            </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Financial Status</p>
            <select>
              <option>Please select</option>
              <option>Rich</option>
              <option>Upper Middle Class</option>
              <option>Middle Class</option>
              <option>Lower Middle Class</option>
              <option>Poor Family</option>
              <option>Do not want to tell   now</option>
              <option></option>
            </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Home Type</p>
           <select>
            <option>Please Select</option>
            <option>House</option>
            <option>Rent House</option>
            <option>Apartment / Flat</option>
            <option>Rent Apartment / Flat</option>
            <option>Farm</option>
            <option>Town House</option>
            <option>Other</option>
            <option>Prefer not to say</option>
           </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Family Values</p>
           <select>
             <option>Please Select</option>
             <option>Conservative</option>
             <option>Moderate</option>
             <option>Liberal</option>
             <option>Prefer not to sat</option>
            
           </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Father</p>
           <select>
             <option>Alive</option>
            <option>Died</option>
           </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Father's Profession</p>
          <input/>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Mother</p>
           <select>
             <option>Alive</option>
            <option>Died</option>
           </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Mothers's Profession</p>
          <input/>
          </div>
          </div>
          
          
        <div className="edit__desc__modal__btn">
          <button className="edit__save__button">Save</button>
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
