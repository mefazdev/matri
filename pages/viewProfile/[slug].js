import React, { useEffect, useState } from "react";
import AccountSidebar from "../../components/AccountSidebar";
import AccountNav from "../../components/AccountNav";
import PlaceIcon from "@mui/icons-material/Place";
import imageHolder from "../../asset/image/photo-holder.png";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SchoolIcon from "@mui/icons-material/School";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/router'
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { openProfielHide } from "../../redux/actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobFooterNav from "../../components/MobFooterNav";
import MobileDisplay from "../../components/MobielDispaly";
import MobileMenu from "../../components/MobileMenu";
import Modal from "@mui/material/Modal";


 
const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

export default function ViewProfile() {
  const dispatch = useDispatch();
  const router = useRouter()
  const id  = router.query.slug 
 
  const [profile,setProfile] = useState({})
  const [age,setAge] = useState('')
  const [user,setUser] = useState({})
  const [member,setMember] = useState([])
  const [memberAge,setMemberAge] = useState('')
  const [send,setSend] = useState(false)
  const [ignored,setIgnored] = useState(false)
  const [accepted,setAccepted] = useState(false)
  const [interest,setInterest] = useState([])
  const [blurAdress,setBlurAddress] = useState(true)
  const [payModal,setPayModal] = useState(false)
  const [addressDoc,setAdressDoc] = useState([])

  const notifyCantInterest = () => toast("You can't sent to your own profile!");
  
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
  const fetchData = async () => {
    if(id){
      // const docRef = doc(db, "member", id);
      // const docSnap = await getDoc(docRef);
  

      // setProfile(docSnap.data());
      const q = await doc(db, "member", id);
      onSnapshot(q, (snapshot) => {
        setProfile(snapshot.data());
      });
    }

  };

  const sentInterest = async ()=>{
  
    if(profile.userId != user.uid){
     
      await addDoc(collection(db, "interest"), {
       to : {
        userId:profile.userId,
       brideName:profile.name,
       age:age,
       maritialStatus:profile.maritialStatus,
       height:profile.height,
       highEdu:profile.highEdu,
       eduCourse:profile.eduCourse,
       city:profile.city,
       district:profile.district,
       occupation:profile.profession,
       photo: profile.photo,
       id:id
       },
       from: {
        userId: user.uid,
        brideName:member[0].data().brideName,
        age:memberAge,
        maritialStatus:member[0].data().maritialStatus,
        height:member[0].data().height,
        highEdu:member[0].data().highEdu,
        eduCourse:member[0].data().eduCourse ? member[0].data().eduCourse : '',
        city:member[0].data().city,
        district:member[0].data().district,
        occupation:member[0].data().profession ? member[0].data().profession : '',
        photo:member[0].data().photo ? member[0].data().photo:'',
        id:member[0].id
       },
       status:'sent',
      
       timestamp :serverTimestamp()
       
      });
    }else{
      notifyCantInterest()
    }
   
   
  }
  useEffect(()=>{
    fetchData()
  },[id])
  useEffect(()=>{
    getUser()
  },[])
  useEffect(()=>{
    fetchMember()
   
  },[user])
  
const calculate_age = ()=>{
 
  var today = new Date();
  var age_now = today.getFullYear() - profile?.bYear   ;
  var m = today.getMonth() - profile?.bMonth ;
  if (m < 0 || (m === 0 && today.getDate() < profile?.bday)){
    
    age_now--;
  }
  // console.log(age_now);
setAge(age_now)
}
const calculate_member_age = () => {
  var today = new Date();
  // var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
  var age_now = today.getFullYear() - member[0]?.data().bYear  ;
  var m = today.getMonth() - member[0]?.data().bMonth ;
  if (m < 0 || (m === 0 && today.getDate() < member[0]?.data().bday)) 
  {
      age_now--;
    
  }
   
  setMemberAge(age_now)
}

const fetchInterest = async () => {
    
  const q = await query(
    collection(db, "interest"),
    // orderBy("timestamp", "desc")
    
  );
  onSnapshot(q, (snapshot) => {
    setInterest(snapshot.docs.map((doc) => doc));

     
  });

};
const checkInterest = async ()=>{
  {interest.map((data)=>{
    
    if(data.data().from.userId == user.uid){
      if(data.data().to.userId == profile?.userId){
        if(data.data().status == 'accepted'){
          setAccepted(true)
        }else if(data.data().status == 'ignored'){
          setIgnored(true)
        }else{
          setSend(true)
        }
   
  //  console.log('kkk')
      }else{
        
      }
    }
  })}
}
useEffect(()=>{
  calculate_age()
  calculate_member_age()
},[profile])
useEffect(()=>{
  fetchInterest()
},[])
useEffect(()=>{
  checkInterest()
},)
const check = ()=>{
if(profile?.status == 'Inactive'){
  dispatch(openProfielHide()) 
}


  
}



 
const makePayment = async () => {
  setPayModal(false)
  const res = await initializeRazorpay();

  if (!res) {
    alert("Razorpay SDK Failed to load");
    return;
  }

  // Make API call to the serverless API
  const data = await fetch("/api/razorpay", { method: "POST" }).then((t) =>
    t.json()
  );
  // console.log(data);
  var options =   {
    key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
    name: "Marrysunni.com",
    currency: data.currency,
    amount: data.amount,
    order_id: data.id,
    // description: "Thankyou for your test donation",
    // image: "https://manuarora.in/logo.png",
    handler: function (response) {
      // Validate payment at server - using webhooks is a better idea.
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);

      saveAddress()
    },
    prefill: {
      name: "Marrysunni.com",
      email: "marrysunni.com@gmail.com",
      contact: "9995974895",
    },
   
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  // saveAddress()
};


const fetchAddressDoc = async () => {
  const userId = (await user) ? user.uid : null;

  if (userId) {
    const q = await query(
      collection(db, "address"),
      where("userId", "==", user?.uid),
      where("id",'==',id)
    );
    onSnapshot(q, (snapshot) => {
      const data = snapshot;
      setAdressDoc(data.docs.map((doc) => doc));
    });
  }
};
const saveAddress = async ()=>{
  await addDoc(collection(db, "address"), {
    id : id,
    userId:member[0]?.data().userId
  })
  setPayModal(false)
  

}
  useEffect(()=>{
    fetchAddressDoc()
  },[user])
   return ( 
    <div className="view">
      <AccountNav />
      <MobileMenu/>
      <div className="view__content flex">
         <div className="sidebar__div">
        <AccountSidebar />
        </div>
          {profile?.status == "Active" ? <div className="view__right">
            <div className="view__head flex">
              <div className="flex view__head__left ">
                <h6 onClick={()=>console.log(addressDoc)}>{profile.brideName}</h6>
                <p>({profile.profileId})</p>
              </div>
          
              <div className="view__head__right flex">
                <PlaceIcon id="view__loc__icon" />
                <p>{profile.city}, {profile.district}</p>
              </div>
            </div>
  
            <div className="view__main grid md:grid-cols-3">
              <div className="view__main__img">
               
  
                {profile.photo ? <img src={profile.photo} alt=''/>:   <Image alt="" src={imageHolder} />}
              </div>
              <div className="md:col-span-2 view__main__right">
                <div className="view__main__first__row  flex">
                  <PersonIcon className="view__main__icons" id='view__peron' />
                  <p>{age} yrs, {profile.height} cm, {profile.maritialStatus}</p>
                </div>
                <div className="view__main__first__row flex ">
                  <SettingsAccessibilityIcon
                  id='sett__icon'
                  className="view__main__icons"/>
                  <p>{profile.community}</p>
                </div>
                <div className="view__main__first__row flex ">
                  <AutoAwesomeIcon className="view__main__icons"
                  id='auto__icon'
                  />
                  <p>{profile.maritialStatus}</p>
                </div>
                <div className="view__main__first__row flex ">
                  <SchoolIcon className="view__main__icons"
                  id='school__icon'
                  />
                  <p>{profile.eduCourse}</p>
                </div>
                <div className="view__main__first__row flex ">
                  <PlaceIcon id='place__icon' className="view__main__icons"/>
                  <p>{profile.city}, {profile.district}</p>
                </div>
  
  
                <div className="view__like">
                    <h6  onClick={()=>console.log(member[0].id)}>Like this member?</h6>
                    <p>If you are interested in this profile, please send an Interest to this person.</p>
                {/* <button >EXPRESS INTEREST
                  <FavoriteIcon id='view__fav__icon'/>
                   </button> */}
   {send ? <button> INTEREST SENT </button> :
         accepted ? <button>  INTEREST ACCEPTED </button>:
         ignored ? <button> INTEREST DECLAINED </button> :
         <button onClick={sentInterest}>EXPRESS INTEREST   <FavoriteIcon id='view__fav__icon'/>  </button>
         }
                   <h5>
  Contact this member directly through Mobile, E-mail and Wahtsapp. 
  {/* and Chat by upgrading your membership. Upgrade Now */}
  </h5>
                </div>
              </div>
            </div>
  
            <div className="view__desc">
              <h6> Description</h6>
              <p>{profile.description}</p>
            </div>
  
            <div className="view__desc">
              <h6>Location & Contact</h6>
              
             <div
             
             className="view__loc__row"
             
             >
               
              <div className= {addressDoc[0]?.data().id == id ? "" : 'blur__address'}>
                
                <h5>{profile.address}</h5>  
              
  
              <p>Phone: {profile.phone}</p>
              <p>Secondary No : {profile.scndNumber}</p>
              <p>Whatsapp : {profile.wtspNumber}</p>
              
              </div>
              
             </div>
             {addressDoc[0]?.data().id == id ? 
             
         ''
             
             
             : <button id='view__loc__btn'
             onClick={()=>setPayModal(true)}
             >View Location & Contact</button>}
             
            </div>
  
            <div className="view__desc">
              <h6>Basic Information</h6>
              <div className="view__desc__columns grid md:grid-cols-2">
              <div>
                  <div className="flex mt-1"><p>Name : </p>
                   <h5 className="ml-2">{profile.brideName}</h5>
                  </div>
                  <div className="flex  "><p>Age : </p>
                   <h5 className="ml-2">{age}</h5>
                  </div>
                  <div className="flex  "><p>Maritial Status : </p>
                   <h5 className="ml-2">{profile.maritialStatus}</h5>
                  </div>
                  <div className="flex mt-1"><p>Marriage Plan : </p>
                   <h5 className="ml-2">{profile.mariPlan?mariPlan : 'Never Provided'}</h5>
                  </div>
                  <div className="flex mt-1"><p>Physical Challenged? : </p>
                   <h5 className="ml-2">{profile.physically}</h5>
                  </div>
  
                  
              </div>
              <div>
              <div className="flex mt-1"><p>Profile ID : </p>
                   <h5 className="ml-2">{profile.profileId}</h5>
                  </div>
                  <div className="flex  "><p>Gender : </p>
                   <h5 className="ml-2">{profile.gender}</h5>
                  </div>
                  <div className="flex  "><p>Profile created by : </p>
                   <h5 className="ml-2">
                     
                   </h5>
                  </div>
                  <div className="flex mt-1"><p>Languages known : </p>
                   <h5 className="ml-2">{profile.language ? language :'Never Provided'}</h5>
                  </div>
                  <div className="flex mt-1"><p>Physical Status : </p>
                   <h5 className="ml-2">{profile.physicalStatus?physicalStatus :'Never Provided'}</h5>
                  </div>
              </div>
              </div>
            </div>
  
            <div className="view__desc">
              <h6> Religious Information</h6>
              <div className="view__desc__columns grid md:grid-cols-2">
              <div>
                  <div className="flex mt-1"><p>Groupe : </p>
                   <h5 className="ml-2">{profile.community}</h5>
                  </div>
                  <div className="flex  "><p>Perform Namaz : </p>
                   <h5 className="ml-2">{profile.namaz ? profile.namaz :"Never Provided"}</h5>
  
                  </div>
                  <div className="flex  "><p>Madhab : </p>
                   <h5 className="ml-2">{profile.madhab? profile.madhab :'Never provided'}</h5>
                   
                  </div>
                   {profile.relgsGraduation ? <div className="flex  "><p>Religious Graduation : </p>
                   <h5 className="ml-2">{profile.relgsGraduation }</h5>
                  </div> : ''}
                  
                  
              </div>
              <div>
              
                  <div className="flex  "><p>Religious Education : </p>
                   <h5 className="ml-2">{profile.relgsEdu? profile.relgsEdu:'Not Provided'}</h5>
                  </div>
                  <div className="flex mt-1"><p>Religiousness : </p>
                   <h5 className="ml-2">{profile.religiousness}</h5>
                  </div>
                  <div className="flex mt-1"><p>Hijab : </p>
                   <h5 className="ml-2">{profile.preferHijab? profile.preferHijab:'Not Provided'}</h5>
                  </div>
              </div>
              </div>
            </div>
  
            <div className="view__desc">
              <h6> Educational & Professional Information</h6>
              <div className="view__desc__columns grid md:grid-cols-2">
              <div>
                  <div className="flex mt-1"><p>Education : </p>
                   <h5 className="ml-2">{profile.highEdu}({profile.eduCourse})</h5>
                  </div>
                  <div className="flex  "><p>Edu Details : </p>
                   <h5 className="ml-2">{profile.eduDetails? profile.eduDetails:"Not Provided"}</h5>
  
                  </div>
                  
                   
  
                  
              </div>
              <div>
              
                  <div className="flex  "><p>Profession : </p>
                   <h5 className="ml-2">{profile.profession}</h5>
                  </div>
                  <div className="flex  "><p>Professional type : </p>
                   <h5 className="ml-2">{profile.profType}</h5>
                   
                  </div>
              </div>
              </div>
            </div>
  
            <div className="view__desc">
              <h6>Physical Attributes</h6>
              <div className="view__desc__columns grid md:grid-cols-2">
              <div>
                  <div className="flex mt-1"><p>Height : </p>
                   <h5 className="ml-2">{profile.height} cm</h5>
                  </div>
                  <div className="flex  "><p>Weight : </p>
                   <h5 className="ml-2">{profile.weight} kgs</h5>
  
                  </div>
                  
                   
                  <div className="flex  "><p>Complexion : </p>
                   <h5 className="ml-2">{profile.skinTone}</h5>
                  </div>
                  
              </div>
              <div>
              
                  
                  <div className="flex  "><p>Body type : </p>
                   <h5 className="ml-2">{profile.bodyType}</h5>
                   
                  </div>
                  <div className="flex  "><p>Hair Color : </p>
                   <h5 className="ml-2">{profile.hailColor?hailColor:"Not Provided"}</h5>
                   
                  </div>
              </div>
              </div>
            </div>
  
            <div className="view__desc">
              <h6>Family Details</h6>
              <div className="view__desc__columns grid md:grid-cols-2">
              <div>
                  <div className="flex mt-1"><p>Family Type : </p>
                   <h5 className="ml-2">{profile.famType? profile.famType:"Not Provided"}</h5>
                  </div>
                  <div className="flex  "><p>Financial Status : </p>
                   <h5 className="ml-2">{profile.financialStatus}</h5>
  
                  </div>
                  
                   
                  
                  {/* <div className="flex  "><p>Living Situation : </p>
                   <h5 className="ml-2">{profile.liveWith?liveWith:'Not Provided'}</h5>
                   
                  </div> */}
                  {profile.youngerBro? <div className="flex  "><p>No of younger brother : </p>
                   <h5 className="ml-2">{profile.youngerBro}</h5>
                   
                  </div> : ''}
                  {profile.youngerSis ? <div className="flex  "><p>No of younger sister : </p>
                   <h5 className="ml-2">{profile.youngerSis}</h5>
                   
                  </div> : ''}
                  
              </div>
              <div>
              <div className="flex  "><p>Father : </p>
                   <h5 className="ml-2">{profile.father? profile.father:'Not Provided'}({profile.fatherProf?fatherProf:''})</h5>
                  </div>
                  
                  <div className="flex  "><p>Mother : </p>
                   <h5 className="ml-2">{profile.mother?fmother:'Not Provided'}({profile.motherProf?motherProf:''})</h5>
                   
                  </div>
                  
  
                  <div className="flex  "><p>Family Value : </p>
                   <h5 className="ml-2">{profile.famValue?profile.famValue:'Not Provided'}</h5>
                   
                  </div>
                  {profile.elderBro?<div className="flex  "><p>No of elder brother : </p>
                   <h5 className="ml-2">{profile.elderBro?profile.elderBro:''}</h5>
                   
                  </div>:''}
                  {profile.elderSis?  <div className="flex  "><p>No of elder sister : </p>
                   <h5 className="ml-2">{profile.elderBro ? profile.elderBro :''}</h5>
                   
                  </div> : ''}
                 
                  
              </div>
              </div>
              
  
            </div>
  
            <div className="view__desc">
              <h6>Iam looking for</h6>
              <h5>{profile.lookingFor ? lookingFor :'Not Provided'}</h5>
        </div>
  
        <div className="view__intrest__send">
          <div className="view__intrest__send__head">
              <p>Are you interested in this Profile?</p>
          </div>
          <div className="view__intrest__send__div md:flex">
              <p>If you are interested in this profile, please send an Interest to this person.</p>
         
         {send ? <button> INTEREST SENT </button> :
         accepted ? <button>  INTEREST ACCEPTED </button>:
         ignored ? <button> INTEREST DECLAINED </button> :
         <button onClick={sentInterest}>EXPRESS INTEREST  </button>
         }
        
          </div>
        </div>
          </div> :
        check()
         }    
        
     
        
      </div>
      <MobFooterNav/>


      <Modal
      open={payModal}
      >
 <div className="pay__not__modal">  
 <div className="pay__not__not"> 
 <p>  Please pay Rs 100 for view and save   contact and address of this profile.

</p>
 
<button className="pay__cncl__btn"
onClick={()=>setPayModal(false)}
>Cancel</button>
<button className="pay__ok__btn"  onClick={makePayment}>OK</button>

 </div>
 </div>
      </Modal>
      
    </div>
  );
}




