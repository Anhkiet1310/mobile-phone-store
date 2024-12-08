import React, { useState, useEffect } from "react";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";

const ProductBanner = ({ itemsPerPageFromBanner, setSelectedBrand, setViewType }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Fetch unique brands from OData API
    const fetchBrands = async () => {
      try {
        const response = await fetch("https://localhost:7295/odata/Phone/details");
        const data = await response.json();
        const uniqueBrands = [...new Set(data.map((item) => item.brandName))];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
      {/* Grid/List View Toggle */}
      <div className="flex items-center gap-4">
        <button
          className="p-2 border"
          onClick={() => setViewType("grid")}
        >
          <BsGridFill />
        </button>
        <button
          className="p-2 border"
          onClick={() => setViewType("list")}
        >
          <ImList />
        </button>
      </div>

      {/* Filter by Brand */}
      <div>
        <label>Filter by Brand:</label>
        <select
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="p-2 border"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Show by Items Per Page */}
      <div>
        <label>Show:</label>
        <select
          onChange={(e) => itemsPerPageFromBanner(parseInt(e.target.value))}
          className="p-2 border"
        >
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="36">36</option>
        </select>
      </div>
    </div>
  );
};

export default ProductBanner;
