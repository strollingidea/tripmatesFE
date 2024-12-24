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
                    <div className="date-input" style={{borderRight:"1px solid #000", marginRight:"15px"}}>
                      <span className="calendar-icon">📅</span>
                      <span className="date-text">Start Date</span>
                    </div>
                    <div className="date-input">
                      <span className="calendar-icon">📅</span>
                      <span className="date-text">End Date</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='addmembers'>
          <h2>+ Add Tripmates</h2>
          <ul>
            <li>
              <h3>Vikas Jain</h3>
              <h4>Admin</h4> 
            </li>
          </ul>
        </div>

      </div>
    </>
  )
}

export default PlanTrip
