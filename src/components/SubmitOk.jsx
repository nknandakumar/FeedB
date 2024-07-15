import React, { useState, useEffect, useCallback } from "react";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import ConfettiExplosion from "react-confetti-explosion";
import { debounce } from "lodash";

const SubmitOk = () => {
  const [isExploding, setIsExploding] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const AccessKey = import.meta.env.VITE_API_FORMS_KEY; // Replace with your actual access key

  const handleClick = useCallback(async () => {
    const formData = new FormData();
    formData.append("clickCount", "Clicked");
    formData.append("access_key", AccessKey); // Include access key

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      setIsFooterVisible((prev) => !prev); // Toggle footer visibility
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }, [AccessKey]);

  const debouncedHandleClick = useCallback(debounce(handleClick, 300), [
    handleClick,
  ]);

  const footerVariant = {
    hidden: { y: "100vh", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  // Trigger confetti explosion on component mount (page load)
  useEffect(() => {
    setIsExploding(true); // Start confetti animation
    // Optionally, set a timeout to stop the animation after a duration:
    // setTimeout(() => setIsExploding(false), 2000); // 2 seconds
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <div className="bg-gradient-to-br from-orange-300 to-orange-100 h-screen flex flex-col items-center pt-40">
      {isExploding && <ConfettiExplosion />} {/* Display confetti */}
      <div className="text-center">
        <h1 className="text-5xl text-black font-serif font-bold tracking-wider">
          Submitted successfully
        </h1>
      </div>
      <p className="flex items-center justify-center pt-20 bg-gradient-to-r from-slate-800 via-gray-400 to-neutral-800 bg-clip-text text-transparent animate-gradient text-2xl">
        Powered by Us--
        <motion.span whileHover={{ scale: 1.1 }} onClick={debouncedHandleClick}>
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
