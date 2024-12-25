import React from 'react'
import './Overview.scss'
import PlacestovisitImg from "../../Images/spiti.jpg"
import AddIcon from "../../Images/places-add-icon.png"

const Overview = () => {
  return (
    <>
        <div className='tripmateslist'>
            <h2>Your Tripmates</h2>
            <ul>
                <li>
                    <h3>Vikas Jain</h3>
                    <h4>Admin</h4> 
                </li>
                <li>
                    <h3>Subhan-ur-Rehman</h3>
                    <h4>Remove</h4> 
                </li>
                <li>
                    <h3>Tanuj Kumar</h3>
                    <h4>Remove</h4> 
                </li>
            </ul>
        </div>

        <div className='placestovisitlist'>
            <h2>Places you want to visit</h2>
            <input type='text' placeholder='Add places you want to visit'/>
            <img src={AddIcon} className='addabso'/>
            <ul>
                <li>
                    <div className='placesbox'><img src={PlacestovisitImg} /></div> 
                    <h3>Spiti Valley</h3>
                </li>
                <li>
                    <div className='placesbox'><img src={PlacestovisitImg} /></div> 
                    <h3>Spiti Valley</h3>
                </li>
                <li>
                    <div className='placesbox'><img src={PlacestovisitImg} /></div> 
                    <h3>Spiti Valley</h3>
                </li>
                <li>
                    <div className='placesbox'><img src={PlacestovisitImg} /></div> 
                    <h3>Spiti Valley</h3>
                </li>
                <li>
                    <div className='placesbox'><img src={PlacestovisitImg} /></div> 
                    <h3>Spiti Valley</h3>
                </li>
            </ul>
        </div>
    </>
  )
}

export default Overview