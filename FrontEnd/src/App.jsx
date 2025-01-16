import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SupplierListView from "./components/SupplierListView";
import SupplierDetailView from "./components/SupplierDetailView";
import AddSupplierData from "./components/AddSupplierData";
import Dashboard from "./components/Dashboard";
import AddComplianceData from "./components/AddComplianceData"; // Import the new form component
import Footer from "./components/Footer";
import Insights from "./components/Insights";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="bg-blue-500 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              Supplier Compliance Dashboard
            </h1>
            <div className="space-x-4">
              <Link to="/" className="hover:text-gray-200">
                Home
              </Link>
              <Link to="/suppliers" className="hover:text-gray-200">
                Supplier List
              </Link>
              <Link to="/upload" className="hover:text-gray-200">
                Upload Data
              </Link>
              <Link to="/compliance" className="hover:text-gray-200">
                Add Compliance
              </Link>{" "}
              {/* Add Compliance link */}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mx-auto py-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/suppliers" element={<SupplierListView />} />
            <Route
              path="/suppliers/:supplierId"
              element={<SupplierDetailView />}
            />
            <Route path="/upload" element={<AddSupplierData />} />
            <Route path="/compliance" element={<AddComplianceData />} />{" "}
            {/* Add route */}
            //
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
