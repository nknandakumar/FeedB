
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Success from "./components/SubmitOk";
const App=()=> {
  return (
    <Router  >
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
