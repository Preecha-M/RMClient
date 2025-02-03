"use client";

import { useState } from "react";
import { predictImage } from "../api"; // Ensure correct import

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handles image selection and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setPrediction(null); // Clear previous prediction when a new image is uploaded
    }
  };

  // Handles prediction request
  const handlePredict = async () => {
    if (!selectedImage) {
        alert("Please select an image first.");
        return;
    }

    setLoading(true);
    setPrediction(null);

    try {
        const result = await predictImage(selectedImage);
        console.log("Raw prediction result:", result); // Debugging log

        // Check if result is an object or string
        if (typeof result === "string") {
            // Assume Gradio is returning a formatted string, parse it manually
            const parts = result.split(" with confidence ");
            setPrediction({
                label: parts[0] || "Unknown",
                confidence: parts[1] ? parseFloat(parts[1]) : "N/A"
            });
        } else {
            // If the API returns a JSON object
            setPrediction(result);
        }
    } catch (error) {
        console.error("Error predicting image:", error);
        alert("Prediction failed. Please try again.");
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🌾 Rice Leaf Disease Detection
        </h1>

        {/* Upload Section */}
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />

          {previewImage && (
            <img
              src={previewImage}
              alt="Selected"
              className="w-64 h-64 object-cover rounded-lg shadow-md border"
            />
          )}
        </div>

        {/* Prediction Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePredict}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
            disabled={loading || !selectedImage}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>

        {/* Prediction Display */}
        {prediction && (
  <div className="mt-6 bg-green-100 border border-green-400 p-4 rounded-lg text-center">
    <h3 className="text-lg font-semibold text-green-700">
      Prediction:{" "}
      <span className="font-bold">
        {prediction?.label || "Unknown"}
      </span>
    </h3>
    <p className="text-green-600">
      Confidence:{" "}
      <span className="font-bold">
        {prediction?.confidence !== "N/A"
          ? (prediction.confidence * 100).toFixed(2) + "%"
          : "N/A"}
      </span>
    </p>
  </div>
)}

      </div>
    </div>
  );
}
