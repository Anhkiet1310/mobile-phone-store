import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import OrderModal from "./OrderModal"; // Import the modal component

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [showModal, setShowModal] = useState(false); // Modal visibility

  // Calculate total amount and shipping charges
  useEffect(() => {
    const price = products.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalAmt(price);

    if (price <= 200) {
      setShippingCharge(30);
    } else if (price <= 400) {
      setShippingCharge(25);
    } else {
      setShippingCharge(20);
    }
  }, [products]);

  // Function to create an order
  const createOrder = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("Please log in to create an order!");
      return;
    }

    const userId = JSON.parse(atob(accessToken.split(".")[1])).userId;
    const orderDetails = products.map((product) => ({
      phoneId: product._id,
      quantity: product.quantity,
    }));

    const orderPayload = {
      userId,
      orderDetails,
    };

    try {
      const response = await fetch("https://localhost:7295/odata/Order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        alert("Order created successfully!");
        dispatch(resetCart());
      } else {
        const errorText = await response.text();
        alert(`Failed to create order: ${errorText}`);
      }
    } catch (error) {
      alert("An error occurred while creating the order. Please try again.");
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {products.length > 0 ? (
        <div className="pb-20">
          {/* Table Headers */}
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>

          {/* Product Items */}
          <div className="mt-5">
            {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => dispatch(resetCart())}
              className="py-2 px-10 bg-red-500 text-white font-semibold uppercase hover:bg-red-700 duration-300"
            >
              Reset cart
            </button>
          </div>

          {/* Cart Summary */}
          <div className="max-w-7xl flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart Totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${totalAmt.toFixed(2)}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Shipping Charge
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${shippingCharge.toFixed(2)}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    ${(totalAmt + shippingCharge).toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={createOrder}
                  className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
                >
                  Create Order
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
          </div>
        </motion.div>
      )}

      {/* View Your Order Button (common) */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowModal(true)}
          className="py-2 px-10 bg-blue-500 text-white font-semibold uppercase hover:bg-blue-700 duration-300"
        >
          View Your Order
        </button>
      </div>

      {showModal && <OrderModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Cart;
