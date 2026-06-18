import React, { useState } from 'react';
import "./dashboardLayout.css";
import DashBoardHeader from '../components/dashboardHeader/DashBoardHeader';
import DashboardSideBar from '../components/dashboardSideBar/DashboardSideBar';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

const DashboardLayout = () => {
  // Mobile sidebar visibility toggle state toggle link hook
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation Component Wrapper Panel */}
      <aside className={`dashboard-sidebar-wrapper ${isSidebarOpen ? 'is-mobile-open' : ''}`}>
        <DashboardSideBar closeMobileMenu={() => setIsSidebarOpen(false)} />
      </aside>
      
      {/* Mobile structural backdrop overlay layer */}
      {isSidebarOpen && (
        <div className="sidebar-mobile-backdrop" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Main Structural Application Panel viewport */}
      <div className="dashboard-main-viewport">
        {/* Desktop Layout Global Header Block */}
        <header className="dashboard-header-desktop">
          <DashBoardHeader onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        </header>
        
        {/* Mobile Alternative Header Module Stream */}
        <header className="dashboard-header-mobile">
          <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        </header>
        
        {/* Fluid Workspace Component Router Target Node Container */}
        <main className="dashboard-workspace-content">   
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;