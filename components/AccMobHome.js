import React, { useEffect, useRef, useState } from 'react'
import AccountNav from './AccountNav'
 
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CloseIcon from '@mui/icons-material/Close';
import AccoundSidebar from "./AccountSidebar";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Display from "./Display";
import Modal from "@mui/material/Modal";
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import BrowseGalleryIcon from '@mui/icons-material/BrowseGallery';
import MenuIcon from '@mui/icons-material/Menu';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
 
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { closeAccMenu, closeSearch, openAccMenu, openSearch } from "../redux/actions";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/router';
import MobileMenu from './MobileMenu';
import MobileDisplay from './MobielDispaly';
import Link from 'next/link';
import MobFooterNav from './MobFooterNav';
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { professions } from '../asset/data/profession';
import { districts } from '../asset/data/districts';
import { cities } from '../asset/data/cities';
export default function AccMobHome() {
  const cancelButtonRef = useRef(null)
  const [openWarn,setOpenWarn] = useState(false)
    const dispatch = useDispatch();
  const open = useSelector((state) => state.searchControl);
  const openMenu = useSelector((state) => state.accMenuEditControl);
  const [user, setUser] = useState({});
  // const [openSearch, setOpenSearch] = useState(false)
  const [deatailSearch, setDetailSearch] = useState(true);
  const [idSearch, setIdSearch] = useState(false);

  const [members, setMembers] = useState([]);
  const [member, setMember] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searching, setSearching] = useState(false);

  const [fromAge, setFromAge] = useState("");
  const [toAge, setToAge] = useState("");
  const [fromHeight, setFromHeight] = useState("");
  const [toHeight, setToHeight] = useState("");
  const [mariStatus, setMariStatus] = useState("");
  const [org, setOrg] = useState("");
  const [edu, setEdu] = useState("");
  const [rlgsEdu, setRlgsEdu] = useState("");
  const [rlgsGradu, setRlgsGradu] = useState("");
  const [prof, setProf] = useState("");
  const [dist, setDist] = useState("");
  const [city, setCity] = useState("");
 const [onSpin,setOnSpin] = useState(false)

 const [limitFrom,setLimitFrom] = useState(0)
 const [limitTo,setLimitTo] = useState(30)
 const [pageCount, setPageCount] = useState(1)
  const router = useRouter();



  const enableDeatailSearch = () => {
    setDetailSearch(true);
    setIdSearch(false);
  };
  const enableIdSearch = () => {
    setDetailSearch(false);
    setIdSearch(true);
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

      // const data = await getDocs(q);
      // setMember(data.docs.map((doc) => doc));
    }
  };
  const fetchData = async () => {
    const gender = member[0]?.data().gender == "Male" ? "Female" : "Male";
    if (gender) {
      const q = await query(
        collection(db, "member"),

        where("gender", "==", gender),
        where("status", "==", "Active"),
        // limit(1)

        // where('district','==','Kannur')
      );
      const data = await getDocs(q);
      setMembers(data.docs.map((doc) => doc));
    }
  };

  const getUser = () => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  };
  useEffect(() => {
    fetchData();
  }, [member]);
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    fetchMember();
  }, [user]);

  const searchById = () => {
    setSearching(true);

    if (member[0]?.data().status == "Active") {
      members.map((data) => {
        if (data.data().status == "Active") {
          if (data.data().profileId == searchId) {
            router.push(`/viewProfile/${encodeURIComponent(data.id)}`);
          }
        }
      });
    } else if (member[0]?.data().status !== "Active") {
      alert("Please activate your profile to see others");
    }
  };

  const searchProfiles = async () => {
    dispatch(closeSearch())
    setOnSpin(true)
    let ar = [];
    if (fromAge && toAge) {
      members.map((d) => {
        var today = new Date();

        var age_now = today.getFullYear() - d.data().bYear;
        var m = today.getMonth() - d.data().bMonth;
        if (m < 0 || (m === 0 && today.getDate() < d.data().bday)) {
          age_now--;
        }
        if (fromAge <= age_now && toAge >= age_now) {
          ar = [...ar, d];
        }
      });
    }

    if (fromHeight && toHeight) {
      if (ar.length) {
        ar.map(async (d, index) => {
          if (
            d.data().height < parseInt(toHeight) ||
            d.data().height > parseInt(toHeight)
          ) {
            await ar.splice(index, 1);

            console.log("ind", d.data().height);
          }
          // console.log('arr')
        });
      } else {
        let f = "11";
        members.map((d) => {
          if (
            d.data().height > parseInt(fromHeight) &&
            d.data().height < parseInt(toHeight)
          ) {
            ar = [...ar, d];
            setMembers(ar);
            console.log(d.data().height);
          }
        });
      }
    }

    if (mariStatus) {
      if (ar.length) {
        console.log("lenght und");
        ar.map((d, index) => {
          if (d.data().maritialStatus !== mariStatus) {
            ar.splice(index, 1);
            setMembers(ar);
          }
        });
      } else {
        members.map((d) => {
          if (d.data().maritialStatus == mariStatus) {
            ar = [...ar, d];
            setMembers(ar);
          }
        });
      }
    }

    if (org) {
      if (ar.length) {
        console.log("its org", ar);
        ar.map((d, index) => {
          if (d.data().community !== org || d.data().madhab !== org) {
            ar.splice(index, 1);
          }
        });
      } else {
        console.log("its org");
        members.map(async (d) => {
          if (d.data().community === org) {
            console.log("comm", d.data().community);
            ar = await [...ar, d];

            setMembers(ar);
          }
        });
      }
    }

    if (edu) {
      if (ar.length) {
        console.log("its org", ar);
        ar.map((d, index) => {
          if (d.data().community !== edu) {
            ar.splice(index, 1);
          }
        });
      } else {
        console.log("its edu");
        members.map(async (d) => {
          if (d.data().highEdu === edu) {
            ar = await [...ar, d];

            setMembers(ar);
          } else {
            setMembers(ar);
          }
        });
      }
    }

    if (rlgsEdu) {
      if (ar.length) {
        console.log("its rlgs", ar);
        ar.map((d, index) => {
          if (d.data().relgsEdu !== rlgsEdu) {
            ar.splice(index, 1);
          }
        });
      } else {
        console.log("its rlgs");
        members.map(async (d) => {
          if (d.data().relgsEdu === rlgsEdu) {
            ar = await [...ar, d];

            setMembers(ar);
          } else {
            setMembers(ar);
          }
        });
      }
    }

    if (rlgsGradu) {
      if (ar.length) {
        ar.map((d, index) => {
          if (d.data().relgsGraduation !== rlgsGradu) {
            ar.splice(index, 1);
          }
        });
      } else {
        members.map(async (d) => {
          if (d.data().relgsGraduation === rlgsGradu) {
            ar = await [...ar, d];

            setMembers(ar);
          } else {
            setMembers(ar);
          }
        });
      }
    }

    if (rlgsGradu) {
      if (ar.length) {
        ar.map((d, index) => {
          if (d.data().relgsGraduation !== rlgsGradu) {
            ar.splice(index, 1);
          }
        });
      } else {
        members.map(async (d) => {
          if (d.data().relgsGraduation === rlgsGradu) {
            ar = await [...ar, d];

            setMembers(ar);
          } else {
            setMembers(ar);
          }
        });
      }
    }
    if (prof) {
      if (ar.length) {
        ar.map((d, index) => {
          if (d.data().profession !== prof) {
            ar.splice(index, 1);
          }
        });
      } else {
        members.map(async (d) => {
          if (d.data().profession === prof) {
            ar = await [...ar, d];

            setMembers(ar);
          } else {
            setMembers(ar);
          }
        });
      }
    }

    if (dist) {
      if (ar.length) {
        ar.map((d, index) => {
          if (d.data().district !== dist) {
            ar.splice(index, 1);
          }
        });
      } else {
        members.map(async (d) => {
          if (d.data().district === dist) {
            ar = await [...ar, d];

            setMembers(ar);
          } else {
            setMembers(ar);
          }
        });
      }
    }

    if (city) {
      if (ar.length) {
        ar.map((d, index) => {
          if (d.data().city !== city) {
            ar.splice(index, 1);
          }
        });
      } else {
        members.map(async (d) => {
          if (d.data().city === city) {
            ar = await [...ar, d];

            setMembers(ar);
          } else {
            setMembers(ar);
          }
        });
      }
    }

    dispatch(closeSearch())
    
 setOnSpin(false)
  
  };
  useEffect(() => {
    if (open == true) {
      fetchData();
    }
  }, [open]);



  const next = ()=>{
    setPageCount( pageCount += 1)
    setLimitFrom(limitFrom+=30)
    setLimitTo(limitTo+=30)
   
  }
  const prev = ()=>{
if(pageCount > 1){
  setPageCount( pageCount -= 1)

}


if(limitFrom > 1){
  setLimitFrom(limitFrom-=30)
  setLimitTo(limitTo-=30)
}
 
  }

  const warnProComplete = ()=>{
    
    if(member[0]){
      if(member[0].data().lookingFor == null)
      setOpenWarn(true)
      
    }
  }

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const controlOpen = async () => {
    await timeout(6000);
    warnProComplete()
  };
 
  useEffect(()=>{
    // console.log("its mobile >>>>>>>>>")
   controlOpen()
  },[member])
  return (
    <div className='mob'>
        <AccountNav/>

        <MobileMenu />
<div className='mob__content'>


  {members.map((data,index) => {
     if (data.data().gender !== member[0]?.data().gender)
   
     
     {
      var today = new Date();

      var age_now = today.getFullYear() - data.data().bYear;
      var m = today.getMonth() - data.data().bMonth;
      if (
        m < 0 ||
        (m === 0 && today.getDate() < data.data().bday)
      ) {
        age_now--;
      }
return(
  <MobileDisplay
  key={index}
  name={data.data().brideName}
  height={data.data().height}
  weight={data.data().weight}
  city={data.data().city}
  community={data.data().community}
  highEdu={data.data().highEdu}
  occupation={
    data.data().profession ? data.data().profession : ""
  }
  gender={data.data().gender}
  photo={data.data().photo ? data.data().photo : ""}
  wtspNumber={data.data().wtspNumber}
  phone={data.data().phone}
  age={age_now}
  id={data.id}
  userId={data.data().userId}
  maritialStatus={data.data().maritialStatus}
  eduCourse={
    data.data().eduCourse ? data.data().eduCourse : ""
  }
  district={data.data().district}
  profileId = {data.data().profileId}

  />
)

    }
  })}

</div>




 
            

 

       
 {/* <<<<<<<<< SEARCH MODAL >>>>>>>>>>>>>>>> */}
 <Modal
        id="search__modal"
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="search">
          <div className="search__head flex">
            <div className="flex">
              <div
                className="search__btn"
                id={deatailSearch ? "search__btn__active" : ""}
                onClick={enableDeatailSearch}
              >
                Search Profile
              </div>
              <div
                className="search__btn"
                id={idSearch ? "search__btn__active" : ""}
                onClick={enableIdSearch}
              >
                ID Search
              </div>
            </div>

            <HighlightOffIcon
              id="search__head__close"
              onClick={() => dispatch(closeSearch())}
            />
          </div>

          <div className="search__content">
            {deatailSearch ? (
              <div>
                <div className="search__row flex">
                  <p>Age</p>
                  <div className="flex search__row__right">
                    <input
                      type="number"
                      value={fromAge}
                      onChange={(e) => setFromAge(e.target.value)}
                    />
                    to
                    <input
                      type="number"
                      value={toAge}
                      onChange={(e) => setToAge(e.target.value)}
                    />
                  </div>
                </div>

                <div className="search__row flex">
                  <p>Height (cm)</p>
                  <div className="flex search__row__right">
                    <input
                      value={fromHeight}
                      onChange={(e) => setFromHeight(e.target.value)}
                      type="number"
                    />
                    to
                    <input
                      value={toHeight}
                      onChange={(e) => setToHeight(e.target.value)}
                      type="number"
                    />
                  </div>
                </div>

                <div className="search__row flex">
                  <p>Maritial Status</p>
                  <div className=" search__madhab">
                    <select onChange={(e) => setMariStatus(e.target.value)}>
                      <option value="">Any</option>
                      <option>Never Married</option>
                      <option>Widowed/Widower</option>
                      <option>Divorced</option>
                      <option>Nikah Divorce </option>
                      <option>Married</option>
                      <option>Awaiting Divorce</option>
                    </select>
                  </div>
                </div>

                <div className="search__row flex">
                  <p>Organization/Madhab</p>
                  <div className=" search__madhab">
                    <select onChange={(e) => setOrg(e.target.value)}>
                      <option value="">select</option>
                      <option>AP</option>
                      <option>EK</option>
                      <option>Samsthana</option>
                      <option>Dakshina</option>
                      <option>Shafi</option>
                      <option>Hanafi</option>

                      <option>Maliki</option>
                      <option>Hambali</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="search__row flex">
                  <p>Education</p>
                  <div className=" search__madhab">
                    {/* <select>
                      <option>select</option>
                      <option>Any</option>
                      <option>Graduation and above</option>
                      <option>Pg and above</option>
                      <option>Doctorate and above</option>
                      <option>Engineering/Technology</option>
                      <option>Masters in Engineering</option>
                      <option>Medicine-Allopathic</option>
                      <option>Masters in Medicine-Allopathic</option>
                      <option>Medicine-Dental,Homeo,Ayurveda</option>
                      <option>
                        
                        Masters in Medicine-Dental,Homeo,Ayurveda
                      </option>
                      <option>Arts/Science/Commerce</option>
                      <option>Paramedical / Nursing</option>
                      <option>Diploma / Associate Degree</option>
                      <option>Management/Administration</option>
                      <option>Finance/CA</option>
                      <option>Bachlors / Masters/ Law</option>
                      <option>Religious Education</option>
                      <option>Higher Secondary School</option>
                    </select> */}
                    <select onChange={(e) => setEdu(e.target.value)}>
                      <option value="">Please Select</option>
                      <option>Bachlors</option>
                      <option>Masters</option>
                      <option>Doctorate</option>
                      <option>Dipoloma</option>
                      <option>Trade School/TTC/ITI</option>
                      <option>Islamic Education</option>
                      <option>High/Seceondary school</option>
                      <option>Less than high school</option>
                    </select>
                  </div>
                </div>
                <div className="search__row flex">
                  <p>Religious Education</p>
                  <div className=" search__madhab">
                    <select onChange={(e) => setRlgsEdu(e.target.value)}>
                      <option value="">select</option>
                      <option>Basic</option>
                      <option>10</option>
                      <option>+2</option>
                      <option>Graduation</option>
                      <option>Scholar</option>
                    </select>
                  </div>
                </div>

                <div className="search__row flex">
                  <p>Religious Graduation</p>
                  <div className=" search__madhab">
                    <select onChange={(e) => setRlgsGradu(e.target.value)}>
                      <option value="">select</option>

                      <option>Saqafi</option>
                      <option>Faizy</option>
                      <option>Sa&apos;adi</option>
                      <option>Latheefi</option>
                      <option>Baqavi</option>
                      <option>Nurani</option>
                      <option>Hudawi</option>
                      <option>Wafi</option>

                      <option>Wafiyya</option>
                      <option>Hadiya</option>
                    </select>
                  </div>
                </div>
                <div className="search__row flex">
                  <p>Profession</p>
                  <div className=" search__madhab">
                    <select onChange={(e) => setProf(e.target.value)}>
                      <option value="">select</option>

                      {professions.map((d, index) => {
                        return <option key={index}>{d}</option>;
                      })}
                    </select>
                  </div>
                </div>

                <div className="search__row flex">
                  <p>District</p>
                  <div className=" search__madhab">
                    <select onChange={(e) => setDist(e.target.value)}>
                      <option value="">Plaease select</option>
                      <option>Any</option>
                      {districts.map((d, index) => {
                        return <option key={index}>{d}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className="search__row flex">
                  <p>City</p>
                  <div className=" search__madhab">
                    <select onChange={(e) => setCity(e.target.value)}>
                      <option value="">Plaease select</option>
                      {cities.map((d, index) => {
                        return <option key={index}>{d}</option>;
                      })}
                    </select>
                  </div>

                  {/* <p>{dist}</p> */}
                </div>
                <div className="search__btn__div">
                  <button onClick={searchProfiles}>Search</button>
                </div>
              </div>
            ) : (
              <div className="id__search">
                <div className="grid lg:grid-cols-5">
                  <p>Search with profile ID</p>

                  <div className="flex">
                    <input
                      onChange={(e) => setSearchId(e.target.value)}
                      placeholder="Enter ID"
                    />
                    <button onClick={searchById}>Search</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
       
<Transition.Root show={
openWarn
} as={Fragment}>
      <Dialog as="div" className="relative z-10" 
      // initialFocus={cancelButtonRef}
       onClose={setOpenWarn}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <WarningAmberIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h5" className="text-lg font-medium leading-6 text-gray-900">
                        Complete profile!
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Please make sure you have added all details in your profile.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
<Link  href={`/account/editProfile/${encodeURIComponent(member[0]?.id)}`}
><button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    // onClick={deleteProfile}
                  >
                    Add
                  </button></Link>
                  
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpenWarn(false)}
                    ref={cancelButtonRef}
                  >
                    Not now
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
      
      <MobFooterNav member ={member}/>
      
   
    </div>
  )
}


{/* <div className="acc__mob__profiles ">
                
<div className="acc__desk__right__header flex">
<button
    id="acc__left__btn"
    onClick={() => dispatch(openSearch())}
>
    Modify Preference <KeyboardDoubleArrowRightIcon />
</button>

   
    
</div>  

<div className="acc__desk__right__row grid lg:grid-cols-2 gap-2    ">
{members.map((data, index) => {
    
    if (data.data().gender !== member[0]?.data().gender) {
    var today = new Date();

    var age_now = today.getFullYear() - data.data().bYear;
    var m = today.getMonth() - data.data().bMonth;
    if (
        m < 0 ||
        (m === 0 && today.getDate() < data.data().bday)
    ) {
        age_now--;
    }

    return (
        <Display
        key={index}
        name={data.data().brideName}
        height={data.data().height}
        weight={data.data().weight}
        city={data.data().city}
        community={data.data().community}
        highEdu={data.data().highEdu}
        occupation={
            data.data().profession ? data.data().profession : ""
        }
        gender={data.data().gender}
        photo={data.data().photo ? data.data().photo : ""}
        wtspNumber={data.data().wtspNumber}
        phone={data.data().phone}
        age={age_now}
        id={data.id}
        userId={data.data().userId}
        maritialStatus={data.data().maritialStatus}
        eduCourse={
            data.data().eduCourse ? data.data().eduCourse : ""
        }
        district={data.data().district}
        />
    );
    }
})}
</div>
</div> */}