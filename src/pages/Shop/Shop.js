import React, { useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [viewType, setViewType] = useState("grid");

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      <div className="flex gap-10 pb-20">
        {/* Sidebar */}
        <div className="w-1/4 hidden lg:block">
          <ShopSideNav />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4 flex flex-col gap-10">
          <ProductBanner
            itemsPerPageFromBanner={setItemsPerPage}
            setSelectedBrand={setSelectedBrand}
            setViewType={setViewType}
          />
          <Pagination
            itemsPerPage={itemsPerPage}
            selectedBrand={selectedBrand}
            viewType={viewType}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
