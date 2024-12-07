"use client";
import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Success() {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const txnid = new URLSearchParams(window.location.search).get("txnid");
    console.log("Transaction ID:", txnid);

    if (!txnid) {
      setPaymentStatus("failure");
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch("/api/payu-webhook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ txnid }),
        });

        const data = await response.json();
        if (data.success) {
          setPaymentStatus("success");
        } else {
          setPaymentStatus("failure");
        }
      } catch (error) {
        setPaymentStatus("failure");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
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
