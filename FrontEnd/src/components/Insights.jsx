import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChartLine } from "react-icons/fa";

const Insights = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch list of suppliers
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  // Fetch insights for a specific supplier
  const fetchInsights = async (supplierId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/suppliers/${supplierId}/insights`
      );
      setInsights(response.data.insights);
    } catch (error) {
      console.error("Error fetching insights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Supplier Compliance Insights
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <div
            key={supplier.supplier_id}
            className="p-4 border rounded-lg shadow-md bg-white hover:shadow-xl transition-all"
          >
            <h3 className="text-xl font-semibold">{supplier.name}</h3>
            <p className="text-gray-600">Country: {supplier.country}</p>
            <button
              onClick={() => fetchInsights(supplier.supplier_id)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              View Insights <FaChartLine className="inline ml-2" />
            </button>

            {insights && insights.supplier_id === supplier.supplier_id && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                {loading ? (
                  <p className="text-center">Loading insights...</p>
                ) : (
                  <p>{insights}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
