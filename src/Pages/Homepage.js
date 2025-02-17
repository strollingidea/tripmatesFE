import React from 'react'
import './HomePage.scss'
import Navbar from '../Component/Navbar/Navbar'
import SecondBar from '../Component/SecondBar/SecondBar'
import Logo from '../Images/logo.png'
import { Link, useNavigate } from 'react-router-dom'

const Homepage = () => {
  return (
    <>
      {/* <div id="homepage"> */}
        {/* <Navbar/> */}
        {/* <Menu></Menu> */}
        {/* <MobileMenu></MobileMenu> */}
        {/* <MobileSearch></MobileSearch> */}
        {/* <SecondBar/> */}
      {/* </div> */}


        <div className='container appmain'>
            <div className="logo">
              <a href="/">
                {/* <img src={Logo}/> */}
                Logo
              </a>
            </div>

            

            <div className='plantripbtn'>
              <Link to="/plantrip">Plan a new trip</Link>
            </div>
        </div>
        
    </>
  )
}

export default Homepage
