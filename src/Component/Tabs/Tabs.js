import React, { useState } from 'react'
import './Tabs.scss'
import Overview from '../Overview/Overview';
import Itinerary from '../Itinerary.js/Itinerary';

const Tabs = () => {
    const [activeTab, setActivetab] = useState("tab1")

    const renderContent = () => {
        switch (activeTab) {
          case "tab1":
            return <><Overview/></>;
          case "tab2":
            return <><Itinerary/></>;
          case "tab3":
            return <><Overview/></>;
          default:
            return null;
        }
      };

  return (
    <div className="tabs">
      <div className="tab-buttons">
        <button
          className={activeTab === "tab1" ? "active" : ""}
          onClick={() => setActivetab("tab1")}
        >
          Overview
        </button>
        <button
          className={activeTab === "tab2" ? "active" : ""}
          onClick={() => setActivetab("tab2")}
        >
          Itinerary
        </button>
        <button
          className={activeTab === "tab3" ? "active" : ""}
          onClick={() => setActivetab("tab3")}
        >
          Budget
        </button>
      </div>
      <div className="tab-content">{renderContent()}</div>
    </div>  
  )
}

export default Tabs