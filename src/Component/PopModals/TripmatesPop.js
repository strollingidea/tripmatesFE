import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addTripmate } from "../../redux/slices/removetripmateSlice";

const TripmatesPop = ({ onClose }) => {
  const dispatch = useDispatch();

  const [newTripmate, setNewTripmate] = useState({
    name: "",
    email: "",
  });

  const handleAddTripmate = () => {
    if (newTripmate.name.trim() && newTripmate.email.trim()) {
      dispatch(addTripmate(newTripmate));

      setNewTripmate({
        name: "",
        email: "",
      });

      onClose();
    }
  };

  return (
    <TripmatespopDrawer>
      <DrawerHeading>Add Tripmates</DrawerHeading>

      <DrawerInput
        type="text"
        placeholder="Tripmate Name"
        value={newTripmate.name}
        onChange={(e) =>
          setNewTripmate({ ...newTripmate, name: e.target.value })
        }
      />

      <DrawerInput
        type="email"
        placeholder="Tripmate Email"
        value={newTripmate.email}
        onChange={(e) =>
          setNewTripmate({ ...newTripmate, email: e.target.value })
        }
      />

      <TripmatesSubmit onClick={handleAddTripmate}>
        Add Tripmate
      </TripmatesSubmit>

      <div className="addmembers-popup-close" onClick={onClose}>
        close
      </div>
    </TripmatespopDrawer>
  );
};

export default TripmatesPop;




// Styled Components

const TripmatespopDrawer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #fff;
    max-width: 480px;
    position: fixed;
    bottom: 0;
    margin: 0 auto;
    left: 0;
    right: 0;
    padding: 0 20px 50px;
    border-radius: 20px 20px 0 0;
    box-shadow: 0px 0px 15px 5px #0000001a;
    z-index: 999999;
`

const DrawerHeading = styled.h5`
    color: #000;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    padding-top: 10px;
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
    padding: 10px;
    border: 1px solid #c1c1c1;
    background-color: #ffc300;
    color: #000;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    cursor: pointer;
    border-radius: 6px;
`


