import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SubmitOk = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = () => {
      const entries = performance.getEntriesByType("navigation");
      if (entries.length > 0) {
        const navigationType = entries[0].type;
        if (navigationType === "reload") {
          // User refreshed the page
          navigate("/", { replace: true }); // Navigate back to Main page
        }
      }
    };

    handleNavigation(); // Check on component mount

    // Event listener to check navigation type on page reload
    window.addEventListener("load", handleNavigation);

    return () => {
      window.removeEventListener("load", handleNavigation);
    };
  }, [navigate]);

  return (
    <div>
      <h2>Your feedback has been submitted successfully!</h2>
      <p>Redirecting back to the main page...</p>
    </div>
  );
};

export default SubmitOk;
