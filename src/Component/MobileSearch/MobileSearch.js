import React from 'react'
import './MobileSearch.scss'
const MobileSearch = ({mobSearchHandler}) => {
  return (
    <>
        <div id="mobileSearch">
            <div className="mobileSearchBar">
                <div className="select"><select name="" id=""><option value="">All</option></select></div>
                <div className="searchInput"><input type="text" placeholder='Search IMDb'/></div>
                <div className="exitBtn" onClick={()=>mobSearchHandler()}><span><i class="fa-solid fa-xmark"></i></span></div>
            </div>
        </div>
    </>
  )
}

export default MobileSearch