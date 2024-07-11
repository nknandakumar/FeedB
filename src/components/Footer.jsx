import React from "react";
import FortImage from "../assets/Fort.jpg"; // Assuming the image name is 'Fort.jpg'

const Footer = () => {
  return (
    <footer className="footer flex  justify-between items-center px-2 py-8  ">
      <div className="flex mt-6 flex-col justify-center items-center">
        <img
          src={FortImage}
          alt="Fort"
          className="w-20 h-20 mr-4 object-cover border-2 shadow-lg rounded-full"
        />
        <div>
          <h1 className="text-xl font-medium text-slate-800">Name</h1>
          <p className="text-gray-600">BCA</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <img
          src={FortImage}
          alt="Fort"
          className="w-20 h-20 mr-4 object-cover rounded-full"
        />
        <div>
          <h1 className="text-xl font-medium text-slate-800">Name</h1>
          <p className="text-gray-600">BCA</p>
        </div>
      </div>
      <div className="flex mt-6 flex-col justify-center items-center">
        <img
          src={FortImage}
          alt="Fort"
          className="w-20 h-20 mr-4 object-cover rounded-full"
        />
        <div>
          <h1 className="text-xl font-medium text-slate-800">Name</h1>
          <p className="text-gray-600">BCA</p>
        </div>
      </div>
      {/* Add your other content here, maintaining responsive layout */}
    </footer>
  );
};

export default Footer;
