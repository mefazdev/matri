import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import photoHolder from "../asset/image/photo-holder.png";
import StarIcon from "@mui/icons-material/Star";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Overlay from "react-bootstrap/Overlay";
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import girlHolder from "../asset/image/girls-place.png";
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import {
  FacebookShareButton,
  InstapaperShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import CancelIcon from '@mui/icons-material/Cancel';
import { auth, db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import StarIcon from '@mui/icons-material/Star';
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import FacebookIcon from '@mui/icons-material/Facebook';
export default function MobileDisplay({
  name,
  height,
  maritialStatus,
  gender,
  city,
  community,
  highEdu,
  occupation,
  photo,
  wtspNumber,
  phone,
  age,
  id,
  userId,
  eduCourse,
  district,
  profileId,
}) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [user, setUser] = useState({});
  const [member, setMember] = useState([]);
  const [addedToShort, setAddedToShort] = useState(false);
  // const [starIcon,setStarIcon] = useState(false)
  const [docRefId, setDocRefId] = useState("");
  const notifyAdded = () => toast("This profile is shortlisted!");
  const notifyRemoved = () => toast("This profile is removed from shortlist!");

  const notifyInterest = () => toast("Interest sent!");
  const notifyCantInterest = () => toast("You can't sent to your own profile!");
  const [memberAge, setMemberAge] = useState("");
  const [interest, setInterest] = useState([]);

  const [send, setSend] = useState(false);
  const [ignored, setIgnored] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [share,setShare] = useState(false)
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
        const data = snapshot;
        setMember(data.docs.map((doc) => doc));
      });
    }
  };
  const controlShortList = () => {
    if (addedToShort) {
      removeFromShort();
    } else {
      addToShortList();
    }
  };

  const addToShortList = async () => {
    setAddedToShort(true);
    notifyAdded();

    await addDoc(collection(db, "shortList"), {
      userId: user.uid,
      shortList: {
        userId: userId,
        brideName: name,
        age: age,
        maritialStatus: maritialStatus,
        height: height,
        highEdu: highEdu,
        eduCourse: eduCourse,
        city: city,
        district: district,
        occupation: occupation,
        photo: photo,
        id: id,
      },
      timestamp: serverTimestamp(),
    });
  };

  const fetchInterest = async () => {
    const q = await query(
      collection(db, "interest")
      // orderBy("timestamp", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setInterest(snapshot.docs.map((doc) => doc));
    });
  };

  const checkInterest = async () => {
    {
      interest.map((data) => {
        if (data.data().from.userId == user?.uid) {
          if (data.data().to.userId == userId) {
            if (data.data().status == "accepted") {
              setAccepted(true);
            } else if (data.data().status == "ignored") {
              setIgnored(true);
            } else {
              setSend(true);
            }

            //  console.log('kkk')
          } else {
          }
        }
      });
    }
  };
  useEffect(() => {
    getUser();
    fetchInterest();
  }, []);

  useEffect(() => {
    fetchMember();
  }, [user]);

  useEffect(() => {
    checkInterest();
  });

  const addToVisited = async () => {
    await addDoc(collection(db, "visited"), {
      userId: user.uid,
      visitedProfile: {
        userId: userId,
        brideName: name,
        age: age,
        maritialStatus: maritialStatus,
        height: height,
        highEdu: highEdu,
        eduCourse: eduCourse,
        city: city,
        district: district,
        occupation: occupation,
        photo: photo,
        id: id,
      },
      timestamp: serverTimestamp(),
    });
  };

  const sentInterest = async () => {
    if (userId != user.uid) {
      notifyInterest();
      await addDoc(collection(db, "interest"), {
        to: {
          userId: userId,
          brideName: name,
          age: age,
          maritialStatus: maritialStatus,
          height: height,
          highEdu: highEdu,
          eduCourse: eduCourse,
          city: city,
          district: district,
          occupation: occupation,
          photo: photo,
          id: id,
        },
        from: {
          userId: user.uid,
          brideName: member[0].data().brideName,
          age: memberAge,
          maritialStatus: member[0].data().maritialStatus,
          height: member[0].data().height,
          highEdu: member[0].data().highEdu,
          eduCourse: member[0].data().eduCourse
            ? member[0].data().eduCourse
            : "",
          city: member[0].data().city,
          district: member[0].data().district,
          occupation: member[0].data().profession
            ? member[0].data().profession
            : "",
          photo: member[0].data().photo ? member[0].data().photo : "",
          id: member[0].id,
        },
        status: "sent",

        timestamp: serverTimestamp(),
      });
    } else {
      notifyCantInterest();
    }
  };

  const calculate_member_age = () => {
    var today = new Date();
    // var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - member[0]?.data().bYear;
    var m = today.getMonth() - member[0]?.data().bMonth;
    if (m < 0 || (m === 0 && today.getDate() < member[0]?.data().bday)) {
      age_now--;
    }

    setMemberAge(age_now);
  };
  useEffect(() => {
    calculate_member_age();
  }, [member]);
  return (
    <div
      className="mob__dpy "
      style={{
        backgroundImage: photo
          ? `linear-gradient(180deg,rgba(255, 255, 255, 0),rgba(10, 10, 11, 0.75)),url(${photo})`
          : "linear-gradient(180deg,rgb(223, 222, 222), rgb(84, 82, 82), rgb(16, 13, 13))",
      }}
    >
      
      <ToastContainer className="mt-5" />
      <div className="mob__dpy__photo__row">
        {!photo && gender == "Male" ? (
          <div className="mob__dpy__photo__div">
            <Image src={photoHolder} alt="" />
          </div>
        ) : (
          ""
        )}
        {!photo && gender == "Female" ? (
          <div className="mob__dpy__photo__div">
            <Image src={girlHolder} alt="" />
          </div>
        ) : (
          ""
        )}
      </div>
      <Link href={`/viewProfile/${encodeURIComponent(id)}`}>
        <div onClick={addToVisited} className="mob__dpy__content__row">
          <h5>{name}</h5>
          {/* <h6>{profileId}</h6> */}
          <p>
            {age} Yrs, {height} cm, {maritialStatus}
          </p>
          <p>
            {highEdu} {eduCourse ? `(${eduCourse})` : ""} , Student
          </p>
          <p className="pt-1">
            {city}, {district}
          </p>
        </div>
      </Link>
      <div className="mob__dpy__footer flex">
        <div className="mob__dpy__icon__circle">
          <ShareIcon
          onClick={()=>setShare(true)}
          id="mob__dpy__icon__circle__share" />
        </div>
        <div className="mob__dpy__icon__circle">
          <StarIcon
            onClick={controlShortList}
            id="mob__dpy__icon__circle__icon"
          />
        </div>
        {send ? <button id='intr__send__btn'> Sent Interest</button> :  accepted ? <button id='intr__acc__btn'>Interest Accepted </button>
         : ignored ? 
         <button id='intr__igno__btn'>Interest Ignored</button>
        
          :
         
          <div className="mob__dpy__icon__circle">
          <FavoriteIcon
            onClick={sentInterest}
            id="mob__dpy__icon__circle__icon"
          />
        </div>
         }
       
        {share ? 
        <div className="bob__doy__share__div" onClick={()=>console.log(`https://www.marrysunni.com/shareView/${id}`)}>
        
        <div >
        <WhatsappShareButton
          url={`https://www.marrysunni.com/shareView/${id}`}
          // children={}
          ><WhatsAppIcon id='mob__share__wtsp'/></WhatsappShareButton>
          {/* <FacebookShareButton
          children={<FacebookOutlinedIcon
            id='mob__share__fb'
           
          />}
          url={`https://www.marrysunni.com/viewProfile/${id}`}
          /> */}

          <TelegramShareButton
          // children={}
          url={`https://www.marrysunni.com/shareView/${id}`}
          ><TelegramIcon id='mob__share__tg'/></TelegramShareButton>
        </div>
         <CancelIcon onClick={()=>setShare(false)} id='mob__share__cancel'/>
        </div> : ''}
        
      </div>
    </div>
  );
}

// key id = rzp_test_TKJroRBJf9pJH6

// key secret = whPyoQ6w6y6EvEUMaIc417GZ

// const mid = member[0].id;
// let vList = member[0].data().visited
//   ? [...member[0].data().visited, id]
//   : [id];
// //  await sList.push(id)
// const docRef = doc(db, "member", mid);
// const updateRef = await updateDoc(docRef, {
//   visited: vList,
// });
