import React from 'react'
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import {   closePhysiEdit } from '../../redux/actions';

export default function PhysiEdit() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.physiEditControl);
  
  return (
    <div><Modal
    id="search__modal"
    open={open}
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="edit__modal">
      <div className="edit__desc__modal">
        <h6>Edit Physical Attributes</h6>

        <div className="basic__edit__content">
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Hight & Weight</p>
            <div className="flex edu__row">
              <input placeholder="In cm" type="number" />
              <input placeholder="In kg" type="number" className="ml-4" />
            </div>
          </div>

          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Complexion</p>
            <select>
              <option>Please Select</option>
              <option>Very Fair</option>
              <option>Fair</option>
              <option>Wheatish</option>
              <option>Wheatish Brown</option>
              <option>Dark</option>
              <option>Prefer not to say</option>
            </select>
          </div>

          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Body Type</p>
            <select>
              <option>Please Select</option>
              <option>Slim</option>
              <option>Average</option>
              <option>Athletic</option>
              <option>Heavy</option>
            </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Appearence</p>
            <select>
              <option>Please Select</option>
              <option>Below Average</option>
              <option>Average</option>
              <option>Attractive</option>
              <option>Very Attractive</option>
              <option>Prefer not say</option>
            </select>
          </div>
        </div>
        <div className="edit__desc__modal__btn">
          <button className="edit__save__button">Save</button>
          <button
            className="edit__cancel__button"
            onClick={() => dispatch(closePhysiEdit())}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Modal> </div>
  )
}
