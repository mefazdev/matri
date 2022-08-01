import React, { useState } from "react";
import AccountNav from "../../components/AccountNav";
import AccoundSidebar from "../../components/AccountSidebar";
import imageHolder from "../../asset/image/photo-holder.png";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaceIcon from "@mui/icons-material/Place";
import Modal from "@mui/material/Modal";
import PhoneInput from "react-phone-number-input";
import DescEdit from "../../components/editForms/DescEdit";
import { useSelector, useDispatch } from "react-redux";
import {
  openBasicEdit,
  openDescEdit,
  openEduEdit,
  openFamEdit,
  openLocEdit,
  openLookingEdit,
  openPhysiEdit,
  openRelgsEdit,
} from "../../redux/actions";
import BasicEdit from "../../components/editForms/BasicEdit";
import RelgsEdit from "../../components/editForms/RelgsEdit";
import EduEdit from "../../components/editForms/EduEdit";
import FamEdit from "../../components/editForms/FamEdit";
import LocEdit from "../../components/editForms/LocEdit";
import LookEdit from "../../components/editForms/LookEdit";
import PhysiEdit from "../../components/editForms/PhysiEdit";
export default function EditProfile() {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const [preview, setPreview] = useState(false);

  const onPreview = () => {
    setEdit(false);
    setPreview(true);
  };
  const onEdit = () => {
    setEdit(true);
    setPreview(false);
  };
  return (
    <div className="edit__prof">
      <AccountNav />
      <div className="edit__content flex">
        <AccoundSidebar />

        <div className="edit__right">
          <div className="edit__head grid md:grid-cols-2">
            <div
              onClick={onEdit}
              className={edit ? "edit__head__div__active" : "edit__head__div"}
            >
              <h6>Edit Profile</h6>
            </div>
            <div
              onClick={onPreview}
              className={
                preview ? "edit__head__div__active" : "edit__head__div"
              }
            >
              <h6>View my profile</h6>
            </div>
            <div></div>
          </div>

          {/* <div className='edit__row'>

     </div> */}
          <div className="view__main grid md:grid-cols-3">
            <div className="view__main__img__div">
              <div className="view__main__img">
                <Image alt="" src={imageHolder} />
              </div>
              <button>Change</button>
            </div>

            <div className="md:col-span-2 view__main__right">
              <div className="view__main__first__row  flex">
                <PersonIcon className="view__main__icons" id="view__peron" />
                <p>19 yrs, 148 cm, Never Married</p>
              </div>
              <div className="view__main__first__row flex ">
                <SettingsAccessibilityIcon
                  id="sett__icon"
                  className="view__main__icons"
                />
                <p>App Sunni</p>
              </div>
              <div className="view__main__first__row flex ">
                <AutoAwesomeIcon
                  className="view__main__icons"
                  id="auto__icon"
                />
                <p>Never Married</p>
              </div>
              <div className="view__main__first__row flex ">
                <SchoolIcon className="view__main__icons" id="school__icon" />
                <p>BA English</p>
              </div>
              <div className="view__main__first__row flex ">
                <PlaceIcon id="place__icon" className="view__main__icons" />
                <p>Manjeri, Malappuram</p>
              </div>

              {/* <div className="edit__row__btns">
                <button>Edit</button>
              </div> */}
            </div>
          </div>
          <div className="edit__right__content">
            <div className="edit__row">
              <div className="edit__row__head flex">
                <h6>Description</h6>
                <div
                  className="edit__row__head__right"
                  // onClick={() => setOpenEditDesc(true)}
                  onClick={() => dispatch(openDescEdit())}
                >
                  Edit
                </div>
              </div>
              <p>Its very good person</p>
            </div>
            <div className="edit__row">
              <div className="edit__row__head flex">
                <h6>Basic Information</h6>
                <div
                  className="edit__row__head__right"
                  onClick={() => dispatch(openBasicEdit())}
                >
                  Edit
                </div>
              </div>

              <div className="view__desc__columns grid grid-cols-2">
                <div>
                  <div className="flex mt-1">
                    <p>Name : </p>
                    <h5 className="ml-2">Falleh</h5>
                  </div>
                  <div className="flex  ">
                    <p>Age : </p>
                    <h5 className="ml-2">20</h5>
                  </div>
                  <div className="flex  ">
                    <p>Maritial Status : </p>
                    <h5 className="ml-2">Never Married</h5>
                  </div>
                  <div className="flex mt-1">
                    <p>Marriage Plan : </p>
                    <h5 className="ml-2">Soon</h5>
                  </div>
                  <div className="flex mt-1">
                    <p>Physical Status : </p>
                    <h5 className="ml-2">Normal</h5>
                  </div>
                </div>
                <div>
                  <div className="flex mt-1">
                    <p>Profile ID : </p>
                    <h5 className="ml-2">D343455</h5>
                  </div>
                  <div className="flex  ">
                    <p>Gender : </p>
                    <h5 className="ml-2">20</h5>
                  </div>
                  <div className="flex  ">
                    <p>Profile created by : </p>
                    <h5 className="ml-2">Father</h5>
                  </div>
                  <div className="flex mt-1">
                    <p>Languages known : </p>
                    <h5 className="ml-2">English, Malayalam</h5>
                  </div>
                  <div className="flex mt-1">
                    <p>Physical Status : </p>
                    <h5 className="ml-2">Normal</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="edit__row">
              <div className="edit__row__head flex">
                <h6>Religious Information</h6>
                <div
                  className="edit__row__head__right"
                  onClick={() => dispatch(openRelgsEdit())}
                >
                  Edit
                </div>
              </div>
              <div className="view__desc__columns grid grid-cols-2">
                <div>
                  <div className="flex mt-1">
                    <p>Groupe : </p>
                    <h5 className="ml-2">AP Sunni</h5>
                  </div>
                  <div className="flex  ">
                    <p>Perform Namaz : </p>
                    <h5 className="ml-2">Always</h5>
                  </div>
                  <div className="flex  ">
                    <p>Madhab : </p>
                    <h5 className="ml-2">Shafi</h5>
                  </div>
                </div>
                <div>
                  <div className="flex  ">
                    <p>Religious Education : </p>
                    <h5 className="ml-2">Scholar</h5>
                  </div>
                  <div className="flex mt-1">
                    <p>Religiousness : </p>
                    <h5 className="ml-2">Religious</h5>
                  </div>
                  <div className="flex mt-1">
                    <p>Hijab : </p>
                    <h5 className="ml-2">Prefer Hijab</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="edit__row">
              <div className="edit__row__head flex">
                <h6>Educational and Professional Information</h6>
                <div
                  className="edit__row__head__right"
                  onClick={() => dispatch(openEduEdit())}
                >
                  Edit
                </div>
              </div>
              <div className="view__desc__columns grid grid-cols-2">
                <div>
                  <div className="flex mt-1">
                    <p>Education : </p>
                    <h5 className="ml-2">Bachlors(Bcom)</h5>
                  </div>
                  <div className="flex  ">
                    <p>Edu Details : </p>
                    <h5 className="ml-2">Bcom Tax(1st year)</h5>
                  </div>
                </div>
                <div>
                  <div className="flex  ">
                    <p>Profession : </p>
                    <h5 className="ml-2">Student</h5>
                  </div>
                  <div className="flex  ">
                    <p>Professional type : </p>
                    <h5 className="ml-2">Student</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="edit__row">
              <div className="edit__row__head flex">
                <h6>Physical Attributes</h6>
                <div
                  className="edit__row__head__right"
                  onClick={() => dispatch(openPhysiEdit())}
                >
                  Edit
                </div>
              </div>
              <div className="view__desc__columns grid grid-cols-2">
                <div>
                  <div className="flex mt-1">
                    <p>Height : </p>
                    <h5 className="ml-2">150 cm</h5>
                  </div>
                  <div className="flex  ">
                    <p>Weight : </p>
                    <h5 className="ml-2">45 kgs</h5>
                  </div>

                  <div className="flex  ">
                    <p>Complexion : </p>
                    <h5 className="ml-2">Fair</h5>
                  </div>
                </div>
                <div>
                  <div className="flex  ">
                    <p>Body type : </p>
                    <h5 className="ml-2">Average</h5>
                  </div>
                  <div className="flex  ">
                    <p>Hair Color : </p>
                    <h5 className="ml-2">Black</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="edit__row">
              <div className="edit__row__head flex">
                <h6> Location and Contact Details</h6>
                <div
                  className="edit__row__head__right"
                  onClick={() => dispatch(openLocEdit())}
                >
                  Edit
                </div>
              </div>

              <div className="view__loc__row  ">
                <h5>Cherukulam, Manjeri</h5>

                <h5>Malappuram</h5>
                <h5>Kerala</h5>
                <h5>Elankur (PO)</h5>

                <p>Phone: 8738585858</p>
                <p>Secondary No : 54343435554</p>
                <p>Whatsapp : 43429858344</p>
              </div>
            </div>

            <div className="edit__row">
              <div className="edit__row__head flex">
                <h6> Family Details</h6>
                <div
                  className="edit__row__head__right"
                  onClick={() => dispatch(openFamEdit())}
                >
                  Edit
                </div>
              </div>

              <div className="view__desc__columns grid grid-cols-2">
                <div>
                  <div className="flex mt-1">
                    <p>Family Type : </p>
                    <h5 className="ml-2">Nuclear Family</h5>
                  </div>
                  <div className="flex  ">
                    <p>Financial Status : </p>
                    <h5 className="ml-2">Middle Class</h5>
                  </div>

                  <div className="flex  ">
                    <p>Living Situation : </p>
                    <h5 className="ml-2">Live with family</h5>
                  </div>
                  <div className="flex  ">
                    <p>No of younger brother : </p>
                    <h5 className="ml-2">2</h5>
                  </div>
                  <div className="flex  ">
                    <p>No of younger sister : </p>
                    <h5 className="ml-2">2</h5>
                  </div>
                </div>
                <div>
                  <div className="flex  ">
                    <p>Father : </p>
                    <h5 className="ml-2">Alive(Enginner)</h5>
                  </div>

                  <div className="flex  ">
                    <p>Mother : </p>
                    <h5 className="ml-2">Alive(House Wife)</h5>
                  </div>

                  <div className="flex  ">
                    <p>Family Value : </p>
                    <h5 className="ml-2">Liberal</h5>
                  </div>
                  <div className="flex  ">
                    <p>No of elder brother : </p>
                    <h5 className="ml-2">2</h5>
                  </div>
                  <div className="flex  ">
                    <p>No of elder sister : </p>
                    <h5 className="ml-2">2</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="edit__row">
              <div className="edit__row__head flex">
                <h6>I am looking for</h6>
                <div
                  className="edit__row__head__right"
                  onClick={() => dispatch(openLookingEdit())}
                >
                  Edit
                </div>
              </div>
              <h5>
                person who is ready for share my responsibility and happiness.
                He should also be able to support my family if needed.
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* FAMILY EDIT */}

      <RelgsEdit />
      <EduEdit />
      <FamEdit />
      <LookEdit />
      <LocEdit />
      <DescEdit />
      <BasicEdit />
      <PhysiEdit />
    </div>
  );
}
{
  /* <select>
<option>Please select</option>
<option>Not working</option>
<option>Student</option>
<option>Non-mainstream professional</option>

<option>Accountant</option>
<option>Administration Professional</option>
<option>Advertising Professional</option>
<option>Agriculture</option>
<option>Airline Professional</option>
<option>Airforce</option>
<option>Architect</option>
<option>Assistant Professor</option>
<option>Audiologist</option>
<option>Auditor</option>
<option>Beautician</option>
<option>Biologist / Botanist</option>
<option>Business Person</option>
<option>Chartered Accountant</option>
<option>Civil Engineer</option>
<option>Clerical Official</option>
<option>Pilot</option>
<option>CEO/CTO /President</option>
<option>Clinical Pharmacist</option>
<option>Chemist</option>
<option>Chef</option>
<option>Company Secretary</option>
<option>Computer Engineer</option>
<option>Computer Programmer</option>
<option>Consultant</option>
<option>Counsellor</option>
<option>Contractor</option>
<option>Cost Accountant</option>
<option>Creative Person</option>
<option>Customer supprot professional</option>
<option>Defence Employee</option>
<option>Dentist</option>
<option>Designer</option>
<option>Director/Chairman</option>
<option>Doctor</option>
<option>Domestic Helper</option>
<option>Economist</option>
<option>Engineer(Mechanical)</option>
<option>Engineer(Project)</option>
<option>Engineering(Electrical)</option>
<option>Engineering(Civil)</option>
<option>Event Manager</option>
<option>Exicutive</option>
<option>Factory Worker</option>
<option>Farmer</option>
<option>Fasion Designer</option>
<option>Finance Professional</option>
<option>Flight Attendant</option>
<option>Government Employee</option>
<option>Health care professional</option>
<option>Hair Dresser</option>
<option>Hardware Professional</option>
<option>Home Maker</option>
<option>Hotel & Restuarnt Professional</option>

<option>Human Resources Professional</option>
<option>Islamic Daawa</option>
<option>Interior Designer</option>
<option>Investment Professional</option>
<option>IT & Telecom Professional</option>
<option>Islamic Teacher</option>
<option>Journalist</option>
<option>Lawyer</option>
<option>Lecturer</option>
<option>Legal Profession</option>
<option>Librarian</option>
<option>Manager</option>
<option>Marketing Professional</option>
<option>Managing Director</option>
<option>Media Professional</option>
<option>Medical Professional</option>
<option>Medical Transcriptionist</option>
<option>Merchant Naval Officer</option>
<option>Military</option>
<option>Nurse</option>
<option>Nanny & Child Care</option>
<option>Navy</option>
<option>No Occupation</option>
<option>Occupational Therapist</option>
<option>Optician</option>
<option>Pharmacist</option>
<option>Physician Assistant</option>
<option>Physicist</option>
<option>Physiotherapist</option>
<option>Pilot</option>
<option>Politician</option>
<option>Production Professional</option>
<option>Professor</option>
<option>Photographer</option>
<option>Phychologist</option>
<option>Public Relations Professional</option>
<option>Real Estate Professional </option>
<option>Religious Activities</option>
<option>Research Scholar</option>
<option>Retired Person</option>
<option>Retail Professional</option>
<option>Sales Professional</option>
<option>Scientist</option>
<option>Self-employed Person</option>
<option>Social Worker</option>
<option>Software Consultant</option>
<option>Special Educator(Disability)</option>
<option>Sportsman</option>
<option>Tax Consultant</option>
<option>Teacher</option>
<option>Technician</option>
<option>Training Professional</option>
<option>Transportation Professional</option>
<option>veterinary Doctor </option>
<option>Volunteer</option>
<option>Writer</option>
<option>Zoologist</option>
<option>Other</option>
<option>Captian</option>

<option>Drafsman</option>
<option>Driver</option>
<option>Electrician</option>
<option>Enterpreneur</option>
<option>Graphic Designer</option>
<option>Gulf Based</option>
<option>Hospitality</option>

<option>Lab Technician</option>
<option>Mangement Professional</option>
<option>Medical Represntative</option>
<option>Micro Biologist</option>
<option>NRI</option>
<option>Office Staff</option>
<option>Paramedical Staff</option>
<option>Police</option>
<option>Priest</option>
<option>Supervisor</option>
<option>Technical Staff</option>
<option>Trader</option>
<option>Trainer</option>
<option>Tutor</option>
<option>Videographer</option>

<option>Web Designer</option>
<option>Web Developer</option>
<option>Wholsale Businessman</option>

<option>Work at Mosque</option>

<option>Laborer</option>

<option>Other</option>
</select> */
}

