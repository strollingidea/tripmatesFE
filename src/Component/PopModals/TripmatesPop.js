import React, { useState } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { addTripmate } from "../../redux/slices/removetripmateSlice";

const TripmatesPop = ({onClose, adtripmate}) => {

    const dispatch = useDispatch();
    // const tripmates = useSelector((state) => state.tripmates.tripmates);
    const [newTripmate, setNewTripmate] = useState("");

  const handleAddTripmate = () => {
    if (newTripmate.trim()) {
      dispatch(addTripmate(newTripmate));
      setNewTripmate(""); // Clear input
      onClose()
    }
  };

  return (
    <>
        <TripmatespopDrawer>
            <DrawerHeading>Add Tripmates</DrawerHeading>
            <DrawerInput type='text'
                placeholder='Tripmates Name'
                value={newTripmate}
                onChange={(e)=>setNewTripmate(e.target.value)}
            />
            {console.log(newTripmate, "pppppppppp")}
            <TripmatesSubmit onClick={handleAddTripmate}>
                Add Tripmate
            </TripmatesSubmit>
            
            <div onClick={onClose}>close</div>
        </TripmatespopDrawer>
    </>
  )
}

export default TripmatesPop;



// Styled Components

const TripmatespopDrawer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #fff;
    /* width: 100%; */
    max-width: 520px;
    position: fixed;
    bottom: 0;
    margin: 0 auto;
    left: 0;
    right: 0;
    padding: 20px;
    border-radius: 20px 20px 0 0;
    box-shadow: 0px 0px 15px 5px #0000001a;
    z-index: 999999;
`

const DrawerHeading = styled.h2`
    padding: 20px;
    color: #000;
    font-size: 24px;
    font-weight: 500;
    text-align: center;
`

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


