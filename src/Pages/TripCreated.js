import React, { useState } from 'react'
import './PlanTrip.scss'
import Backarrow from '../Images/backarrow.png'
import { Link } from 'react-router-dom'
import Tabs from '../Component/Tabs/Tabs'

const TripCreated = () => {
  return (
    <>
        <div className='container planatrip'>
            <div className='Head'>
                <Link to="/plantrip">
                    <img src={Backarrow}/>
                </Link>
                <div className='heading'>
                    <h1>Spiti Valley Trip</h1>
                    <p>Mon, 15 Dec 2024 -- Sat, 20 Dec 2024</p>
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