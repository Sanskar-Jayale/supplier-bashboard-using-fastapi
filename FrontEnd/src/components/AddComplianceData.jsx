import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddComplianceData = () => {
  // State to hold form data
  const [supplierId, setSupplierId] = useState("");
  const [metric, setMetric] = useState("");
  const [dateRecorded, setDateRecorded] = useState("");
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  // Add Compliance function using Axios to send data to the backend
  const addCompliance = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/suppliers/check-compliance", // Adjust your API endpoint
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Compliance data added successfully");
        navigate("/suppliers"); // Navigate to the supplier list page after successfully adding data
      }
    } catch (error) {
      console.error("Error adding compliance data:", error);
      alert("Failed to add compliance data");
    }
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data to send
    const complianceData = {
      supplier_id: supplierId,
      metric: metric,
      date_recorded: dateRecorded,
      result: result,
      status: status,
    };

    // Call the function to send data to backend
    addCompliance(complianceData);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Add Compliance Data
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Supplier ID Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="supplier_id"
          >
            Supplier ID
          </label>
          <input
            type="number"
            id="supplier_id"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Metric Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="metric"
          >
            Metric
          </label>
          <input
            type="text"
            id="metric"
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Date Recorded Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="date_recorded"
          >
            Date Recorded
          </label>
          <input
            type="date"
            id="date_recorded"
            value={dateRecorded}
            onChange={(e) => setDateRecorded(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Result Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="result"
          >
            Result
          </label>
          <input
            type="text"
            id="result"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Status Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="status"
          >
            Status
          </label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Compliance Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComplianceData;
