import React from 'react'
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import {   closeLookingEdit } from '../../redux/actions';

export default function LookEdit() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.locEditControl);
  return (
    <div><  Modal
    id="search__modal"
    open={open }
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="edit__modal">
      <div className="edit__desc__modal">
        <h6>Edit Iam looking for</h6>
        <textarea
          rows={3}
          // value={'Its good person'}
        />
        <div className="edit__desc__modal__btn">
          <button className="edit__save__button">Save</button>
          <button
            className="edit__cancel__button"
            onClick={() => dispatch(closeLookingEdit())}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Modal></div>
  )
}
