import React from 'react'
import './hospitalCard.css'
import { useNavigate } from 'react-router'

const HospitalCard = ({hospital}) => {

  const nav = useNavigate()
  return (
    <>
      <div className='hospitalCardWRapper'>
  
         <img src={hospital?.profilePicture ? hospital?.profilePicture : "/images/default profile pic.jpg"} alt="Hospital image" />
  
        <div className="hospitalTextWRapper">
          <h3>{hospital?.fullName}</h3>
        </div>

        <button className="viewDetailButton" onClick={()=> nav(`/dashboard/hospitaldetails/${hospital._id}`)}>
          View Details <span className="arrow-icon">{">"}</span>
        </button>
      </div>
    </>
  )
}

export default HospitalCard