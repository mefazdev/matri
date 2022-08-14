import React, { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import photo_holder from "../../asset/image/photo-holder.png";
import Image from "next/image";
import { auth, db } from "../../firebase";
import {
  collection,
  deleteDoc,
  doc,

  onSnapshot,
  query,
  
  where,
} from "firebase/firestore";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
// import { async } from '@firebase/util';
export default function ShortList({ id }) {
  const [profile, setProfile] = useState({});
  const [shortList, setShortList] = useState([]);
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
        //   setCurreuntShortList(snapshot.data().shortList)
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchShortlist = async () => {
    if (user.uid) {
      const q = await query(
        collection(db, "shortList"),
        where("userId", "==", user?.uid)
      );

      onSnapshot(q, (snapshot) => {
        setShortList(snapshot.docs.map((doc) => doc));
      });
    }
  };

  useEffect(() => {
    fetchShortlist();
  }, [profile]);

  const removeItem = async (id) => {
    await deleteDoc(doc(db, "shortList", id));
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="s__list">
      <div className="interest__content">
        {/* <button onClick={()=>console.log(shortList)}>CJEL</button> */}
        <h5>Your Shortlist</h5>

        {shortList
          ? shortList.map((data, index) => {
              const d = data.data().shortList;

              return (
                <div className="interest__row" key={index}>
                  <div className="interest__row__left grid lg:gap-4 grid-cols-4">
                    <div className="intrest__row__img">
                      {" "}
                      <Image src={photo_holder} />
                    </div>

                    <div className="interest__row__left__text col-span-3">
                      <Link
                        href={`/viewProfile/${encodeURIComponent(data.id)}`}
                      >
                        <h6>{d.brideName}</h6>
                      </Link>

                      <p>
                        {d.age} Yrs, {data.height} cm, {d.maritialStatus}
                      </p>
                      <p>
                        {d.highEdu} ({d.eduCourse})
                      </p>
                      <p>{d.profession}</p>
                      <p>
                        {d.city}, {d.district}
                      </p>
                    </div>
                  </div>

                  <div className="interest__row__right"></div>

                  <HighlightOffIcon
                    id="intr__close"
                    onClick={() => removeItem(data.id)}
                  />
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
