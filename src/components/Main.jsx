import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import { motion } from "framer-motion";

const SubmitOk = React.lazy(() => import("./SubmitOk"));

const WORDS = ["Maratha", "   मराठा"];
const API_URL =
  "https://script.google.com/macros/s/AKfycbzvfaLI2rWGhnERj8SFLzMMRmgyyGDOSDllWWmSU5LZRjq2uQGSlq8Evf2GiIXs1N4TDA/exec";

const initialState = {
  feedback: "",
  rating: 0,
  role: "",
  submissionStatus: "none",
  visible: false,
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return { ...initialState, submissionStatus: "success", visible: true };
    case "SET_LOADING":
      return { ...state, loading: action.value };
    case "SET_SUBMISSION_STATUS":
      return { ...state, submissionStatus: action.value };
    default:
      return state;
  }
}

const Main = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { feedback, rating, role, submissionStatus, visible, loading } = state;

  const [currentWord, setCurrentWord] = useState("");
  const [typewriterState, setTypewriterState] = useState({
    isDeleting: false,
    i: 0,
    j: 0,
  });

  const handleFieldChange = useCallback(
    (field) => (event) => {
      dispatch({ type: "SET_FIELD", field, value: event.target.value });
    },
    []
  );

  const handleRatingChange = useCallback((value) => {
    dispatch({ type: "SET_FIELD", field: "rating", value });
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!feedback || !rating || !role) {
        alert("Please provide feedback, a rating, and select your role.");
        return;
      }

      dispatch({ type: "SET_LOADING", value: true });

      const formData = { feedback, rating, role };

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.status === "success") {
          dispatch({ type: "RESET_FORM" });
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        dispatch({ type: "SET_SUBMISSION_STATUS", value: "error" });
      } finally {
        dispatch({ type: "SET_LOADING", value: false });
      }
    },
    [feedback, rating, role]
  );

  useEffect(() => {
    const typewriterTimeout = setTimeout(() => {
      let { isDeleting, i, j } = typewriterState;
      let updatedWord = currentWord;

      if (isDeleting) {
        updatedWord = WORDS[i].substring(0, j - 1);
        j--;
        if (j === 0) {
          isDeleting = false;
          i = (i + 1) % WORDS.length;
        }
      } else {
        updatedWord = WORDS[i].substring(0, j + 1);
        j++;
        if (j === WORDS[i].length) {
          isDeleting = true;
        }
      }

      setCurrentWord(updatedWord);
      setTypewriterState({ isDeleting, i, j });
    }, 200);

    return () => clearTimeout(typewriterTimeout);
  }, [currentWord, typewriterState]);

  const CustomRating = useMemo(() => {
    return ({ rating, onRatingChange }) => (
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer text-4xl transition-colors duration-300 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => onRatingChange(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  }, []);

  if (loading) {
    return (
      <div className="flex space-x-2 justify-center items-center h-screen bg-gradient-to-br from-orange-300 to-orange-100">
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
      </div>
    );
  }

  if (visible) {
    return <SubmitOk />;
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-300 to-orange-100 p-4 md:p-8 lg:p-16">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-serif mb-2 md:mb-4 lg:mb-6">
        Thank You For Visiting
      </h1>

      <h1 className="text-center px-2 py-1 rounded-md mb-4">
        <motion.span
          id="typewriter"
          className="bg-clip-text text-transparent font-serif bg-gradient-to-tr from-orange-600 via-orange-500 to-orange-400 font-semibold text-6xl md:text-5xl lg:text-6xl mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {currentWord}
        </motion.span>
        <br />
        <span className="bg-clip-text font-serif text-transparent bg-center bg-cover font-semibold text-5xl md:text-5xl lg:text-6xl bg-[url('/src/assets/shivaji.gif')] mb-4">
          Dynasty
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
        <div className="border-b-4 border-black rounded-2xl bg-black mb-4">
          <select
            id="role"
            name="role"
            value={role}
            onChange={handleFieldChange("role")}
            className={`w-full border bg-white rounded-xl focus:outline-none focus:border-black px-3 py-2 md:py-3 lg:py-4 transition-all duration-300 ease-in-out ${
              role ? "text-black" : "text-gray-400"
            }`}
            style={{
              WebkitAppearance: "none",
              MozAppearance: "none",
              appearance: "none",
            }}
          >
            <option value="" disabled>
              Select Role
            </option>
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
            className={`w-full border bg-white rounded-xl focus:outline-none focus:border-black px-3 py-2 md:py-3 lg:py-4 transition-all duration-300 ease-in-out ${
              feedback ? "text-black" : "text-gray-400"
            }`}
            name="des"
            id="feedback"
            value={feedback}
            onChange={handleFieldChange("feedback")}
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
  );
};

export default Main;