{
  /* <select className="ml-4">
                    <option>Select</option>
                    <option>Company Secretary(CS)</option>
                    <option>BSW</option>
                    <option>BDS</option>
                    <option>BHMS</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option>LLB</option>
                    <option>Cousrse in legal</option>
                    <option>CA inter</option>
                    <option>CA</option>
                    <option>B Phil</option>
                    <option>CFA</option>
                    <option>Finance</option>
                    <option>IFS</option>
                    <option>IAS</option>
                    <option>IPS</option>
                    <option>IRS</option>
                    <option>IES</option>
                    <option>Civil service</option>
                    <option>BUMS</option>
                    <option>Audiology</option>
                    <option>Bsc Biotechnology</option>
                    <option>MBBS</option>
                    <option>BBA</option>
                    <option>BB Arch</option>
                    <option>Armed Forces</option>
                    <option>BA</option>
                    <option>B com</option>
                    <option>BCA</option>
                    <option>BEd</option>
                    <option>Fasion</option>
                    <option>BFM</option>
                    <option>Home Science</option>
                    <option>BGL</option>
                    <option>BHM</option>
                    <option>Advertising/Marketing</option>
                    <option>BPT</option>
                    <option>BLIS</option>
                    <option>B Sc</option>
                    <option>Shipping</option>
                    <option>Travel & Toursim</option>
                    <option>BFA</option>
                    <option>B Plan</option>
                    <option>Aeronautical Engineering</option>
                    <option>Bsc Computer Science</option>
                    <option>Bsc IT</option>
                    <option>Bachlor of Engineering</option>
                    <option>B Tech</option>
                    <option>BE</option>
                  </select> */
}
