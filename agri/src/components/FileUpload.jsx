import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;

    setLoading(true);

    // Simulate file upload
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second upload time
  };

  const handleDelete = () => {
    setFile(null);
  };

  return (
    <div className="flex flex-col items-center p-6  rounded-lg ">
      <div
        className="flex flex-col items-center justify-center w-2/4 h-48 p-4 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-200"
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input
          id="fileInput"
          type="file"
          accept=".pdf,image/*,.mp4,.psd,.ai,.doc,.docx,.ppt,.pptx"
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
        <p className="text-gray-500 font-semibold">Drag & drop files or <span className="text-blue-500 underline">Browse</span></p>
        <p className="text-gray-400 text-sm mt-2">Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</p>
      </div>

      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Upload
      </button>

      {loading && <p className="text-blue-500 mt-4">Uploading...</p>}

      {file && !loading && (
        <div className="mt-4 relative">
          <p className="mb-2 font-semibold">Uploaded file:</p>
          {file.type === 'application/pdf' ? (
            <embed
              src={URL.createObjectURL(file)}
              width="600"
              height="400"
              type="application/pdf"
              className="border border-gray-300 rounded"
            />
          ) : file.type.startsWith('image/') ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded"
              width="600"
              className="border border-gray-300 rounded"
            />
          ) : (
            <p className="text-gray-500">File preview not supported for this format.</p>
          )}
          <button
            onClick={handleDelete}
            className="absolute -top-1 right-0 mt-2 mr-2 text-red-500 hover:text-red-700"
          >
           <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="24px" height="24px" className='hover:fill-red-500'>    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
