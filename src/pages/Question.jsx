import React, { useEffect, useState } from "react";
import MediaPlayer from "../components/MediaPlayer";
import { motion } from "motion/react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { colorStyle } from "../utils/index";
import Left from "../assets/left.png";
import Right from "../assets/right.png";

const Question = () => {
  const { questionNo, roundNo } = useParams();
  const [totalRounds, setTotalRounds] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(1);
  const [currentMovie, setCurrentMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load settings from localStorage
    const settings = JSON.parse(window.localStorage.getItem("settings"));
    setTotalRounds(settings?.rounds || 1);
    setTotalQuestions(settings?.questionsPerRound || 1);

    // Load pre-selected movies from localStorage
    const encryptedMovies = window.localStorage.getItem("selectedMovies");
    const selectedMovies = encryptedMovies
      ? JSON.parse(atob(encryptedMovies))
      : null;
    if (selectedMovies) {
      const movieIndex =
        (parseInt(roundNo) - 1) * totalQuestions + (parseInt(questionNo) - 1);
      setCurrentMovie(selectedMovies[movieIndex]);
    }
  }, [roundNo, questionNo, totalQuestions]);

  const prevQuestion = () => {
    if (questionNo > 1) {
      navigate(`/question/${roundNo}/${parseInt(questionNo) - 1}`);
    } else if (roundNo > 1) {
      navigate(`/round/${parseInt(roundNo) - 1}`);
    }
  };

  const nextQuestion = () => {
    if (questionNo < totalQuestions) {
      navigate(`/question/${roundNo}/${parseInt(questionNo) + 1}`);
    } else {
      navigate(`/answers/${roundNo}`); // Navigate to the answer screen for the current round
    }
  };

  return (
    <div
      className="w-full relative min-h-screen flex items-center flex-col pt-[50px]"
      style={colorStyle}
    >
      <div className="flex w-full justify-between items-center">
        <motion.button
          whileTap={{
            scale: 0.9,
          }}
          onClick={prevQuestion}
          className="cursor-pointer absolute left-0 top-0 w-[100px] h-auto flex items-center justify-center rounded-bl-[30px]"
        >
          <img src={Left} alt="" />
        </motion.button>
        <motion.button
          whileTap={{
            scale: 0.9,
          }}
          onClick={nextQuestion}
          className="cursor-pointer absolute right-0 top-0 w-[100px] h-auto flex items-center justify-center rounded-bl-[30px]"
        >
          <img src={Right} alt="" />
        </motion.button>
      </div>

      <motion.button
        whileTap={{
          scale: 0.9,
        }}
        whileHover={{
          scale: 1.1,
        }}
        onClick={() => navigate("/")}
        className="fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Exit to Home
      </motion.button>

      <div className="space-y-4 w-[70%]">
        <h5 className="text-[#8796A0] font-black text-center text-2xl">
          Round {roundNo}
        </h5>
        <h1 className="text-white font-black text-center text-5xl mb-10">
          Question {questionNo}
        </h1>

        {currentMovie ? (
          <>
            <MediaPlayer
              type={currentMovie.type.toLowerCase()}
              mediaSrc={currentMovie.url}
            />
          </>
        ) : (
          <p className="text-white text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Question;
