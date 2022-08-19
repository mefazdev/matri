import React, { useEffect, useState } from 'react'
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

export default function AccMobHome() {
     
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




 
            

 

       

       

      
      <MobFooterNav/>
      
      
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