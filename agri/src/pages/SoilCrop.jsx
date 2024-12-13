import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import FileUpload from "../components/FileUpload";
import { Line } from "react-chartjs-2";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Gauge } from "react-circular-gauge"; // Correct import
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Footer from "../components/Footer";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
  const getColor = (score) => {
    if (score > 75) return "#00FF00"; // Green for >75
    if (score > 50) return "#FFFF00"; // Yellow for 50-75
    if (score > 25) return "#FF8000"; // Orange for 25-50
    return "#FF0000"; // Red for <25
  };
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

  // Define best values for comparison (these are example values, adjust as needed)
  const bestValues = {
    N: 100,
    P: 50,
    K: 150,
    ph: 6.5,
    B: 0.5,
    Zn: 1.0,
    Cu: 1.5,
    Fe: 5.0,
    temperature: 25,
    humidity: 70,
    rainfall: 100,
  };

  // Data for the chart (compare soil values vs best values)
  const chartData = {
    labels: Object.keys(formData),
    datasets: [
      {
        label: "Soil Values",
        data: Object.values(formData),
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
      {
        label: "Best Values",
        data: Object.keys(formData).map((key) => bestValues[key]),
        borderColor: "#FF6347", // Red color for best values
        backgroundColor: "rgba(255, 99, 71, 0.2)",
        fill: true,
      },
    ],
  };
  const segments = [
    { start: 0, end: 0.25, color: "#FF0000" },
    { start: 0.25, end: 0.5, color: "#FF8000" },
    { start: 0.5, end: 0.75, color: "#FFFF00" },
    { start: 0.75, end: 1, color: "#80FF00" },
  ];
  const colors = segments.map((segment) => segment.color);

  // Score meter data (example)
  const calculateScore = (userValues, bestValues) => {
    let totalScore = 0;
    let totalParameters = 0;

    // Loop through each parameter to calculate the score
    Object.keys(userValues).forEach((key) => {
      const userValue = userValues[key];
      const bestValue = bestValues[key];

      // If the user value is not empty, calculate the score for that parameter
      if (userValue !== "") {
        // Calculate the absolute difference
        const difference = Math.abs(userValue - bestValue);

        // Normalize the difference (you can adjust this based on the range of values)
        const normalizedDifference = difference / bestValue;

        // Calculate the score for this parameter (lower difference = higher score)
        const parameterScore = (1 - normalizedDifference) * 100;

        // Accumulate the score
        totalScore += parameterScore;
        totalParameters += 1;
      }
    });

    // Calculate the average score
    const finalScore = totalParameters > 0 ? totalScore / totalParameters : 0;

    return finalScore;
  };

  // Example best values for comparison (you can adjust these based on your domain)

  // Example usage with formData (user input)
  const score = results ? calculateScore(formData, bestValues) : 0;

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
        <form
          onSubmit={handleSubmit}
          className="flex w-4/6 flex-col gap-8 items-end"
        >
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
            <div className="flex justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Prediction Results
                </h2>
                <p className="text-lg text-gray-600">
                  Suggested Crop: {results.crop}
                </p>
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
              {/* Display Score Meter */}
              <div className="mt-6 w-64 h-80">
                <Gauge
                  value={score}
                  min={0}
                  max={100}
                  arcWidth={0.2}
                  arcColor={
                    score > 75
                      ? ["#00FF00"] // Green for >75
                      : score > 50
                      ? ["#FFFF00"] // Yellow for 50-75
                      : score > 25
                      ? ["#FF8000"] // Orange for 25-50
                      : ["#FF0000"]
                  }
                />
              </div>
            </div>
            {/* Display Gauge */}

            {/* Display Chart */}
            <div className="mt-6 w-full">
              <Line data={chartData} />
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}

export default SoilCrop;
