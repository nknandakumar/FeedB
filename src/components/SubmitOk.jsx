import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import ConfettiExplosion from "react-confetti-explosion";

const SubmitOk = () => {
  const [isExploding, setIsExploding] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [dataSent, setDataSent] = useState(false);
  const AccessKey = "d57e2756-deb3-47ed-ab16-9c1df1ef59c2"; // Replace with your actual access key

  const handleClick = async () => {
    if (!dataSent) {
      const formData = new FormData();
      formData.append("clickCount", "Clicked");
      formData.append("access_key", AccessKey); // Include access key

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setIsFooterVisible(true); // Show the footer with animation
          setDataSent(true); // Mark data as sent
        } else {
          console.error("Error submitting data:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    } else {
      setIsFooterVisible((prev) => !prev); // Toggle footer visibility
    }
  };

  const footerVariant = {
    hidden: { y: "100vh", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  // Trigger confetti explosion on component mount (page load)
  useEffect(() => {
    setIsExploding(true); // Start confetti animation
    // Optionally, set a timeout to stop the animation after a duration:
    // setTimeout(() => setIsExploding(false), 2000); // 2 seconds
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <div className="bg-gradient-to-br from-orange-300 to-orange-100 h-screen flex flex-col items-center pt-40 ">
      {isExploding && <ConfettiExplosion />} {/* Display confetti */}
      <div className=" text-center ">
        <h1 className="text-5xl text-black font-serif font-bold tracking-wider">
          Submitted successfully
        </h1>
      </div>
      <p className="flex items-center justify-center pt-20 bg-gradient-to-r from-slate-800 via-gray-400 to-neutral-800 bg-clip-text text-transparent animate-gradient text-2xl">
        Powered by Us--
        <motion.span whileHover={{ scale: 1.1 }} onClick={handleClick}>
          <span className="rounded-full w-10 h-10 flex items-center justify-center bg-transparent border-transparent ml-1 gradient-border">
            <Users className="cursor-pointer text-xl text-black" />
          </span>
        </motion.span>
      </p>
      {isFooterVisible && (
        <motion.div variants={footerVariant} initial="hidden" animate="visible">
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

export default SubmitOk;
 