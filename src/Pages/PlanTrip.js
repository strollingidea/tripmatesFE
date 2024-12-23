import React from 'react'
import './PlanTrip.scss'
import Backarrow from '../Images/backarrow.png'
import { Link } from 'react-router-dom'

const PlanTrip = () => {
  return (
    <>
      <div className='container planatrip'>
        
        <div className='Head'>
            <Link to="/">
                <img src={Backarrow}/>
            </Link>
            <div className='heading'>
                <h1>Plan a Trip</h1>
                <p>Build an itinerary and map out your upcoming plans</p>
            </div>
        </div>
        <div className='inputdata'>
            <input type='text' placeholder='Where To' />
            <div className="date-range-picker">
                <label className="label">Dates (optional)</label>
                <div className="date-inputs">
                    <div className="date-input">
                    <span className="calendar-icon">📅</span>
                    <span className="date-text">Dec 19</span>
                    </div>
                    <div className="date-input">
                    <span className="calendar-icon">📅</span>
                    <span className="date-text">Dec 25</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </>
  )
}

export default PlanTrip
