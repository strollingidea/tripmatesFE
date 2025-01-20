import React, { useState } from 'react'
import styled from 'styled-components';

const TripmatesPop = ({setaddTeammates, setdataTeammates}) => {

    const [tripmatesData, settripmatesData] = useState('') 
    

    const handlechange=(event)=>{
        settripmatesData(event.target.value)
       
    }

    const handleaddTripmate =(e)=>{
        
        setdataTeammates(tripmatesData)
        setaddTeammates(false)
    }

  return (
    <>
        <TripmatespopDrawer>
            <DrawerHeading>Add Tripmates</DrawerHeading>
            <DrawerInput type='text' value={tripmatesData} onChange={handlechange} placeholder='Tripmates Name'/>
            <TripmatesSubmit onClick={handleaddTripmate()}>Add Tripmate</TripmatesSubmit>
            <div onClick={()=>{setaddTeammates(false)}}>close</div>
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
    width: 100%;
    max-width: 520px;
    position: fixed;
    bottom: 0;
    margin: 0 auto;
    left: 0;
    right: 0;
    padding: 50px;
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


