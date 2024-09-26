import React from "react";
import ProductCard from "./ProductCard";
import Navbar from "../shared/Navbar";
import FooterSection from "../layout/FooterSection";
import { useSelector } from "react-redux";
import UseFetchProducts from "../customHooks/UseFetchProducts";

const Products = () => {
 
  UseFetchProducts();
  const { products=[] } = useSelector((store) => store.product);

  return (
    <>
      <Navbar />
      <section className="">
      <div className="max-w-7xl mx-auto p-4   pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-28">
        {products.map((products) => (

          <ProductCard key={products._id} products={products} />
        ))}
      </div>
      </section>
      <FooterSection />
    </>
  );
};

export default Products;
