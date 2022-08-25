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
  const [lookinFor, setlookinFor] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    if (open) {
      if (id) {
        const docRef = doc(db, "member", id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setlookinFor(data.lookinFor );
       
      }
    }
  };

  const editProfile = async () => {
    setSaving(true);
    const docRef = doc(db, "member", id);
    const updateRef = await updateDoc(docRef, {
      lookinFor: lookinFor,
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
            <textarea
              rows={3}
              onChange={(e) => setlookinFor(e.target.value)}
              value={lookinFor}
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
