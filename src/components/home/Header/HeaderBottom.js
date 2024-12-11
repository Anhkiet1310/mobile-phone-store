import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FaSearch, FaUser, FaCaretDown, FaShoppingCart, FaTimes } from "react-icons/fa";
import Flex from "../../designLayouts/Flex";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const HeaderBottom = () => {
  const products = useSelector((state) => state.orebiReducer.products);
  const [show, setShow] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null); // To store the user ID
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productData, setProductData] = useState([]); // To store fetched product data
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    // Fetch product data for suggestions
    const fetchProductData = async () => {
      try {
        const response = await fetch("https://localhost:7295/odata/Phone/details");
        if (response.ok) {
          const data = await response.json();
          setProductData(data);
        } else {
          console.error("Failed to fetch product data.");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.sub); // Assuming `sub` contains the username
        setUserId(decoded.userId); // Assuming `userId` contains the user's ID
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [show, ref]);

  useEffect(() => {
    const filtered = productData.filter((item) =>
      item.modelName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, productData]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleRedirect = (modelName) => {
    const matchedProduct = productData.find(
      (item) => item.modelName.toLowerCase() === modelName.toLowerCase()
    );
    if (matchedProduct) {
      navigate("/shop", { state: { selectedProductId: matchedProduct.phoneId } });
    }
    setSearchQuery("");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setUsername("");
    setShowUser(false);
    navigate("/");
  };

  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          {/* Shop by Category */}
          <div
            onClick={() => setShow(!show)}
            ref={ref}
            className="flex h-14 cursor-pointer items-center gap-2 text-primeColor"
          >
            <HiOutlineMenuAlt4 className="w-5 h-5" />
            <p className="text-[14px] font-normal">Shop by Category</p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between px-6 rounded-xl">
            <input
              className="flex-1 h-full outline-none placeholder:text-[#C4C4C4] placeholder:text-[14px]"
              type="text"
              onChange={handleSearch}
              value={searchQuery}
              placeholder="Search your products here"
            />
            <FaSearch className="w-5 h-5 cursor-pointer" />
            {searchQuery && (
              <FaTimes
                className="w-5 h-5 cursor-pointer text-gray-500 hover:text-black"
                onClick={handleClearSearch}
              />
            )}
            {searchQuery && filteredProducts.length > 0 && (
              <div className="absolute w-full mx-auto h-96 bg-white top-16 left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer">
                {filteredProducts.map((item) => (
                  <div
                    key={item.phoneId}
                    className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3 px-4"
                    onClick={() => handleRedirect(item.modelName)}
                  >
                    <img className="w-24" src={item.image} alt="productImg" />
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-lg">{item.modelName}</p>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User and Cart */}
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div onClick={() => setShowUser(!showUser)} className="flex">
              {isLoggedIn ? username : <FaUser />}
              <FaCaretDown />
            </div>
            {showUser && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
              >
                {isLoggedIn ? (
                  <>
                    <li className="text-gray-400 px-4 py-1 hover:text-white duration-300 cursor-default">
                      {username}
                    </li>
                    <li
                      className="text-gray-400 px-4 py-1 hover:text-white duration-300 cursor-pointer"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </li>
                    <li
                      className="text-gray-400 px-4 py-1 hover:text-white duration-300 cursor-pointer"
                      onClick={() => navigate("/orders")}
                    >
                      View Orders
                    </li>
                    <li
                      className="text-gray-400 px-4 py-1 hover:text-white duration-300 cursor-pointer"
                      onClick={() => navigate("/payment-history")}
                    >
                      Payment History
                    </li>
                    <li
                      className="text-gray-400 px-4 py-1 hover:text-white duration-300 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Log Out
                    </li>
                  </>
                ) : (
                  <>
                    <Link to="/signin">
                      <li className="text-gray-400 px-4 py-1 hover:text-white duration-300 cursor-pointer">
                        Login
                      </li>
                    </Link>
                    <Link to="/signup">
                      <li className="text-gray-400 px-4 py-1 hover:text-white duration-300 cursor-pointer">
                        Sign Up
                      </li>
                    </Link>
                  </>
                )}
              </motion.ul>
            )}
            <Link to="/cart">
              <div className="relative">
                <FaShoppingCart />
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
