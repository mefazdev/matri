import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import arab from "../asset/image/arab.png";
import PhoneInput from "react-phone-number-input";
// import PhoneInput from "react-phone-number-input/react-hook-form-input"
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import moment from "moment";

import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import shortId from "short-id";
export default function Home() {
  const [phone, setPhone] = useState();
  const [check, setCheck] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createFor, setCrateFor] = useState("");
  const [brideName, setBridName] = useState("");
  const [gender, setGender] = useState("");
  const router = useRouter();
  const [user, setUser] = useState({});

  const profId = shortId.generate();

  const [member, setMember] = useState([]);

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
    const users = await createUserWithEmailAndPassword(auth, email, password);

    //  await getUser()
    // console.log(user.uid)
    await addData(users.user.uid);
    router.push("/profilecreation/Basic");
  };
  const addData = async (uid) => {
    const docRef = await addDoc(collection(db, "member"), {
      userId: uid,
      createFor: createFor,
      brideName: brideName,
      phone: phone,
      email:email,
      gender: gender,
      date: moment(new Date()).unix(),
      profileId: profId,
      timesTamp: serverTimestamp(),
    });
  };

  const navigate = () => {
    if (user && member[0]?.data().accDesc == true) {
      router.push("/account/Home");
    }
  };

  useEffect(() => {
    fetchMember();
  }, [user]);
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    navigate();
  }, [member]);
  return (
    <div>
      <Head>
        <title>Sunni Matrimonial Website Kerala</title>
        <meta name="description" content="Best Sunni Matrimonial Website in Kerala | Best Muslim Matrimonial website in Kerala" />
        <meta property="og:title" content="Home" key="title" />
        <link rel="canonical" href="https://marrysunni.com" />
        <link rel="icon" 
        href="/logo-black.png"
        // href="/favicon.ico" 
        />
      </Head>
      <Header />
      <div className="home">
        {/* <button onClick={()=>console.log(phone)}>CLICK</button> */}
        <div className="home__main ">
          <div className="home__main__div  grid    md:grid-cols-3  ">
            <div className="home__main__img">
              <Image src={arab} alt="" />
              {/* <img src='https://cdn.imgbin.com/8/1/13/imgbin-stock-photography-saudi-arabia-arabs-others-twjKwciWNEz7mKVv2N2mWBnZ6.jpg' /> */}
            </div>
            <div className="home__main__right md:col-span-2">
              <h2>
                Join Kerala&apos;s No.1 Sunni Matrimonial <br /> Web App
              </h2>
              {/* <h1 onClick={()=>console.log(id)}>he;lloo</h1> */}
              <form onSubmit={submitForm}>
                <div className="main__form__head">
                  <p>Register now , Its free!</p>
                </div>
                <div className="main__form__row grid md:grid-cols-2  gap-3 md:gap-10">
                  <div className="main__form__row__left">
                    <p>
                      Create profile for<span style={{ color: "red" }}>*</span>{" "}
                    </p>
                    <select
                      onChange={(e) => setCrateFor(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option>Myself</option>
                      <option>Daughter</option>
                      <option>Son</option>
                      <option>Sister</option>
                      <option>Brother</option>
                      <option>Friend</option>
                      <option>Relative</option>
                    </select>
                  </div>
                  <div className="main__form__row__right">
                    <p>
                      Bride / Groom name<span style={{ color: "red" }}>*</span>
                    </p>
                    <input
                      required
                      onChange={(e) => setBridName(e.target.value)}
                      placeholder="Bride / Groom name"
                    />
                  </div>
                </div>

                <div className="main__form__row grid md:grid-cols-2  gap-3 md:gap-10">
                  <div>
                    <p>
                      Phone<span style={{ color: "red" }}>*</span>
                    </p>
                    <div className="phone__input ">
                      <PhoneInput
                        name="phone"
                        className="pl-2"
                        placeholder="Phone"
                        value={phone}
                        onChange={setPhone}
                        required
                        defaultCountry="IN"
                      />
                    </div>
                  </div>
                  <div className="main__form__row__right">
                    <p>
                      Gender<span style={{ color: "red" }}>*</span>
                    </p>
                    <div className="flex md:mt-4 main__form__gender">
                      <label>Male</label>
                      <input
                        name="gender"
                        type="radio"
                        value="Male"
                        required
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label>Female</label>
                      <input
                        name="gender"
                        type="radio"
                        value="Female"
                        required
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="main__form__row grid md:grid-cols-2  gap-3 md:gap-10">
                  <div className="main__form__row__left">
                    <p>
                      Email<span style={{ color: "red" }}>*</span>{" "}
                    </p>
                    <input
                      placeholder="Email"
                      required
                      type="email"
                      onChange={(e) => setEmail(e.target.value.trim())}
                    />
                  </div>
                  <div className="main__form__row__right">
                    <p>
                      Password<span style={{ color: "red" }}>*</span>
                    </p>
                    <input
                      placeholder="Password"
                      required
                      onChange={(e) => setPassword(e.target.value.trim())}
                    />
                  </div>
                </div>
                {/* <div className='main__form__row   '> */}
                <div className="main__form__check__div">
                  {/* <div className='flex'> */}
                  <input
                    id="main__form__checkbox"
                    type="checkbox"
                    checked={check}
                    onChange={() => setCheck(!check)}
                  />
                  <p>
                    {" "}
                    By clicking register free, you accept our <Link  href='/Terms'><span style={{color:'blue',cursor:'pointer'}}>T&C</span></Link> and <Link href='/Privacy'><span style={{color:'blue',cursor:'pointer'}}>Privacy
                    Policy</span></Link> 
                  </p>

                  {/* </div> */}
                </div>

                {/* </div> */}
                <div className=" flex home__main__form__btn__div">
                  {/* <Link href='/profilecreation/Basic'> */}
                  <button
                    disabled={!check}
                    type="submit"
                    id="home__main__form__btn"
                  >
                    Register Free
                  </button>

                  {/* </Link> */}
                </div>
              </form>
            </div>
          </div>
        </div>
   </div>

    <Footer/> 
    </div>
  );
}
