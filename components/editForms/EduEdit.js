import React from 'react'
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeDescEdit, closeEduEdit } from '../../redux/actions';
import courses from '../../asset/data/courses'
import profession from '../../asset/data/profession'
export default function EduEdit() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.eduEditControl);
 
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
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Highest Education</p>
            <div className="flex edu__row">
              <select>
                <option>Select</option>
                <option>Bachlors</option>
                <option>Masters</option>
                <option>Doctorate</option>
                <option>Dipoloma</option>
                <option>Trade School/TTC/ITI</option>
                <option>Islamic Education</option>
                <option>High/Seceondary school</option>
                <option>Less than high school</option>
              </select>
              <select className="ml-4" >
                {courses?.map((course)=>{
                  return(
                    <option>{course}</option>
                  )
                })}
              </select>
            </div>
          </div>

          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Education Details</p>
            <input />
          </div>

          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Profession</p>
         <select >
          {profession?.map((prof)=>{
            return(
              <option>{prof}</option>
            )
          })}
         </select>
          </div>

          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Profesion Type</p>
            <select>
              <option>Please Select</option>
              <option>Student</option>
              <option>Part Time</option>
              <option>Full Time</option>
              <option>Government</option>
              <option>Private</option>
              <option>Home Maker</option>
              <option>Business</option>
              <option>Self Employed</option>
              <option>Retired</option>
              <option>Not Employed</option>
              <option>Other</option>
              <option>Prefer Not to Say</option>
            </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Job Details</p>
            <input />
          </div>
        </div>
        <div className="edit__desc__modal__btn">
          <button className="edit__save__button">Save</button>
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
