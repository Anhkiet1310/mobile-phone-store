import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="max-w-container mx-auto text-center mt-20">
      <h1 className="text-4xl font-bold text-green-500">Payment Successful!</h1>
      <p className="mt-4 text-lg">
        Thank you for your payment. Your order has been placed successfully!
      </p>
      <button
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => window.location.href = "/"}
      >
        Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
