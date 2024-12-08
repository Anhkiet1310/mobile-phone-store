import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the newest 8 products
    const fetchNewArrivals = async () => {
      try {
        const response = await fetch("https://localhost:7295/odata/Phone/details", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Sort products by release date (assuming `releaseDate` is a valid field) and take the 8 newest
          const sortedProducts = data.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
          setProducts(sortedProducts.slice(0, 8));
        } else {
          console.error("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.phoneId} className="px-2">
              <Product
                _id={product.phoneId}
                img={product.image}
                productName={product.modelName}
                price={product.price}
                color={product.color}
                badge={product.stockQuantity > 0} // Display badge only if stock is available
                des={product.description}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading new arrivals...</p>
        )}
      </Slider>
    </div>
  );
};

export default NewArrivals;
