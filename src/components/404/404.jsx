import React from 'react'
import './404.css'

const NotFound = () => {
    return (
        <div className="not-found-wrapper">
          <div className="not-found-content">
            <img src="/images/logo.png" alt="Logo" className="logo" />
    
            
    
            <h1><img
              src="/images/404 error.jpeg"
              alt="Not found"
              className="illustration"
            /></h1>
            <h2>This page got lost in the flow 🩸</h2>
            <p>
              We couldn't find the page you were looking for.
              But don’t worry — you can always go back and keep saving lives.
            </p>
    
            <button onClick={() => (window.location.href = '/')}>
              Back to Home
            </button>
          </div>
        </div>
      );
}

export default NotFound