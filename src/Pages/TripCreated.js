import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './PlanTrip.scss'
import Backarrow from '../Images/backarrow.png'
import Tabs from '../Component/Tabs/Tabs'
import { formatDate, getDayCount } from '../utils/dateUtils'

const TripCreated = () => {
    const location = useLocation();
    const { tripData, tripmates } = location.state || {}; 
    
    
    const startDate = tripData?.startDate;
    const endDate = tripData?.endDate;
    const dayCount = getDayCount(startDate, endDate);
  return (
    <>
        <div className='container planatrip'>
            <div className='Head'>
                <Link to="/plantrip">
                    <img src={Backarrow}/>
                </Link>
                <div className='heading'>
                    <h1>{tripData?.destination || "Spiti Valley Trip"}</h1>
                    <p>{tripData?.startDate ? formatDate(tripData.startDate) : "Sat, DD MM YYYY"} - {tripData?.endDate ? formatDate(tripData.endDate) : "Sat, DD MM YYYY"}</p>
                    <p>( {dayCount} Nights / {dayCount+1} Days )</p>
                </div>
            </div>
            <div className=''>
                <Tabs/>
            </div>

            <div className='floataddlist'>
                <Link to="/tripcreated">
                    + Add List
                </Link>
            </div>

        </div>
    </>
  )
}

export default TripCreated