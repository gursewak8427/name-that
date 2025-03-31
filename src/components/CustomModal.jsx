import React from "react";
import { motion } from "motion/react";
import { colorStyle } from "../utils";
import { X } from "lucide-react";

const CustomModal = ({ open, onClose, children, title }) => {
  if (!open) return null;

  const handleOuterClick = (e) => {
    if (
      typeof e.target.className === "string" &&
      e.target.className.includes("custom-modal-overlay")
    ) {
      onClose();
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <div
      className="custom-modal-overlay fixed inset-0 bg-black/40 flex flex-col justify-center items-center z-50"
      onClick={handleOuterClick}
    >
      <motion.div
        className="custom-modal-content p-5 rounded-lg shadow-lg relative max-w-[80%]"
        style={{ minWidth: "70%", minHeight: "70vh", ...colorStyle }}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="w-full flex items-center justify-between">
          <div className="font-black text-2xl text-white text-center w-full">
            {title}
          </div>
          <motion.button
            whileTap={{ scale: 0.8, rotate: 5 }}
            onClick={onClose}
            className="absolute right-10 cursor-pointer"
          >
            <X className="text-white w-10 h-10" />
          </motion.button>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

export default CustomModal;
