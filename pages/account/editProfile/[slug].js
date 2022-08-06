import React, { useEffect, useState } from "react";
import AccountNav from "../../../components/AccountNav";
import AccoundSidebar from "../../../components/AccountSidebar";
import imageHolder from "../../../asset/image/photo-holder.png";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaceIcon from "@mui/icons-material/Place";
import Modal from "@mui/material/Modal";
import PhoneInput from "react-phone-number-input";
import DescEdit from "../../../components/editForms/DescEdit";
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
} from "../../../redux/actions";
import BasicEdit from "../../../components/editForms/BasicEdit";
import RelgsEdit from "../../../components/editForms/RelgsEdit";
import EduEdit from "../../../components/editForms/EduEdit";
import FamEdit from "../../../components/editForms/FamEdit";
import LocEdit from "../../../components/editForms/LocEdit";
import LookEdit from "../../../components/editForms/LookEdit";
import PhysiEdit from "../../../components/editForms/PhysiEdit";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../../../firebase";
import { Router, useRouter } from "next/router";
import { collection, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { textFieldClasses } from "@mui/material";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function EditProfile() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const [previews, setPreview ] = useState(false);
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const [age, setAge] = useState("");
  const [check, setcheck] = useState('')
  const [saving,setSaving] = useState(false)
  const [photo,setPhoto] = useState('')
  const [modal,setModal] = useState(false)
  const id = router.query.slug;

  const onPreview = () => {
    setEdit(false);
    setPreview(true);
     
    // router.push(``)
  };
  const onEdit = () => {
    setEdit(true);
    setPreview(false);
  };

 const getUser = ()=>{
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
   
  });
 }

  const redirect = () => {
    if (!user) {
      router.push("/");
    }
  };
  
  const fetchData = async () => {
    if (id) {
      const q = await doc(db, "member", id);
      onSnapshot(q, (snapshot) => {
        setProfile(snapshot.data());
      });
    }
  };
  useEffect(() => {
    fetchData();

  }, [id]);

  useEffect(() => {
    redirect();
  }, [user]);
  useEffect(()=>{
    getUser()
  })

  const calculate_age = () => {
    var today = new Date();
    var age_now = today.getFullYear() - profile.bYear;
    var m = today.getMonth() - profile.bMonth;
    if (m < 0 || (m === 0 && today.getDate() < profile.bday)) {
      age_now--;
    }
    // console.log(age_now);
    setAge(age_now);
  };

  useEffect(() => {
    calculate_age();
  }, [profile]);

  const handlePhoto = (e)=>{
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  
    reader.onload = (readerEvent) => {
      setPhoto(readerEvent.target.result);
     
    };
  }
  const changePhoto = async ()=>{
    setSaving(true)
    // const id = member[0].id;
    const photoRef = ref(storage, `upload/${id}/photo`);
    await uploadString(photoRef, photo, "data_url").then(async (snapshot) => {
      const downloadURL1 = await getDownloadURL(photoRef);
    await updateDoc(doc(db, "member", id), {
        photo: downloadURL1,
      });
   });
 setSaving(false)
   setModal(false)

  }
  return (
    <div className="edit__prof">
      <AccountNav />
      <div className="edit__content flex">
        <AccoundSidebar />

        <div className="edit__right">
         <div className="edit__head grid md:grid-cols-2">
            {/* <button onClick={() => console.log(user)}>CLICKME </button> */}
            <div
              onClick={onEdit}
              className={edit ? "edit__head__div__active" : "edit__head__div"}
            >
              <h6>Edit Profile</h6>
            </div>
            <Link href={`/viewProfile/${encodeURIComponent(id)}`}><div
               onClick={onPreview}
                
              className={
                  previews? "edit__head__div__active" : "edit__head__div"
                }
              >
                <h6>View my profile</h6>
                
              </div></Link>

            <div></div>
          </div>  
{/* <button  onClick={()=>setcheck('hellp')}>Edit</button> */}
            
          <div className="view__main grid md:grid-cols-3">
            <div className="view__main__img__div">
              <div className="view__main__img">
                {profile.photo ? (
                  <img src={profile.photo} alt="" />
                ) : (
                  <Image alt="" src={imageHolder} />
                )}
              </div>
              <button 
              onClick={()=>setModal(true)}
              >{profile.photo ? "Change" : "Add"}</button>
            </div>

            <div className="md:col-span-2 view__main__right">
              <div className="view__main__first__row  flex">
                <PersonIcon className="view__main__icons" id="view__peron" />
                <p>
                  {age} yrs, {profile.height} cm, {profile.maritialStatus}
                </p>
              </div>
              <div className="view__main__first__row flex ">
                <SettingsAccessibilityIcon
                  id="sett__icon"
                  className="view__main__icons"
                />
                <p>{profile.community}</p>
              </div>
              <div className="view__main__first__row flex ">
                <AutoAwesomeIcon
                  className="view__main__icons"
                  id="auto__icon"
                />
                <p>{profile.maritialStatus}</p>
              </div>
              <div className="view__main__first__row flex ">
                <SchoolIcon className="view__main__icons" id="school__icon" />
                <p>{profile.eduCourse}</p>
              </div>
              <div className="view__main__first__row flex ">
                <PlaceIcon id="place__icon" className="view__main__icons" />
                <p>
                  {profile.city}, {profile.district}
                </p>
              </div>

            
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
              <p>{profile.description}</p>
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
                    <h5 className="ml-2">{profile.brideName}</h5>
                  </div>
                  <div className="flex  ">
                    <p>Age : </p>
                    <h5 className="ml-2">{age}</h5>
                  </div>
                  <div className="flex  ">
                    <p>Maritial Status : </p>
                    <h5 className="ml-2">{profile.maritialStatus}</h5>
                  </div>
                  <div className="flex mt-1">
                    <p>Marriage Plan : </p>
                    {profile.marriagePlan ? (
                      <h5 className="ml-2">{profile.marriagePlan}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openBasicEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex mt-1">
                    <p>Profile ID : </p>
                    <h5 className="ml-2">{profile.profileId}</h5>
                  </div>
                  <div className="flex  ">
                    <p>Gender : </p>
                    <h5 className="ml-2">{profile.gender}</h5>
                  </div>
                  
                  <div className="flex mt-1">
                    <p>Physical Challenged? : </p>
                    <h5 className="ml-2">{profile.physically}</h5>
                  </div>
                  <div className="flex mt-1">
                    <p>Physical Status : </p>
                    {profile.physiStatus ? (
                      <h5 className="ml-2">{profile.physiStatus}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openBasicEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
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
                    <h5 className="ml-2">{profile.community}</h5>
                  </div>
                  <div className="flex  ">
                    <p>Perform Namaz : </p>
                    {profile.namaz ? (
                      <h5 className="ml-2">{profile.namaz}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openRelgsEditEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
                  </div>
                  <div className="flex  ">
                    <p>Madhab : </p>
                    {profile.madhab ? (
                      <h5 className="ml-2">{profile.madhab}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openRelgsEditEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex  ">
                    <p>Religious Education : </p>
                    {profile.relgsEdu ? (
                      <h5 className="ml-2">{profile.relgsEdu}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openRelgsEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
                  </div>
                  {profile.relgsEdu == "Graduation" ? (
                    <div className="flex  ">
                      <p>Religious Education : </p>
                      {profile.relgsGraduation ? (
                        <h5 className="ml-2">{profile.relgsGraduation}</h5>
                      ) : (
                        <h4
                          onClick={() => dispatch(openRelgsEdit())}
                          className="ml-2"
                        >
                          Add
                        </h4>
                      )}
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="flex mt-1">
                    <p>Religiousness : </p>
                    <h5 className="ml-2">{profile.religiousness}</h5>
                  </div>
                  <div className="flex mt-1">
                    <p>Hijab : </p>
                    {profile.preferHijab ? (
                      <h5 className="ml-2">{profile.preferHijab}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openRelgsEditEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
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
                    <h5 className="ml-2">
                      {profile.highEdu} ({profile.eduCourse})
                    </h5>
                  </div>
                  <div className="flex  ">
                    <p>Edu Details : </p>
                    {profile.eduDetails ? (
                      <h5 className="ml-2">{profile.eduDetails}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openEduEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex  ">
                    <p>Profession : </p>
                    <h5 className="ml-2">{profile.profession}</h5>
                  </div>
                  <div className="flex  ">
                    <p>Professional type : </p>
                    <h5 className="ml-2">{profile.profType}</h5>
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
                    <h5 className="ml-2">{profile.height} cm</h5>
                  </div>
                  <div className="flex  ">
                    <p>Weight : </p>
                    <h5 className="ml-2">{profile.weight} kgs</h5>
                  </div>

                  <div className="flex  ">
                    <p>Complexion : </p>
                    <h5 className="ml-2">{profile.skinTone}</h5>
                  </div>
                </div>
                <div>
                  <div className="flex  ">
                    <p>Body type : </p>
                    <h5 className="ml-2">{profile.bodyType}</h5>
                  </div>
                  <div className="flex  ">
                    <p>Appearence : </p>
                    {profile.appearence ? (
                      <h5 className="ml-2">{profile.appearence}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openEduEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
                  </div>
                  <div className="flex  ">
                    <p>Hair Color : </p>
                    {profile.hairColor ? (
                      <h5 className="ml-2">{profile.hairColor}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openEduEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="edit__row">
              <div className="edit__row__head flex">
                <h6> Address and Contact Details</h6>
                <div
                  className="edit__row__head__right"
                  onClick={() => dispatch(openLocEdit())}
                >
                  Edit
                </div>
              </div>

              <div className="view__loc__row  ">
                

                <h5> {profile.address}</h5>
                <p>City: {profile.city}</p>
                <p>District: {profile.district}</p>

                <p>Phone: {profile.phone}</p>
                <p>Secondary No : {profile.scndNumber}</p>
                <p>Whatsapp : {profile.wtspNumber}</p>
                <p>Contact Person & Relation: {profile.contactPerson}</p>
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
                    {profile.famType ? (
                      <h5 className="ml-2">{profile.famType}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openFamEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
                  </div>
                  <div className="flex  ">
                    <p>Financial Status : </p>
                    <h5 className="ml-2">{profile.financialStatus}</h5>
                  </div>

                  
                  <div className="flex  ">
                    <p>No of younger brother : </p>
                    {profile.youngerBro ? (
                      <h5 className="ml-2">{profile.youngerBro}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openFamEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
                  </div>
                  <div className="flex">
                    <p>No of younger sister : </p>
                    {profile.youngerSis ? (
                      <h5 className="ml-2">{profile.youngerSis}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openFamEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex  ">
                    <p>Father : </p>
                    {profile.father ? (
                      <h5 className="ml-2">{profile.father}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openFamEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
                  </div>

                  <div className="flex  ">
                    <p>Mother : </p>
                    <h5 className="ml-2">Alive(House Wife)</h5>
                  </div>

                  <div className="flex  ">
                    <p>Family Value : </p>
                    {profile.famValue ? (
                      <h5 className="ml-2">{profile.famValue}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openFamEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
                  </div>
                  <div className="flex  ">
                    <p>No of elder brother : </p>
                    {profile.elderBro ? (
                      <h5 className="ml-2">{profile.elderBro}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openFamEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
                  </div>
                  <div className="flex  ">
                    <p>No of elder sister : </p>
                    {profile.elderSis ? (
                      <h5 className="ml-2">{profile.elderSis}</h5>
                    ) : (
                      <h4
                        onClick={() => dispatch(openFamEdit())}
                        className="ml-2"
                      >
                        Add
                      </h4>
                    )}
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
              {profile.lookinFor ? (
                <h5 className="ml-2">{profile.lookinFor}</h5>
              ) : (
                <h4
                  onClick={() => dispatch(openLookingEdit())}
                  className="ml-2"
                >
                  Add
                </h4>
              )}
            </div>
          </div>  
        </div>
      </div>

      {/* FAMILY EDIT */}
      <  Modal
    id="search__modal"
    open={modal}
    // onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <div className="edit__modal">
      <div className="edit__desc__modal">
        <h6>Change your photo</h6>
         <input
         type='file'
         onChange={handlePhoto}
         />
        <div className="edit__desc__modal__btn">
          <button className="edit__save__button"
          onClick={changePhoto}
          >
            {saving ? 'Saving' :'Save'}
          </button>
          <button
            className="edit__cancel__button"
            // onClick={() => dispatch(closeLookingEdit())}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Modal>
      <RelgsEdit id={id} />
      <EduEdit id={id} />
      <FamEdit id={id} />
      <LookEdit id={id} />
      <LocEdit id={id} />
      <DescEdit id={id} />
      <BasicEdit id={id} />
      <PhysiEdit id={id} />
    </div>
  );
}
