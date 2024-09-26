import React from "react";
import { Link } from "react-router-dom";
import FooterSection from "./FooterSection";
import { FaCartPlus } from "react-icons/fa";


const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-purple-700 to-green-500">
      <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-base tracking-wider text-green-900 font-bold uppercase">
                A social media for Electronics
              </p>
              <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">
                <span className="font-bold text-red-700">Connect</span> & Buy some cool stuff
              </h1>
            
              <Link
                to="/products"
                title=""
                className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-cyan-950 rounded-full lg:mt-16 hover:bg-cyan-800 focus:bg-yellow-400"
                role="button"
              >
                Start Shopping
                <FaCartPlus className="w-4 h-5 ml-4"/>
                
              </Link>

              <p className="mt-5 text-green-900">
                Already joined us?{" "}
                <Link
                  to="/login"
                  title=""
                  className="text-black transition-all duration-200 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>

            <div>
              <img
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                alt="Hero"
                style={{
                  clipPath: "polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 36% 56%, 31% 93%, 3% 42%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <FooterSection/>
    </div>
  );
};

export default HeroSection;
