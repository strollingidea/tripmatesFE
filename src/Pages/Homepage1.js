import React from 'react'
import './HomePage.scss'
import Navbar from '../Component/Navbar/Navbar'
import SecondBar from '../Component/SecondBar/SecondBar'

const Homepage1 = () => {
  return (
    <>
      <div id="homepage">
        <Navbar/>
        {/* <Menu></Menu> */}
        {/* <MobileMenu></MobileMenu> */}
        {/* <MobileSearch></MobileSearch> */}
        <SecondBar/>
        
      </div>
    </>
  )
}

export default Homepage1
