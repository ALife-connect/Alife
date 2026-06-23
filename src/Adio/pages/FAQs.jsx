import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaSearch, FaRegQuestionCircle } from "react-icons/fa";
import "./faqs.css"; // Ensure path matches your structure

const FAQs = () => {
  const nav = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqData = [
    {
      id: 1,
      category: "general",
      question: "What exactly is SLODAT and how does it save lives?",
      answer: "SLODAT (Saving Lives. One Donation At A Time) is an emergency real-time routing platform that connects certified medical hospitals experiencing critical shortages with voluntary blood and medical supply donors across Nigeria instantly."
    },
    {
      id: 2,
      category: "donors",
      question: "Who is eligible to become a voluntary donor on SLODAT?",
      answer: "Any healthy individual between the ages of 18 and 65, weighing at least 50kg, and free from transmissible health conditions can sign up. Before your first donation layout, a partner hospital agent will conduct a brief verification screening to ensure total medical compliance."
    },
    {
      id: 3,
      category: "hospitals",
      question: "How do healthcare facilities verify and register their institutions?",
      answer: "Hospitals must upload official government registration documents, running clinical operational licenses, and supervisor authorization credentials during registration. Our legal team validates accounts within 24–48 hours before enabling full request privileges."
    },
    {
      id: 4,
      category: "general",
      question: "I am trying to log in or register but I am not receiving my OTP code?",
      answer: "Our authentication system dispatches 6-digit secure codes directly to your inbox instantly. If it does not appear, check your spam/junk partitions. You can easily click 'Resend OTP' directly from the email check screen once the security countdown timer reaches zero."
    },
    {
      id: 5,
      category: "donors",
      question: "Will my personal data or medical blood type be visible to the public?",
      answer: "Absolutely not. Your personal telemetry data, phone contact lines, and precise geographical coordinates are strictly locked down under AES-256 bit encryption layer rules. Information is only securely exposed to a hospital team when you explicitly accept an urgent request from them."
    },
    {
      id: 6,
      category: "hospitals",
      question: "How fast are emergency blood request matches routed to donors?",
      answer: "Once a verified hospital dispatches an emergency requirement alert tracking log, our backend filters parameters and immediately broadcasts background alerts to matching, available donors situated within a tight localized radius of that specific hospital."
    }
  ];

  // Filter criteria logic pipeline
  const filteredFaqs = faqData.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page-wrapper">
      {/* Upper Navigation Track */}
      <nav className="faq-nav-header">
        <div className="faq-nav-container">
          <div className="faq-brand" onClick={() => nav("/")}>
            <span className="faq-brand-dot"></span>
            SLODAT Support
          </div>
          <button className="faq-back-btn" onClick={() => nav(-1)}>
            ← Return to Previous Page
          </button>
        </div>
      </nav>

      {/* Hero Header Context Banner */}
      <header className="faq-hero">
        <div className="faq-hero-container">
          <span className="faq-badge-pill">24/7 Response Center</span>
          <h1>How can we assist you today?</h1>
          <p>Find instant transparent insights about our emergency donation pipelines, medical compliance checks, and secure accounts handling metrics.</p>
          
          {/* Real-time Search Processing Core Container */}
          <div className="faq-search-box-wrapper">
            <FaSearch className="faq-search-icon" />
            <input 
              type="text" 
              placeholder="Search keywords (e.g., OTP, blood type, eligibility...)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenIndex(null); // Close layout boxes cleanly when running search matches
              }}
            />
          </div>
        </div>
      </header>

      {/* Core Body Section Layout */}
      <main className="faq-main-content">
        
        {/* Category Filters Toggle Tab Rail */}
        <div className="faq-filter-tabs-rail">
          <button 
            className={`faq-tab-btn ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => { setActiveCategory("all"); setOpenIndex(null); }}
          >
            All Questions
          </button>
          <button 
            className={`faq-tab-btn ${activeCategory === "donors" ? "active" : ""}`}
            onClick={() => { setActiveCategory("donors"); setOpenIndex(null); }}
          >
            For Donors
          </button>
          <button 
            className={`faq-tab-btn ${activeCategory === "hospitals" ? "active" : ""}`}
            onClick={() => { setActiveCategory("hospitals"); setOpenIndex(null); }}
          >
            For Hospitals
          </button>
          <button 
            className={`faq-tab-btn ${activeCategory === "general" ? "active" : ""}`}
            onClick={() => { setActiveCategory("general"); setOpenIndex(null); }}
          >
            General Support
          </button>
        </div>

        {/* Dynamic Accordion Deck Container */}
        <div className="faq-accordion-deck">
          {filteredFaqs.length === 0 ? (
            <div className="faq-empty-state">
              <FaRegQuestionCircle className="empty-state-icon" />
              <h3>No answers match your search parameters</h3>
              <p>Try refining your phrases or switch categories to identify the appropriate technical guidelines.</p>
            </div>
          ) : (
            filteredFaqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  className={`faq-accordion-card ${isOpen ? "expanded-state" : ""}`} 
                  key={item.id}
                >
                  <button 
                    className="faq-accordion-trigger"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{item.question}</span>
                    <span className="faq-chevron-frame">
                      <FaChevronDown className={`chevron-svg ${isOpen ? "rotate-up" : ""}`} />
                    </span>
                  </button>
                  
                  <div className={`faq-accordion-collapsible-panel ${isOpen ? "panel-visible" : ""}`}>
                    <div className="faq-answer-inner-padding">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Support Footer Grid Segment Card */}
        <div className="faq-cta-footer-card">
          <h3>Still need clarification regarding operations?</h3>
          <p>Our direct medical logistics and systems infrastructure desks are ready to verify protocols or resolve account blocks immediately.</p>
          <button onClick={() => nav("/contact")}>Get in touch with Support</button>
        </div>
      </main>
    </div>
  );
};

export default FAQs;