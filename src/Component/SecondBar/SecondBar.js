import React, { useState } from 'react'
import './SecondBar.scss';
const SecondBar = ()=>{
    return(
        <div id="secondBar">
            <div className="secondNavbar"> 
                <div className='secondNavbarmenu'>
                    <div className='option'><a href="">Treks</a></div>
                    <div className='option'><a href="">Places to Visit</a></div>
                    <div className='option'><a href="">Valleys</a></div>
                    <div className='option'><a href="">Top 10 Ranking</a></div>
                    <div className='option'><a href="">Shooting Locations</a></div>
                    <div className='option'><a href="">Hidden Gems</a></div>
                </div>
                <div className='option'><a href=""><span>Ready-to-go</span> itineraries</a></div>
                {/* <div className='select'><select name="" id=""><option value="">Our Story</option></select></div> */}
            </div>
        </div>
    )
}
export default SecondBar;