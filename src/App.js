import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  useNavigate,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import VerifyAccount from "./pages/VerifyAccount/VerifyAccount";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure/PaymentFailure";
import PaymentHistory from "./pages/PaymentHistory/PaymentHistory";
import Dashboard from "./pages/Dashboard/Dashboard"; // Admin Dashboard
import { jwtDecode } from "jwt-decode";
import UserOrders from './pages/UserOrders/UserOrders ';
import AdminLayout from "./components/AdminLayout/AdminLayout";
import ManageUsers from "./pages/AdminManage/ManageUsers";
import ManageProducts from './pages/AdminManage/ManageProducts';
import ManageOrders from './pages/AdminManage/ManageOrders';
import ManagePayments from "./pages/AdminManage/ManagePayments";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded); // Debugging step
        if (decoded.Role === "Admin") {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

// Helper function to decode userId from token
const getUserIdFromToken = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.userId;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  return null;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/product/:_id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/paymentgateway" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        <Route
          path="/orders"
          element={<UserOrders userId={getUserIdFromToken()} />}
        />
        <Route
          path="/payment-history"
          element={<PaymentHistory userId={getUserIdFromToken()} />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
      {/* Admin Routes */}
      <Route
        path="/dashboard"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/manage-users"
        element={
          <AdminLayout>
            <ManageUsers />
          </AdminLayout>
        }
      />
      <Route
        path="/manage-products"
        element={
          <AdminLayout>
            <ManageProducts />
          </AdminLayout>
        }
      />
      <Route
        path="/manage-orders"
        element={
          <AdminLayout>
            <ManageOrders />
          </AdminLayout>
        }
      />
      <Route
        path="/manage-payments"
        element={
          <AdminLayout>
            <ManagePayments />
          </AdminLayout>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/verify-account" element={<VerifyAccount />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
