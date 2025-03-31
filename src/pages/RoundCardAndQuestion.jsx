import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { colorStyle } from "../utils";
import { useEffect, useState } from "react";
import Logo from "../assets/logo.png";

export default function RoundCard() {
  const { roundNo } = useParams();
  const [settings, setSettings] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate(`/question/${roundNo}/1`);
    }, 2000);

    loadSettings().then((settings) => {
      setSettings(settings);
    });
  }, []);

  const loadSettings = async () => {
    let settings = window.localStorage.getItem("settings");
    if (settings) settings = JSON.parse(settings);

    return settings;
  };

  return (
    <div
      className="w-full h-screen overflow-hidden flex flex-col items-center relative bg-white"
      style={colorStyle}
    >
      <h2 className="text-[#FBD11E] font-bold text-lg uppercase pt-10">
        <img alt="Logo" src={Logo} />
      </h2>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] bg-white py-16 px-10 -ml-2 shadow-2xl"
        initial={{ rotate: 0 }}
        animate={{ rotate: -5 }}
        transition={{ duration: 0.5 }}
        style={{
          perspective: "1000px",
        }}
      >
        <motion.h1
          className="text-gray-700 text-center w-full font-montserrat font-extrabold text-[96px] leading-[96px] tracking-normal"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          ROUND {roundNo}
        </motion.h1>
      </motion.div>
      <h2 className="absolute bottom-30 left-1/2 -translate-x-1/2 text-white font-black text-4xl uppercase">
        {settings?.questionsPerRound} Questions
      </h2>
    </div>
  );
}
