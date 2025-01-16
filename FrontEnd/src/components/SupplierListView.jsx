import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

const SupplierListView = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState("");
  const [activeInsights, setActiveInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await api.get("/suppliers"); // Fetch suppliers
        setSuppliers(response.data);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
        setError("Failed to fetch suppliers.");
      }
    };

    fetchSuppliers();
  }, []);

  // Function to fetch insights for a particular supplier
  const fetchInsights = async (supplierId) => {
    setLoading(true);
    try {
      const response = await api.get(`/suppliers/${supplierId}/insights`);
      setActiveInsights({
        supplierId: supplierId,
        insights: response.data.insights,
      });
      setIsModalOpen(true); // Open modal when insights are fetched
    } catch (err) {
      console.error("Error fetching insights:", err);
      setActiveInsights({
        supplierId: supplierId,
        insights: "Failed to fetch insights.",
      });
      setIsModalOpen(true); // Open modal even if there's an error
    } finally {
      setLoading(false);
    }
  };

  const viewDetail = (supplierId) => {
    console.log("Viewing details for supplier:", supplierId);
    navigate(`/suppliers/${supplierId}`); // Use navigate function
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setActiveInsights(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Supplier List</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {suppliers.map((supplier) => (
          <div
            key={supplier.supplier_id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {supplier.name}
            </h2>
            <p className="text-sm text-gray-600">Country: {supplier.country}</p>
            <p className="text-sm text-gray-600">
              Compliance Score: {supplier.compliance_score}
            </p>
            <p className="text-sm text-gray-600">
              Last Audit: {supplier.last_audit}
            </p>
            <button
              onClick={() => viewDetail(supplier.supplier_id)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-3"
            >
              View Details
            </button>
            <button
              onClick={() => fetchInsights(supplier.supplier_id)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              View Insights
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Insights */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={closeModal} // Close modal when clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-4/5 sm:w-1/2 md:w-1/3 transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <h2 className="text-2xl font-bold mb-4">Supplier Insights</h2>
            {loading ? (
              <p className="text-sm text-gray-500">Loading insights...</p>
            ) : (
              <p className="text-sm text-gray-600">
                {activeInsights?.insights}
              </p>
            )}
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierListView;
