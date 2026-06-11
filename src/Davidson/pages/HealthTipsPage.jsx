import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { 
  FiArrowLeft, FiSearch, FiCheckCircle, 
  FiActivity, FiShield, FiHeart, 
  FiBriefcase, FiUsers, FiAward 
} from 'react-icons/fi';
import './healthTipsPage.css';

const HealthTipsPage = () => {
  const loggedInUser = useSelector((state) => state?.loggedInUser);
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const userRole = loggedInUser?.role === 'donor' ? 'donor' : 'hospital';

  // Structured Donor Tips Matrix
  const donorTipsData = [
    { id: 1, text: "Stay hydrated! Drink plenty of water before and after your donation.", category: "preparation", icon: <FiActivity /> },
    { id: 2, text: "Eat a healthy, iron-rich meal before donating — avoid fatty foods.", category: "preparation", icon: <FiActivity /> },
    { id: 3, text: "Get enough sleep (at least 7-8 hours) the night before your donation.", category: "preparation", icon: <FiActivity /> },
    { id: 4, text: "Bring a valid government ID and know your blood type if possible.", category: "preparation", icon: <FiShield /> },
    { id: 5, text: "Wear a short-sleeved shirt or sleeves that roll up easily.", category: "preparation", icon: <FiActivity /> },
    { id: 6, text: "Let the medical staff know if you’re nervous — they are there to guide you!", category: "preparation", icon: <FiShield /> },
    { id: 7, text: "After donating, rest for 10-15 minutes and enjoy your provided snacks.", category: "recovery", icon: <FiHeart /> },
    { id: 8, text: "Don’t lift heavy items or engage in strenuous exercise for at least 24 hours.", category: "recovery", icon: <FiHeart /> },
    { id: 9, text: "Iron-rich foods like spinach, meat, or beans help your body recover faster.", category: "recovery", icon: <FiActivity /> },
    { id: 10, text: "Not feeling 100% well? Reschedule your appointment. Your safety is paramount.", category: "recovery", icon: <FiShield /> },
    { id: 11, text: "Tell your friends! You might inspire them to join the donor network.", category: "impact", icon: <FiAward /> },
    { id: 12, text: "You can safely donate whole blood again after 8 weeks — set a calendar reminder!", category: "impact", icon: <FiAward /> },
    { id: 13, text: "Donating blood saves lives. One single pint can help up to three separate patients.", category: "impact", icon: <FiHeart /> },
    { id: 14, text: "Be entirely honest during screening; it ensures the safety of both you and the recipient.", category: "impact", icon: <FiShield /> },
    { id: 15, text: "You are a quiet hero. Thank you for actively making a difference in healthcare!", category: "impact", icon: <FiAward /> }
  ];

  // Structured Hospital Tips Matrix
  const hospitalTipsData = [
    { id: 1, text: "Keep your hospital profile and regulatory KYC documents updated for better search matching.", category: "logistics", icon: <FiShield /> },
    { id: 2, text: "Respond to donor matches quickly to avoid losing crucial emergency windows.", category: "logistics", icon: <FiActivity /> },
    { id: 3, text: "Clearly list your required blood types and update inventory deficits in real time.", category: "logistics", icon: <FiBriefcase /> },
    { id: 4, text: "Log in regularly to stay active and manage pending donation requests promptly.", category: "logistics", icon: <FiBriefcase /> },
    { id: 5, text: "Provide a clean, comfortable, and deeply welcoming environment for incoming donors.", category: "donor-care", icon: <FiHeart /> },
    { id: 6, text: "Train field staff to treat donors with the highest degree of respect and patience.", category: "donor-care", icon: <FiUsers /> },
    { id: 7, text: "Send a programmatic or personal thank-you message after collections to build long-term trust.", category: "donor-care", icon: <FiAward /> },
    { id: 8, text: "Use built-in dashboard analytics to track collection cycles and optimize seasonal planning.", category: "operations", icon: <FiActivity /> },
    { id: 9, text: "Promote your clinic's open drives on verified social channels and linked digital platforms.", category: "operations", icon: <FiUsers /> },
    { id: 10, text: "Stay strictly compliant with national health and safety safety mandates to ensure public confidence.", category: "operations", icon: <FiShield /> },
  ];

  const categories = userRole === 'donor' 
    ? [
        { id: 'all', label: 'All Guidelines' },
        { id: 'preparation', label: 'Pre-Donation Prep' },
        { id: 'recovery', label: 'Post-Donation Care' },
        { id: 'impact', label: 'Your Community Impact' }
      ]
    : [
        { id: 'all', label: 'All Guidelines' },
        { id: 'logistics', label: 'System & Inventory' },
        { id: 'donor-care', label: 'Donor Retention' },
        { id: 'operations', label: 'Safety & Analytics' }
      ];

  const sourceData = userRole === 'donor' ? donorTipsData : hospitalTipsData;

  // Real-time compound searching and category filtering logic
  const filteredTips = sourceData.filter(tip => {
    const matchesSearch = tip.text.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tip.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="TipsHubPageMasterFrame">
      {/* Upper Navigation Block */}
      <header className="TipsHubHeaderBlock">
        <button className="TipsHubBackButton" onClick={() => nav(-1)} aria-label="Go back to dashboard">
          <FiArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </button>
        
        <div className="TipsHubTitleContext">
          <h1>{userRole === 'donor' ? 'Donor Health & Wellness Guide' : 'Clinical Operational Excellence Center'}</h1>
          <p>
            {userRole === 'donor' 
              ? 'Maximize your saving potential with verified clinical steps for a seamless donation lifecycle.' 
              : 'Maximize blood inventory efficiency and elevate institutional donor relations with our optimized handbook.'}
          </p>
        </div>
      </header>

      {/* Control Matrix Layout: Filter Tabs and Search Inputs */}
      <section className="TipsHubControlBar">
        <div className="TipsCategoryPillGroup">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`CategoryFilterPillButton ${activeCategory === cat.id ? 'isActivePill' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="TipsHubSearchBoxWrapper">
          <FiSearch className="SearchIconContextElement" />
          <input
            type="text"
            placeholder="Search specific guidelines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="TipsHubSearchInputElement"
          />
        </div>
      </section>

      {/* Main Structural Core Grid */}
      <main className="TipsGridMainContentArea">
        {filteredTips.length > 0 ? (
          <div className="TipsDashboardCardGridLayout">
            {filteredTips.map((tip) => (
              <div key={tip.id} className={`TipInteractiveShowcaseCard category-${tip.category}`}>
                <div className="TipCardDecorativeIconHeader">
                  <span className="TipCategoryIconBox">{tip.icon}</span>
                  <span className="TipCardCategoryBadgeString">{tip.category.replace('-', ' ')}</span>
                </div>
                <p className="TipCardPrimaryDescriptionText">{tip.text}</p>
                <div className="TipCardFooterStatusRow">
                  <span className="VerifiedActionTag"><FiCheckCircle /> Verified Guidance</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="TipsEmptySearchFallbackState">
            <span className="EmptyStateFallbackGraphic">🔍</span>
            <h3>No specific instructions match your parameters</h3>
            <p>Try clearing your active search bar or switching your category filter context to scan all listings.</p>
            <button className="ResetFiltersActionBtn" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
              Reset Dashboard View
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default HealthTipsPage;