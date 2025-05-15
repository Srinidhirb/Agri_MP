import React from 'react'
import { useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'

function CommingSoon() {
  const location = useLocation();
  const path = location.pathname.split('/').filter(Boolean); // remove empty strings
  const currentPage = path[path.length - 1] || 'Home';

  // Optional: Convert slug to readable title
  const formatPageTitle = (slug) => {
    if (slug.toLowerCase() === 'contact') return 'Contact Us';
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  return (
    <>
      <NavBar />
      <Banner items={['Home', formatPageTitle(currentPage)]} />
      <div className="flex items-center justify-center h-[38vh] bg-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 h-auto overflow-hidden">Coming Soon</h1>
          <p className="text-lg text-gray-600">We are working hard to bring you something amazing. Stay tuned!</p>
        </div>
      </div>
    </>
  )
}

export default CommingSoon
