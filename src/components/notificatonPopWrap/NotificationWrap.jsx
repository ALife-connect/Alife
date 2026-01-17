import React, { useEffect, useState } from 'react';
import './notificationWrap.css';
import 'animate.css';
import { MdOutlineCancel } from "react-icons/md";

const NotificationWrap = (props) => {
  const [cancelNotification, setCancelNotification] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateOut(true);
      setTimeout(() => setCancelNotification(false), 3000); 
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => setCancelNotification(false), 3000);
  };

  return (
    <>
      {cancelNotification && (
        <div
          className={`animate__animated ${
            animateOut ? 'animate__fadeOut' : 'animate__headShake'
          } NotificationWrapWrapper`}
        >
          <span>{props.children}</span>
          <MdOutlineCancel cursor="pointer" onClick={handleClose} />
        </div>
      )}
    </>
  );
};

export default NotificationWrap;
