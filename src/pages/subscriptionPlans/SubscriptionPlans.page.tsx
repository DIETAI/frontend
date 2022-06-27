import React from "react";
import { useNavigate } from "react-router";

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  return (
    <div>
      multiStepForm
      <div>
        <p>plany</p>
        <p>długość planu</p>
        <p>płatność</p>
      </div>
      <button onClick={() => navigate("/dashboard/home")}>
        powrót do panelu
      </button>
      SubscriptionPlan - wszystskie
    </div>
  );
};

export default SubscriptionPlans;
