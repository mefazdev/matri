import React, { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import photo_holder from "../../asset/image/photo-holder.png";
import Image from "next/image";

import { auth, db } from "../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

export default function ProfVisit({ id }) {
  const [profile, setProfile] = useState({});
  const [visitedList, setVisitedList] = useState([]);
  const [user, setUser] = useState({});

  const getUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
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

  const fetchVisited = async () => {
    if (user.uid) {
      const q = await query(
        collection(db, "visited"),
        where("userId", "==", user?.uid)
      );

      onSnapshot(q, (snapshot) => {
        setVisitedList(snapshot.docs.map((doc) => doc));
      });
    }
  };



  const removeItem = async (id) => {
    await deleteDoc(doc(db, "visited", id));
  };

  useEffect(() => {
    fetchVisited();
  }, [profile]);
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="s__list">
      <div className="interest__content">
        {/* <button onClick={()=>console.log(visitedList)}>hello</button> */}
        <h5>Visited Profiles</h5>

        {visitedList.map((data, index) => {
          const d = data.data().visitedProfile;
          var today = new Date();
          var age_now = today.getFullYear() - d.bYear;
          var m = today.getMonth() - d.bMonth;
          if (m < 0 || (m === 0 && today.getDate() < d.bday)) {
            age_now--;
          }
          return (
            <div key={index} className="interest__row">
              <div className="interest__row__left grid grid-cols-2">
                <div className="intrest__row__img">
                  {" "}
                  <Image src={photo_holder} />
                </div>

                <div className="interest__row__left__text">
                  <Link href={`/viewProfile/${encodeURIComponent(d.id)}`}>
                    <h6>{d.brideName}</h6>
                  </Link>
                  <p>
                    {age_now} Yrs, {d.height} cm, {d.maritialStatus}
                  </p>
                  <p>
                    {d.highEdu} ({d.eduCourse}), {d.profession}
                  </p>
                  <p>
                    {d.city}, {d.district}
                  </p>
                </div>
              </div>

              <div className="interest__row__right">
                {/* <div className="interest__row__right__div">
                    <button id='intr__acc__btn'>Accept</button>
                    <button id='intr__dec__btn'>Decline</button>
                </div> */}
              </div>
              <HighlightOffIcon
                onClick={() => removeItem(data.id)}
                id="intr__close"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
