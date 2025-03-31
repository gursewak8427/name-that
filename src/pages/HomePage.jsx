import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, HelpCircle, Settings } from "lucide-react";
import { motion } from "motion/react";
import Footer from "../components/Footer";
import moviesJson from "../data/movies.json";
import { useNavigate } from "react-router-dom";
import { colorStyle, encodeBase64 } from "../utils";

import Logo from "../assets/logo.png";

const categories = Object.keys(moviesJson);

export default function NameThatGame() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Save the selected category name to local storage
    localStorage.setItem("selectedCategory", categories[selectedCategory]);
  }, [selectedCategory]);

  const handleScroll = (direction) => {
    if (direction === "up") {
      setSelectedCategory((prev) =>
        prev === 0 ? categories.length - 1 : prev - 1
      );
    } else {
      setSelectedCategory((prev) =>
        prev === categories.length - 1 ? 0 : prev + 1
      );
    }
  };

  const loadSettings = async () => {
    let settings = window.localStorage.getItem("settings");
    if (settings) {
      settings = JSON.parse(settings);
    } else {
      settings = {
        questionsPerRound: 3,
        rounds: 2,
      };
      window.localStorage.setItem("settings", JSON.stringify(settings));
    }

    return settings;
  };

  const startGame = () => {
    loadSettings().then((settings) => {
      const selectedCategoryName = categories[selectedCategory];
      const movies = moviesJson[selectedCategoryName];

      console.log(
        "Total Questions:",
        settings?.rounds * settings?.questionsPerRound
      );
      // Randomly select movies based on totalQuestions
      const shuffledMovies = movies.sort(() => 0.5 - Math.random());
      const selectedMovies = shuffledMovies.slice(
        0,
        settings?.rounds * settings?.questionsPerRound
      );

      // Store selected movies in local storage
      const encryptedMovies = encodeBase64(selectedMovies);

      localStorage.setItem("selectedMovies", encryptedMovies);

      navigate("/start");
    });
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-between text-white"
      style={colorStyle}
    >
      <h1 className="text-6xl font-bold text-[#FBD11E] mb-6">
        <img alt="Logo" src={Logo} />
      </h1>
      <div className="flex items-center gap-12">
        <div className="flex flex-col items-center">
          <motion.button
            whileTap={{
              scale: 0.8,
            }}
            onClick={() => handleScroll("up")}
            className="p-2 bg-transparent text-white cursor-pointer"
          >
            <ChevronUp size={36} />
          </motion.button>
          <div className="my-4 min-w-[400px] h-48 overflow-hidden relative">
            <ul
              className="transition-transform duration-300 ease-in-out"
              style={{ transform: `translateY(-${selectedCategory * 40}px)` }}
            >
              {categories.map((category, index) => (
                <li
                  key={category}
                  className={`text-3xl text-center h-10 leading-10 ${
                    index === selectedCategory
                      ? "text-[#FBD11E] font-bold"
                      : "text-white"
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <motion.button
            whileTap={{
              scale: 0.8,
            }}
            onClick={() => handleScroll("down")}
            className="p-2 bg-transparent text-white cursor-pointer"
          >
            <ChevronDown size={36} />
          </motion.button>
        </div>
        <div className="w-[400px] h-[400px] bg-gray-300"></div>
      </div>
      <motion.button
        onClick={startGame}
        whileTap={{
          scale: 0.8,
        }}
        className="z-50 cursor-pointer mt-8 mb-8 w-[216px] h-[53px] rounded-[8px] px-[24px] py-[12px] gap-[10px] bg-gradient-to-b from-[#66ED18] to-[#0E890E] shadow-[0px_4px_4px_0px_#00000040] text-white text-xl"
      >
        START GAME
      </motion.button>
      <Footer />
    </div>
  );
}
