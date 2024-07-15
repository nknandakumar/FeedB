import React from "react";
import { motion } from "framer-motion";
import FortImage from "../assets/wave.gif"; // Assuming the image name is 'Fort.jpg'

const teamMembers = [
  { name: "Prathik HK", title: "BCA" },
  { name: "Nanda Kumar M", title: "BCA" },
  { name: "Tharun S", title: "BCA" },
];

const animationVariants = {
  up: {
    y: [0, 20, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
  down: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      delay: 1, // Delay to create the wave effect
    },
  },
};

const Footer = () => {
  return (
    <footer className="footer flex justify-between items-center px-2 py-8">
      {teamMembers.map((member, index) => (
        <motion.div
          key={member.name}
          className="flex flex-col justify-center items-center"
          animate={
            index % 2 === 0 ? animationVariants.up : animationVariants.down
          }
        >
          <img
            src={FortImage}
            alt={member.name}
            className="w-20 h-20 mr-4 object-cover border-2 shadow-lg rounded-full"
          />
          <div>
            <h1 className="text-lg font-medium text-slate-800">
              {member.name}
            </h1>
            <p className="text-gray-600">{member.title}</p>
          </div>
        </motion.div>
      ))}
    </footer>
  );
};

export default Footer;
