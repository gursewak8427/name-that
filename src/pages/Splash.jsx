import React, { useEffect } from "react";
import { motion } from "motion/react";
import { colorStyle } from "../utils";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/round/1");
    }, 2000);
  }, []);

  return (
    <div className="w-full h-screen grid place-items-center" style={colorStyle}>
      <motion.img
        alt="Logo"
        src="/src/assets/logo.png"
        initial={{ scale: 0.5, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      />
    </div>
  );
};

export default Splash;
