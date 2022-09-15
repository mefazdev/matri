import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeBasicEdit, closeDescEdit } from "../../redux/actions";
import { days, months, years } from "../../asset/data/date";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function BasicEdit({id}) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.basicEditControl);
  const [profile, setProfile] = useState({});

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [maritialStatus, setMaritialStatus] = useState("");
  const [createFor, setCreateFor] = useState("");
  const [marriagePlan, setMarriagePlan] = useState("");
  const [physiStatus, setPhysiStatus] = useState("");
  const [languages, setLanguages] = useState("");
  const [physically, setPhysically] = useState("");

  const fetchProfile = async () => {
    if(open){
      if (id) {
        const docRef = doc(db, "member", id);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        setProfile(data);
        setName(data.brideName);
        setDay(data.bDay);
        setMonth(data.bMonth);
        setYear(data.bYear);
        setGender(data.gender);
        setMaritialStatus(data.maritialStatus);
        setCreateFor(data.createFor);
        setMarriagePlan(
          data.marriagePlan ? data.marriagePlan : ""
        );
        setPhysiStatus(data.physiStatus ? data.physiStatus : "");
        setPhysically(data.physically);
      }
         
    console.log("hello")
    }

  };

  const editProfile = async () => {
    const docRef = doc(db, "member", id);
    const updateRef = await updateDoc(docRef, {
      brideName: name,
      bDay: day,
      bMonth: month,
      bYear: year,
      gender: gender,
      maritialStatus: maritialStatus,
      createFor: createFor,
      marriagePlan: marriagePlan,
      physically: physically,
      physiStatus: physiStatus,
    });
    dispatch(closeBasicEdit());
  };

  useEffect(() => {
    fetchProfile();
  }, [open]);

  // const ClientComponent = dynamic(() => import('react-bootstrap-multiselect'), {
  //   Do not import in server side
  //   ssr: false,
  // })

  return (
    <div>
      <Modal
        id="search__modal"
        open={open}
        // open={true}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="edit__modal">
          <div className="edit__desc__modal">
            <h6>Edit Basic Infromatoin</h6>
            {/* <button onClick={()=>console.log(id)}>CLICK</button> */}
            <div className="basic__edit__content">

              <h5 id='prof__warn__text'>Please make sure you have completed your basic details to see other's.</h5>
              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Name</p>
                <input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Date of birth</p>
                <div className="gap-5 grid grid-cols-3">
                  <select onChange={(e) => setDay(e.target.value)}>
                    {/* <option >Day</option> */}
                    {days.map((data, index) => {
                      return (
                        <option
                          selected={data == day ? true : false}
                          key={index}
                        >
                          {data}
                        </option>
                      );
                    })}
                  </select>
                  <select onChange={(e) => setMonth(e.target.value)}>
                    {/* <option value=''>Month</option> */}
                    {months.map((data, index) => {
                      return (
                        <option
                          selected={data == month ? true : false}
                          key={index}
                        >
                          {data}
                        </option>
                      );
                    })}
                  </select>
                  <select onChange={(e) => setYear(e.target.value)}>
                    {/* <option value=''>Year </option> */}
                    {years.map((data, index) => {
                      return (
                        <option selected={data == year} key={index}>
                          {data}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Gender</p>
                <select onChange={(e) => setGender(e.target.value)}>
                  <option selected={gender == "Male" ? true : false}>
                    Male
                  </option>
                  <option selected={gender == "Female" ? true : false}>
                    Female
                  </option>
                </select>
              </div>
              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Marital Status</p>
                <select onChange={(e) => setMaritialStatus(e.target.value)}>
                  <option
                    selected={maritialStatus == "Never Married" ? true : false}
                  >
                    Never Married 
                  </option>
                  <option
                    selected={maritialStatus == "Divorced" ? true : false}
                  >
                    Divorced
                  </option>
                  <option
                    selected={
                      maritialStatus == "Widowed/Widower" ? true : false
                    }
                  >
                    Widowed/Widower{" "}
                  </option>
                  <option
                    selected={
                      maritialStatus == "Awaiting Divorce" ? true : false
                    }
                  >
                    Awaiting Divorce
                  </option>

                  <option
                    selected={maritialStatus == "Nikah Divorce" ? true : false}
                  >
                    Nikah Divorce
                  </option>
                  <option selected={maritialStatus == "Married" ? true : false}>
                    Married
                  </option>
                </select>
              </div>

              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Profile Created for</p>
                <select onChange={(e) => setCreateFor(e.target.value)}>
                  {/* <option>Please select</option> */}

                  <option selected={createFor == "Myself" ? true : false}>
                    Myself
                  </option>
                  <option selected={createFor == "Daughter" ? true : false}>
                    Daughter
                  </option>
                  <option selected={createFor == "Son" ? true : false}>
                    Son
                  </option>

                  <option selected={createFor == "Sister" ? true : false}>
                    Sister
                  </option>
                  <option selected={createFor == "Brother" ? true : false}>
                    Brother
                  </option>
                  <option selected={createFor == "Friend" ? true : false}>
                    Friend
                  </option>
                  <option selected={createFor == "Relative" ? true : false}>
                    Relative
                  </option>
                </select>
              </div>
              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>When are you hoping to get married?</p>
              
                <select onChange={(e) => setMarriagePlan(e.target.value)}>
                 
                  <option value="">Please select</option>
             
                  <option
                    selected={
                      marriagePlan == "As soon as possible" ? true : false
                    }
                  >
                    As soon as possible
                  </option>
                  <option selected={marriagePlan == "1-2 years" ? true : false}>
                    1-2 years
                  </option>
                  <option selected={marriagePlan == "3-4 years" ? true : false}>
                    3-4 years
                  </option>
                  <option selected={marriagePlan == "4+ years" ? true : false}>
                    4+ years
                  </option>
                  <option selected={marriagePlan == "4+ years" ? true : false}>
                    {marriagePlan}
                  </option>
                </select>
              </div>

              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Physical Challenged?</p>
                <select onChange={(e) => setPhysically(e.target.value)}>
                  <option selected={physically == "Yes" ? true : false}>
                    Yes
                  </option>
                  <option selected={physically == "No" ? true : false}>
                    No
                  </option>
                </select>
              </div>

              <div className="basic__edit__row grid md:grid-cols-3 lg:grid-cols-4">
                <p>Physical Status</p>
                <select onChange={(e) => setPhysiStatus(e.target.value)}>
                  <option value=''>Please Select</option>
                  <option
                    // value="Noraml Person"
                    selected={physiStatus == "Noraml Person" ? true : false}
                  >
                    Noraml Person
                  </option>
                  <option selected={physiStatus == "Deaf/Dumb" ? true : false}>
                    Deaf/Dumb
                  </option>
                  <option selected={physiStatus == "Blind" ? true : false}>
                    Blind
                  </option>
                  <option
                    selected={
                      physiStatus == "Physically challenged" ? true : false
                    }
                  >
                    Physically challenged
                  </option>
                  <option
                    selected={
                      physiStatus == "Mentally challenged" ? true : false
                    }
                  >
                    Mentally challenged
                  </option>
                  <option
                    selected={
                      physiStatus == "With other Disability" ? true : false
                    }
                  >
                    With other Disability
                  </option>
                </select>
              </div>
            </div>
            <div className="edit__desc__modal__btn">
              <button className="edit__save__button" onClick={editProfile}>
                Save
              </button>
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
  );
}
