import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import MediaPlayer from "../components/MediaPlayer";
import { colorStyle } from "../utils";
import Left from "../assets/left.png";
import Right from "../assets/right.png";

export default function QuizAnswers() {
  const [play, setPlay] = useState(null);
  const { roundNo } = useParams();
  const navigate = useNavigate();

  const [revealed, setRevealed] = useState([]);
  const [roundQuestions, setRoundQuestions] = useState([]);

  useEffect(() => {
    const settings = JSON.parse(window.localStorage.getItem("settings"));
    // Load pre-selected movies from localStorage
    const encryptedMovies = window.localStorage.getItem("selectedMovies");
    const selectedMovies = encryptedMovies
      ? JSON.parse(atob(encryptedMovies))
      : null;

    if (settings && selectedMovies) {
      const questionsPerRound = settings.questionsPerRound || 1;
      const startIndex = (parseInt(roundNo) - 1) * questionsPerRound;
      const endIndex = startIndex + questionsPerRound;

      const currentRoundQuestions = selectedMovies.slice(startIndex, endIndex);
      setRoundQuestions(currentRoundQuestions);

      setRevealed(Array(currentRoundQuestions.length).fill(false));
    }
  }, [roundNo]);

  const toggleAnswer = (index) => {
    setRevealed((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  const prevQuestion = () => {
    navigate(-1);
  };

  const nextQuestion = () => {
    const settings = JSON.parse(window.localStorage.getItem("settings"));
    const maxRounds = settings?.rounds || 1;

    if (parseInt(roundNo) < maxRounds) {
      navigate(`/round/${parseInt(roundNo) + 1}`);
    } else {
      alert("You have reached the last round!");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
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

      <h2 className="text-5xl font-black text-center mb-4 text-white absolute top-10">
        ROUND {roundNo} ANSWERS
      </h2>
      <div className="space-y-2 w-[60%] mx-auto">
        {roundQuestions.map((question, index) => (
          <div key={index} className="flex gap-2 items-center justify-center">
            <div className="w-16 h-16 bg-white text-blue-900 font-black grid place-items-center text-3xl">
              {index + 1}
            </div>
            <div
              className="h-16 w-full bg-[#FBD11E] flex items-center justify-between px-4 text-center font-bold text-xl cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <div className="text">
                {revealed[index] ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {question.title}
                  </motion.span>
                ) : (
                  "CLICK HERE TO REVEAL ANSWER"
                )}
              </div>
              <motion.button
                whileTap={{
                  scale: 0.9,
                }}
                className="icon w-10 h-16 cursor-pointer"
                onClick={(e) => {
                  console.log({ question });
                  setPlay(question);
                  e.stopPropagation();
                }}
              >
                <PlayCircle className="w-10 h-10" />
              </motion.button>
            </div>
          </div>
        ))}
      </div>

      <CustomModal
        title={play?.title}
        open={play != null}
        onClose={() => {
          setPlay(null);
        }}
      >
        <div className="relative !min-h-[70vh]">
          <MediaPlayer
            isFull={true}
            type={play?.type?.toLowerCase()}
            mediaSrc={play?.url}
            title={play?.title}
          />
        </div>
      </CustomModal>
    </div>
  );
}
