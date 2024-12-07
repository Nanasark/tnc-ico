"use client";
import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Success() {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const txnid = urlParams.get("txnid");
    const status = urlParams.get("status"); // Assumes 'status' is passed as query param

    if (status === "success") {
      setPaymentStatus("success");
    } else {
      setPaymentStatus("failure");
    }
    setLoading(false);
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div>Loading...</div>
      ) : paymentStatus === "success" ? (
        <div className="success">
          <FaCheckCircle size={50} color="green" />
          <h2>Payment Successful!</h2>
          <p>Your payment has been successfully processed.</p>
        </div>
      ) : (
        <div className="failure">
          <FaTimesCircle size={50} color="red" />
          <h2>Payment Failed</h2>
          <p>There was an issue with your payment. Please try again.</p>
        </div>
      )}

      <button onClick={() => (window.location.href = "/")} className="btn-home">
        Return to Home
      </button>
    </div>
  );
}
