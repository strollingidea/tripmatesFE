import React from 'react'
import './HomePage.scss'
import Logo from '../Images/logo.png'
import { Link } from 'react-router-dom'
import GoogleIcon from '../Images/google_icon.png'
import EmailIcon from '../Images/email_icon.png'

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
            {/* <div className="logo">
              <a href="/">
                <img src={Logo} alt='Lost in Mountains'/>
              </a>
            </div> */}

            <div className='signupgoogle'>
              <img src={GoogleIcon} alt='GoogleIcon'/>
              <p>SignUp with Google</p>
            </div>
            
            <div className='signupgoogle'>
              <img src={EmailIcon} alt='EmailIcon'/>
              <Link to="/signup">SignUp with Email</Link>
            </div>

            <div className='already'>
              Already have an account? <span><Link to="/signup">Sign in</Link></span>
            </div>
            
        </div>
        
    </>
  )
}

export default Homepage
