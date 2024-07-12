import React, { useState } from "react";
import SubmitOk from "./SubmitOk";

const Main = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [role, setRole] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("none");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!feedback || !rating || !role) {
      alert("Please provide feedback, a rating, and select your role.");
      return;
    }

    setLoading(true); // Start loading indicator

    const formData = {
      feedback: feedback,
      rating: rating,
      role: role,
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzvfaLI2rWGhnERj8SFLzMMRmgyyGDOSDllWWmSU5LZRjq2uQGSlq8Evf2GiIXs1N4TDA/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        setSubmissionStatus("success");
        setFeedback("");
        setRating(0);
        setRole("");
        setVisible(true); // Show success page
      } else {
        setSubmissionStatus("error");
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const CustomRating = ({ rating, onRatingChange }) => {
    const handleStarClick = (value) => {
      onRatingChange(value);
    };

    return (
      <div className="custom-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "star selected" : "star"}
            onClick={() => handleStarClick(star)}
            style={{
              cursor: "pointer",
              fontSize: "2em",
              color: star <= rating ? "gold" : "gray",
              transition: "color 0.3s, transform 0.3s",
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      {loading ? ( // Show loading indicator if loading is true
        <div className="flex space-x-2 justify-center items-center  h-screen  bg-gradient-to-br from-orange-300 to-orange-100 ">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce animation-delay:-0.3s"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce animation-delay:-0.15s"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
        </div>
      ) : visible ? (
        <SubmitOk />
      ) : (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-300 to-orange-100 p-4 md:p-8 lg:p-16">
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black font-serif mb-2 md:mb-4 lg:mb-6">
            Thank You
          </h1>
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-black font-serif mb-2 md:mb-4 lg:mb-6">
            for Visiting
          </h1>

          <h1 className="text-center px-2 py-1 rounded-md mb-4">
            <span className="bg-clip-text font-serif text-transparent bg-center bg-cover font-semibold text-6xl md:text-5xl lg:text-6xl bg-[url('/src/assets/shivaji.gif')] mb-4">
              Maratha Dynasty
            </span>
          </h1>

          <form
            className="w-full max-w-md bg-gradient-to-r from-orange-200 to-orange-100 shadow-2xl rounded-lg p-6 md:p-8 lg:p-12 border-4 border-black"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="role"
              className="block mt-4 text-sm md:text-base lg:text-lg font-medium text-gray-700"
            >
              Role:
            </label>
            <div className="border-b-4 border-black rounded-2xl bg-black mb-4 ">
              <select
                id="role"
                name="role"
                value={role}
                onChange={handleRoleChange}
                className="w-full border bg-white rounded-xl focus:outline-none focus:border-black px-3 py-2 md:py-3 lg:py-4"
              >
                <option value="">Select Role</option>
                <option value="Teacher">Teacher</option>
                <option value="Student">Student</option>
              </select>
            </div>

            <label
              htmlFor="feedback"
              className="block text-sm md:text-base lg:text-lg font-medium text-gray-700"
            >
              Feedback
            </label>
            <div className="border-b-4 border-black rounded-2xl bg-black mb-4">
              <textarea
                className="w-full border bg-white rounded-xl focus:outline-none focus:border-black px-3 py-2 md:py-3 lg:py-4"
                name="des"
                id="feedback"
                value={feedback}
                onChange={handleFeedbackChange}
                rows={4}
                placeholder="Give Your Opinion..."
              />
            </div>

            <label
              htmlFor="rating"
              className="block mt-4 text-sm md:text-base lg:text-lg font-medium text-gray-700"
            >
              Rating:
            </label>
            <CustomRating rating={rating} onRatingChange={handleRatingChange} />

            <div className="mt-4">
              <button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 shadow-xl"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Main;
