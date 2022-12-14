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
import ShareIcon from '@mui/icons-material/Share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
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
import { TelegramShareButton, WhatsappShareButton } from "react-share";

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
            <p type='button'>Manage Photos</p>
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

      <div className="sbar__third__row ">
        <div className="sbar__third__row__div">
          <h5>Share my profile</h5>
        </div>
        <div className="sbar__third__row__bottom grid grid-cols-2">
          <div
            className="sbar__third__row__left flex"
            
          >

<WhatsappShareButton
          url={`https://www.marrysunni.com/shareView/${member[0]?.id}`}
          // children={}
          >
            <div className="flex"><WhatsAppIcon id='sbar__wtsp__icon'/>  <p type='button'>WhatsApp</p></div>
            
            
            </WhatsappShareButton>
          
          
          </div>
          
            <div className="sbar__third__row__right flex">
            <TelegramShareButton
          // children={}
          url={`https://www.marrysunni.com/shareView/${member[0]?.id}`}
          ><div className="flex">
 <TelegramIcon id='sbar__tlgrm__icon'/>
            <p>Telegram</p>
          </div>
           
            </TelegramShareButton>
             
            
            </div>
          
        </div>
      </div>

      <div className="sbar__settings">
        <div className="sbar__third__row__div">
          <h5>Account Settings</h5>
        </div>

        <div className="sbar__setings__row mt-3 grid grid-cols-2 gap-4">
          <div className="sbar__setings__left flex" type="button">
            <EmailIcon id="sbar__third__row__bottom__icon" />
            <p>SMS/Email Alerts</p>
          </div>
          <div
          type="button"
            className="sbar__setings__right flex"
            onClick={() => dispatch(openProfielHide())}
          >
            <VisibilityOffIcon id="sbar__third__row__bottom__icon" />

            <p type='button'>
              {member[0]?.data().status == "Inactive"
                ? "Unhide Profie"
                : "Hide Profile"}
            </p>
          </div>
        </div>
        <div className="sbar__setings__row grid grid-cols-2 gap-4">
          {/* <div className="sbar__setings__left flex">
            <LockIcon id="sbar__third__row__bottom__icon" />
            <p>Edit Password</p>
          </div> */}
          <div
            className="sbar__setings__right flex"
            style={{ cursor: "pointer" }}
            type="button"
            onClick={() => dispatch(openProfielDelete())}
          >
            <DeleteIcon id="sbar__third__row__bottom__icon" />
            <p type='button'>Delete Profile</p>
          </div>
          <div className="sbar__setings__left flex" type="button">
            {/* <button></button> */}
            <PowerSettingsNewIcon id="sbar__third__row__bottom__icon" />
            <p type='button' onClick={logOut}>Logout</p>
          </div>
        </div>
        {/* <div className="sbar__setings__row grid   gap-4">
          <div className="sbar__setings__left flex">
            <ShareIcon id="sbar__third__row__bottom__icon" />
            <p onClick={logOut}>Sahre your profile via </p>

          </div>
          <WhatsAppIcon/>
        </div> */}
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
