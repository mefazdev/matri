import React, { useEffect, useState } from "react";
import imageHolder from "../asset/image/photo-holder.png";
import Image from "next/image";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { onAuthStateChanged } from "firebase/auth";
import girlHolder from '../asset/image/girls-place.png'

import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  closePotoEdit,
  openPotoEdit,
  openProfielDelete,
  openProfielHide,
  openSearch,
} from "../redux/actions";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

import { getDownloadURL, ref, uploadString } from "firebase/storage";

export default function AccoundSidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [member, setMember] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [viewUplaod, setViewUpload] = useState(false);
  const [modal, setModal] = useState(false);

  const getUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  };
  const fetchMember = async () => {
    const userId = (await user) ? user.uid : null;

    if (userId) {
      const q = await query(
        collection(db, "member"),
        where("userId", "==", user?.uid)
      );
      onSnapshot(q, (snapshot) => {
        setMember(snapshot.docs.map((doc) => doc));
      });
    }
  };

  const logOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    fetchMember();
  }, [user]);
  return (
    <div className="acc__sbar">
      <div className="sbar__first__row flex ">
        <div className="sbar__first__row__left">
          {member[0]?.data().photo ? (
            <img src={member[0]?.data().photo} alt="" />
          ) : (
            member[0]?.data().gender == 'Male' ?  <Image src={imageHolder} alt="" /> :
            <Image src={girlHolder} alt="" />
          )}
        </div>
        <div className="sbar__first__row__right">
          <h6>
            {" "}
            <span style={{ fontWeight: "bold" }}>
              {member[0]?.data().brideName}
            </span>
            ({member[0]?.data().profileId}){" "}
          </h6>
          {/* <p>Account : Free</p>
          <button>Upgrade</button> */}
        </div>
      </div>
      <div className="sbar__second__row ">
        <div className="sbar__second__row__div  flex">
          <Link href="/account/Home">
            <button id="sbar__second__row__btn1">Profiles</button>
          </Link>

          <button
            id="sbar__second__row__btn2"
            onClick={() => dispatch(openSearch())}
          >
            Search
          </button>
        </div>
        <div className="sbar__second__row__div  flex">
          <Link href={`/account/explore/${encodeURIComponent(member[0]?.id)}`}>
            <button id="sbar__second__row__btn3">Explore</button>
          </Link>

          <button onClick={logOut} id="sbar__second__row__btn4">
            Logout
          </button>
        </div>
      </div>

      <div className="sbar__third__row ">
        <div className="sbar__third__row__div">
          <h5>My Profile</h5>
        </div>
        <div className="sbar__third__row__bottom flex">
          <div
            className="sbar__third__row__left flex"
            onClick={() => dispatch(openPotoEdit())}
          >
            <CameraAltIcon id="sbar__third__row__bottom__icon" />
            <p>Manage Photos</p>
          </div>
          <Link
            href={`/account/editProfile/${encodeURIComponent(member[0]?.id)}`}
          >
            <div className="sbar__third__row__right flex">
              <EditIcon id="sbar__third__row__bottom__icon" />
              <p>Edit Profile</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="sbar__settings">
        <div className="sbar__third__row__div">
          <h5>Account Settings</h5>
        </div>

        <div className="sbar__setings__row mt-3 grid grid-cols-2 gap-4">
          <div className="sbar__setings__left flex">
            <EmailIcon id="sbar__third__row__bottom__icon" />
            <p>SMS/Email Alerts</p>
          </div>
          <div
            className="sbar__setings__right flex"
            onClick={() => dispatch(openProfielHide())}
          >
            <VisibilityOffIcon id="sbar__third__row__bottom__icon" />

            <p>
              {member[0]?.data().status == "Inactive"
                ? "Unhide Profie"
                : "Hide Profile"}
            </p>
          </div>
        </div>
        <div className="sbar__setings__row grid grid-cols-2 gap-4">
          <div className="sbar__setings__left flex">
            <LockIcon id="sbar__third__row__bottom__icon" />
            <p>Edit Password</p>
          </div>
          <div
            className="sbar__setings__right flex"
            style={{ cursor: "pointer" }}
            type="button"
            onClick={() => dispatch(openProfielDelete())}
          >
            <DeleteIcon id="sbar__third__row__bottom__icon" />
            <p>Delete Profile</p>
          </div>
        </div>
        <div className="sbar__setings__row grid grid-cols-2 gap-4">
          <div className="sbar__setings__left flex">
            <PowerSettingsNewIcon id="sbar__third__row__bottom__icon" />
            <p onClick={logOut}>Logout</p>
          </div>
        </div>
      </div>

      {/* <div className='sbar__help flex'>
  <div className='sbar__help__circle'>
    <PhoneIcon/>
  </div>
  <div className='sbar__help__right'>
    <p>Call us</p>
    <h6>+91234434343</h6>
  </div>
</div> */}
    </div>
  );
}
