import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeLookingEdit } from "../../redux/actions";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function LookEdit({ id }) {
  const dispatch = useDispatch();
  // const open = useSelector((state) => state.locEditControl);
  const open = useSelector((state) => state.lookingEditControl);
  const [lookingFor, setlookingFor] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    if (open) {
      if (id) {
        const docRef = doc(db, "member", id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setlookingFor(data.lookingFor );
       
      }
    }
  };

  const editProfile = async () => {
    setSaving(true);
    const docRef = doc(db, "member", id);
    const updateRef = await updateDoc(docRef, {
      lookingFor: lookingFor,
    });
    dispatch(closeLookingEdit());
    setSaving(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [open]);

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
         
            <h6>Edit Iam looking for</h6>
            <h5 id='prof__warn__text'>Please make sure you have added your priority to see other&apos;s.</h5>
            <textarea
              rows={3}
              onChange={(e) => setlookingFor(e.target.value)}
              value={lookingFor}
              // value={'Its good person'}
            />
            <div className="edit__desc__modal__btn">
              <button className="edit__save__button" onClick={editProfile}>
                {saving ? "Saving" : "Save"}
              </button>
              <button
                className="edit__cancel__button"
                onClick={() => dispatch(closeLookingEdit())}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
