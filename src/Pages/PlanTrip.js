import React, { useRef, useState, useEffect } from 'react'
import './PlanTrip.scss'
import Backarrow from '../Images/backarrow.png'
import { Link, useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import { DetailsSchema } from '../Component/Schema/DetailsSchema'
import TripmatesPop from '../Component/PopModals/TripmatesPop'
import { useDispatch, useSelector } from "react-redux";
import { removeTripmate } from '../redux/slices/removetripmateSlice'


const PlanTrip = () => {

  const dispatch = useDispatch();

  const tripmates = useSelector((state) => state.tripmates.tripmates);

  const [isPopupOpen, setIsPopupOpen ] = useState(false)
  
  const navigate = useNavigate()
  
  const inputRef = useRef();

  
  // const [tripmates, setTripmates] = useState(() => {
  //   // Load initial tripmates from Local Storage if available
  //   const savedTripmates = localStorage.getItem('tripmates');
  //   return savedTripmates ? JSON.parse(savedTripmates) : [];
  // });


  // const adtripmate = (newTripmate) =>{
  //  if(newTripmate){
  //   const updatedTripmates = [...tripmates, { name: newTripmate, role: "Remove" }];
  //   setTripmates(updatedTripmates);
  //     localStorage.setItem('tripmates', JSON.stringify(updatedTripmates));
  //  }
  // }
  // const handleRemoveTripmate = (index) => {
  //   const updatedTripmates = tripmates.filter((_, i) => i !== index);
  //   setTripmates(updatedTripmates);
  //   localStorage.setItem('tripmates', JSON.stringify(updatedTripmates));
  // };

  const handlepopup =()=>{
    setIsPopupOpen(!isPopupOpen)
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
      const tripData = { ...values, tripmates };
      localStorage.setItem('tripData', JSON.stringify(tripData));
      navigate("/tripcreated", {state : {tripData:values , tripmates}})
    }

  })

  let { values, handleSubmit } = formik;

  useEffect(() => {
    const savedData = localStorage.getItem('tripData');
    if (savedData) {
      formik.setValues(JSON.parse(savedData));
    }
  }, []);

  let condition = !values?.destination.length || (Object.keys(formik.errors)).length !== 0
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
                    <div className="date-input" style={{
                      // borderRight:"1px solid #dfdfdf", 
                      marginRight:"10px"}}>
                        {/* <span className="calendar-icon">📅</span> */}
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
                        {/* <span className="calendar-icon">📅</span> */}
                      <span className="date-text">
                        <input 
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
          {isPopupOpen && <TripmatesPop onClose = {handlepopup}/>  }
          <ul>
          {tripmates.map((mate, index) => (
              <li key={index}>
                <div>
                  <h3>{mate.name}</h3>
                  <p>{mate.email}</p>
                </div>
                <h4 onClick={()=> dispatch(removeTripmate(index))}>Remove</h4>
              </li>
            ))}
            
          </ul>
        </div>
        {console.log("Object.keys(values).length",formik.errors,Object.keys(formik.errors).length)}

        <div className='floatctastart'>
          <Link onClick={() => handleSubmit()} disabled={condition}>
            Create your trip
          </Link>

           {/* <button onClick={() => handleSubmit()} disabled={condition}>
            Create your trip
          </button> */}
        </div>

      </div>
    </>
  )
}

export default PlanTrip
