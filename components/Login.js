import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { signInWithEmailAndPassword, onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PhoneInput from "react-phone-number-input";
import { useSelector, useDispatch } from "react-redux";
import { closeLogin } from "../redux/actions";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import OtpInput from "react-otp-input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const open = useSelector((state) => state.loginControl);
  const [member, setMember] = useState([]);
  const [user, setUser] = useState({});
  const [da, setDa] = useState("");
const [loginOn,setLoginOn] = useState(false)
  const [otp, setOtp] = useState("");
  const [verifyModal, setVerifyModal] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const login = async () => { 
    setLoginOn(true) 
    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate();
      dispatch(closeLogin());
      setLoginOn(false) 
      // router.push('/account/Home')
    } catch (error) {
      alert(error);
      setLoginOn(false) 
    }
  };

  const getUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  };
  const fetchMember = async () => {
    const userId = (await user) ? user.uid : null;
    
      console.log(userId)
    if (userId) {
      const q = await query(
        collection(db, "member"),
        where("userId", "==",userId
        //  user?.uid
         )
      );

      const data = await getDocs(q);
      setMember(data.docs.map((doc) => doc));
      console.log(data.docs.map((doc) => doc))
    }
  };

  const navigate = async () => {
 await   getUser()
  await  fetchMember()
    // if(member[0].data().basic !== true){
    //   console.log(member[0]?.data().basic)
    // }
    if (member[0]) {
      if (member[0]?.data().basic !== true) {
        router.push("/profilecreation/Basic");
      } else if (member[0]?.data().accEdu !== true) {
        router.push("/profilecreation/Education");
      } else if (member[0]?.data().accDesc !== true) {
        router.push("/profilecreation/Description");
      } else if (member[0]?.data().accDesc == true) {
        router.push("/account/Home");
      }
    }else{
       
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    fetchMember();
  }, [user]);

  const checkLoginMethod = () => {
    setLoginOn(true) 
    if (phone.length >= 10) {
      sendOtp();
    } else {
      login();
    }
  };
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "home__main__form__btn",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };
  const sendOtp = async () => {
    // e.preventDefault();

    if (window.recaptchaVerifier == null) {
      generateRecaptcha();
    }

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confiromationResult) => {
        window.confiromationResult = confiromationResult;
        //  console.log('yess>>',confiromationResult)
        setVerifyModal(true);
        dispatch(closeLogin());
        
      })
      .catch((error) => {
        alert(error);
        setLoginOn(false) 
      });
  };

  const verifyOtp = () => {
    setVerifying(true);
    if (otp.length == 6) {
      let confiromationResult = window.confiromationResult;
      confiromationResult
        .confirm(otp)
        .then((result) => {
           getUser()
          setVerifying(false);
          navigate()
          setLoginOn(false) 
        })
        .catch((error) => {
          alert(error);
        });
    }
  };


  const resetPassword = ()=>{
    sendPasswordResetEmail(auth, email)
  .then(() => {
   alert(" We have sent a email. Please check your regitered Email.")
  })
  .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    alert('Your signin method is with phone number')
    // ..
  });
  }
  return (
    <div>
      <Modal
        id="search__modal"
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="login">
          <HighlightOffIcon
            onClick={() => dispatch(closeLogin())}
            id="login__close"
          />
          {/* <h4>Welcome Back </h4> */}
          {/* <button onClick={
            fetchMember
            ()=>console.log(member[0].data())

            }>click</button> */}
          <h3 className="mt-5 mb-4" >Sign in with</h3>

          <div className="login__row ">
            <p>Phone Number</p>
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
            {/* <input onChange={(e)=>setEmail(e.target.value.trim())} /> */}
          </div>

          <h2>OR</h2>
          <div className="login__row">
            <p>Email</p>
            <input onChange={(e) => setEmail(e.target.value.trim())} />
          </div>
          <div className="login__row ">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value.trim())}
              type="password"
            />
          </div>
          <h6 onClick={resetPassword}>Forgot password?</h6>

          <button
          id='home__main__form__btn'
            // onClick={navigate}
            onClick={checkLoginMethod}
          >
            {loginOn ? "Login...." : ' Login'}
           
          </button>

          {/* <button onClick={testing}>Testing</button> */}
          {/* <p>{da}</p> */}
          {/* <p>{email.length}</p> */}
          <div>
            <Link href="/">
              <h5 onClick={() => dispatch(closeLogin())}>
                New Here?{" "}
                <span style={{ color: "rgb(10, 65, 127)" }}>Register Free</span>{" "}
              </h5>
            </Link>
          </div>
        </div>
      </Modal>
      <Modal
        id="verfyModal"
        open={verifyModal}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="otp__right  ">
          <div className="otp__box">
            <div className="otp__box__row">
              <h6>Please enter the verifiction code sent to </h6>

              <p> {phone}</p>
{/* <button onClick={
  ()=>console.log(member)
  fetchMember
  }
>click</button> */}
              <span></span>

              <div className="otp__row">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  // separator={<span>-</span>}
                  inputStyle="otp__inpt__style"
                  isInputNum={true}
                  shouldAutoFocus={true}
                  hasErrored={true}
                />
              </div>
              <div className="otp__div__btn" id="sign">
                {/* <button className="otp__div__btn__left">Resend</button> */}
                <button className="otp__div__btn__right" onClick={verifyOtp}>
                  {verifying ? "Verifying" : "Submit"}
                </button>
              </div>
            </div>
          </div>
          :
          {/* <div className="otpDone">
               <div className="otpDone__row">
                <h6><span style={{color:'rgb(0, 128, 64)',fontWeight:'bold'}}>Congartulations!</span> You have successfully verified your contact number</h6>
              <div className="otpDone__row__btn">
                
                 
                 
                 
                 
                 
                  <button
                onClick={verifyOtp}
                >Submit</button>
                
                
              </div>
               </div>
            </div>
             */}
        </div>
      </Modal>
    </div>
  );
}
