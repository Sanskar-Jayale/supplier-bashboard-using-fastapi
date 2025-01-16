import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

const SupplierDetailView = () => {
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSupplierDetails = async () => {
      try {
        const response = await api.get(`/suppliers/${supplierId}`); // Fetch supplier by ID
        setSupplier(response.data);
      } catch (err) {
        console.error("Error fetching supplier details:", err);
        setError("Failed to fetch supplier details.");
      }
    };
    fetchSupplierDetails();
  }, [supplierId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {supplier && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {supplier.name}
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Country:</strong> {supplier.country}
            </p>
            <p className="text-lg text-gray-600 mb-2">
              <strong>Compliance Score:</strong> {supplier.compliance_score}
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Last Audit:</strong> {supplier.last_audit}
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Contract Terms
            </h2>
            <ul className="list-disc ml-5 text-gray-600">
              {Object.entries(JSON.parse(supplier.contract_terms)).map(
                ([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
        <div className="mt-6 text-center">
          <Link
            to="/suppliers"
            className="text-blue-500 hover:underline hover:text-blue-700"
          >
            Back to Supplier List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetailView;
