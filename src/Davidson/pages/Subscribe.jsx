import React, { useState } from "react";
import "./subscribe.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import FadeLoader from "react-spinners/CircleLoader";
const KORA_KEY = import.meta.env.VITE_KORAPAY
import KoraPayment from 'kora-checkout';
import { paymentStatus } from "../../global/Slice";

const Subscribe = () => {
  const user = useSelector((state) => state.loggedInUser);
  const [loadState, setLoadState] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const dispatch = useDispatch()

  const amountOptions = [
    { label: "Monthly", value: "monthly", amount: 10000 },
    { label: "Quarterly", value: "quarterly", amount: 50000 },
    { label: "Yearly", value: "yearly", amount: 100000 },
  ];

  const handleSubscribe = () => {
    const selected = amountOptions.find((plan) => plan.value === selectedPlan);
    if (!selected) {
      toast.error("Please select a valid plan");
      return;
    }

      setLoadState(true);

      const paymentOptions = {
        key: KORA_KEY,
        reference: `lifelink_${Date.now()}`,
        amount: selected.amount, 
        customer: {
          name: user?.fullName || "Hospital User",
          email: user?.email || "hospital@example.com",
        },
        onclose: () =>{
          setLoadState(false);
        },
        onSuccess: () => {
            console.log('Payment successful');
            setLoadState(false);
            window.location.href = "https://lifelink-xi.vercel.app/paymentcheck?status=success";
            dispatch(paymentStatus())
        },
        onFailed: (err) => {
            console.error(err.message);
            console.log('payment Failed')
            setLoadState(false);
            window.location.href = "https://lifelink-xi.vercel.app/paymentcheck?status=failed";
        }
    };

    const payment = new KoraPayment();
    payment.initialize(paymentOptions);


  };


  return (
    <div className="subscribe-container">
      <div className="subscribe-inner-container">
        <div className="welcome">
          <h1>Welcome to ALIFE for Hospitals!</h1>
        </div>

        <div className="img-cnt">
          <img src="/images/subscribe.png" alt="LifeLink Illustration" />
        </div>

        <p>
          You need to subscribe to start requesting blood, viewing, & managing
          appointments.
        </p>

        <div className="plan-selection">
          <h3>Select a Plan:</h3>
          <div className="plan-cards">
            {amountOptions.map((plan) => (
              <div
                key={plan.value}
                className={`plan-card ${
                  selectedPlan === plan.value ? "selected" : ""
                }`}
                onClick={() => setSelectedPlan(plan.value)}
              >
                <h4>{plan.label}</h4>
                <p>₦{(plan.amount).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <button className="subscribe-button" onClick={handleSubscribe}>
          {loadState ? <FadeLoader color="white" size={25} /> : "Subscribe Now"}
        </button>
      </div>
    </div>
  );
};

export default Subscribe;
