import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeLocEdit } from "../../redux/actions";
import { cities } from "../../asset/data/cities";
import { districts } from "../../asset/data/districts";
import PhoneInput from "react-phone-number-input";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function LocEdit({ id }) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.locEditControl);

  const [city, setcity] = useState("");
  const [district, setdistrict] = useState("");
  const [scndryNo, setscndryNo] = useState("");
  const [wtspNo, setwtspNo] = useState("");
  const [callTime, setcallTime] = useState("");
  const [contactperson, setcontactperson] = useState("");
  const [address, setaddress] = useState("");
  const [saving, setSaving] = useState("");

  const fetchProfile = async () => {
    if(open){
      if (id) {
        const docRef = doc(db, "member", id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setcity(data.city);
        setdistrict(data.district);
        setscndryNo(data.scndNumber);
        setwtspNo(data.wtspNumber);
        setcallTime(data.callTime);
        setcontactperson(data.contactPerson);
        setaddress(data.address);
  
   
      }
    }
   
  };

  const editProfile = async () => {
    setSaving(true);
    const docRef = doc(db, "member", id);
    const updateRef = await updateDoc(docRef, {
      city: city,
      district: district,
      scndNumber: scndryNo,
      wtspNumber: wtspNo,
      callTime: callTime,
      contactPerson: contactperson,
      address: address,
    });
    dispatch(closeLocEdit());
    setSaving(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [open]);

  return (
    <div>
      {" "}
      <Modal
        id="search__modal"
        open={open}
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
                <select onChange={(e) => setdistrict(e.target.value)}>
                  {districts?.map((dist, index) => {
                    return (
                      <option
                        selected={district == dist ? true : false}
                        key={index}
                      >
                        {dist}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>City</p>

                <select onChange={(e) => setcity(e.target.value)}>
                  {cities?.map((cty, index) => {
                    return (
                      <option selected={city == cty ? true : false} key={index}>
                        {cty}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* <div className="basic__edit__row__phone grid md:grid-cols-3 lg:grid-cols-4">
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
          </div> */}
              <div className="basic__edit__row__phone grid md:grid-cols-3 lg:grid-cols-4">
                <p>Seceondary Number</p>

                <div className="phone__input ">
                  <PhoneInput
                    name="phone"
                    className="pl-2"
                    placeholder="Phone"
                    required
                    defaultCountry="IN"
                    value={scndryNo}
                    onChange={setscndryNo}
                  />
                </div>
              </div>
              <div className="basic__edit__row__phone grid md:grid-cols-3 lg:grid-cols-4">
                <p>Whatsapp Number</p>

                <div className="phone__input ">
                  <PhoneInput
                    name="phone"
                    className="pl-2"
                    placeholder="Phone"
                    required
                    defaultCountry="IN"
                    value={wtspNo}
                    onChange={setwtspNo}
                  />
                </div>
              </div>
            </div>

            <div className="basic__edit__content">
              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Convenient time to call</p>

                <input
                  value={callTime}
                  onChange={(e) => setcallTime(e.target.value)}
                />
              </div>
              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Contact Person & Relationship</p>

                <input
                  value={contactperson}
                  onChange={(e) => setcontactperson(e.target.value)}
                />
              </div>
              {/* <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
            <p>Email Address</p>
            
            <input />
          </div> */}
              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Full Address</p>

                <textarea
                  rows={4}
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                />
              </div>
            </div>
            <div className="edit__desc__modal__btn">
              <button className="edit__save__button" onClick={editProfile}>
                {saving ? "Saving" : "Save"}
              </button>
              <button
                className="edit__cancel__button"
                onClick={() => dispatch(closeLocEdit())}
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
