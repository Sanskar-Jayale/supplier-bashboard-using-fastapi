import React from "react";
import { Link } from "react-router-dom";
import { FaListAlt, FaUpload, FaChartLine } from "react-icons/fa";

const Dashboard = () => {
  const cards = [
    {
      title: "Supplier List",
      description: "View and manage all suppliers in one place.",
      link: "/suppliers",
      color: "bg-blue-600",
      icon: <FaListAlt size={30} />,
    },
    {
      title: "Add Supplier Data",
      description: "Add supplier compliance data securely.",
      link: "/upload",
      color: "bg-green-600",
      icon: <FaUpload size={30} />,
    },
    {
      title: "Add Compliance Data",
      description: "Add Compliance compliance data securely.",
      link: "/compliance",
      color: "bg-yellow-500",
      icon: <FaChartLine size={30} />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-16 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-2">
          Supplier Compliance Dashboard
        </h1>
        <p className="text-lg font-medium">
          Manage and monitor your suppliers efficiently with modern tools and
          insights.
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-12 px-6 flex-grow">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <Link
                to={card.link}
                key={index}
                className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-xl ${card.color} text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:cursor-pointer`}
              >
                <div className="mb-4 flex items-center justify-center">
                  {card.icon}
                </div>
                <h2 className="text-2xl font-semibold mb-2">{card.title}</h2>
                <p className="text-sm text-center">{card.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
