import React, { useEffect, useState } from "react";

const PaymentHistory = ({ userId }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(
          `https://localhost:7295/api/VnPay/get-order-payment-by-id-user-/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setPayments(data);
        } else {
          throw new Error("Failed to fetch payment history.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPayments();
    }
  }, [userId]);

  const handleGeneratePaymentUrl = async (orderId) => {
    try {
      const response = await fetch("https://localhost:7295/api/VnPay/proceed-vnpay-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderId), // Ensure the correct payload format
      });

      if (response.ok) {
        const data = await response.json();
        if (data.paymentUrl) {
          window.open(data.paymentUrl, "_blank"); // Open the payment URL in a new tab
        } else {
          alert("Failed to retrieve payment URL.");
        }
      } else {
        alert("Failed to generate payment URL.");
      }
    } catch (error) {
      alert("An error occurred while generating the payment URL. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading payment history...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Payment History</h1>
      <div className="grid gap-6">
        {payments.map((paymentItem) => (
          <div
            key={paymentItem.orderId}
            className="border rounded-md p-4 shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold">Order #{paymentItem.orderId}</h2>
            <p className="text-gray-600">
              Payment Method:{" "}
              {paymentItem.payment ? paymentItem.payment.paymentMethod : "N/A"}
            </p>
            <p className="text-gray-600">
              Payment Date:{" "}
              {paymentItem.payment
                ? new Date(paymentItem.payment.paymentDate).toLocaleDateString()
                : "N/A"}
            </p>
            <p className="text-gray-600">
              Amount Paid:{" "}
              {paymentItem.payment
                ? `$${(paymentItem.payment.amountPaid / 100).toFixed(2)}`
                : "N/A"}
            </p>
            {!paymentItem.payment && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => handleGeneratePaymentUrl(paymentItem.orderId)}
              >
                Proceed to Payment
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
