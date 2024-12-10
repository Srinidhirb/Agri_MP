import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";

import Banner from "../components/Banner";
function SoilCrop() {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    ph: "",
    B: "",
    Zn: "",
    Cu: "",
    Fe: "",
    temperature: "",
    humidity: "",
    rainfall: "",
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value ? parseFloat(value) : "", // Convert input value to float
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
    <NavBar/>
    <Banner items={["Home", "services" ,"Soil Health Analysis"]} />
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-[80%] bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Agricultural Predictor</h1>
        <form onSubmit={handleSubmit} className=" gap-6 flex flex-wrap items-center justify-between">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700">{key}</label>
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Predict
          </button>
        </form>

        {results && (
          <div className="mt-6 bg-gray-50 p-4 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Prediction Results</h2>
            <p className="text-lg text-gray-600">Suggested Crop: {results.crop}</p>
            <p className="text-lg text-gray-600">Soil Fertility: {results.fertility}</p>
            <h3 className="mt-4 font-semibold text-lg text-gray-700">Recommendations:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {Array.isArray(results.recommendations) &&
                results.recommendations.map((rec, index) => (
                  <li key={index} className="text-gray-600">{rec}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default SoilCrop;
