import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const FileUpload = ({ setFormData }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileUrl, setFileUrl] = useState(null); // State to hold the file URL for preview

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Create a URL for the selected file to display as a preview
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setFileUrl(fileUrl); // Set the file URL for preview
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Simulate parsing the extracted text and mapping it to form fields
        const extractedData = parseExtractedText(data.extracted_text);
        setFormData(extractedData); // Update formData in SoilCrop component
      } else {
        setError(data.error || "Failed to extract data from the file.");
      }
    } catch (err) {
      setError("An error occurred while uploading the file.");
    } finally {
      setLoading(false);
    }
  };

  const parseExtractedText = (text) => {
    // Simulate parsing logic (you should replace this with actual parsing logic)
    const lines = text.split("\n");
    const mappedData = {
      N: lines[1]?.split(":")[1]?.trim() || "",
      P: lines[2]?.split(":")[1]?.trim() || "",
      K: lines[3]?.split(":")[1]?.trim() || "",
      ph: lines[4]?.split(":")[1]?.trim() || "",
      B: lines[5]?.split(":")[1]?.trim() || "",
      Zn: lines[6]?.split(":")[1]?.trim() || "",
      Cu: lines[7]?.split(":")[1]?.trim() || "",
      Fe: lines[8]?.split(":")[1]?.trim() || "",
      temperature: lines[9]?.split(":")[1]?.trim() || "",
      humidity: lines[10]?.split(":")[1]?.trim() || "",
      rainfall: lines[11]?.split(":")[1]?.trim() || "",
    };
    
    return mappedData;
  };

  const handleDelete = () => {
    setFile(null);
    setFileUrl(null);
  };

  return (
    <div className="flex flex-col items-center p-6 rounded-lg">
      {/* File upload UI */}
      <div
        className="flex flex-col items-center justify-center w-2/4 h-48 p-4 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-200"
        onClick={() => document.getElementById("fileInput").click()}
      >
        <input
          id="fileInput"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        {/* SVG Icon and text */}
        <p className="text-gray-500 font-semibold">
          Drag & drop files or <span className="text-blue-500 underline">Browse</span>
        </p>
        <p className="text-gray-400 text-sm mt-2">Supported formats: PDF</p>
      </div>

      {/* Display the selected file name */}
      {file && (
        <div className="mt-4 text-gray-700 flex items-center">
          <p>Selected File: {file.name}</p>
          <button
            onClick={handleDelete}
            className="ml-2 text-red-500 hover:text-red-700"
          >
          <MdDelete  size={20}/>
          </button>
        </div>
      )}

      {/* File Preview (if the file is selected) */}
      {fileUrl && (
        <div className="mt-4 w-[70vh] h-80 border border-gray-300 rounded overflow-hidden relative">
          <iframe
            src={fileUrl}
            title="File Preview"
            width="100%"
            height="100%"
            frameBorder="0"
          />
          {/* Delete icon inside the preview box */}
        
        </div>
      )}

      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Upload and Extract
      </button>

      {loading && <p className="text-blue-500 mt-4">Uploading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default FileUpload;
