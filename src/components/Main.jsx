import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState("none");
  const navigate = useNavigate();

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
        navigate("/success"); // Navigate to success page
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
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl my-4">Thank You</h1>
      <h1 className="text-2xl mb-4">for Visiting</h1>
      <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-neutral-400 via-gray-300 to-slate-300 bg-clip-text text-transparent font-serif ">
        {" "}
         Maratha Dynasty 
      </h1>

      <span
        className="bg-clip-text text-transparent bg-center bg-cover"
        style={{ background: `url('../assets/Fight.gif')` }}
      >
        Hello world
      </span>

      <form
        className="w-full max-w-md bg-white shadow-xl rounded-lg p-4"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="feedback"
          className="block text-sm font-medium text-gray-700"
        >
          Feedback
        </label>
        <div className=" border-b-4 border-black rounded-xl bg-black ">
          <textarea
            className="w-full  border    bg-white rounded-xl  focus:outline-none focus:border-black px-3 py-2"
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
          className="block mt-4 text-sm font-medium text-gray-700"
        >
          Rating:
        </label>
        <CustomRating rating={rating} onRatingChange={handleRatingChange} />

        <button
          type="submit"
          className="bg-blue-500 flex hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Main;
