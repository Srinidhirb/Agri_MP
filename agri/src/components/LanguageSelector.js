// src/components/LanguageSelector.js
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n'; // Import the i18n instance
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

const LanguageSelector = () => {
  const { t } = useTranslation(); // Access translation function
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get the current location

  // Get the previous location from sessionStorage
  const previousLocation = sessionStorage.getItem('previousLocation') || '/'; // Default to home if no previous location

  useEffect(() => {
    // Store the current location as the previous location when the component mounts
    sessionStorage.setItem('previousLocation', location.pathname);
  }, [location]);

  const changeLanguage = (lang) => {
    // Store the current language as the previous language before changing it
    localStorage.setItem('previousLanguage', i18n.language);
    i18n.changeLanguage(lang); // Change the language
    navigate(previousLocation); // Redirect to the previous page
  };

  return (
    <div className="flex flex-col space-y-2 p-4 border rounded-lg shadow-md w-40">
      {/* Language buttons */}
      <button 
        onClick={() => changeLanguage('en')} 
        className="px-4 py-2 text-left hover:bg-gray-200 rounded"
      >
        {t('english')}
      </button>
      <div className="border-t border-gray-300"></div> {/* Line separator */}
      <button 
        onClick={() => changeLanguage('fr')} 
        className="px-4 py-2 text-left hover:bg-gray-200 rounded"
      >
        {t('french')}
      </button>
      <div className="border-t border-gray-300"></div> {/* Line separator */}
      <button 
        onClick={() => changeLanguage('hi')} 
        className="px-4 py-2 text-left hover:bg-gray-200 rounded"
      >
        {t('hindi')}
      </button>
      <button 
        onClick={() => changeLanguage('ta')} 
        className="px-4 py-2 text-left hover:bg-gray-200 rounded"
      >
        {t('tamil')}
      </button>
      <button 
        onClick={() => changeLanguage('te')} 
        className="px-4 py-2 text-left hover:bg-gray-200 rounded"
      >
        {t('Telgu')}
      </button>
      <button 
        onClick={() => changeLanguage('kn')} 
        className="px-4 py-2 text-left hover:bg-gray-200 rounded"
      >
        {t('Kannada')}
      </button>
    </div>
  );
};

export default LanguageSelector;
