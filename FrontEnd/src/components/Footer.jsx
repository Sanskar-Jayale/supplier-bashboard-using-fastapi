import React from "react";

const Footer = () => {
  return (
    <div>
      {/* Sticky Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center bottom-0">
        <p className="text-sm">
          © {new Date().getFullYear()} Supplier Compliance Dashboard. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
