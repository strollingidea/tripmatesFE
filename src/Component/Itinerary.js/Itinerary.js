import React, { useState } from 'react';
import './Itinerary.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getDayCount } from '../../utils/dateUtils';
import { addDays, format } from 'date-fns';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addItinerary, removeItinerary, editItinerary } from '../../redux/slices/addeditdeletItinerary';

const Itinerary = ({tripData}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleDropDown = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active index
  };

  const [note, setNote] = useState("");
  const dispatch = useDispatch();
  const itinerary = useSelector(state => state.itinerary.itinerary);

  const handleAddItinerary = (dayIndex) => {
    if (note.trim() !== "") {
      dispatch(addItinerary({ dayIndex, note })); // Store only one string
      setNote(""); // Clear input after adding
    }
  };
  // const handleRemoveItinerary = (index) => {
  //   dispatch(removeItinerary(index));
  // };

  const handleRemoveItinerary = (dayIndex, noteIndex) => {
    dispatch(removeItinerary({ dayIndex, noteIndex }));
  };

  const dayCount = getDayCount(tripData.startDate, tripData.endDate);

  return (
    <div className='itinerary'>
      {Array.from({length: dayCount+1}, (_, index)=>{
        const currentDate = addDays(new Date(tripData.startDate), index);
        return(
          <div className='daybox' key={index}>
            <div >
              <div className='daybox-head' onClick={() => toggleDropDown(index)}>
                <h2>Day {index+1} - <span>{format(currentDate, 'EEE, dd MMM yyyy')}</span></h2>
                <FontAwesomeIcon 
                  icon={faChevronDown}
                  className={`dropdown-icon ${activeIndex === index ? "rotated" : ""}`}
                />
              </div>
                {activeIndex === index && (
                  <div className="dropdown-content">
                    {/* {itinerary.length > 0 && itinerary.map((iti, i) => ( */}
                    {itinerary[index]?.map((iti, i) => (
                    <ul key={i} style={{display:"flex", justifyContent:"space-between"}}>
                      <li>{iti}</li>
                      <button onClick={() => handleRemoveItinerary(index, i)}>Remove</button>
                    </ul>
                ))}
                    <DrawerInput 
                      type='text'
                      placeholder='Enter your itinerary'
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                    {/* <TripmatesSubmit onClick={handleAddItinerary}> */}
                    <TripmatesSubmit onClick={() => handleAddItinerary(index)}>
                      Add
                    </TripmatesSubmit>
              </div>
              )}
            </div>
      </div>
      )} )}
    </div>
  );
};

export default Itinerary;


const DrawerInput = styled.input`
    padding: 20px;
    border: 1px solid #cbcbcb;
    border-radius: 5px;
    background-color: #fff;
    color: #000;
    font-size: 18px;
    font-weight: 500;
    text-align: left;
`

const TripmatesSubmit = styled.div`
    padding: 20px;
    border: 1px solid #000;
    background-color: yellow;
    color: #000;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
`