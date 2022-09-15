import React, { useEffect, useState } from 'react'
import AccDesktopHome from '../../components/AccDesktopHome'
import AccMobHome from '../../components/AccMobHome'
import AccountNav from '../../components/AccountNav'

export default function Home() {
  const [windowSize, setWindowSize] = useState();


  
  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    setWindowSize(innerWidth)
    // return {innerWidth, innerHeight};
  }
  useEffect(() => {
    function handleWindowResize() {
getWindowSize()
    }

    window.addEventListener('resize', handleWindowResize);
// setWindowSize(window.removeEventListener('resize', handleWindowResize))
    // return () => {
    //   window.removeEventListener('resize', handleWindowResize);
    // };
  }, []);
// 
 useEffect(()=>{
  getWindowSize()
 },[])
  return (
    <div>
       
       {/* <button onClick={()=>console.log(windowSize.innerWidth)}>hello</button> */}
 
       {windowSize >  800 ?  <div className=' larg__view'>    <AccDesktopHome /> </div> : ''}


{windowSize <= 800 ? <div className='mobile__view'><AccMobHome id='mobile__view'/></div> :""}
    
        
    </div>
  )
}

