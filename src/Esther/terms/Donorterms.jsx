import React from 'react';
import '../../Esther/styles/donorterms.css';
import { VscDash } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom'; // Standardized router import reference

const donorterms = [
  {
    id: 1,
    title: "Eligibility",
    terms: "I confirm that I'm 17-65 years old, weigh at least 50kg (110lb), and meet all foundational health criteria.",
  },
  {
    id: 2,
    title: "Screening & Honesty",
    terms: "I will answer all health history questions truthfully and consent to blood sample tests for infectious diseases.",
  },
  {
    id: 3,
    title: "Risks & Liability",
    terms: "I understand minor temporary side effects may occur (e.g., bruising) and will not hold ALIFE liable for unforeseen reactions.",
  },
  {
    id: 4,
    title: "Data Privacy",
    terms: "My information will be kept strictly secure and used only for donation coordination purposes. [Opt-in] I agree to receive email reminders for future eligible donations.",
  },
  {
    id: 5,
    title: "Blood Usage",
    terms: "My donation may be used directly for patients, clinical research, or safely discarded if testing shows it is unsafe for transfusion.",
  },
  {
    id: 6,
    title: "Voluntary Donation",
    terms: "I am giving blood voluntarily without financial compensation. I confirm that I have read, understood, and accept these conditions.",
  }
];

const Donorterms = () => {
  const nav = useNavigate();

  return (
    <div className='donortermswrapper'>
      <div className='donorterms-card'>
        
        {/* Unified Header Matrix Block */}
        <div className='donortermsname'>
          <img src="/images/alifenobg.png" alt="ALIFE Logo" className='donortermlogo'/>
          <h1>BLOOD DONOR TERMS AND AGREEMENT</h1>
        </div>

        {/* Content Agreement Grid Block */}
        <div className='donortermshold'>
          <div className='terms-scroll-area'>
            {donorterms.map((term, index) => (
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
            <button className='donortermsbtn btn-agree' onClick={() => nav("/donorssignup")}>
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

export default Donorterms;