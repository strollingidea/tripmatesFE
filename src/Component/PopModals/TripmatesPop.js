import React, { useState } from "react";
import styled from "styled-components";

const TripmatesPop = ({ onClose, onAdd }) => {
  const [newTripmate, setNewTripmate] = useState({
    name: "",
    email: "",
  });

  const handleAddTripmate = () => {
    if (!newTripmate.name.trim() || !newTripmate.email.trim()) return;

    onAdd(newTripmate);

    setNewTripmate({
      name: "",
      email: "",
    });

    onClose();
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

      <CloseBtn onClick={onClose}>Close</CloseBtn>
    </TripmatespopDrawer>
  );
};

export default TripmatesPop;

/* ---------------- STYLES ---------------- */

const TripmatespopDrawer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #fff;
  max-width: 480px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 20px 20px 40px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px 0px 15px 5px #0000001a;
  z-index: 9999;
`;

const DrawerHeading = styled.h5`
  font-size: 18px;
  text-align: center;
`;

const DrawerInput = styled.input`
  padding: 14px;
  border: 1px solid #cbcbcb;
  border-radius: 6px;
  font-size: 16px;
`;

const TripmatesSubmit = styled.button`
  padding: 12px;
  background-color: #ffc300;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
`;
