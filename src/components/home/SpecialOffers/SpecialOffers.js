import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";

const SpecialOffers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    const fetchSpecialOffers = async () => {
      try {
        const response = await fetch("https://localhost:7295/odata/Phone/details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Sort products by price in ascending order and take the top 4
          const sortedProducts = data.sort((a, b) => a.price - b.price);
          setProducts(sortedProducts.slice(0, 4));
        } else {
          console.error("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching special offers:", error);
      }
    };

    fetchSpecialOffers();
  }, []);

  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
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
              badge={true} // Special Offers always show badge
              des={product.description}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">Loading special offers...</p>
        )}
      </div>
    </div>
  );
};

export default SpecialOffers;
