import React from 'react'
import './Overview.scss'
import PlacestovisitImg from "../../Images/spiti.jpg"
import AddIcon from "../../Images/places-add-icon.png"
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { removeTripmate } from '../../redux/slices/removetripmateSlice'

const Overview = () => {

    const dispatch = useDispatch();
    const tripmates = useSelector((state) => state.tripmates.tripmates);
    // const location = useLocation();
    // const {tripmates} = location.state || { tripmates: [] };
  return (
    <>
        <div className='tripmateslist'>
            <h2>Your Tripmates</h2>
            <ul>
                {tripmates.map((mate, index) => (
                              <li key={index}>
                                <h3>{mate}</h3>
                                <h4 onClick={()=> dispatch(removeTripmate(index))}>Remove</h4>
                              </li>
                            ))}
                
                
            </ul>
        </div>


        
        {/* <div className='placestovisitlist'>
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
        </div> */}
    </>
  )
}

export default Overview