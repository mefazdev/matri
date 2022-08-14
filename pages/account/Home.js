import React from 'react'
import AccDesktopHome from '../../components/AccDesktopHome'
import AccMobHome from '../../components/AccMobHome'
import AccountNav from '../../components/AccountNav'

export default function Home() {
  return (
    <div>
       
       
 <div className=' larg__view'>    <AccDesktopHome />
</div>
    <div className='mobile__view'><AccMobHome id='mobile__view'/></div>
        
    </div>
  )
}
