import React from 'react'
import '../../Esther/styles/donorterms.css'
import { VscDash } from "react-icons/vsc";
import { useNavigate } from 'react-router';

const donorterms = [
    {
        id:1,
        title:"Eligibility",
        terms:"I confirm that i'm 17-65 years,I weigh about ≥ 50kg(110lb) and meet health criteria.",
    },
    {
        id:2,
        title:"Screening & Honesty",
        terms:"I’ll answer all health questions truthfully and consent to tests for infectious diseases.",
    },
    {
        id:3,
        title:"Risks & Liability",
        terms:"I understand minor side effects (e.g., bruising) and won’t hold ALIFE liable for unforeseen reactions.",
    },
    {
        id:4,
        title:"Data Privacy",
        terms:"My info will be kept secure and used only for donation purposes.[Opt-in] I’d like email reminders for future donations. ",
    },
    {
        id:5,
        title:"Blood Usage",
        terms:"My donation may be used for patients, research, or discarded if unsafe. ",
    },
    {
        id:6,
        title:"Voluntary Donation",
        terms:"I’m giving blood voluntarily without compensation.I confirm that i have read and understood these terms.",
    }
]

const Donorterms = () => {
    const nav = useNavigate();
  return (
    <div className='donortermswrapper'>
        <div className='donortermsname'>
        <img src="images/alifenobg.png" alt="" className='donortermlogo'/>
        <h1>BLOOD DONOR TERMS AND AGREEMENT</h1>
        </div>
        <div className='donortermshold'>
            {donorterms.map((term,index) => (
                <div key={term.id} className='donorsmaphold'>
                    <h3>{index + 1}{term.title}</h3>
                    <p><VscDash />{term.terms} <br /></p>
                </div>
            ))}
            <div className='termsAndConditionBtnWrapper'>    
             <button className='donortermsbtn' onClick={()=>nav("/donorssignup")}>AGREE</button>
             <button className='donortermsbtn' onClick={()=>nav(-1)}>CANCEL</button>
            </div>
        </div>
    </div>
  )
}

export default Donorterms