import React from "react";

const PaymentFailure = () => {
  return (
    <div className="max-w-container mx-auto text-center mt-20">
      <h1 className="text-4xl font-bold text-red-500">Payment Failed</h1>
      <p className="mt-4 text-lg">
        We encountered an issue while processing your payment. Please try again.
      </p>
      <button
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => window.location.href = "/cart"}
      >
        Go Back to Cart
      </button>
    </div>
  );
};

export default PaymentFailure;
