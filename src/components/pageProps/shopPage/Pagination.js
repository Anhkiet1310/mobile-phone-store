import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product"; // Import your Product component
import { useLocation, useNavigate } from "react-router-dom";

const Pagination = ({ itemsPerPage, selectedBrand, viewType }) => {
  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProductId } = location.state || {}; // Get the selectedProductId from the search query

  useEffect(() => {
    // Fetch data from OData API
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7295/odata/Phone/details");
        const data = await response.json();

        let filteredItems = data;

        // Filter items by selected brand name
        if (selectedBrand) {
          filteredItems = filteredItems.filter((item) => item.brandName === selectedBrand);
        }

        // Filter items if a specific product is selected (via search query)
        if (selectedProductId) {
          filteredItems = filteredItems.filter((item) => item.phoneId === selectedProductId);
        }

        setItems(filteredItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchData();
  }, [selectedBrand, selectedProductId]);

  useEffect(() => {
    // Update current items and page count when items or itemOffset changes
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [items, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const resetFilters = () => {
    navigate("/shop", { replace: true }); // Redirect back to the shop page without any state
  };

  return (
    <div>
      {/* Reset Button */}
      {selectedProductId && (
        <div className="flex justify-end mb-4">
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Display Items */}
      <div
        className={`${
          viewType === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
            : "flex flex-col gap-4"
        }`}
      >
        {currentItems.map((item) => (
          <Product
            key={item.phoneId}
            _id={item.phoneId}
            img={item.image}
            productName={item.modelName}
            price={item.price}
            color={item.color}
            badge={true} // Assuming products always have a badge
            des={item.description}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {pageCount > 1 && (
        <ReactPaginate
          nextLabel="Next"
          previousLabel="Previous"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          containerClassName="flex justify-center space-x-2 mt-4"
          activeClassName="bg-black text-white p-2"
          pageLinkClassName="p-2 border"
          previousLinkClassName="p-2 border"
          nextLinkClassName="p-2 border"
        />
      )}
    </div>
  );
};

export default Pagination;
