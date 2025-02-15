"use client";

import { useState } from "react";
import { predictImage } from "../../api";

export default function DetectPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // อัปโหลดรูปภาพและตรวจสอบประเภทไฟล์
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("กรุณาอัปโหลดเฉพาะไฟล์รูปภาพเท่านั้น!");
      return;
    }

    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setPrediction(null); // รีเซ็ตค่าการพยากรณ์
  };

  // ส่งรูปไปที่ API และรับค่าพยากรณ์
  const handlePredict = async () => {
    if (!selectedImage) {
      alert("กรุณาเลือกภาพก่อนทำการพยากรณ์");
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

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">🔍 Detect Here!!</h1>
      <p className="text-lg text-gray-600 mb-6">อัปโหลดภาพใบข้าวเพื่อวิเคราะห์โรค</p>

      {/* ส่วนอัปโหลดไฟล์ */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <div className="flex flex-col items-center">
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

          {previewImage && (
            <img src={previewImage} alt="Selected" className="mt-4 w-32 h-32 object-cover rounded-lg shadow-md border" />
          )}
        </div>

        {/* ปุ่มสำหรับพยากรณ์ */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePredict}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
            disabled={loading || !selectedImage}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>

        {/* แสดงผลการพยากรณ์ */}
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
