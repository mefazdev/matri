import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { onAuthStateChanged } from "firebase/auth";
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import BrowseGalleryIcon from '@mui/icons-material/BrowseGallery';
import MenuIcon from '@mui/icons-material/Menu';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CloseIcon from '@mui/icons-material/Close';
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
//   import { onAuthStateChanged } from "firebase/auth";
  import { useRouter } from 'next/router';
  import MobileMenu from './MobileMenu';
  import MobileDisplay from './MobielDispaly';
export default function MobFooterNav() {

    const router = useRouter()
    const dispatch = useDispatch();
  const open = useSelector((state) => state.searchControl);
  const openMenu = useSelector((state) => state.accMenuEditControl);
  const [user, setUser] = useState({})
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
      onSnapshot(q, (snapshot) => {
        setMember(snapshot.docs.map((doc) => doc));
      });

      // const data = await getDocs(q);+
      // setMember(data.docs.map((doc) => doc));
    }
  };

  const searchOpenControl = ()=>{
    router.push('/account/Home')
    dispatch(openSearch())
  }
  useEffect(() => {
    getUser();
  }, []);
  useEffect(()=>{
    fetchMember()
  },[user])
  return (
    <div className='b__bar flex'>

    <Link href="/account/Home"><GroupIcon id='b__bar__icons'/></Link>
    <Link href={`/account/explore/${encodeURIComponent(member[0]?.id)}`}><BrowseGalleryIcon id='b__bar__icons'/></Link>
     
     <SearchIcon
  
     id='b__bar__icons' onClick={searchOpenControl}/>


     {openMenu ?  <CloseIcon onClick={()=>dispatch(closeAccMenu())} id='b__bar__icons'/> :
       <MenuIcon onClick={()=>dispatch(openAccMenu())} id='b__bar__icons'/>
     }
   

       </div>
  )
}
