import React, { useState } from "react";
import SubmitOk from "./SubmitOk";

const Main = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState("none");
  const [visible, setVisible] = useState(false);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!feedback || !rating) {
      alert("Please provide both feedback and a rating.");
      return;
    }

    const formData = new FormData();
    formData.append("access_key", import.meta.env.VITE_API_ACCESS_KEY);
    formData.append("feedback", feedback);
    formData.append("rating", rating);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setSubmissionStatus("success");
        setFeedback("");
        setRating(0);
        setVisible((curr) => !curr); // Navigate to success page
      } else {
        setSubmissionStatus("error");
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
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
      {visible ? (
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
              htmlFor="feedback"
              className="block text-sm md:text-base lg:text-lg font-medium text-gray-700"
            >
              Feedback
            </label>
            <div className="border-b-4 border-black rounded-2xl  bg-black mb-4">
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

       
              <button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 shadow-xl "
              >
                Submit
              </button>
       
          </form>
        </section>
      )}
    </>
  );
};

export default Main;
