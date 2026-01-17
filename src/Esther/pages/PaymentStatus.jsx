import { useLocation } from 'react-router';
import '../styles/paymentStatus.css';

export default function PaymentStatus() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');
  const isSuccess = status === 'success';

  return (
    <div className="payment-wrapper">
      <div className={`payment-card ${isSuccess ? 'success' : 'failed'}`}>
        <div className="PaymentStatuslogoWrap">
          <img src="/images/logo.png" alt="Logo" className="" />
        </div>
        <img
          src={isSuccess ? '/images/Transaction Successful.png' : '/images/Transaction Failed.png'}
          alt={isSuccess ? 'Payment Success' : 'Payment Failed'}
          className="status-icon"
        />

        <h1>{isSuccess ? 'Payment Successful' : 'Payment Failed'}</h1>

        <p>
          {isSuccess
            ? 'Thank you! Your donation has been received successfully.'
            : 'Oops! Something went wrong. Your payment was not processed.'}
        </p>

        <button onClick={() => (window.location.href = isSuccess ? '/dashboard' : '/dashboard/subscribe')}>
          {isSuccess ? 'Go to Dashboard' : 'Try Again'}
        </button>
      </div>
    </div>
  );
}
