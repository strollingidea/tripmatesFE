import React, { useRef, useState } from 'react'
import './PlanTrip.scss'
import Backarrow from '../Images/backarrow.png'
import { Link, useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import { DetailsSchema } from '../Component/Schema/DetailsSchema'
import TripmatesPop from '../Component/PopModals/TripmatesPop'


const PlanTrip = () => {

  const [isPopupOpen, setIsPopupOpen ] = useState(false)
  const [tripmates, setTripmates] = useState([
    { name: 'Vikas Jain', role: 'Admin' },
    { name: 'sushant', role: 'Remove' },
  ]);
  const navigate = useNavigate()

  const inputRef = useRef();

  const adtripmate = (newTripmate) =>{
   if(newTripmate){
    setTripmates([...tripmates, {name: newTripmate, role:"Remove"}])
   }
  }
  const handleRemoveTripmate = (index) => {
    const updatedTripmates = tripmates.filter((_, i) => i !== index);
    setTripmates(updatedTripmates);
  };
  console.log(tripmates,"tripmatestripmates")

  const handlepopup =()=>{
setIsPopupOpen(!isPopupOpen)
console.log("kkkkk",isPopupOpen)
  }

  let initialValues = {
    destination : "",
    startDate: "",
    endDate:""

  }

  let formik = useFormik({
    initialValues,
    validationSchema: DetailsSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      navigate("/tripcreated")
    }

  })

  let { values, handleSubmit } = formik;

  
  return (
    <>
      <div className='container planatrip'>
        
        <div className='Head'>
            <Link to="/">
                <img src={Backarrow}/>
            </Link>
            <div className='heading'>
                {/* <h1>Plan a Trip</h1> */}
                <p>Build an itinerary and map out your upcoming plans</p>
            </div>
        </div>
        <div className='inputdata'>
            <input type='text' 
            name='destination'
            placeholder='Where To' 
            value={values?.destination} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
             {formik.touched.destination && formik.errors.destination ? (
              <div>{formik.errors.destination}</div>
              ) : null}
            <div className="date-range-picker">
                <label className="label">Dates (optional)</label>
                <div className="date-inputs">
                    <div className="date-input" style={{borderRight:"1px solid #000", marginRight:"15px"}}>
                        <span className="calendar-icon">📅</span>
                      <span className="date-text">
                        <input
                        name='startDate'
                        ref={inputRef} 
                        type='date'
                        placeholder='Start Date'
                        value={values?.startDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // onClick={handleInput}
                        />
                      </span>
                      '  {formik.touched.startDate && formik.errors.startDate ? (
                            <div>{formik.errors.startDate}</div>
                          ) : null}
                    </div>
                    <div className="date-input">
                        <span className="calendar-icon">📅</span>
                      <span className="date-text">
                        <input 
                        // ref={inputRef} 
                        name='endDate'
                          type='date'
                          placeholder='End Date'
                          value={values?.endDate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          min={values?.startDate}
                        />
                      </span>
                      {formik.touched.endDate && formik.errors.endDate ? (
                        <div>{formik.errors.endDate}</div>
                      ) : null}
                    </div>
                </div>
            </div>
        </div>
        <div className='addmembers'>
          <h2 onClick={handlepopup}>+ Add Tripmates</h2>
          {/* {isPopupOpen && <TripmatesPop onClose = {() => setIsPopupOpen(false)}/>} */}
          {isPopupOpen && <TripmatesPop onClose = {handlepopup} adtripmate={adtripmate}/>  }
          <ul>
          {tripmates.map((mate, index) => (
              <li key={index}>
                <h3>{mate.name}</h3>
                <h4 onClick={() => handleRemoveTripmate(index)}>{mate.role}</h4>
              </li>
            ))}
            {/* <li>
              <h3>Vikas Jain</h3>
              <h4>Admin</h4> 
            </li>
            <li>
            <h3>sdfgh</h3>
              <h4>Remove</h4> 
            </li>
            <li>
              <h3>Tanuj Kumar</h3>
              <h4>Remove</h4> 
            </li>
            <li>
              <h3>Aman Patel</h3>
              <h4>Remove</h4> 
            </li> */}
          </ul>
        </div>

        <div className='floatctastart'>
          <Link onClick={() => handleSubmit()}>
            Create your trip
          </Link>
        </div>

      </div>
    </>
  )
}

export default PlanTrip
