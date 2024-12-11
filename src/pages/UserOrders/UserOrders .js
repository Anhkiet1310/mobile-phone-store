import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const UserOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState({}); // Track the current product index for each order

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `https://localhost:7295/odata/Order/get-order-by-id-user/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setOrders(data);

          // Initialize the currentProductIndex state for each order
          const initialIndexes = {};
          data.forEach((order) => {
            initialIndexes[order.orderId] = 0; // Default to the first product in each order
          });
          setCurrentProductIndex(initialIndexes);
        } else {
          throw new Error("Failed to fetch orders");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (orders.length === 0) {
    return <p>No orders found for this user.</p>;
  }

  const handleNextProduct = (orderId) => {
    setCurrentProductIndex((prev) => ({
      ...prev,
      [orderId]: (prev[orderId] + 1) % orders.find((o) => o.orderId === orderId).orderDetails.length,
    }));
  };

  const handlePreviousProduct = (orderId) => {
    setCurrentProductIndex((prev) => ({
      ...prev,
      [orderId]:
        (prev[orderId] - 1 + orders.find((o) => o.orderId === orderId).orderDetails.length) %
        orders.find((o) => o.orderId === orderId).orderDetails.length,
    }));
  };

  return (
    <div className="max-w-container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Your Orders</h1>
      <div className="grid gap-8">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="border rounded-lg p-6 shadow-lg bg-white"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">
                Order #{order.orderId}
              </h2>
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  order.status === "Completed"
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-gray-700 mb-2">
              <strong>Order Date:</strong>{" "}
              {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Total Amount:</strong> ${(order.totalAmount / 1000).toFixed(2)}
            </p>
            <div>
              <h3 className="text-lg font-semibold mb-3">Order Details</h3>
              <div className="space-y-6">
                {order.orderDetails.length > 1 ? (
                  <div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handlePreviousProduct(order.orderId)}
                        className="py-1 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-700 flex items-center justify-center"
                      >
                        <FaArrowLeft />
                      </button>
                      <div className="flex gap-4 items-center">
                        <img
                          src={
                            order.orderDetails[currentProductIndex[order.orderId]].image
                          }
                          alt={`Phone ID: ${
                            order.orderDetails[currentProductIndex[order.orderId]].phoneId
                          }`}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div>
                          <p className="text-gray-800 font-semibold">
                            Phone ID:{" "}
                            {
                              order.orderDetails[currentProductIndex[order.orderId]].phoneId
                            }
                          </p>
                          <p className="text-gray-600">
                            Quantity:{" "}
                            {
                              order.orderDetails[currentProductIndex[order.orderId]].quantity
                            }
                          </p>
                          <p className="text-gray-600">
                            Unit Price: $
                            {(
                              order.orderDetails[currentProductIndex[order.orderId]]
                                .unitPrice / 1000
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleNextProduct(order.orderId)}
                        className="py-1 px-3 bg-blue-500 text-white rounded-full hover:bg-blue-700 flex items-center justify-center"
                      >
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4 items-center">
                    <img
                      src={order.orderDetails[0].image}
                      alt={`Phone ID: ${order.orderDetails[0].phoneId}`}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div>
                      <p className="text-gray-800 font-semibold">
                        Phone ID: {order.orderDetails[0].phoneId}
                      </p>
                      <p className="text-gray-600">
                        Quantity: {order.orderDetails[0].quantity}
                      </p>
                      <p className="text-gray-600">
                        Unit Price: ${(order.orderDetails[0].unitPrice / 1000).toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/shop"
        className="block mt-8 text-center bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default UserOrders;
