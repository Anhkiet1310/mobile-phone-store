import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderModal = ({ onClose }) => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch pending orders for the logged-in user
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

  // Mark order as completed and redirect to payment
  const markAsCompletedAndPay = async (orderId) => {
    try {
      console.log(`Marking order ${orderId} as completed...`);
      const updateResponse = await fetch(`https://localhost:7295/odata/Order/done/${orderId}`, {
        method: "PUT",
      });

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        console.error("Error marking order as completed:", errorText);
        navigate("/payment-failure"); // Redirect to failure page
        return;
      }

      console.log("Order marked as completed. Proceeding to payment...");

      const paymentResponse = await fetch("https://localhost:7295/api/VnPay/proceed-vnpay-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `"${orderId}"`, // Send as a raw string
      });

      if (paymentResponse.ok) {
        const paymentData = await paymentResponse.json();
        const paymentUrl = paymentData.paymentUrl; // Correctly match the backend response field

        if (paymentUrl) {
          console.log("Redirecting to payment URL:", paymentUrl);
          window.open(paymentUrl, "_blank"); // Open payment URL in a new tab
          navigate("/payment-success"); // Redirect to success page
        } else {
          console.error("Payment URL not found in response.");
          navigate("/payment-failure"); // Redirect to failure page
        }
      } else {
        const errorText = await paymentResponse.text();
        console.error("Payment API Error:", errorText);
        navigate("/payment-failure"); // Redirect to failure page
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      navigate("/payment-failure"); // Redirect to failure page
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
        <button onClick={onClose} className="mt-4 py-2 px-4 bg-red-500 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderModal;
