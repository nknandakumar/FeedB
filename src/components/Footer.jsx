import React from "react";
import { motion } from "framer-motion";
import FortImage from "../assets/wave.gif"; // Assuming the image name is 'Fort.jpg'

const Footer = () => {
  return (
    <footer className="footer flex justify-between items-center px-2 py-8">
      <motion.div
        className="flex flex-col justify-center items-center"
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <img
          src={FortImage}
          alt="Fort"
          className="w-20 h-20 mr-4 object-cover border-2 shadow-lg rounded-full"
        />
        <div>
          <h1 className="text-lg font-medium text-slate-800">Prathik HK</h1>
          <p className="text-gray-600">BCA</p>
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col justify-center items-center"
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 1, // Delay to create the wave effect
        }}
      >
        <img
          src={FortImage}
          alt="Fort"
          className="w-20 h-20 mr-4 object-cover rounded-full"
        />
        <div>
          <h1 className="text-lg font-medium text-slate-800">Nanda Kumar M</h1>
          <p className="text-gray-600">BCA</p>
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col justify-center items-center"
        animate={{ y: [0, 20, 0, ] }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <img
          src={FortImage}
          alt="Fort"
          className="w-20 h-20 mr-4 object-cover rounded-full"
        />
        <div>
          <h1 className="text-lg font-medium text-slate-800">Tharun S</h1>
          <p className="text-gray-600">BCA</p>
        </div>
      </motion.div>
     
    </footer>
  );
};

export default Footer;
