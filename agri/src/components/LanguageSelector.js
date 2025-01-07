import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n'; // Import the i18n instance
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation
import Lock from '../assets/icons/Lock';
import Check from '../assets/icons/Check'; // Import a check icon

const LanguageSelector = () => {
  const { t } = useTranslation(); // Access translation function
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get the current location
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // Track selected language

  // Get the previous location from sessionStorage
  const previousLocation = sessionStorage.getItem('previousLocation') || '/'; // Default to home if no previous location

  useEffect(() => {
    // Store the current location as the previous location when the component mounts
    sessionStorage.setItem('previousLocation', location.pathname);
  }, [location]);

  const changeLanguage = (lang) => {
    // Store the current language as the previous language before changing it
    console.log(`Changing language to: ${lang}`);
  
    i18n.changeLanguage(lang); // Change the language
    setSelectedLanguage(lang); // Update selected language
    navigate(previousLocation); // Redirect to the previous page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">{t('Select Your Language')}</h1>
      <div className="grid grid-cols-4 gap-6">
        {[
          { code: 'en', label: 'India | English' },
          { code: 'hi', label: 'India | Hindi' },
          { code: 'ta', label: 'India | Tamil' },
          { code: 'te', label: 'India | Telugu' },
          { code: 'kn', label: 'India | Kannada' },
          { code: 'ml', label: 'India | Malayalam' },
          { code: 'gu', label: 'India | Gujarati' },
          { code: 'mr', label: 'India | Marathi' },
          { code: 'pa', label: 'India | Punjabi' },
        ].map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`p-4 border rounded-lg shadow-sm bg-white hover:shadow-md hover:bg-gray-50 text-left flex items-center justify-between ${
              selectedLanguage === lang.code ? 'border-green-500' : ''
            }`}
          >
            <span className="block font-semibold text-gray-800">{t(lang.label)}</span>
            {selectedLanguage === lang.code && (
              <span className="text-green-500">
                <Check />
              </span>
            )}
          </button>
        ))}
        {[
          
          { code: 'or', label: 'India | Odia' },
          { code: 'as', label: 'India | Assamese' },
          { code: 'ur', label: 'India | Urdu' },
          { code: 'sd', label: 'India | Sindhi' },
          { code: 'sa', label: 'India | Sanskrit' },
          { code: 'maithili', label: 'India | Maithili' },
          { code: 'kok', label: 'India | Konkani' },
          { code: 'bh', label: 'India | Bhojpuri' },
          { code: 'rj', label: 'India | Rajasthani' },
          { code: 'sindhi', label: 'India | Sindhi' },
          { code: 'kho', label: 'India | Khond' },
          { code: 'bodo', label: 'India | Bodo' },
          { code: 'dogri', label: 'India | Dogri' },
          { code: 'marwari', label: 'India | Marwari' },
          { code: 'santali', label: 'India | Santali' },
          { code: 'tulu', label: 'India | Tulu' },
          { code: 'garhwali', label: 'India | Garhwali' },
          { code: 'kumoni', label: 'India | Kumoni' },
          { code: 'nepali', label: 'India | Nepali' },
          
        ].map((lang) => (
          <button
            key={lang.code}
            onClick={() => alert(`${lang.label} language is not yet available.`)}
            className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md hover:bg-gray-50 text-left flex items-center justify-between"
          >
            <span className="block font-semibold text-gray-800">{t(lang.label)}</span>
            <span className="text-gray-500 text-sm italic">
              <Lock />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
