import React, { useState, useEffect } from "react";
import axios from "../api/api";

const ComplianceInsights = () => {
  const [insights, setInsights] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axios.get("/compliance-insights");
        setInsights(response.data);
      } catch (err) {
        setError("Failed to fetch compliance insights.");
      }
    };
    fetchInsights();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Compliance Insights</h1>
      {error && <p className="text-red-500">{error}</p>}
      {insights.map((insight, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-md shadow-sm mb-2">
          <p>{insight.suggestion}</p>
        </div>
      ))}
    </div>
  );
};

export default ComplianceInsights;
