"use client";

import { useState, useRef } from "react";
import { predictImage } from "../api"; // Ensure correct import

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const uploadSectionRef = useRef(null);

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

      if (typeof result === "string") {
        const parts = result.split(" with confidence ");
        setPrediction({
          label: parts[0] || "Unknown",
          confidence: parts[1] ? parseFloat(parts[1]) : "N/A",
        });
      } else {
        setPrediction(result);
      }
    } catch (error) {
      console.error("Error predicting image:", error);
      alert("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToUploadSection = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Welcome Section */}
      <div className="relative w-full h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/welcome-image.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">🌾 Welcome to Rice Leaf Disease Detection</h1>
          <p className="text-lg">Upload an image to get started</p>
          <button
            onClick={scrollToUploadSection}
            className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Upload Section */}
      <div ref={uploadSectionRef} className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Upload Your Image</h2>

        <div className="flex flex-col items-center gap-4 w-full">
          <div className="w-full flex items-center border border-gray-300 rounded-lg p-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer w-full p-3 rounded-lg bg-gray-200 text-gray-600 text-center"
            >
              {selectedImage ? "Image Selected" : "Click to Upload Image"}
            </label>
          </div>

          {previewImage && (
            <div className="w-full flex justify-center">
              <img
                src={previewImage}
                alt="Selected"
                className="w-32 h-32 object-cover rounded-lg shadow-md border"
              />
            </div>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handlePredict}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
            disabled={loading || !selectedImage}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>

        {prediction && (
          <div className="mt-6 bg-green-100 border border-green-400 p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-green-700">
              Prediction: <span className="font-bold">{prediction?.label || "Unknown"}</span>
            </h3>
            <p className="text-green-600">
              Confidence: <span className="font-bold">
                {prediction?.confidence !== "N/A" ? (prediction.confidence * 100).toFixed(2) + "%" : "N/A"}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}