import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import couples from "../../asset/image/couples.png";
import Image from "next/image";
import Footer from "../../components/Footer";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import Router, { useRouter } from "next/router";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { days, years, months } from "../../asset/data/date";

export default function Basic() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [skinTone, setSkinTone] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [physically, setPhysically] = useState("no");
  const [maritialStatus, setMaritialStatus] = useState("");
  const [user, setUser] = useState({});
  const [member, setMember] = useState([]);
  const router = useRouter();

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

      const data = await getDocs(q);
      setMember(data.docs.map((doc) => doc));
    }
    
  };
  const submitForm = async (e) => {
    e.preventDefault();

    const id = member[0].id;
    const docRef = doc(db, "member", id);
    const updateRef = await updateDoc(docRef, {
      bDay: day,
      bMonth: month,
      bYear: year,
      height: height,
      weight: weight,
      skinTone: skinTone,
      bodyType: bodyType,
      physically: physically,
      maritialStatus: maritialStatus,
      
      basic: true,
    });

    router.push("/profilecreation/Education");
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    fetchMember();
  }, [user]);

  return (
    <>
      <Header />
      <div className="pf__crtn ">
        <div className="pf__crtn__div grid md:grid-cols-3">
          <div className="pf__crtn__left">
            <h3>Tell us about your basic details</h3>
            {/* <p>
              Greate you have completed{" "}
              <span style={{ color: "rgb(0, 128, 51)" }}> 20%</span>{" "}
            </p> */}
            <div className="pf__crtn__left__img">
              <Image src={couples} />
            </div>
            {/* <button onClick={  
              () => 
              console.log(physically)
               }>CLICKME </button> */}
          </div>

          <div className="pf__crtn__right md:col-span-2">
            <form onSubmit={submitForm}>
              <div className="pr__crtn__row ">
                <p>
                  Date of Birth<span style={{ color: "red" }}>*</span>
                </p>
                <div className=" gap-1 md:gap-5 grid  md:grid-cols-3">
                  <select onChange={(e) => setDay(e.target.value)} required>
                    <option value="">Day</option>
                    {days.map((day, index) => {
                      return (
                        <option value={day} key={index}>
                          {day}
                        </option>
                      );
                    })}
                  </select>
                  <select onChange={(e) => setMonth(e.target.value)} required>
                    <option value="">Month</option>
                    {months.map((month, index) => {
                      return <option key={index}>{month}</option>;
                    })}
                  </select>
                  <select onChange={(e) => setYear(e.target.value)} required>
                    <option value="">Year </option>
                    {years.map((year, index) => {
                      return <option key={index}>{year}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className="pr__crtn__second__row gap-2 md:gap-10 grid md:grid-cols-2">
                <div>
                  <p>
                    Height<span style={{ color: "red" }}>*</span>
                  </p>

                  <input
                    onChange={(e) => setHeight(e.target.value)}
                    value={height}
                    placeholder="Height in cm"
                    type="number"
                    required
                  />
                </div>
                <div>
                  <p>
                    Weight<span style={{ color: "red" }}>*</span>
                  </p>
                  <input
                    placeholder="Weight in kg"
                    type="number"
                    onChange={(e) => setWeight(e.target.value)}
                    value={weight}
                    required
                  />
                </div>
              </div>
              <div className="pr__crtn__second__row gap-2 md:gap-10 grid md:grid-cols-2">
                <div>
                  <p>
                    {" "}
                    Skin Tone<span style={{ color: "red" }}>*</span>
                  </p>
                  <select
                    onChange={(e) => setSkinTone(e.target.value)}
                    required
                  >
                    <option value="">Please Select</option>
                    <option>Very Fair</option>
                    <option>Fair</option>
                    <option>Wheatish</option>
                    <option>Wheatish Brown</option>
                    <option>Dark</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <p>
                    Body type<span style={{ color: "red" }}>*</span>
                  </p>
                  <select
                    onChange={(e) => setBodyType(e.target.value)}
                    required
                  >
                    <option value="">Please select</option>
                    <option>Slim</option>
                    <option>Average</option>
                    <option>Athletic</option>
                    <option>Heavy</option>
                  </select>
                </div>
              </div>
              <div className="pr__crtn__second__row gap-2 md:gap-10 grid md:grid-cols-2">
                <div>
                  <p>
                    Physically challenged?
                    <span style={{ color: "red" }}>*</span>
                  </p>
                  <select
                    onChange={(e) => setPhysically(e.target.value)}
                    required
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
                <div>
                  <p>
                    Maritial Status<span style={{ color: "red" }}>*</span>
                  </p>
                  <select
                    onChange={(e) => setMaritialStatus(e.target.value)}
                    required
                  >
                    <option value="">Please Select</option>
                    <option>Never Married</option>
                    <option>Divorced</option>
                    <option>Widowed/Widower</option>
                    <option>Awaiting Divorce</option>
                    <option>Nikah Divorce</option>
                    <option>Married</option>
                    <option>Awaiting Divorce</option>
                  </select>
                </div>
              </div>

              <div className="pr__crtn__third__row">
                <Link href="/">
                  <button id="pr__crtn__btn__one">Prev</button>
                </Link>

                <button
                  id="pr__crtn__btn__two"
                  type="submit"
                  // onClick={submitForm}
                  // onClick={()=>router.push('/profilecreation/Education')}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

{
  /* <div className='pr__crtn__second__row'>
                <p>Maritial Status<span style={{color:'red'}}>*</span>  </p>
                <div className='maritial__status__row gap-1 grid grid-cols-2 md:grid-cols-3'>
                  <div className='flex maritial__status__row__input__row'><p>Never married</p><input type='radio' /></div>
                  <div className='flex maritial__status__row__input__row'><p>Divorced</p><input type='radio' /></div>
                  <div className='flex maritial__status__row__input__row '><p >Windowed/Windower</p><input type='radio' /></div>
                  
                  <div className='flex maritial__status__row__input__row'><p>Awaiting divorce</p><input type='radio' /></div>
                  <div className='flex maritial__status__row__input__row'><p>Nikah divorce</p><input type='radio' /></div>
                  <div className='flex maritial__status__row__input__row'><p>Married</p><input type='radio' /></div>
                </div>
               </div> */
}
