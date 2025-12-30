import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TripmatesPop = ({ onClose, onAdd, initialData }) => {
  const [tripmate, setTripmate] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (initialData) {
      setTripmate(initialData);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!tripmate.name.trim() || !tripmate.email.trim()) return;
    onAdd(tripmate);
    onClose();
  };

  return (
    <TripmatespopDrawer>
      <DrawerHeading>
        {initialData ? "Edit Tripmate" : "Add Tripmate"}
      </DrawerHeading>

      <DrawerInput
        placeholder="Tripmate Name"
        value={tripmate.name}
        onChange={(e) =>
          setTripmate({ ...tripmate, name: e.target.value })
        }
      />

      <DrawerInput
        placeholder="Tripmate Email"
        value={tripmate.email}
        onChange={(e) =>
          setTripmate({ ...tripmate, email: e.target.value })
        }
      />

      <TripmatesSubmit onClick={handleSubmit}>
        {initialData ? "Update" : "Add"}
      </TripmatesSubmit>

      <div className="addmembers-popup-close" onClick={onClose}>
        close
      </div>
    </TripmatespopDrawer>
  );
};

export default TripmatesPop;

/* ✅ SAME STYLES */
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
`;

const DrawerHeading = styled.h5`
  font-size: 18px;
  text-align: center;
  padding-top: 10px;
`;

const DrawerInput = styled.input`
  padding: 20px;
  border: 1px solid #cbcbcb;
  border-radius: 5px;
  font-size: 18px;
`;

const TripmatesSubmit = styled.div`
  padding: 10px;
  background-color: #ffc300;
  text-align: center;
  cursor: pointer;
  border-radius: 6px;
`;
