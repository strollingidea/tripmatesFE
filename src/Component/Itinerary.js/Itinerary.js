import React, { useState } from 'react';
import './Itinerary.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Itinerary = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDropDown = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active index
  };

  const days = [
    { day: "Day 1", date: "Mon, 25 Dec 2024", content: ["Visit the Eiffel Tower", "Walk along the Seine River", "Explore the Louvre Museum"] },
    { day: "Day 2", date: "Tue, 26 Dec 2024", content: ["Visit Notre-Dame Cathedral", "Explore Montmartre", "Enjoy a Seine River cruise"] },
    { day: "Day 3", date: "Wed, 27 Dec 2024", content: ["Explore Versailles Palace", "Relax in Luxembourg Gardens", "Shop at Champs-Élysées"] },
    { day: "Day 4", date: "Thu, 28 Dec 2024", content: ["Visit Disneyland Paris", "Explore the Catacombs of Paris", "Watch a cabaret show"] },
    { day: "Day 5", date: "Fri, 29 Dec 2024", content: ["Visit Sacré-Cœur Basilica", "Enjoy Parisian cafes", "Explore Le Marais district"] },
  ];

  return (
    <div className='itinerary'>
      {days.map((day, index) => (
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
                {day.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Itinerary;
