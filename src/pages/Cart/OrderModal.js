import React, { useState, useEffect } from "react";

const OrderModal = ({ onClose }) => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Access token is missing.");
        }

        const userId = JSON.parse(atob(token.split(".")[1])).userId;
        const response = await fetch(
          `https://localhost:7295/odata/Order/get-order-by-id-user/${userId}`
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error fetching orders:", errorText);
          throw new Error("Failed to fetch pending orders.");
        }

        const data = await response.json();
        const filteredOrders = data.filter((order) => order.status === "Pending");
        setPendingOrders(filteredOrders);
      } catch (error) {
        console.error("Error fetching pending orders:", error);
        alert("Error fetching pending orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []);

  const markAsCompletedAndPay = async (orderId) => {
    try {
      const updateResponse = await fetch(
        `https://localhost:7295/odata/Order/done/${orderId}`,
        {
          method: "PUT",
        }
      );

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        console.error("Error marking order as completed:", errorText);
        alert("Failed to mark order as completed.");
        return;
      }

      const paymentResponse = await fetch(
        "https://localhost:7295/api/VnPay/proceed-vnpay-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: `"${orderId}"`,
        }
      );

      if (paymentResponse.ok) {
        const paymentData = await paymentResponse.json();
        const paymentUrl = paymentData.paymentUrl;

        if (paymentUrl) {
          // Open the VNPAY payment page in a new tab
          window.open(paymentUrl, "_blank");
          alert("Redirecting to VNPAY payment page...");
          
          // Redirect back to homepage after 5 seconds
          setTimeout(() => {
            alert("Payment processed successfully! Redirecting to homepage...");
            window.location.href = "/";
          }, 5000);
        } else {
          console.error("Payment URL is missing in the response.");
          alert("Failed to retrieve payment URL.");
        }
      } else {
        const errorText = await paymentResponse.text();
        console.error("Payment API Error:", errorText);
        alert("Failed to process payment.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred during the payment process.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-bold mb-4">Pending Orders</h2>
        {loading ? (
          <p>Loading...</p>
        ) : pendingOrders.length > 0 ? (
          <ul>
            {pendingOrders.map((order) => (
              <li key={order.orderId} className="mb-4">
                <p>Order ID: {order.orderId}</p>
                <p>Total Amount: ${order.totalAmount}</p>
                <button
                  onClick={() => markAsCompletedAndPay(order.orderId)}
                  className="mt-2 py-1 px-4 bg-green-500 text-white rounded"
                >
                  Complete & Pay
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pending orders found.</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderModal;
