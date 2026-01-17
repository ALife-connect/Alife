import React, { useEffect, useState } from "react";
import './loadScreen.css'

const LoadingScreen = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    const networkSpeed = connection?.effectiveType || "4g";

    let loadingDuration;

    switch (networkSpeed) {
      case "slow-2g":
      case "2g":
        loadingDuration = 4000;
        break;
      case "3g":
        loadingDuration = 2500;
        break;
      default:
        loadingDuration = 1000;
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, loadingDuration);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="loader-container">
      <div className="loader-logo-section">
        <img src="images/alifelogo.JPG" alt="Logo" className="loader-logo" />
      </div>
    </div>
  ) : (
    children
  );
};

export default LoadingScreen;
