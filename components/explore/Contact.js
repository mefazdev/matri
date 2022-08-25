import React, { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import photo_holder from "../../asset/image/photo-holder.png";
import Image from "next/image";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import girlPhoto from "../../asset/image/girls-place.png";
import Link from "next/link";
export default function Contact() {
  const [user, setUser] = useState({});
  const [member, setMember] = useState([]);
  const [addressDoc, setAddressDoc] = useState([]);
  const [address, setAddress] = useState([]);

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
        where("userId", "==", userId)
      );
      onSnapshot(q, (snapshot) => {
        const data = snapshot;
        setMember(data.docs.map((doc) => doc));
      });
    }
  };
  const fetchAddressDoc = async () => {
    const userId = (await user) ? user.uid : null;
    if (userId) {
      const q = await query(
        collection(db, "address"),
        where("userId", "==", userId)
      );
      onSnapshot(q, (snapshot) => {
        setAddressDoc(snapshot.docs.map((doc) => doc));
      });
    }
  };

  const fetchAddress = async () => {
    let ar = [];
    if (addressDoc.length) {
      addressDoc.map(async (data) => {
        const q = await doc(db, "member", data.data().id);
        onSnapshot(q, (snapshot) => {
          ar = [...ar, snapshot];
          setAddress(ar);
          // console.log(ar)
        });
      });
    }
    // console.log(ar)
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    fetchMember();
    fetchAddressDoc();
  }, [user]);
  useEffect(() => {
    fetchAddress();
  }, [addressDoc]);

  return (
    <div className="s__list">
      <div className="interest__content">
        <h5 onClick={fetchAddress}>Saved Contacts</h5>

        {address.map((data, index) => {
          const d = data.data();
          //  const calculate_age = ()=>{

          var today = new Date();
          var age_now = today.getFullYear() - d.bYear;
          var m = today.getMonth() - d.bMonth;
          if (m < 0 || (m === 0 && today.getDate() < d.bday)) {
            age_now--;
          }
          // console.log(age_now);
          // setAge(age_now)
          // }
          return (
            <div key={index} className="interest__row">
              <div className="interest__row__left grid grid-cols-2">
                <div className="intrest__row__img">
                  {d.photo ? (
                    <img src={d.photo} alt="" />
                  ) : d.gender == "Male" ? (
                    <Image src={photo_holder} />
                  ) : (
                    <Image src={girlPhoto} />
                  )}
                </div>

                <div className="interest__row__left__text">
                  <Link href={`/viewProfile/${encodeURIComponent(data.id)}`}>
                    <h6>{d.brideName}</h6>
                  </Link>
                  <p>
                    {age_now} Yrs, {d.height} cm, {d.maritialStatus}
                  </p>
                  <p>{d.address}</p>
                </div>
              </div>

              <div className="interest__row__right">
                <div className="interest__row__right__div">
                  <Link href={`/viewProfile/${encodeURIComponent(data.id)}`}>
                    <button id="intr__acc__btn">View Profile</button>
                  </Link>
                  {/* < button id='intr__dec__btn'>Decline</button> */}
                </div>
              </div>
              {/* <HighlightOffIcon id='intr__close'/> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
