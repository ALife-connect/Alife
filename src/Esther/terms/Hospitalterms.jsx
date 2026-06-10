import React from 'react';
import '../../Esther/styles/donorterms.css';
import { VscDash } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';

const hospitalTermsData = [
  {
    id: 1,
    title: "Eligibility",
    terms: "Facility must maintain a valid government license and provide official accreditation documentation upon request.",
  },
  {
    id: 2,
    title: "Confidentiality",
    terms: "The facility is strictly obligated to safeguard all donor personal and medical data in accordance with privacy laws.",
  },
  {
    id: 3,
    title: "Subscription Fee",
    terms: "Obligated to clear the required subscription fee structure to maintain uninterrupted access to ALIFE premium coordination features.",
  },
  {
    id: 4,
    title: "Liability & Screening",
    terms: "The facility bears full responsibility for blood screening, testing, and retesting compliance. ALIFE acts solely as a connecting platform and is not liable for donor no-shows or data misuse.",
  },
  {
    id: 5,
    title: "Termination",
    terms: "ALIFE retains the right to immediately suspend or terminate facility access for policy violations, including fraud or illegal commercialization.",
  }
];

const Hospitalterms = () => {
  const nav = useNavigate();

  return (
    <div className='donortermswrapper'>
      <div className='donorterms-card'>
        
        {/* Unified Header Matrix Block */}
        <div className='donortermsname'>
          {/* Handled path safety with absolute leading slash */}
          <img src="/images/alifenobg.png" alt="ALIFE Logo" className='donortermlogo'/>
          <h1>HOSPITAL / BLOOD BANK TERMS & AGREEMENT</h1>
        </div>

        {/* Content Agreement Grid Block */}
        <div className='donortermshold'>
          <div className='terms-scroll-area'>
            {hospitalTermsData.map((term, index) => (
              <div key={term.id} className='donorsmaphold'>
                <h3>{index + 1}. {term.title}</h3>
                <p>
                  <VscDash className="term-dash-icon" />
                  <span>{term.terms}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Persistent Action Panel Control Row */}
          <div className='termsAndConditionBtnWrapper'>    
            <button className='donortermsbtn btn-agree' onClick={() => nav("/hospitalsignup")}>
              AGREE & PROCEED
            </button>
            <button className='donortermsbtn btn-cancel' onClick={() => nav(-1)}>
              CANCEL
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hospitalterms;