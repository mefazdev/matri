import React from 'react'
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeBasicEdit, closeDescEdit } from '../../redux/actions';

export default function BasicEdit() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.basicEditControl);
 
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
            <h6>Edit Basic Infromatoin</h6>

            <div className="basic__edit__content">
              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Name</p>
                <input />
              </div>
              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Date of birth</p>
                <input type={"date"} />
              </div>
              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Gender</p>
                <select>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Marital Status</p>

                <div className="grid lg:col-span-3 md:col-span-2 md:grid-cols-3 lg:grid-cols-5">
                  <div className="flex" style={{ alignItems: "center" }}>
                    <h6>Never Married </h6>
                    <input className="ml-1" type={"radio"} />
                  </div>
                  <div className="flex" style={{ alignItems: "center" }}>
                    <h6>Widowed/Wodower </h6>
                    <input className="ml-1" type={"radio"} />
                  </div>
                  <div className="flex" style={{ alignItems: "center" }}>
                    <h6>Never Married </h6>
                    <input className="ml-1" type={"radio"} />
                  </div>
                  <div className="flex" style={{ alignItems: "center" }}>
                    <h6>Never Married </h6>
                    <input className="ml-1" type={"radio"} />
                  </div>
                  <div className="flex" style={{ alignItems: "center" }}>
                    <h6>Never Married </h6>
                    <input className="ml-1" type={"radio"} />
                  </div>
                </div>
              </div>

              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Profile Created for</p>
                <select defaultValue="ffdf">
                  <option>Please select</option>
                  <option>Myself</option>
                  <option>Daughter</option>
                  <option>Son</option>
                  <option>Friend</option>
                  <option>Sister</option>
                  <option>Brother</option>
                  <option>Relative</option>
                </select>
              </div>
              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>When are you hoping to get married?</p>
                <select defaultValue="ffdf">
                  <option>Please select</option>
                  <option>As soon as possible</option>
                  <option>1-2 years</option>
                  <option>3-4 years</option>
                  <option>4+ years</option>
                </select>
              </div>
              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Physical Status</p>
                <select defaultValue="ffdf">
                  <option>Noraml Person</option>
                  <option>Dead/Dumb</option>
                  <option>Blind</option>
                  <option>Physically challenged</option>
                  <option>Mentally challenged</option>
                  <option>With other Disability</option>
                </select>
              </div>
            </div>
            <div className="edit__desc__modal__btn">
              <button className="edit__save__button">Save</button>
              <button
                className="edit__cancel__button"
                onClick={() => dispatch(closeBasicEdit())}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
