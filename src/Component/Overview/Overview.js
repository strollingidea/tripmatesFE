import React from 'react'
import './Overview.scss'

const Overview = () => {
  return (
    <>
        <div className='tripmateslist'>
            <h2>Tripmates List</h2>
            <ul>
                <li>
                <h3>Vikas Jain</h3>
                <h4>Admin</h4> 
                </li>
                <li>
                <h3>Subhan-ur-Rehman</h3>
                <h4>Remove</h4> 
                </li>
                <li>
                <h3>Tanuj Kumar</h3>
                <h4>Remove</h4> 
                </li>
                <li>
                <h3>Aman Patel</h3>
                <h4>Remove</h4> 
                </li>
            </ul>
        </div>

        <div className='tripmateslist'>
            <h2>Places to visit</h2>
            <input type='text' placeholder='Add place you want to visit'>

            </input>
            <ul>
                <li>
                    <h3>Vikas Jain</h3>
                    <h4>Admin</h4> 
                </li>
                <li>
                    <h3>Subhan-ur-Rehman</h3>
                    <h4>Remove</h4> 
                </li>
                <li>
                    <h3>Tanuj Kumar</h3>
                    <h4>Remove</h4> 
                </li>
                <li>
                    <h3>Aman Patel</h3>
                    <h4>Remove</h4> 
                </li>
            </ul>
        </div>
    </>
  )
}

export default Overview