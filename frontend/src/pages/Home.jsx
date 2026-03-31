import React, { useEffect, useState } from 'react'
import Hero from "../components/Home/Hero/Hero.jsx"
import Crousal from '../components/Home/Crousal/Crousal.jsx'
import ProductList from '../components/features/products/ProductList.jsx'
import Accordion from '../components/Home/Accordion/Accordion.jsx'
import { useNavigate } from 'react-router-dom'
import apiClient from '../services/apiClient'
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]) ;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await apiClient.get("/products/featured");
        setFeaturedProducts(data || []);
      } catch (err) {
        setError("Failed to load featured products");
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });;
  }, []);

  return (
    <>
      <Hero />
      <div className='w-full flex justify-center font-semibold mt-8 uppercase text-xl md:text-3xl'>
        FEATURED BRANDS
      </div>
      <Crousal />
      <div className='w-full flex justify-center font-semibold mt-8 uppercase text-xl md:text-3xl'>
        FEATURED PRODUCTS
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-gray-500">Loading featured products...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-red-500">{error}</div>
        </div>
      ) : (
        <ProductList products={featuredProducts} />
      )}
      <div className='w-full flex justify-center'>
        <button className="px-6 py-2 text-base sm:text-lg text-gray-800 border border-gray-800 rounded-full bg-white shadow-sm 
          hover:shadow-md hover:scale-105 
          active:scale-102 active:shadow-sm 
          transition-transform duration-200 ease-in-out" onClick={() => navigate('/products')}>
          All Products
        </button>
      </div>
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 pt-12">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Find answers to the most common questions below
          </p>
        </div>

        <Accordion />
      </div>
    </>
  )
}

export default Home
