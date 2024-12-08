import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    const fetchBestSellers = async () => {
      try {
        const response = await fetch("https://localhost:7295/odata/Phone/details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Sort products by stock quantity in ascending order and take the top 4
          const sortedProducts = data.sort((a, b) => a.stockQuantity - b.stockQuantity);
          setProducts(sortedProducts.slice(0, 4));
        } else {
          console.error("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <div className="w-full pb-20">
      <Heading heading="Our Bestsellers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.length > 0 ? (
          products.map((product) => (
            <Product
              key={product.phoneId}
              _id={product.phoneId}
              img={product.image}
              productName={product.modelName}
              price={product.price}
              color={product.color}
              badge={product.stockQuantity > 0} // Display badge only if stock is available
              des={product.description}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">Loading best sellers...</p>
        )}
      </div>
    </div>
  );
};

export default BestSellers;
