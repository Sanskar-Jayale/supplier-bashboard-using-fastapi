import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddSupplierData = () => {
  // State to hold form data
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [complianceScore, setComplianceScore] = useState("");
  const [contractTerms, setContractTerms] = useState("");
  const [lastAudit, setLastAudit] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Add Supplier function using Axios to send data to the backend
  const addSupplier = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/suppliers",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Supplier added successfully");
        // Navigate to home page ("/") after successfully adding the supplier
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding supplier:", error);
      alert("Failed to add supplier");
    }
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data to send
    const supplierData = {
      name: name,
      country: country,
      compliance_score: parseFloat(complianceScore),
      contract_terms: contractTerms,
      last_audit: lastAudit,
    };

    // Call the function to send data to backend
    addSupplier(supplierData);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Supplier</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Supplier Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Country Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="country"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Compliance Score Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="compliance_score"
          >
            Compliance Score
          </label>
          <input
            type="number"
            id="compliance_score"
            value={complianceScore}
            onChange={(e) => setComplianceScore(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Contract Terms Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="contract_terms"
          >
            Contract Terms (JSON)
          </label>
          <textarea
            id="contract_terms"
            value={contractTerms}
            onChange={(e) => setContractTerms(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Last Audit Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="last_audit"
          >
            Last Audit Date
          </label>
          <input
            type="date"
            id="last_audit"
            value={lastAudit}
            onChange={(e) => setLastAudit(e.target.value)}
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
            Add Supplier
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSupplierData;
