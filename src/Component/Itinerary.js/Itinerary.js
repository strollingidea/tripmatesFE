import React, { useState } from 'react';
import './Itinerary.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getDayCount } from '../../utils/dateUtils';
import { addDays, format } from 'date-fns';

const Itinerary = ({tripData}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleDropDown = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active index
  };

  // const days = [
  //   { day: "Day 1", date: "Mon, 25 Dec 2024", content: ["Visit the Eiffel Tower", "Walk along the Seine River", "Explore the Louvre Museum"] },
  // ];

  const dayCount = getDayCount(tripData.startDate, tripData.endDate);

  return (
    <div className='itinerary'>
      {Array.from({length: dayCount+1}, (_, index)=>{
        const currentDate = addDays(new Date(tripData.startDate), index);
        return(
          <div className='daybox' key={index} onClick={() => toggleDropDown(index)}>
          <div className='daybox-head'>
            <h2>Day {index+1} - <span>{format(currentDate, 'EEE, dd MMM yyyy')}</span></h2>
            <FontAwesomeIcon 
              icon={faChevronDown}
              className={`dropdown-icon ${activeIndex === index ? "rotated" : ""}`}
            />
          </div>
          {activeIndex === index && (
            <div className="dropdown-content">
              {/* <p>Here is some additional content for {day.day}:</p> */}
              <ul>

              
                {/* {Array.from({ length: dayCount }, (_, index) => (
                  <li key={index} className="trip-day">
                    Day {index + 1}
                  </li>
                ))} */}
              


                {/* {day.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))} */}
                
              </ul>
            </div>
        )}
      </div>
      )} )}
      
      {/* {days.map((day, index) => (
        <div className='daybox' key={index} onClick={() => toggleDropDown(index)}>
          <div className='daybox-head'>
            <h2>{day.day} - <span>{day.date}</span></h2>
            <FontAwesomeIcon 
              icon={faChevronDown}
              className={`dropdown-icon ${activeIndex === index ? "rotated" : ""}`}
            />
          </div>
          {activeIndex === index && (
            <div className="dropdown-content">
              <p>Here is some additional content for {day.day}:</p>
              <ul>
                
              </ul>
            </div>
          )}
        </div>
      ))} */}
    </div>
  );
};

{/* {Array.from({ length: dayCount }, (_, index) => (
  <li key={index} className="trip-day">
    Day {index + 1}
  </li>
))} */}
export default Itinerary;
