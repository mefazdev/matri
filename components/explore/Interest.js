import React, { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import photo_holder from "../../asset/image/photo-holder.png";
import Image from "next/image";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";
import { setDefaultEventParameters } from "firebase/analytics";
import Link from "next/link";
import moment from "moment";
// import { async } from '@firebase/util';
export default function Interest({ id }) {
  const [recived, setRecived] = useState(true);
  const [sent, setSent] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [ignored, setIgnored] = useState(false);
  const [interest, setInterest] = useState([]);
  const [sentData, setSendData] = useState([]);
  const [user, setUser] = useState({});
  const [member, setMember] = useState([]);
  const [recivedData, setRecievedData] = useState([1, 2, 3, 4, 5]);
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

  const recivedControl = () => {
    setRecived(true);
    setSent(false);
    setAccepted(false);
    setIgnored(false);
  };
  const sentControl = () => {
    setRecived(false);
    setSent(true);
    setAccepted(false);
    setIgnored(false);
  };
  const acceptedControl = () => {
    setRecived(false);
    setSent(false);
    setAccepted(true);
    setIgnored(false);
  };
  const ignoredControl = () => {
    setRecived(false);
    setSent(false);
    setAccepted(false);
    setIgnored(true);
  };

  const fetchInterest = async () => {
    const q = await query(
      collection(db, "interest"),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setInterest(snapshot.docs.map((doc) => doc));
    });
  };

  useEffect(() => {
    fetchInterest();
  }, [member]);

  useEffect(() => {
    getUser();
  }, []);

  const cancelSent = async (id) => {
    await deleteDoc(doc(db, "interest", id));
  };
  const declineRecieved = async (id) => {
    const docRef = doc(db, "interest", id);
    const updateRef = await updateDoc(docRef, {
      status: "ignored",
    });
  };
  const acceptInterest = async (id) => {
    const docRef = doc(db, "interest", id);
    const updateRef = await updateDoc(docRef, {
      status: "accepted",
    });
  };

  const hideInterest = async (id, dest) => {
    const docRef = doc(db, "interest", id);
    if (dest == "to") {
      const updateRef = await updateDoc(docRef, {
        toStatus: "remove",
      });
      // console.log(docRef)
    } else if (dest == "from") {
      const updateRef = await updateDoc(docRef, {
        fromStatus: "remove",
      });
    }
  };
  useEffect(() => {
    fetchMember();
  }, [user]);

  return (
    <div>
      {/* <button onClick={declineRecieved}>CHECK</button>
      <button onClick={() => console.log(interest)}>SENDDATA</button> */}
      <div className="interest__div">
        <div className="intr__head">
          <div
            className={recived ? "intr__head__div__active" : "intr__head__div"}
            onClick={recivedControl}
          >
            <p>Received</p>
          </div>
          <div
            className={sent ? "intr__head__div__active" : "intr__head__div"}
            onClick={sentControl}
          >
            <p>Sent</p>
          </div>
          <div
            className={accepted ? "intr__head__div__active" : "intr__head__div"}
            onClick={acceptedControl}
          >
            <p>Accepted</p>
          </div>
          <div
            className={ignored ? "intr__head__div__active" : "intr__head__div"}
            onClick={ignoredControl}
          >
            <p>Ignored</p>
          </div>
        </div>
        {recived ? (
          <div className="interest__content">
            <h5>Interests Received</h5>
            {interest.map((data, index) => {
              const prof = data.data();
              const d = data.data().from;
              const dt = data.data().date
              const date = moment.unix(dt).format("MMM DD, YY");
              if (prof.status == "sent") {
                if (prof.to.userId == user.uid) {
                  return (
                    <div className="interest__row">
                      <div className="interest__row__left grid  grid-cols-2">
                        <div className="intrest__row__img">
                          {d.photo ? (
                            <img src={d.photo} alt="" />
                          ) : (
                            <Image src={photo_holder} />
                          )}
                        </div>

                        <div className="interest__row__left__text ">
                          <Link
                            href={`/viewProfile/${encodeURIComponent(d.id)}`}
                          >
                            <h6>{d.brideName}</h6>
                          </Link>
                          <p>
                            {d.age} Yrs, {d.height} cm, {d.maritialStatus}
                          </p>
                          <p>
                            {d.highEdu} ({d.eduCourse}), {d.occupation}
                          </p>
                          <p>
                            {d.city}, {d.district}
                          </p>
                        </div>
                      </div>

                      <div className="interest__row__right">
                        <p>{date}</p>
                        <div className="interest__row__right__div md:mt-2">
                          <button
                            id="intr__acc__btn"
                            onClick={() => acceptInterest(data.id)}
                          >
                            Accept
                          </button>
                          <button
                            id="intr__dec__btn"
                            onClick={() => declineRecieved(data.id)}
                          >
                            Ignore
                          </button>
                        </div>
                      </div>
                      {/* <HighlightOffIcon id="intr__close" /> */}
                    </div>
                  );
                }
              }
            })}
          </div>
        ) : (
          ""
        )}
        {sent ? (
          <div className="interest__content">
            <h5>Interests Sent</h5>
            {interest.map((data, index) => {
              const prof = data.data();
              const d = data.data().to;
              const dt = data.data().date
              const date = moment.unix(dt).format("MMM DD, YY");
              if (prof.status == "sent") {
                if (prof.from.userId == user.uid) {
                  return (
                    <div key={index} className="interest__row">
                      <div className="interest__row__left grid grid-cols-2">
                        <div className="intrest__row__img">
                          {d.photo ? (
                            <img src={d.photo} alt="" />
                          ) : (
                            <Image src={photo_holder} />
                          )}
                        </div>

                        <div className="interest__row__left__text">
                          <Link
                            href={`/viewProfile/${encodeURIComponent(d.id)}`}
                          >
                            <h6>{d.brideName}</h6>
                          </Link>
                          <p>
                            {d.age} Yrs, {d.height} cm, {d.maritialStatus}
                          </p>
                          <p>
                            {d.highEdu} ({d.eduCourse}), {d.occupation}
                          </p>
                          <p>
                            {d.city}, {d.district}
                          </p>
                        </div>
                      </div>

                      <div className="interest__row__right">
                      <p className="md:pr-2">{date}</p>
                        <div className="interest__row__right__div">
                          
                          <button
                            id="intr__dec__btn"
                            className="md:mt-3"
                            onClick={() => cancelSent(data.id)}
                          >
                            Cancel
                          </button>

                       
                        </div>
                       
                      </div>
                      {/* <HighlightOffIcon id="intr__close" /> */}
                    </div>
                  );
                }
              }
            })}
          </div>
        ) : (
          ""
        )}
        {accepted ? (
          <div className="interest__content">
            <h5>Accepted Interests</h5>

            {interest.map((data, index) => {
              const prof = data.data();
              const fd = data.data().from;
              const td = data.data().to;
              const dt = data.data().date
              // const date = moment.unix(dt).format("MMM DD, YY");
              if (prof.status == "accepted") {
                if (td.userId == user.uid && prof.toStatus != "remove") {
                  return (
                    <div className="interest__row">
                      <div className="interest__row__left grid grid-cols-2">
                        <div className="intrest__row__img">
                          {fd.photo ? (
                            <img src={fd.photo} alt="" />
                          ) : (
                            <Image src={photo_holder} />
                          )}
                        </div>

                        <div className="interest__row__left__text">
                          <Link
                            href={`/viewProfile/${encodeURIComponent(fd.id)}`}
                          >
                            <h6>{fd.brideName}</h6>
                          </Link>

                          <p>
                            {fd.age} Yrs, {fd.height} cm, {fd.maritialStatus}
                          </p>
                          <p>
                            {fd.highEdu} ({fd.eduCourse}), {fd.occupation}
                          </p>
                          <p>
                            {fd.city}, {fd.district}
                          </p>
                        </div>
                      </div>

                      <div className="interest__row__right">
                        {/* <p>{date}</p> */}
                        <div className="interest__row__right__div">
                          <button id="intr__acc__btn" className="md:mt-5">
                            You accepted {fd.brideName}
                          </button>
                          {/* <button
                  id="intr__dec__btn"
                  onClick={()=> declineRecieved(data.id)}
                >
                Ignore
                </button> */}
                        </div>
                      </div>
                      <HighlightOffIcon
                        onClick={() => hideInterest(data.id, "to")}
                        id="intr__close"
                      />
                    </div>
                  );
                }
                if (fd.userId == user.uid && prof.fromStatus != "remove") {
                  return (
                    <div className="interest__row">
                      <div className="interest__row__left grid grid-cols-2">
                        <div className="intrest__row__img">
                          {td.photo ? (
                            <img src={td.photo} alt="" />
                          ) : (
                            <Image src={photo_holder} />
                          )}
                        </div>

                        <div className="interest__row__left__text">
                          <Link
                            href={`/viewProfile/${encodeURIComponent(td.id)}`}
                          >
                            <h6>{td.brideName}</h6>
                          </Link>
                          <p>
                            {td.age} Yrs, {td.height} cm, {td.maritialStatus}
                          </p>
                          <p>
                            {td.highEdu} ({td.eduCourse}), {td.occupation}
                          </p>
                          <p>
                            {td.city}, {td.district}
                          </p>
                        </div>
                      </div>

                      <div className="interest__row__right">
                        <div className="interest__row__right__div">
                          <button id="intr__acc__btn">
                            {td.brideName} Accepted you
                          </button>
                          {/* <button
                  id="intr__dec__btn"
                  onClick={()=> declineRecieved(data.id)}
                >
                Ignore
                </button> */}
                        </div>
                      </div>
                      <HighlightOffIcon
                        id="intr__close"
                        onClick={() => hideInterest(data.id, "from")}
                      />
                    </div>
                  );
                }
              }
            })}
          </div>
        ) : (
          ""
        )}

        {ignored ? (
          <div className="interest__content">
            <h5>Ignored Interests</h5>
            {interest.map((data, index) => {
              const prof = data.data();
              const fd = data.data().from;
              const td = data.data().to;

              if (prof.status == "ignored") {
                if (td.userId == user.uid && prof.toStatus != "remove") {
                  return (
                    <div className="interest__row">
                      <div className="interest__row__left grid grid-cols-2">
                        <div className="intrest__row__img">
                          {fd.photo ? (
                            <img src={fd.photo} alt="" />
                          ) : (
                            <Image src={photo_holder} />
                          )}
                        </div>

                        <div className="interest__row__left__text">
                          <Link
                            href={`/viewProfile/${encodeURIComponent(fd.id)}`}
                          >
                            <h6>{fd.brideName}</h6>
                          </Link>
                          <p>
                            {fd.age} Yrs, {fd.height} cm, {fd.maritialStatus}
                          </p>
                          <p>
                            {fd.highEdu} ({fd.eduCourse}), {fd.occupation}
                          </p>
                          <p>
                            {fd.city}, {fd.district}
                          </p>
                        </div>
                      </div>

                      <div className="interest__row__right">
                        <div className="interest__row__right__div">
                          {/* <button id='intr__acc__btn'
                    
                    >You ignored {fd.brideName}</button> */}
                          <button
                            id="intr__dec__btn"
                            onClick={() => declineRecieved(data.id)}
                          >
                            You ignored {fd.brideName}
                          </button>
                        </div>
                      </div>
                      <HighlightOffIcon
                        id="intr__close"
                        onClick={() => hideInterest(data.id, "to")}
                      />
                    </div>
                  );
                }
                if (fd.userId == user.uid && prof.fromStatus != "remove") {
                  return (
                    <div className="interest__row">
                      <div className="interest__row__left grid grid-cols-2">
                        <div className="intrest__row__img">
                          {td.photo ? (
                            <img src={td.photo} alt="" />
                          ) : (
                            <Image src={photo_holder} />
                          )}
                        </div>

                        <div className="interest__row__left__text">
                          <Link
                            href={`/viewProfile/${encodeURIComponent(td.id)}`}
                          >
                            <h6>{td.brideName}</h6>
                          </Link>
                          <p>
                            {td.age} Yrs, {td.height} cm, {td.maritialStatus}
                          </p>
                          <p>
                            {td.highEdu} ({td.eduCourse}), {td.occupation}
                          </p>
                          <p>
                            {td.city}, {td.district}
                          </p>
                        </div>
                      </div>

                      <div className="interest__row__right">
                        <div className="interest__row__right__div">
                          {/* <button id='intr__acc__btn'
                    
                    > {td.brideName} ignored you</button> */}
                          <button id="intr__dec__btn">
                            {td.brideName} ignored you
                          </button>
                        </div>
                      </div>
                      <HighlightOffIcon
                        id="intr__close"
                        onClick={() => hideInterest(data.id, "from")}
                      />
                    </div>
                  );
                }
              }
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
