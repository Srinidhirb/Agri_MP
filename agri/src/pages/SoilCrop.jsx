import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import FileUpload from "../components/FileUpload";

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
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const labels = {
    N: "Nitrogen (N) Level",
    P: "Phosphorus (P) Level",
    K: "Potassium (K) Level",
    ph: "Soil pH Level",
    B: "Boron (B) Level",
    Zn: "Zinc (Zn) Level",
    Cu: "Copper (Cu) Level",
    Fe: "Iron (Fe) Level",
    temperature: "Temperature (°C)",
    humidity: "Humidity (%)",
    rainfall: "Rainfall (mm)",
  };

  return (
    <>
      <NavBar />
      <Banner items={["Home", "services", "Soil Health Analysis"]} />
      <FileUpload />
      <div className="flex items-center my-8 w-11/12 mx-auto">
        <div className="flex-grow border-t-2 border-dashed border-gray-400"></div>
        <span className="px-4 text-gray-600 font-medium">OR</span>
        <div className="flex-grow border-t-2 border-dashed border-gray-400"></div>
      </div>
      <div className="flex justify-center flex-col items-center p-6 space-y-6">
        <form onSubmit={handleSubmit} className="flex w-4/6 flex-col gap-8 items-end">
          <div className="gap-2 flex flex-wrap items-center justify-between">
            {Object.keys(formData).map((key) => (
              <div key={key} className="w-80">
                <label className="block text-sm font-medium text-gray-700">
                  {labels[key]}
                </label>
                <input
                  type="number"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                  placeholder={`Enter ${labels[key].toLowerCase()}`}
                />
              </div>
            ))}
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600"
            >
              Predict
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
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
                })
              }
              className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-md shadow hover:bg-gray-400"
            >
              RESET
            </button>
          </div>
        </form>

        {results && (
          <div className="mt-6 w-3/4 bg-gray-50 p-4 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">
              Prediction Results
            </h2>
            <p className="text-lg text-gray-600">Suggested Crop: {results.crop}</p>
            <p className="text-lg text-gray-600">
              Soil Fertility: {results.fertility}
            </p>
            <h3 className="mt-4 font-semibold text-lg text-gray-700">
              Recommendations:
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {Array.isArray(results.recommendations) &&
                results.recommendations.map((rec, index) => (
                  <li key={index} className="text-gray-600">
                    {rec}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default SoilCrop;
