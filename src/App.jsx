import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Splash from "./pages/Splash";
import RoundCardAndQuestion from "./pages/RoundCardAndQuestion";
import Question from "./pages/Question";
import QuizAnswers from "./pages/QuizAnswers";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/start" element={<Splash />} />
        <Route path="/round/:roundNo" element={<RoundCardAndQuestion />} />
        <Route path="/question/:roundNo/:questionNo" element={<Question />} />
        <Route path="/answers/:roundNo" element={<QuizAnswers />} />
      </Routes>
    </Router>
  );
};

export default App;
