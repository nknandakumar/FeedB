import { useState } from "react";
import {Star } from "lucide-react";
 
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
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Main = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState("none");

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

    const data = {
      feedback,
      rating,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmissionStatus("success");
      } else {
        setSubmissionStatus("error");
        throw new Error("Failed to submit form data to Web3forms");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
    }
  };

  return (
    <section className="flex items-center flex-col">
      <h1 className=" text-2xl">Thank You</h1>
      <h1 className=" text-2xl"> for Visiting</h1>
      <h1 className=" text-4xl"> Maratha Dynasty</h1>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="feedback">Feedback</label>
        <textarea
          className="border shadow-xl"
          name="des"
          id="feedback"
          value={feedback}
          onChange={handleFeedbackChange}
        />

        <label htmlFor="rating">Rating:</label>
        <CustomRating rating={rating} onRatingChange={handleRatingChange} />

        <button type="submit">Submit Feedback</button>
      </form>

      {submissionStatus === "success" && (
        <div className="success-message">
          <h2>Your feedback has been submitted successfully!</h2>
        </div>
      )}

      {submissionStatus === "error" && (
        <div className="error-message">
          <h2>
            An error occurred while submitting your feedback. Please try again
            later.
          </h2>
        </div>
      )}
    </section>
  );
};

export default Main;
