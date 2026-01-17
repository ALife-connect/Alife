import React from 'react'
import '../../Esther/styles/donorterms.css'
import { VscDash } from "react-icons/vsc";
import { useNavigate } from 'react-router';


const donorterms = [
    {
        id:1,
        title:"Eligibility",
        terms:"Facility must have a government license and provide accreditation document ",
    },
    {
        id:2,
        title:"Confidentiality",
        terms:"Must keep donor data confidential. ",
    },
    {
        id:3,
        title:"Fee",
        terms:"Obiligated to pay the subscription fee required to access ALIFE features."
    },
    {
        id:4,
        title:"Liability",
        terms:"Facility is responsible for blood testing and retesting.ALIFE only connects donors;not liable for donors no-shows or misuse.",
    },
    {
        id:5,
        title:"Termination",
        terms:"ALIFE may suspend for violations (illegal sales, fraud etc) ",
    }
]


const Hospitalterms = () => {
    const nav = useNavigate();
    return (
        <>
        <div className='donortermswrapper'>
        <div className='donortermsname'>
        <img src="images/alifenobg.png" alt="" className='donortermlogo'/>
        <h1>HOSPITAL/BLOODBANK TERMS&AGREEMENT</h1>
        </div>
        <div className='donortermshold'>
            {donorterms.map((term,index) => (
                <div key={term.id} className='donorsmaphold'>
                    <h3>{index + 1}{term.title}</h3>
                    <p><VscDash />{term.terms} <br /></p>
                </div>
            ))}
            <div className='termsAndConditionBtnWrapper'>    
             <button className='donortermsbtn' onClick={()=>nav("/hospitalsignup")}>AGREE</button>
             <button className='donortermsbtn' onClick={()=>nav(-1)}>CANCEL</button>
            </div>
        </div>
    </div>
        </>
      )
}

export default Hospitalterms