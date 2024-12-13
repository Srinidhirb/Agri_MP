import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
function Plant() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [remedies, setRemedies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPrediction(null);
    setRemedies(null);
    setError(null);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    setPredicting(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5002/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();

      setPrediction(data.prediction);
      setRemedies(data.remedies); // Assuming the remedies are part of the response.
    } catch (err) {
      setError("Error uploading file");
    } finally {
      setPredicting(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const CustomLoader = () => (
    <div className="flex items-center justify-center ">
      <div className="flex flex-col items-center">
        <div className="loader mb-4"></div>
        <p className="text-gray-600 font-medium">Processing...</p>
      </div>
      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <NavBar />
      <Banner items={["Home", "Services", "Plant Diseases and Remedies"]} />
      <div className=" flex flex-col justify-center items-center  py-8">
        {predicting ? (
          <CustomLoader />
        ) : (
          <div className="bg-white p-8 rounded-lg flex flex-col justify-center items-center  w-full">
            <div className="flex w-full justify-center">
              <div
                className="flex flex-col items-center justify-center w-2/4 h-48 p-4 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-200"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-12 h-12 text-gray-500 mb-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16v-8m0 0L8 12m4-4l4 4M4.75 12a7.25 7.25 0 1114.5 0 7.25 7.25 0 01-14.5 0z"
                  />
                </svg>
                <p className="text-gray-500 font-semibold">
                  Drag & drop files or{" "}
                  <span className="text-blue-500 underline">Browse</span>
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word,
                  PPT
                </p>
              </div>
            </div>

            {preview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={preview}
                  alt="Selected file preview"
                  className="max-w-xs max-h-64 rounded-lg shadow-md"
                />
              </div>
            )}

            <button
              onClick={handleFileUpload}
              className="w-64  py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
            >
              Upload and Predict
            </button>

            {error && (
              <div className="mt-4 text-red-500 text-center">{error}</div>
            )}

            {prediction && (
              <div className="mt-6 text-left">
                <h3 className="text-xl font-medium text-green-700 mb-4">
                  Predicted Disease:
                </h3>
                <p className="text-lg font-semibold text-gray-800 mb-6">
                  {prediction}
                </p>

                {remedies && (
                  <div>
                    <h4 className="text-lg font-medium text-green-600 mb-2">
                      Remedies:
                    </h4>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                      <div className="text-gray-700">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: remedies
                              .replace(/\*\*/g, "") // Remove bold asterisks (**)
                              .replace(/"/g, "") // Remove double quotes
                              .split("\n") // Split the remedies by newlines
                              .map((line) => {
                                // Check if the line starts with a number
                                if (/^\d/.test(line)) {
                                  return `<ul><li class="my-4">${line}</li></ul>`; // Wrap it in <ul><li>
                                }
                                return line; // Otherwise, return the line as is
                              })
                              .join(""), // Join back with <br/> to preserve line breaks
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}

export default Plant;
