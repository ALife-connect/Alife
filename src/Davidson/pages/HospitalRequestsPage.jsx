import React, { useEffect, useState } from 'react'
import '../../components/hospitalCard/hospitalCard.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import LoadComponents from '../../components/componentsLoadScreen/LoadComponents'
import { useNavigate } from 'react-router'
const Base_Url = import.meta.env.VITE_BASEURL

const HospitalRequestsPage = () => {
    const [loadState, setLoadState] = useState(false)
    const [hospitalRequests, setHospitalRequests] = useState([])
    const token = useSelector((state)=> state?.token)
    const nav = useNavigate()

    const getAllHospitalRequest = async()=>{
        setLoadState(true)
        try{
            const ress = await axios.get(`${Base_Url}/blood-requests`, {headers : {
                Authorization : `Bearer ${token}`
            }})
            setHospitalRequests(ress?.data?.bloodRequests)
            setLoadState(false)
        }catch(err){
            setLoadState(false)
        }
    }

    useEffect(()=>{
        getAllHospitalRequest()
    }, [])
    
    if(loadState){
        return <LoadComponents/>
    }
  return (
    <div className='hospitalRequestPageWrapper'>
        <div className="hospitalCardsWRapper">
            {
                hospitalRequests.map((request, index)=>(
                    <div className='hospitalCardWRapper' key={index}>
                    <img src={request?.hospital?.profilePicture? request?.hospital?.profilePicture : "/images/default profile pic.jpg"} alt="Hospital image" />
                    <div className="hospitalTextWRapper">
                      <h3>{request?.hospital?.fullName}</h3>
                      <span>{request?.hospital?.city}</span>
                    </div>
            
                    <button className="viewDetailButton" onClick={()=> nav(`/dashboard/hospitalsrequestdetails/${request?._id}`)}>
                      View Details <span className="arrow-icon">{">"}</span>
                    </button>
                  </div>
                ))
            }
      </div>
    </div>
  )
}

export default HospitalRequestsPage