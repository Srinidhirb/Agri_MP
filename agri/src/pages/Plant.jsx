import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";

function Plant() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [remedies, setRemedies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5002/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();

      setPrediction(data.prediction);
      setRemedies(data.remedies); // Assuming the remedies are part of the response.
     
    } catch (err) {
      setError("Error uploading file");
    }
  };
  useEffect(() => {
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
      <NavBar />
      <Banner items={["Home", "Services", "Plant Diseases and Remedies"]} />
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-semibold text-center text-green-600 mb-6">Plant Disease Prediction</h1>

        <input 
          type="file" 
          onChange={handleFileChange} 
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
        />
        
        <button 
          onClick={handleFileUpload} 
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Upload and Predict
        </button>

        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

        {prediction && (
          <div className="mt-6 text-left">
            <h3 className="text-xl font-medium text-green-700 mb-4">Predicted Disease:</h3>
            <p className="text-lg font-semibold text-gray-800 mb-6">{prediction}</p>

            {remedies && (
              <div>
                <h4 className="text-lg font-medium text-green-600 mb-2">Remedies:</h4>
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <div className="text-gray-700">
                    {/* Assuming remedies are HTML formatted text */}
                    <div dangerouslySetInnerHTML={{ __html: remedies }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default Plant;
