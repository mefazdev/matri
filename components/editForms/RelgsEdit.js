import React from 'react'
import { closeRelgsEdit } from '../../redux/actions'
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
 
 
export default function RelgsEdit() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.relgsEditControl);
  
  return (
    <div> <Modal
    id="search__modal"
    open={open}
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="edit__modal">
      <div className="edit__desc__modal">
        <h6>Edit Religious Infromatoin</h6>

        <div className="basic__edit__content">
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Groupe</p>
            <select>
              <option>Select</option>
              <option>Ap</option>
              <option>Ek</option>
              <option>Samsthana</option>
              <option>Dakshina</option>
              <option>Other</option>
              <option>No Groupe </option>
            </select>
          </div>

          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Religiousness</p>
            <select>
              <option>Very Religious</option>
              <option>Religious</option>
              <option>Not Religious</option>
              <option>Prefer not to say</option>
            </select>
          </div>

          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Perform namaz</p>
            <select defaultValue="ffdf">
              <option>Please select</option>
              <option>Always</option>
              <option>Sometimes</option>
              <option>Never</option>
              <option>Prefer not to say</option>
            </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Religious Education</p>
            <select defaultValue="ffdf">
              <option>Please select</option>
              <option>Basic</option>
              <option>10</option>
              <option>+2</option>
              <option>Graduation</option>
              <option>Scholar</option>
            </select>
          </div>
          <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Religious Graduation</p>
            <select defaultValue="ffdf">
              <option>Please select</option>
              <option>Saqafi</option>
              <option>Faizy</option>
              <option>Noorani</option>
              <option>Hudawi</option>
              <option>Saadi</option>
              <option>Latheefi</option>
              <option>Baqavi</option>
              <option>Darimi</option>
              <option>Hadiya</option>
              <option>Wafiyya</option>
              <option>other</option>
              <option>No graduation</option>
            </select>
          </div>
        </div>
        <div className="edit__desc__modal__btn">
          <button className="edit__save__button">Save</button>
          <button
            className="edit__cancel__button"
            onClick={()=>dispatch(closeRelgsEdit())}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Modal></div>
  )
}
